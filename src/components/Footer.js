import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <p>Email: contact@coffee.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Additional Links</h3>
          <ul>
            <li><a href="#menu1" className="hover:underline">Menu 1</a></li>
            <li><a href="#menu2" className="hover:underline">Menu 2</a></li>
            <li><a href="#menu3" className="hover:underline">Menu 3</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        &copy; {new Date().getFullYear()} With 🤎 by Jose Alexander Suaza M.
      </div>
    </footer>
  );
};

export default Footer;
