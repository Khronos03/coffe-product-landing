import { FaShoppingCart } from "react-icons/fa";
import ProcesoHoney from "../Premium.png";

export const colorPalette = {
  primary: '#eb8b3a',
  warm: '#fbcd86',
  dark: '#430000',
  accent: '#a11d00',
  light: '#fff8f0',
  surface: '#faf5f0',
  text: '#2d1810',
  textLight: '#6b5344',
};

const ProductImage = () => {
  return (
    <section 
      id="section1" 
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-20 px-4"
      aria-labelledby="hero-heading"
    >
      {/* Fondo Decorativo Local */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow principal del hero */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-30"></div>
        
        {/* Luces ambientales sutiles */}
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-gradient-to-b from-warm/10 to-transparent rounded-full blur-3xl opacity-20 transform -translate-x-1/2"></div>
      </div>

      {/* Contenedor Principal */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Imagen - Izquierda */}
          <div className="order-2 lg:order-1 flex justify-center items-center animate-fade-in-up">
            <div className="relative w-full max-w-md">
              {/* Glow Background */}
              <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {/* Contenedor Imagen */}
              <div className="relative rounded-3xl overflow-hidden shadow-premium-lg border-2 border-primary/20 hover-glow transition-all duration-500 group">
                <div className="aspect-square overflow-hidden bg-surface">
                  <img
                    src={ProcesoHoney}
                    alt="Café de Altura - Cultivado en Mistrató, Risaralda"
                    decoding="async"
                    loading="eager"
                    fetchpriority="high"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Badge decorativo */}
              <div className="absolute -bottom-2 -right-2 px-6 py-3 bg-gradient-primary text-light font-bold rounded-full shadow-premium text-sm md:text-base">
                100% Natural
              </div>
            </div>
          </div>

          {/* Contenido - Derecha */}
          <div className="order-1 lg:order-2 animate-fade-in-down">
            {/* Tag de Origen */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-warm/20 rounded-full mb-4 text-primary font-semibold text-sm border border-warm/40">
              <span>🇨🇴</span>
              <span>Café de Origen Colombiano</span>
            </div>

            {/* Título Principal */}
            <h1 
              id="hero-heading"
              className="text-gradient text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
            >
              Café de Altura
            </h1>

            {/* Subtítulo */}
            <p className="text-primary text-xl md:text-2xl font-bold mb-6">
              Cultivado a <span className="text-accent">1.950 m s.n.m</span>
            </p>

            {/* Descripción */}
            <div className="space-y-4 mb-8">
              <p className="text-textLight text-lg leading-relaxed">
                Desde las montañas de <strong className="text-primary">Mistrató, Risaralda</strong>, nace un café de origen 100% colombiano, creado para quienes valoran la calidad excepcional y la autenticidad.
              </p>
              <p className="text-textLight text-lg leading-relaxed">
                Cada grano es <strong className="text-accent">cuidadosamente seleccionado</strong> y cultivado bajo prácticas sostenibles y responsables, dando como resultado un café que expresa el amor y la dedicación de nuestro trabajo en cada taza.
              </p>
            </div>

            {/* Beneficios */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-light/40 backdrop-blur-sm border border-primary/10">
                <p className="text-sm font-semibold text-primary">🌱 100% Sostenible</p>
              </div>
              <div className="p-4 rounded-xl bg-light/40 backdrop-blur-sm border border-primary/10">
                <p className="text-sm font-semibold text-primary">☕ Especialidad</p>
              </div>
              <div className="p-4 rounded-xl bg-light/40 backdrop-blur-sm border border-primary/10">
                <p className="text-sm font-semibold text-primary">📍 Origen Único</p>
              </div>
              <div className="p-4 rounded-xl bg-light/40 backdrop-blur-sm border border-primary/10">
                <p className="text-sm font-semibold text-primary">✨ Premium</p>
              </div>
            </div>

            {/* CTA Principal */}
            <a
              href="https://wa.me/573216363596/?text=Hola! 👋☕ Estoy interesado(a) en conocer y comprar café de especialidad Cumbre Café. ¿Podrían brindarme información sobre variedades, procesos y precios disponibles?"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 gradient-primary text-light font-bold text-lg rounded-2xl shadow-premium-lg hover-lift hover:shadow-premium-xl focus-ring transition-all duration-300"
            >
              <FaShoppingCart size={24} />
              <span>Comprar Ahora</span>
            </a>

            {/* Secundaria */}
            <p className="mt-6 text-textLight text-sm">
              ☕ Envío a toda Colombia • 💬 Consulta sin compromiso
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductImage;
