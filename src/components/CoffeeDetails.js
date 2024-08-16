import React from 'react';
import coffeeDetailImage from '../coffe.jpg';

const CoffeeDetails = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-white p-6 md:p-8 rounded-lg shadow-md mt-20 sm:mt-28">
      <div className="md:w-1/2 md:pr-8 md:ml-20 text-left md:text-left">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Características Destacadas</h2>
        <p className="text-secondary mb-4">
        Ideal para disfrutar a cualquier hora del día, perfecto para métodos de preparación como 
        la prensa francesa, el vertido manual y la cafetera de filtro.
        Nuestra presentación viene en paquetes de 500g, con válvula de frescura para mantener el aroma y sabor intactos.
        </p>
        <p className="text-secondary mb-1">
          1. Aroma Intenso y Complejo
        </p>
        <p className="text-secondary mb-1">          
          2. Acidez Brillante y Equilibrada
        </p>
        <p className="text-secondary mb-1">                    
          3. Cuerpo Pleno y Sedoso
        </p>
        <p className="text-secondary mb-1">
          4. Sabor Complejo y Sofisticado          
        </p>
        <p className="text-secondary mb-1">
          5. Final Largo y Agradable
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img 
          src={coffeeDetailImage} 
          alt="Coffee Detail" 
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default CoffeeDetails;
