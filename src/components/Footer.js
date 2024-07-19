import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">      
      <div className="text-center">
        &copy; {new Date().getFullYear()} With 🤎 by Jose Alexander Suaza M.
      </div>
    </footer>
  );
};

export default Footer;
