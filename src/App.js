import React from "react";
import Menu from "./components/Menu";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import AdditionalInfo from "./components/AdditionalInfo";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App flex flex-col">
      <Menu />
      <div id="section1" className="flex-grow flex flex-col items-center">
        <ProductImage />
      </div>
      <div id="section2">
        <ProductInfo />
      </div>
      <div id="section3">
      <AboutUs />
      </div>
      <div id="section4">
      <AdditionalInfo />
      </div>
      <Footer />
    </div>
  );
}

export default App;
