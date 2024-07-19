import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductInfo = () => {
  const handlePurchase = (subject) => {
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div className="mx-auto mt-4 text-textdark w-5/6 md:w-4/6 lg:w-3/5 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-left text-3xl font-bold mb-4">
        Descubre la Experiencia de un Café Excepcional
      </h1>
      <p className="text-left text-secondary leading-relaxed">
        Sumérgete en una experiencia sensorial única con nuestro Café de Origen
        Premium, cuidadosamente seleccionado y cultivado en las mejores regiones
        cafetaleras del mundo. Cada grano de café cuenta una historia de
        dedicación, tradición y pasión, llevada a tu taza para ofrecerte un
        sabor inigualable.
      </p>
      <a
        className="px-6 py-3 mt-4 bg-[#4E342E] text-white rounded-full inline-flex items-center 
          justify-center space-x-2 hover:bg-[#714226] hover:shadow-lg duration-300 ease-in-out"
        onClick={() => handlePurchase("Hola, me gustaria comprar Café")}
        title="Comprar ahora"
      >
        <FaShoppingCart size={24} />
        <span>Comprar</span>
      </a>
    </div>
  );
};

export default ProductInfo;
