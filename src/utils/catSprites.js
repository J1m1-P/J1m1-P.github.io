const frames = new Map();
const frameSize = 1024;

// Match the existing gray cat's pose sizes and baseline.
const bounds = {
  idle: [0, 493, 1024, 531],
  standing: [5, 439, 1014, 585],
  moving: [5, 439, 1014, 585],
  preparingToJump: [8, 16, 1008, 1008],
  jumping: [8, 16, 1008, 1008],
};

const removeOuterBackground = ({ data, width, height }) => {
  const visited = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height);
  let head = 0;
  let tail = 0;
  const visit = (pixel) => {
    if (visited[pixel]) return;
    visited[pixel] = 1;
    const offset = pixel * 4;
    if (Math.min(data[offset], data[offset + 1], data[offset + 2]) < 235) return;
    data[offset + 3] = 0;
    queue[tail++] = pixel;
  };

  for (let x = 0; x < width; x++) {
    visit(x);
    visit((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    visit(y * width);
    visit(y * width + width - 1);
  }
  while (head < tail) {
    const pixel = queue[head++];
    const x = pixel % width;
    if (x > 0) visit(pixel - 1);
    if (x < width - 1) visit(pixel + 1);
    if (pixel >= width) visit(pixel - width);
    if (pixel < width * (height - 1)) visit(pixel + width);
  }
};

const renderFrame = async (cat, phase) => {
  const image = new Image();
  image.src = cat.images[phase];
  await image.decode();
  const frame = document.createElement("canvas");
  frame.width = frame.height = frameSize;
  const context = frame.getContext("2d");
  context.imageSmoothingEnabled = false;

  if (cat.id === "gray") {
    context.drawImage(image, 0, 0, frameSize, frameSize);
    return frame;
  }

  // Process only the displayed canvas; the saved source images stay untouched.
  const source = document.createElement("canvas");
  source.width = image.naturalWidth;
  source.height = image.naturalHeight;
  const sourceContext = source.getContext("2d", { willReadFrequently: true });
  sourceContext.drawImage(image, 0, 0);
  const pixels = sourceContext.getImageData(0, 0, source.width, source.height);
  if (phase !== "idle") removeOuterBackground(pixels);
  sourceContext.putImageData(pixels, 0, 0);

  let left = source.width;
  let top = source.height;
  let right = 0;
  let bottom = 0;
  for (let y = 0; y < source.height; y++) {
    for (let x = 0; x < source.width; x++) {
      const offset = (y * source.width + x) * 4;
      if (!pixels.data[offset + 3]) continue;
      // JPEG background specks must not change the pose's scale. The dark
      // outline defines its bounds; all fur inside those bounds is retained.
      if (phase !== "idle"
        && Math.min(pixels.data[offset], pixels.data[offset + 1], pixels.data[offset + 2]) >= 200) continue;
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x + 1);
      bottom = Math.max(bottom, y + 1);
    }
  }
  const width = right - left;
  const height = bottom - top;
  if (width <= 0 || height <= 0) return frame;
  const [targetX, targetY, targetWidth, targetHeight] = bounds[phase];
  const scale = Math.min(targetWidth / width, targetHeight / height);
  context.drawImage(source, left, top, width, height,
    targetX + (targetWidth - width * scale) / 2,
    targetY + targetHeight - height * scale, width * scale, height * scale);
  return frame;
};

export const getCatFrame = (cat, phase) => {
  const source = cat.images[phase];
  if (!frames.has(source)) {
    frames.set(source, renderFrame(cat, phase).catch((error) => {
      frames.delete(source);
      throw error;
    }));
  }
  return frames.get(source);
};
