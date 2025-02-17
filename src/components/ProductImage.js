import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductImage = () => {
  return (
    <div className="relative h-[450px] md:h-[550px] lg:h-[650px] w-full">
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={require("../videoFondoBanner.mp4")} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1b342f] via-[#1b342f]/60 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 lg:px-16 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Café de altura (1'950 m.s.n.m)
        </h1>
        <p className="text-lg md:text-xl">
          Café de Origen 100% Colombiano desde las montañas de Mistrató,
          Risaralda
        </p>
        <p className="text-lg md:text-xl">
          <strong>Cuidadosamente seleccionado</strong> y cultivado en las
          mejores regiones cafeteras del mundo.
        </p>
        <a
          className="self-start px-5 py-4 mt-5 bg-gradient-to-r from-[#1b342f] to-[#5e0b00] 
                  text-white text-xl font-bold rounded-lg 
  inline-flex items-center space-x-3 
  shadow-lg shadow-black/50 transition-all transform 
  hover:brightness-125 hover:shadow-xl hover:scale-110 
  hover:ring-2 hover:ring-[#5e0b00]/80 
  animate-pulse duration-300 ease-in-out"
          href="https://wa.me/573216363596/?text=¡Hola! Me gustaría comprar café de especialidad."
          title="Comprar ahora"
          target="_blank"
        >
          <FaShoppingCart size={26} />
          <span>¡Comprar ahora!</span>
        </a>
      </div>
    </div>
  );
};

export default ProductImage;
