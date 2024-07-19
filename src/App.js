import React from 'react';
import Menu from './components/Menu';
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';
import AdditionalInfo from './components/AdditionalInfo';
import ShoppingSection from './components/ShoppingSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg-accent min-h-screen flex flex-col">
      <Menu />
      <div className="flex-grow flex flex-col justify-center items-center min-h-screen">
        <ProductImage />
        <ProductInfo />
      </div>
      <div className="my-16">
        <AdditionalInfo />
      </div>      
      <ShoppingSection />
      <Footer />
    </div>
  );
}

export default App;
