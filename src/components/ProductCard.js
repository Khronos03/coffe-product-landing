import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

const whatsappNumber = "573216363596";

const ProductCard = ({ title, imageSrc, variants, details, compact = false }) => {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(i => (i === 0 ? variants.length - 1 : i - 1));
  const next = () => setIndex(i => (i === variants.length - 1 ? 0 : i + 1));

  const current = variants[index];
  const displayImageSrc = current?.imageSrc || imageSrc;
  const activeDetails = { ...(details || {}), ...(current?.details || {}) };

  const baseMessage = `¡Hola! 👋☕\nQuiero comprar ${title} en ${current.label}.`;
  const parts = [];
  if (activeDetails?.perfil) parts.push(`Perfil de taza: ${activeDetails.perfil}`);
  if (activeDetails?.tostion) parts.push(`Tostión: ${activeDetails.tostion}`);
  if (activeDetails?.proceso) parts.push(`Proceso: ${activeDetails.proceso}`);
  if (activeDetails?.notas) parts.push(`Notas: ${activeDetails.notas}`);
  if (current?.price) parts.push(`Precio actual: ${current.price}`);
  if (current?.oldPrice) parts.push(`Antes: ${current.oldPrice}`);

  const message = `${baseMessage}${parts.length ? "\n" + parts.join("\n") : ""}\n¿Me confirman disponibilidad y precio?`;
  const waLink = `https://wa.me/${whatsappNumber}/?text=${encodeURIComponent(message)}`;

  const hasDetails =
    activeDetails &&
    (activeDetails.perfil || activeDetails.tostion || activeDetails.proceso || activeDetails.notas);

  return (
    <div className="group w-full max-w-md animate-fade-in-up">
      {/* Contenedor con Glass Effect */}
      <div className="relative rounded-2xl overflow-hidden shadow-premium-lg hover-lift transition-all duration-500 h-full">
        
        {/* Fondo Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-light via-surface to-warm/10 opacity-60"></div>
        
        {/* Borde Gradiente */}
        <div className="absolute inset-0 rounded-2xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Contenido */}
        <div className="relative backdrop-blur-sm rounded-2xl border border-light/40 h-full flex flex-col overflow-hidden">
          
          {/* Imagen Section */}
          <div className="relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center bg-gradient-to-br from-surface to-warm/20">
            {/* Overlay decorativo */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <img
              src={displayImageSrc}
              alt={title}
              loading="lazy"
              decoding="async"
              className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-125"
            />

            {/* Badge - Descuento */}
            {current?.oldPrice && (
              <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-primary text-light text-xs font-bold rounded-full shadow-premium-lg">
                Oferta
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className={`flex-1 flex flex-col gap-3 ${compact ? "px-3 py-4" : "px-5 py-6"}`}>
            
            {/* Título */}
            <h3 className={`font-bold text-center text-gradient ${compact ? "text-base" : "text-xl"}`}>
              {title}
            </h3>

            {/* Badges */}
            {(activeDetails?.proceso || activeDetails?.tostion) && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {activeDetails?.proceso && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/15 text-primary border border-primary/30">
                    {activeDetails.proceso}
                  </span>
                )}
                {activeDetails?.tostion && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/15 text-accent border border-accent/30">
                    Tostión: {activeDetails.tostion}
                  </span>
                )}
              </div>
            )}

            {/* Detalles */}
            {hasDetails && !compact && (
              <div className="space-y-2 text-sm text-textLight bg-light/30 rounded-lg p-3 backdrop-blur-sm">
                {activeDetails.perfil && (
                  <div>
                    <dt className="font-semibold text-primary">Perfil</dt>
                    <dd className="text-text">{activeDetails.perfil}</dd>
                  </div>
                )}
                {activeDetails.notas && (
                  <div>
                    <dt className="font-semibold text-primary">Notas</dt>
                    <dd className="text-text">{activeDetails.notas}</dd>
                  </div>
                )}
              </div>
            )}

            {/* Selector de Variantes */}
            <div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t border-primary/10">
              <button 
                onClick={prev}
                aria-label="Variante anterior"
                className="p-2 rounded-lg bg-light/50 hover:bg-primary/20 text-primary transition-all duration-300 hover-scale focus-ring"
              >
                <FiChevronLeft size={18} />
              </button>

              <div className="text-center flex-1">
                <div className="text-xs font-bold text-textLight uppercase tracking-wide">
                  {current.label}
                </div>
                <div className="flex justify-center gap-2 items-center mt-1">
                  {current.oldPrice && (
                    <span className="text-xs line-through text-textLight/50">
                      {current.oldPrice}
                    </span>
                  )}
                  {current.price && (
                    <span className="text-lg font-black text-primary">
                      {current.price}
                    </span>
                  )}
                </div>
              </div>

              <button 
                onClick={next}
                aria-label="Siguiente variante"
                className="p-2 rounded-lg bg-light/50 hover:bg-primary/20 text-primary transition-all duration-300 hover-scale focus-ring"
              >
                <FiChevronRight size={18} />
              </button>
            </div>

            {/* CTA Comprar */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="w-full mt-4 inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl gradient-primary text-light font-bold shadow-premium hover-lift transition-all duration-300 focus-ring"
              aria-label={`Comprar ${title}`}
            >
              <FaShoppingCart size={18} />
              <span>Comprar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
