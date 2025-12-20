import React from "react";
import Honey from "../Honey.png";
import Lavado from "../Lavado.png";

const ProductInfo = () => {
  return (
    <div className="relative w-full py-12 bg-gradient-to-r from-[#1b342f] to-[#790f01]">
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/50 to-transparent"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-10">
          Notas y sabores de nuestro Café ☕✨
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="max-w-sm">
            <img
              src={Lavado}
              alt="Lavado"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          <div className="max-w-sm">
            <img
              src={Honey}
              alt="Red Honey"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
};

export default ProductInfo;
