import React from "react";
import coffeeImage from "../coffe.jpg";
import { FaShoppingCart } from "react-icons/fa";

const ShoppingSection = () => {
  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen mt-12 md:mt-48">
      <div className="group flex-1 flex flex-col items-center justify-center bg-[#714226]">
        <div className="m-7">
          <img
            src={coffeeImage}
            alt="Coffee"
            className="w-40 h-40 rounded-full"
          />
          <h2 className="mt-4 text-2xl font-bold text-white">Café tostión media</h2>
          <p className="mt-2 text-white">
            Descubre el equilibrio perfecto con nuestro Café tostión media,
            ideal para quienes buscan una taza suave y aromática con una acidez
            viva y un cuerpo equilibrado.
          </p>
          <a
            className="px-6 py-3 mt-4 bg-[#8D6E63] text-white rounded-full inline-flex items-center 
          justify-center space-x-2 hover:bg-[#714226] hover:shadow-lg duration-300 ease-in-out"
            href="https://wa.me/573216363596/?text=¡Hola! Me gustaría comprar café de especialidad de tostión Media."
            title="Comprar ahora"
          >
            <FaShoppingCart size={24} />
            <span>Comprar</span>
          </a>
        </div>
      </div>
      <div className="group flex-1 flex flex-col items-center justify-center bg-[#44210f]">
        <div className="m-7">
          <img
            src={coffeeImage}
            alt="Coffee"
            className="w-40 h-40 rounded-full"
          />
          <h2 className="mt-4 text-2xl font-bold text-white">
            Café tostión media-oscura
          </h2>
          <p className="mt-2 text-left text-white">
            Experimenta la riqueza y profundidad de nuestro Café tostión
            medio-oscuro, donde cada sorbo revela un balance exquisito entre
            sabores intensos y suaves.
          </p>
          <a
            className="px-6 py-3 mt-4 bg-[#8D6E63] text-white rounded-full inline-flex items-center 
          justify-center space-x-2 hover:bg-[#714226] hover:shadow-lg duration-300 ease-in-out"
            href="https://wa.me/573216363596/?text=¡Hola! Me gustaría comprar café de especialidad de tostión Media-Oscura."
            title="Comprar ahora"
          >
            <FaShoppingCart size={24} />
            <span>Comprar</span>
          </a>
        </div>
      </div>
      <div className="group flex-1 flex flex-col items-center justify-center bg-[#1b0c09]">
        <div className="m-7">
          <img
            src={coffeeImage}
            alt="Coffee"
            className="w-40 h-40 rounded-full"
          />
          <h2 className="mt-4 text-2xl font-bold text-white">Café tostión oscura</h2>
          <p className="mt-2 text-left text-white">
            Sumérgete en la intensidad profunda y audaz de nuestro Café de
            tostión oscura, diseñado para quienes aprecian una experiencia de
            sabor fuerte y rica.
          </p>
          <a
            className="px-6 py-3 mt-4 bg-[#8D6E63] text-white rounded-full inline-flex items-center 
          justify-center space-x-2 hover:bg-[#714226] hover:shadow-lg duration-300 ease-in-out"
            href="https://wa.me/573216363596/?text=¡Hola! Me gustaría comprar café de especialidad de tostión Oscura."
            title="Comprar ahora"
          >
            <FaShoppingCart size={24} />
            <span>Comprar</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShoppingSection;
