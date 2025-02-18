import React from 'react';
import backgroundImage from '../cultivador.jpg';

const AdditionalInfo = () => {
    return (
        <div
            className="w-full py-20 text-white bg-cover bg-center bg-fixed flex justify-center items-center"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(78, 52, 46, 0.8)), url(${backgroundImage})`
            }}
        >
            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 shadow-lg">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
                    Compromiso con la Calidad y la Sostenibilidad
                </h2>
                <p className="mb-6 text-lg text-white leading-relaxed drop-shadow-md text-center">
                    Somos una familia de caficultores, practicamos métodos de cultivo sostenibles, respetando el medio ambiente y contribuyendo al bienestar de las comunidades locales. Cada compra de nuestro Café de Origen apoya estos esfuerzos y garantiza un producto de calidad.
                </p>
                <ul className="list-disc list-inside space-y-4 text-lg text-white drop-shadow-md">
                    <li>☕ Disfruta de un café aromático con notas florales y frutales.</li>
                    <li>🥄 Experimenta una textura cremosa y rica con una sensación aterciopelada.</li>
                    <li>🌱 Una danza de sabores perfectamente equilibrados.</li>
                    <li>🍫 Saborea notas de chocolate, caramelo, miel y frutos secos.</li>
                </ul>
            </div>
        </div>
    );
};

export default AdditionalInfo;
