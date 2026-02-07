import { useEffect, useRef } from "react";

const frameCount = 240; 
const PRELOAD_COUNT = 80; 

const ScrollCanvasBackground = ({ onLoadProgress }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadingRef = useRef(new Set());
  const rafRef = useRef(null);
  const lastDrawnIndexRef = useRef(0);
  const preloadedCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const updateProgress = () => {
      const progress = Math.min((preloadedCountRef.current / PRELOAD_COUNT) * 100, 100);
      if (onLoadProgress) onLoadProgress(progress);
    };

    const fileIndexFor = (idx) => idx * 2 + 1; 

    const ensureImage = (index, isPriority = false) => {
      if (index < 0 || index >= frameCount) return Promise.resolve();
      if (imagesRef.current[index]) return Promise.resolve();
      if (loadingRef.current.has(index)) return Promise.resolve();

      return new Promise((resolve) => {
        loadingRef.current.add(index);
        const img = new Image();
        const fileNumber = fileIndexFor(index);
        img.src = `${process.env.PUBLIC_URL}/frames/frame-${String(fileNumber).padStart(4, "0")}.webp`;
        img.decoding = "async";

        let timeoutId = null;
        if (isPriority) {
          // Fallback: si el navegador no dispara onload/onerror, avanzamos igual
          timeoutId = setTimeout(() => {
            loadingRef.current.delete(index);
            preloadedCountRef.current++;
            updateProgress();
            resolve();
          }, 5000);
        }

        img.onload = () => {
          if (timeoutId) clearTimeout(timeoutId);
          imagesRef.current[index] = img;
          loadingRef.current.delete(index);
          if (isPriority) {
            preloadedCountRef.current++;
            updateProgress();
          }
          if (lastDrawnIndexRef.current === index) drawFrame(index);
          resolve();
        };

        img.onerror = () => {
          if (timeoutId) clearTimeout(timeoutId);
          loadingRef.current.delete(index);
          if (isPriority) {
            preloadedCountRef.current++;
            updateProgress();
          }
          resolve();
        };
      });
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

    const preloadInitialFrames = async () => {
      const preloadPromises = [];
      for (let i = 0; i < PRELOAD_COUNT; i++) {
        preloadPromises.push(ensureImage(i, true));
      }
      await Promise.allSettled(preloadPromises);
      preloadedCountRef.current = PRELOAD_COUNT;
      updateProgress();
      drawFrame(0);
    };

    preloadInitialFrames();

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
  }, [onLoadProgress]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none", backgroundColor: "#D1D0AB" }}
    />
  );
};

export default ScrollCanvasBackground;
