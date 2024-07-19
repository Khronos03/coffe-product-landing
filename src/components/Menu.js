import React from 'react';

const Menu = () => {
  return (
    <nav className="flex justify-center bg-primary p-4 rounded-t-lg rounded-b-lg">
      <a href="#menu1" className="mx-4 text-accent rounded px-2 py-1 hover:bg-secondary">MENU 1</a>
      <a href="#menu2" className="mx-4 text-accent rounded px-2 py-1 hover:bg-secondary">MENU 2</a>
      <a href="#menu3" className="mx-4 text-accent rounded px-2 py-1 hover:bg-secondary">MENU 3</a>
    </nav>
  );
};

export default Menu;
