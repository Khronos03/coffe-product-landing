import React from 'react';
import coffeeImage from "../coffe.jpg";

const ProductImage = () => {
  return (
    <div className="flex justify-center mt-24">
      <img
        src={coffeeImage}
        alt="Coffee Product"
        className="rounded-full border-secondary 
        shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        style={{
          width: '100%',     
          maxWidth: '50%',   
          height: 'auto'     
        }}
      />
    </div>
  );
};

export default ProductImage;
