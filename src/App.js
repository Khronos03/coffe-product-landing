import React from 'react';
import Menu from './components/Menu';
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';
import AdditionalInfo from './components/AdditionalInfo';
import ShoppingSection from './components/ShoppingSection';
import Footer from './components/Footer';
import CoffeeDetails from './components/CoffeeDetails';

function App() {
  return (
    <div className="App bg-accent flex flex-col">
      <Menu />
      <div className="flex-grow flex flex-col items-center">
        <ProductImage />
        <ProductInfo />
      </div>
      <div id="section1" className="my-16">
        <AdditionalInfo />
      </div>
      <div id='section2'>
      <CoffeeDetails />
      </div>      
      <div id='section3'>
      <ShoppingSection />
      </div>
      <Footer />
    </div>
  );
}

export default App;
