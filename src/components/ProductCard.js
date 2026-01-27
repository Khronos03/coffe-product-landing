import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

const whatsappNumber = "573216363596";

const ProductCard = ({ title, imageSrc, variants, details, compact = false }) => {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? variants.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === variants.length - 1 ? 0 : i + 1));

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

  const hasDetails = activeDetails && (activeDetails.perfil || activeDetails.tostion || activeDetails.proceso || activeDetails.notas);

  return (
    <div className={`group w-full ${compact ? "max-w-none" : "max-w-[360px] md:max-w-[380px]"}`}>
      <div className={`p-[1px] rounded-2xl bg-gradient-to-br from-secondary/50 via-accent/40 to-primary/60 transition-colors duration-300 ${compact ? "" : "group-hover:from-secondary group-hover:via-accent group-hover:to-primary"}`}>
        <div className={`bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl transition-all duration-300 overflow-hidden ${compact ? "min-h-[500px] group-hover:bg-white/30 group-hover:backdrop-blur-xl group-hover:shadow-xl group-hover:-translate-y-[2px]" : "group-hover:bg-white/30 group-hover:backdrop-blur-xl group-hover:shadow-2xl group-hover:-translate-y-1"} flex h-full flex-col`}>
          <div className={`${compact ? "p-6 pb-0" : "p-6 pb-0"}`}>
            <img
              src={displayImageSrc}
              alt={title}
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              className={`w-full ${compact ? "h-32 sm:h-36 md:h-40" : "h-40 sm:h-44 md:h-48"} object-contain rounded-xl transition-transform duration-300 ${compact ? "group-hover:scale-[1.01]" : "group-hover:scale-[1.03]"}`}
            />
          </div>

          <div className={`${compact ? "px-5 pt-4 pb-5" : "px-5 pt-4 pb-5"} flex-1 flex flex-col gap-3`}>
            <h3 className={`${compact ? "text-lg md:text-xl" : "text-lg md:text-xl"} font-bold text-primary mb-2 text-center min-h-[48px] flex items-center justify-center`}>
              {title}
            </h3>
            {(activeDetails?.proceso || activeDetails?.tostion) && (
              <div className={`flex items-center justify-center gap-2 ${compact ? "mb-2" : "mb-3"} min-h-[24px]`}>
                {activeDetails?.proceso && (
                  <span className={`${compact ? "px-2 py-0.5 text-[10px]" : "px-2 py-1 text-xs"} rounded-full bg-primary/10 text-primary border border-primary/20`}>
                    {activeDetails.proceso}
                  </span>
                )}
                {activeDetails?.tostion && (
                  <span className={`${compact ? "px-2 py-0.5 text-[10px]" : "px-2 py-1 text-xs"} rounded-full bg-tertiary/10 text-textdark border border-tertiary/20`}>
                    Tostión: {activeDetails.tostion}
                  </span>
                )}
              </div>
            )}
        {hasDetails && !compact && (
              <div className="mb-4">
                <dl className="text-sm text-textdark space-y-2">
              {activeDetails.perfil && (
                    <div className="md:flex gap-2">
                      <dt className="font-semibold md:w-28">Perfil de taza:</dt>
                  <dd className="flex-1">{activeDetails.perfil}</dd>
                    </div>
                  )}
              {activeDetails.tostion && (
                    <div className="md:flex gap-2">
                      <dt className="font-semibold md:w-28">Tostión:</dt>
                  <dd className="flex-1">{activeDetails.tostion}</dd>
                    </div>
                  )}
              {activeDetails.proceso && (
                    <div className="md:flex gap-2">
                      <dt className="font-semibold md:w-28">Proceso:</dt>
                  <dd className="flex-1">{activeDetails.proceso}</dd>
                    </div>
                  )}
              {activeDetails.notas && (
                    <div className="md:flex gap-2">
                      <dt className="font-semibold md:w-28">Notas:</dt>
                  <dd className="flex-1">{activeDetails.notas}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            <div className={`flex items-center justify-between gap-2 ${compact ? "mb-2" : "mb-3"}`} aria-label="Selector de variante">
              <button
                aria-label="Anterior"
                onClick={prev}
                className={`${compact ? "p-3" : "p-3 sm:p-2"} rounded-full bg-primary text-accent hover:bg-tertiary transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary`}>
                <FiChevronLeft size={compact ? 18 : 20} />
              </button>
              <div className="flex-1 text-center">
                <div className={`${compact ? "text-base" : "text-base"} font-semibold text-textdark`}>
                  {current.label}
                </div>
                {(current.oldPrice || current.price) && (
                  <div className="min-h-[24px] flex items-baseline justify-center gap-2" aria-live="polite">
                    {current.oldPrice && (
                      <span className={`${compact ? "text-sm" : "text-sm"} line-through text-red-500/80`}>
                        {current.oldPrice}
                      </span>
                    )}
                    {current.price && (
                      <span className={`${compact ? "text-base" : "text-base"} text-primary font-bold`}>
                        {current.price}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <button
                aria-label="Siguiente"
                onClick={next}
                className={`${compact ? "p-3" : "p-3 sm:p-2"} rounded-full bg-primary text-accent hover:bg-tertiary transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary`}>
                <FiChevronRight size={compact ? 18 : 20} />
              </button>
            </div>
            <div className={`flex items-center justify-center gap-2 ${compact ? "mb-3" : "mb-4"} min-h-[16px]`} role="group" aria-label="Paginación de variantes">
              {variants.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir a variante ${i + 1}`}
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? "true" : undefined}
                  className={`${compact ? "h-2.5 w-2.5" : "h-3 w-3 md:h-2 md:w-2"} rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white ${i === index ? "bg-primary" : "bg-primary/30 hover:bg-primary/50"
                    }`}
                />
              ))}
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Comprar ${title} - ${current.label} por WhatsApp`}
              className={`mt-auto w-full inline-flex items-center justify-center gap-2 ${compact ? "px-4 py-2.5 text-sm" : "px-4 py-3"} rounded-lg bg-gradient-to-r from-primary to-tertiary text-accent font-semibold shadow hover:opacity-95 transition`}
              title="Comprar por WhatsApp"
            >
              <FaShoppingCart />
              Comprar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
