import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { imageSizeFromFile } from "image-size/fromFile";

const moduleId = "virtual:personal-photo-dimensions";
const resolvedModuleId = `\0${moduleId}`;
const imageExtension = /\.(avif|gif|jpe?g|png|webp)$/i;

export default function personalPhotoDimensions() {
  let photoDirectory;

  return {
    name: "personal-photo-dimensions",
    configResolved(config) {
      photoDirectory = join(config.publicDir, "images/personal");
    },
    resolveId(id) {
      if (id === moduleId) return resolvedModuleId;
    },
    async load(id) {
      if (id !== resolvedModuleId) return;

      const files = await readdir(photoDirectory, { withFileTypes: true });
      const dimensions = await Promise.all(files
        .filter((file) => file.isFile() && imageExtension.test(file.name))
        .map(async ({ name }) => {
          const path = join(photoDirectory, name);
          this.addWatchFile(path);
          const { width, height, orientation } = await imageSizeFromFile(path);
          // Phone photos can store pixels sideways and rotate them with EXIF.
          const rotated = orientation >= 5 && orientation <= 8;
          return [`/images/personal/${name}`, {
            width: rotated ? height : width,
            height: rotated ? width : height,
          }];
        }));

      return `export default ${JSON.stringify(Object.fromEntries(dimensions))};`;
    },
    configureServer(server) {
      const onPhotoChange = (event, path) => {
        if (!["add", "change", "unlink"].includes(event)
          || dirname(path) !== photoDirectory || !imageExtension.test(path)) return;

        const module = server.moduleGraph.getModuleById(resolvedModuleId);
        if (!module) return;
        server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      };

      server.watcher.add(photoDirectory);
      server.watcher.on("all", onPhotoChange);
      server.httpServer?.once("close", () => {
        server.watcher.off("all", onPhotoChange);
      });
    },
  };
}
