import { useEffect, useRef } from "react";
import { getCatFrame } from "../../utils/catSprites.js";

const CatSprite = ({ cat, phase, className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    getCatFrame(cat, phase).then((frame) => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(frame, 0, 0);
    }).catch(() => {
      // Keep the previous pose if an image temporarily fails to load.
    });
    return () => { cancelled = true; };
  }, [cat, phase]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={1024}
      height={1024}
      aria-hidden="true"
    />
  );
};

export default CatSprite;
