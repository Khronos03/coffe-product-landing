import React from 'react';
import coffeeImage from "../coffe.jpg";

const ProductImage = () => {
  return (
    <div className="flex justify-center my-8">
      <img
        src={coffeeImage}
        alt="Coffee Product"
        className="rounded-full border-secondary shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        style={{ width: '350px', height: '350px' }}
      />
    </div>
  );
};

export default ProductImage;
