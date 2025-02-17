import React from "react";
import Menu from "./components/Menu";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import AdditionalInfo from "./components/AdditionalInfo";
import ShoppingSection from "./components/ShoppingSection";
import Footer from "./components/Footer";
import CoffeeDetails from "./components/CoffeeDetails";

function App() {
  return (
    <div className="App bg-accent flex flex-col">
      <Menu />
      <div id="section1" className="flex-grow flex flex-col items-center">
        <ProductImage />
      </div>
      <div id="section2">
        <ProductInfo />
      </div>
      <div id="section3">
      <AdditionalInfo />
      </div>
      <Footer />
    </div>
  );
}

export default App;
