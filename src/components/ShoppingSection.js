import React from "react";
import coffeeImage from "../coffe.jpg";
import { FaShoppingCart } from "react-icons/fa";

const ShoppingSection = () => {
  const handlePurchase = (subject) => {
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div className="flex h-screen mt-48">
      <div className="group flex-1 flex flex-col items-center justify-center bg-[#714226]">
        <div className="m-7">
          <img
            src={coffeeImage}
            alt="Coffee"
            className="w-40 h-40 rounded-full"
          />
          <h2 className="mt-4 text-2xl font-bold text-white">Café de Tostado Medio</h2>
          <p className="mt-2 text-white">
            Descubre el equilibrio perfecto con nuestro Café de Tostado Medio,
            ideal para quienes buscan una taza suave y aromática con una acidez
            viva y un cuerpo equilibrado.
          </p>
          <a
            className="px-6 py-3 mt-4 bg-[#8D6E63] text-white rounded-full inline-flex items-center 
          justify-center space-x-2 hover:bg-[#714226] hover:shadow-lg duration-300 ease-in-out"
            onClick={() =>
              handlePurchase("Hola, me gustaria comprar Café de Tostado Medio")
            }
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
            Café de Tostado Medio-Oscuro
          </h2>
          <p className="mt-2 text-left text-white">
            Experimenta la riqueza y profundidad de nuestro Café de Tostado
            Medio-Oscuro, donde cada sorbo revela un balance exquisito entre
            sabores intensos y suaves.
          </p>
          <a
            className="px-6 py-3 mt-4 bg-[#8D6E63] text-white rounded-full inline-flex items-center 
          justify-center space-x-2 hover:bg-[#714226] hover:shadow-lg duration-300 ease-in-out"
            onClick={() =>
              handlePurchase(
                "Hola, me gustaria comprar Café de Tostado Medio-Oscuro"
              )
            }
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
          <h2 className="mt-4 text-2xl font-bold text-white">Café de Tostado Oscuro</h2>
          <p className="mt-2 text-left text-white">
            Sumérgete en la intensidad profunda y audaz de nuestro Café de
            Tostado Oscuro, diseñado para quienes aprecian una experiencia de
            sabor fuerte y rica.
          </p>
          <a
            className="px-6 py-3 mt-4 bg-[#8D6E63] text-white rounded-full inline-flex items-center 
          justify-center space-x-2 hover:bg-[#714226] hover:shadow-lg duration-300 ease-in-out"
            onClick={() =>
              handlePurchase("Hola, me gusaria comprar Café de Tostado Oscuro")
            }
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
