import Honey from "../Honey.webp";
import Lavado from "../Lavado.webp";
import Cuarteron from "../cuarteron.webp";
import CuarteronLavado from "../cuarteronLavado.webp";
import SatchetsBox from "../satchesBox.webp";
import Satchets2 from "../satchets2.webp";
import ProductCard from "./ProductCard";

const ProductInfo = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <div className="relative z-10 flex-1 container mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center" role="region" aria-labelledby="productos-heading">
        <h2 id="productos-heading" className="text-center text-3xl md:text-4xl font-bold text-accent mb-8">
          Nuestros Cafés Especiales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start justify-items-center mb-12 md:mb-5">
          <ProductCard
            title="Cumbre Café · Proceso Lavado"
            imageSrc={Lavado}
            variants={[
              { label: "250 gr", price: "$25.000", oldPrice: "$30.000" },
              { label: "350 gr", price: "$35.000", oldPrice: "$42.000" },
              { label: "454 gr", price: "$45.000", oldPrice: "$54.000" },
            ]}
            details={{
              perfil: "Frutos rojos",
              tostion: "Media",
              proceso: "Lavado",
              notas: "Caña de azúcar, caramelo, moras, arandanos",
            }}
            compact
          />
          <ProductCard
            title="Cumbre Café · Proceso Honey"
            imageSrc={Honey}
            variants={[
              { label: "250 gr", price: "$25.000", oldPrice: "$30.000" },
              { label: "350 gr", price: "$35.000", oldPrice: "$42.000" },
              { label: "454 gr", price: "$45.000", oldPrice: "$54.000" },
            ]}
            details={{
              perfil: "Panela, Miel",
              tostion: "Media",
              proceso: "Honey",
              notas: "Caña de azúcar, apanelado con su dulzura natural.",
            }}
            compact
          />
          <ProductCard
            title="Cumbre Café · Cuarterón (5 lb)"
            imageSrc={Cuarteron}
            variants={[
              { label: "5 lb · Honey", price: "$160.000", oldPrice: "$199.000", imageSrc: Cuarteron },
              { 
                label: "5 lb · Lavado", 
                price: "$160.000", oldPrice: "$199.000",
                imageSrc: CuarteronLavado,
                details: {
                  perfil: "Frutos rojos",
                  tostion: "Media",
                  proceso: "Lavado",
                  notas: "Caña de azúcar, caramelo, moras, arandanos",
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
          <ProductCard
            title="Cumbre Café · Satchets"
            imageSrc={Satchets2}
            variants={[
              { label: "Unidad", price: "$1.500", oldPrice: "$2.000", imageSrc: Satchets2 },
              { label: "Caja x 10 unidades", price: "$14.000", oldPrice: "$16.000", imageSrc: SatchetsBox },
            ]}
            details={{
              notas: "Pequeñas bolsas individuales, selladas herméticamente, diseñadas para una sola porción de café.",
              tostion: "Media",
            }}
            compact
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
