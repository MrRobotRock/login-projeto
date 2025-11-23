import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      if (e.clientY <= 70) {
        setHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${hidden ? "navbar_hidden" : ""}`}>
      <div className="navbar_left">
        <div className="navbar_logo">Logo</div>
      </div>

      <div className="navbar_center">
        <ul className="navbar_links">
          <li><a href="/home">Início</a></li>
          <li><a href="#Imagens">Imagens</a></li>
          <li><a href="#Fale conosco">Fale conosco</a></li>
        </ul>
      </div>

      <div className="navbar_right">
        <button
          className="navbar_button"
          onClick={() => navigate("/login")}
        >
          Login/Cadastro
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
