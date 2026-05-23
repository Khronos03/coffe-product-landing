import Menu from "./components/Menu";
import ProductImage from "./pages/ProductImage";
import ProductInfo from "./pages/ProductInfo";
import About from "./pages/About";

function App() {
  return (
    <div className="App relative min-h-screen">
      {/* Background Premium - Capa Fija */}
      <div className="app-background" aria-hidden="true">
        {/* Gradiente Base y Luces Ambientales */}
        <div className="ambient-light"></div>
        
        {/* Orbes Flotantes Animadas */}
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        <div className="orb-3"></div>
        <div className="orb-4"></div>
        <div className="orb-5"></div>
        
        {/* Grid Pattern Sutil */}
        <div className="grid-pattern"></div>
        
        {/* Noise Texture */}
        <div className="noise-overlay"></div>
        
        {/* Gradientes Decorativos Adicionales */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm/5 via-transparent to-dark/5 opacity-40"></div>
      </div>

      {/* Contenido Principal - Sobre el Background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navegación */}
        <Menu />
        
        {/* Contenido Principal */}
        <main id="main-content" role="main" className="flex-1">
          {/* Secciones */}
          <ProductImage />
          <ProductInfo />
          <About />
        </main>
      </div>
    </div>
  );
}

export default App;
