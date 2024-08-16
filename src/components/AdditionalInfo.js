import React from 'react';
import backgroundImage from '../cultivador.jpg';

const AdditionalInfo = () => {
    return (
      <div
        className="w-full py-16 text-white bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(78, 52, 46, 0.8), rgba(78, 52, 46, 0.8)), url(${backgroundImage})`
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center md:text-left">Compromiso con la Calidad y la Sostenibilidad</h2>
          <p className="mb-6 text-left">
          Nos enorgullece trabajar con pequeños productores que practican métodos de cultivo sostenibles, respetando el medio ambiente y contribuyendo al bienestar de las comunidades locales. Cada compra de nuestro café de origen premium apoya estos esfuerzos y garantiza un producto de calidad.
          </p>
          <ul className="list-disc list-inside space-y-2 md:space-y-3">
            <li>Disfruta de un café aromático que deleitará tus sentidos con notas florales, frutales y especiadas.</li>
            <li>Experimenta una textura cremosa y rica que llena la boca con una sensación aterciopelada y persistente.</li>
            <li>Una danza de sabores perfectamente equilibrados. </li>
            <li>Saborea notas de chocolate oscuro, caramelo, miel, frutos secos y una variedad de frutas exóticas y bayas.</li>            
          </ul>
        </div>
      </div>
    );
  };
  
  export default AdditionalInfo;
