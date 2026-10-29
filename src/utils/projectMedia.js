export const isVideoMedia = ({ src = "", type }) => (
  type === "video" || /\.(mp4|webm|ogv|ogg)(?:[?#]|$)/i.test(src)
);
