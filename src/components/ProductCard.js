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
    <div className="group w-full max-w-[420px]">
      <div className="p-[1px] rounded-2xl bg-gradient-to-br from-secondary/50 via-accent/40 to-primary/60">
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <div className="relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center">
            <div
              aria-hidden
              className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white/90 via-white/60 to-transparent backdrop-blur-md z-10 pointer-events-none"
            />

            <img
              src={displayImageSrc}
              alt={title}
              loading="lazy"
              decoding="async"
              className="relative z-0 max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.4]"
            />
          </div>
          <div className={`${compact ? "px-3 pt-3 pb-3" : "px-5 pt-4 pb-5"} flex-1 flex flex-col gap-2`}>
            <h3 className={`${compact ? "text-sm" : "text-lg"} font-bold text-primary text-center`}>
              {title}
            </h3>

            {(activeDetails?.proceso || activeDetails?.tostion) && (
              <div className="flex items-center justify-center gap-2">
                {activeDetails?.proceso && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                    {activeDetails.proceso}
                  </span>
                )}
                {activeDetails?.tostion && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-tertiary/10 text-textdark border border-tertiary/20">
                    Tostión: {activeDetails.tostion}
                  </span>
                )}
              </div>
            )}

            {hasDetails && !compact && (
              <dl className="text-sm text-textdark space-y-2">
                {activeDetails.perfil && (
                  <div className="flex gap-2">
                    <dt className="font-semibold w-28">Perfil:</dt>
                    <dd>{activeDetails.perfil}</dd>
                  </div>
                )}
                {activeDetails.notas && (
                  <div className="flex gap-2">
                    <dt className="font-semibold w-28">Notas:</dt>
                    <dd>{activeDetails.notas}</dd>
                  </div>
                )}
              </dl>
            )}

            {/* Selector */}
            <div className="flex items-center justify-between gap-2 mt-2">
              <button onClick={prev} className="p-2 rounded-full bg-primary text-accent">
                <FiChevronLeft size={16} />
              </button>

              <div className="text-center">
                <div className="text-xs font-semibold">{current.label}</div>
                <div className="flex justify-center gap-1">
                  {current.oldPrice && (
                    <span className="text-xs line-through text-red-500/80">{current.oldPrice}</span>
                  )}
                  {current.price && (
                    <span className="text-sm font-bold text-primary">{current.price}</span>
                  )}
                </div>
              </div>

              <button onClick={next} className="p-2 rounded-full bg-primary text-accent">
                <FiChevronRight size={16} />
              </button>
            </div>

            {/* CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-auto w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                bg-gradient-to-r from-primary to-tertiary text-accent font-semibold shadow"
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
