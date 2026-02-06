import { FaShoppingCart } from "react-icons/fa";
import ProcesoHoney from "../procesoHoney.webp";
export const colorPalette = {
  primary: '#1D342C',
  secondary: '#A8AE80',
  tertiary: '#7F8C39',
  accent: '#F5F0C8',
  background: '#D1D0AB',
  text: '#535A28',
};

const ProductImage = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="relative z-10 flex items-center min-h-screen px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl md:max-w-3xl w-full bg-accent/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8">
          <span className="block text-primary font-semibold uppercase tracking-wide text-sm md:text-base mb-2 drop-shadow-sm">
            Café de Origen Colombiano
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-primary mb-4">
            Café de altura
            <span className="block text-lg md:text-xl font-semibold text-textdark">Cultivado a 1.950 m s. n. m</span>
          </h1>
          <div className="space-y-3 text-textdark">
            <p className="text-base md:text-lg leading-relaxed">
              Desde las montañas de Mistrató, Risaralda, nace un café de origen 100 % colombiano, creado para quienes valoran la calidad y la autenticidad.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
             Cada grano es <strong>cuidadosamente seleccionado</strong> y cultivado bajo prácticas responsables, dando como resultado un café que expresa el carácter de su origen en cada sorbo.
            </p>
          </div>
          <div className="mt-4 rounded-xl overflow-hidden border-4 border-accent/70 shadow-lg max-w-md mx-auto h-40 md:h-56 lg:h-64 group transition-all duration-300 hover:shadow-2xl">
            <img
              src={ProcesoHoney}
              alt="Proceso Honey"
              decoding="async"
              loading="eager"
              fetchpriority="high"
              className="w-full h-full object-cover transition-transform duration-300 filter group-hover:brightness-105 group-hover:contrast-105 group-hover:saturate-110 group-hover:scale-[1.02]"
            />
          </div>
          <a
            className="mt-6 flex w-fit mx-auto items-center justify-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-tertiary text-accent text-base md:text-lg font-semibold shadow-lg transition-transform hover:scale-[1.03]"
            href="https://wa.me/573216363596/?text=Hola! 👋☕ Estoy interesado(a) en conocer y comprar café de especialidad Cumbre Café. ¿Podrían brindarme información sobre variedades, procesos y precios disponibles?"
            title="Comprar ahora"
            target="_blank"
            rel="noreferrer"
          >
            <FaShoppingCart size={22} />
            <span>Comprar ahora</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
