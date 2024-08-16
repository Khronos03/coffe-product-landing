import React from "react";
import { FaFacebook, FaTiktok, FaInstagram, FaMailBulk } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="text-center">Siguenos en nuestras redes sociales</div>
      <div className="group flex-1 flex flex-row items-center justify-center text-center space-x-4 mt-2">
      <a href="https://wa.me/573216363596/?text=¡Hola! Me gustaría comprar café de especialidad." title="Ir" target="_blank">
          <IoLogoWhatsapp size={24} color="green" />
        </a>
        <a href="https://www.facebook.com/share/EbvUVP2UEw1mPXbG/?mibextid=qi2Omg" title="Seguir" target="_blank">
          <FaFacebook size={24} color="blue" />
        </a>
        <a href="https://www.instagram.com/cumbre.cafe" title="Seguir" target="_blank">
          <FaInstagram size={24} color="purple" />
        </a>
        <a href="https://www.tiktok.com/@cumbre.caf?_t=8ovh16QRai6&_r=1" title="Seguir" target="_blank">
          <FaTiktok size={24} color="white" />
        </a>
        <a href="mailto:cafesaboracampo@gmail.com">
          <FaMailBulk size={24} color="white" />
        </a>
      </div>
      <div className="text-center text-sm mt-4">
        Desarrollado con 🤎 por Jose Alexander Suaza M. &copy;
        {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
