import Honey from "../Honey.webp";
import Lavado from "../Lavado.webp";
import Cuarteron from "../cuarteron.png";
import Satchets2 from "../satchets2.webp";
import SatchetsBox from "../satchesBox.webp";
import ProductCard from "../components/ProductCard";

const ProductInfo = () => {
  return (
    <section 
      id="section2" 
      className="relative w-full min-h-screen py-20 px-4 overflow-hidden"
      aria-labelledby="productos-heading"
    >
      {/* Fondos Decorativos Locales Premium */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradiente suave base */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm/5 to-transparent opacity-50"></div>
        
        {/* Orbes animadas - fondos locales */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-tl from-accent/15 to-transparent rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-warm/15 to-transparent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Luces ambientales */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl opacity-15"></div>
      </div>

      {/* Contenedor Principal */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Sección */}
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 
            id="productos-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black text-gradient mb-4 leading-tight"
          >
            Nuestros Cafés
            <span className="block text-primary">de Especialidad</span>
          </h2>
          <p className="text-lg md:text-xl text-textLight max-w-2xl mx-auto">
            Cada café es una experiencia única. Seleccionados con dedicación, cultivados con amor en las montañas de Risaralda.
          </p>
        </div>

        {/* Indicadores de Variedad */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
          {[
            { icon: '🌱', label: 'Procesos Especiales', desc: 'Lavado & Honey' },
            { icon: '⭐', label: 'Grado AA', desc: 'Premium Quality' },
            { icon: '📍', label: 'Mistrató', desc: '1.950 m.s.n.m' },
            { icon: '☕', label: 'Variedades', desc: 'Tipica & Bourbon' },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-light/50 backdrop-blur-sm border border-primary/10 text-center hover-lift animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <p className="text-2xl mb-2">{item.icon}</p>
              <p className="font-bold text-sm text-dark">{item.label}</p>
              <p className="text-xs text-textLight mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Producto 1: Lavado */}
          <div className="hover:shadow-premium-lg transition-all duration-300" style={{ animationDelay: '0ms' }}>
            <ProductCard
              title="Proceso Lavado"
              imageSrc={Lavado}
              variants={[
                { label: "454 gr", price: "$35.000", oldPrice: "$39.000" },
                { label: "350 gr", price: "$28.000", oldPrice: "$32.000" },
                { label: "250 gr", price: "$25.000", oldPrice: "$29.000" },
              ]}
              details={{
                perfil: "Frutos rojos",
                tostion: "Media",
                proceso: "Lavado",
                notas: "Caña de azúcar, caramelo, moras, arándanos",
              }}
              compact
            />
          </div>

          {/* Producto 2: Honey */}
          <div className="hover:shadow-premium-lg transition-all duration-300" style={{ animationDelay: '100ms' }}>
            <ProductCard
              title="Proceso Honey"
              imageSrc={Honey}
              variants={[
                { label: "454 gr", price: "$35.000", oldPrice: "$39.000" },
                { label: "350 gr", price: "$28.000", oldPrice: "$32.000" },
                { label: "250 gr", price: "$25.000", oldPrice: "$29.000" },
              ]}
              details={{
                perfil: "Panela, Miel",
                tostion: "Media",
                proceso: "Honey",
                notas: "Caña de azúcar, apanelado con su dulzura natural.",
              }}
              compact
            />
          </div>

          {/* Producto 3: Cuarterón */}
          <div className="hover:shadow-premium-lg transition-all duration-300" style={{ animationDelay: '200ms' }}>
            <ProductCard
              title="Cuarterón 5 lb"
              imageSrc={Cuarteron}
              variants={[
                { label: "5 lb · Honey", price: "$165.000", oldPrice: "$179.900", imageSrc: Cuarteron },
                {
                  label: "5 lb · Lavado",
                  price: "$165.000",
                  oldPrice: "$179.900",
                  imageSrc: Cuarteron,
                  details: {
                    perfil: "Frutos rojos",
                    tostion: "Media",
                    proceso: "Lavado",
                    notas: "Caña de azúcar, caramelo, moras, arándanos",
                  }
                },
              ]}
              details={{
                perfil: "Panela, Miel",
                tostion: "Media",
                proceso: "Honey",
                notas: "Caña de azúcar, apanelado con su dulzura natural.",
              }}
              compact
            />
          </div>

          {/* Producto 4: Satchets */}
          <div className="hover:shadow-premium-lg transition-all duration-300" style={{ animationDelay: '300ms' }}>
            <ProductCard
              title="Satchets"
              imageSrc={Satchets2}
              variants={[
                { label: "Unidad", price: "$2.500", oldPrice: "$3.900", imageSrc: Satchets2 },
                { label: "Caja x 10", price: "$25.000", oldPrice: "$39.900", imageSrc: SatchetsBox },
              ]}
              details={{
                notas: "Pequeñas bolsas individuales, selladas herméticamente, diseñadas para una sola porción.",
                tostion: "Media",
              }}
              compact
            />
          </div>
        </div>

        {/* CTA Secundaria */}
        <div className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-warm/10 to-primary/10 border border-primary/20 animate-fade-in-up">
          <p className="text-lg text-textLight mb-4">
            ¿No encuentras lo que buscas?
          </p>
          <a
            href="https://wa.me/573216363596/?text=¡Hola! Tengo una consulta especial sobre los cafés de Cumbre Café"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-light font-bold rounded-xl shadow-premium hover-lift focus-ring transition-all duration-300"
          >
            💬 Consulta Personalizada
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
