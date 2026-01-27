import { useEffect, useRef } from "react";

const frameCount = 480;

const ScrollCanvasBackground = () => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadingRef = useRef(new Set());
  const rafRef = useRef(null);
  const lastDrawnIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const ensureImage = (index) => {
      if (index < 0 || index >= frameCount) return;
      if (imagesRef.current[index]) return;
      if (loadingRef.current.has(index)) return;
      loadingRef.current.add(index);
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/frames/frame-${String(index + 1).padStart(4, "0")}.webp`;
      img.decoding = "async";
      img.onload = () => {
        imagesRef.current[index] = img;
        loadingRef.current.delete(index);
        if (lastDrawnIndexRef.current === index) drawFrame(index);
      };
    };

    const drawFrame = (index) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return false;

      const cssW = Math.floor(window.innerWidth);
      const cssH = Math.floor(window.innerHeight);

      ctx.clearRect(0, 0, cssW, cssH);

      const scale = Math.max(cssW / img.width, cssH / img.height);
      const x = cssW / 2 - (img.width / 2) * scale;
      const y = cssH / 2 - (img.height / 2) * scale;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      lastDrawnIndexRef.current = index;
      return true;
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#D1D0AB"; 
      ctx.fillRect(0, 0, Math.floor(window.innerWidth), Math.floor(window.innerHeight));
      ensureImage(0);
      drawFrame(0);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    imagesRef.current = [];
    ensureImage(0);

    if (imagesRef.current[0]) {
      imagesRef.current[0].onload = () => {
        ctx.fillStyle = "#D1D0AB";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawFrame(0);
      };
    }

    let targetIndex = 0;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
      targetIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * (frameCount - 1)));
      ensureImage(targetIndex);
      ensureImage(targetIndex + 1);
      ensureImage(targetIndex - 1);
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          if (!drawFrame(targetIndex)) drawFrame(lastDrawnIndexRef.current);
          rafRef.current = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none", backgroundColor: "#D1D0AB" }}
    />
  );
};

export default ScrollCanvasBackground;
