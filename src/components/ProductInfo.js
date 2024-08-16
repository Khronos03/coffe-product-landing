import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductInfo = () => {
  return (
    <div className="mx-auto mt-4 text-textdark w-5/6 md:w-4/6 lg:w-3/5 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-left text-3xl font-bold mb-4">
        Cumbre Café, descubre la experiencia de un Café excepcional
      </h1>
      <p className="text-left text-secondary leading-relaxed">
        Sumérgete en una 
        <strong className="text-yellow-950"> experiencia sensorial </strong>
        única con nuestro 
        Café de Origen Premium, 
        <strong className="text-yellow-950"> cuidadosamente seleccionado </strong>
         y cultivado en las mejores regiones cafetaleras del mundo. 
         Cada grano de café cuenta una historia de
        <strong className="text-yellow-950"> dedicación, tradición y pasión, </strong>
         llevada a tu taza para ofrecerte un
        sabor 
        <strong className="text-yellow-950"> inigualable. </strong>
      </p>
      <a
        className="px-6 py-3 mt-4 bg-[#714226] text-white rounded-full inline-flex items-center 
          justify-center space-x-2 hover:bg-[#a77254] hover:shadow-lg duration-300 ease-in-out"
        href="https://wa.me/573216363596/?text=¡Hola! Me gustaría comprar café de especialidad."
        title="Comprar ahora"        
        target="_blank"
      >
        <FaShoppingCart size={24} />
        <span>Comprar ahora!</span>
      </a>
    </div>
  );
};

export default ProductInfo;
