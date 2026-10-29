export const isVideoMedia = ({ src = "", type }) => (
  type === "video" || /\.(mp4|webm|ogv|ogg|mov)(?:[?#]|$)/i.test(src)
);
