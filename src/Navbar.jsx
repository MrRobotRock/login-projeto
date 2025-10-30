import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        
        setHidden(false);
      } else if (window.scrollY > lastScrollY) {
      
        setHidden(true);
      } else {
       
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      
      <div
        className="top_hover_area"
        onMouseEnter={() => setHidden(false)} 
      ></div>

      <nav
        className={`navbar ${hidden ? "navbar_hidden" : ""}`}
        onMouseLeave={() => {
        
          if (window.scrollY > 0) setHidden(true);
        }}
      >
        <div className="navbar_logo">Logo</div>
        <ul className="navbar_links">
          <li><a href="#">Início</a></li>
          <li><a href="#">Serviços</a></li>
          <li><a href="#">Portfólio</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
