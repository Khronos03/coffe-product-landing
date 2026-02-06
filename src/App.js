import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import ProductImage from "./pages/ProductImage";
import ProductInfo from "./pages/ProductInfo";
import ScrollCanvasBackground from "./components/ScrollCanvasBackground";
import About from "./pages/About";
import Preloader from "./components/Preloader";
import Lenis from "lenis";

function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (loadProgress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loadProgress]);

  const handleLoadProgress = (progress) => {
    setLoadProgress(progress);
  };

  return (
    <div className="App flex flex-col min-h-screen relative z-10">
      <Preloader isLoading={isLoading} progress={loadProgress} />
      <a href="#main-content" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] bg-accent text-primary px-3 py-2 rounded shadow">
        Saltar al contenido principal
      </a>
      <Menu />
      <ScrollCanvasBackground onLoadProgress={handleLoadProgress} />
      <main id="main-content" role="main" className="contents">
        <section id="section1" className="relative min-h-screen flex items-center content-auto" aria-labelledby="hero-heading">
          <ProductImage />
        </section>
        <section id="section2" className="relative min-h-screen flex items-center content-auto" aria-labelledby="productos-heading">
          <ProductInfo />
        </section>
        <section id="section3" className="relative min-h-screen flex items-center content-auto" aria-labelledby="about-heading">
          <About />
        </section>
      </main>
    </div>
  );
}

export default App;
