import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-3 bg-[#023E8A] text-white mb-20">
      <a href="/dashboard" className="text-lg font-bold">
        Hjem
      </a>
      <a href="/" className="text-lg font-bold">
        Logg ut
      </a>
    </nav>
  );
};

export default Navbar;  
