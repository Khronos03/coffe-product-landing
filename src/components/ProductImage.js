import React from 'react';
import coffeeImage from "../coffe.jpg";

const ProductImage = () => {
  return (
    <div className="flex justify-center my-8">
      <img
        src={coffeeImage}
        alt="Coffee Product"
        className="rounded-full border-secondary shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        style={{
          width: '100%',          // La imagen ocupará el 100% del contenedor
          maxWidth: '350px',      // Límite máximo para no exceder 350px
          height: 'auto'          // Altura automática para mantener la proporción
        }}
      />
    </div>
  );
};

export default ProductImage;
