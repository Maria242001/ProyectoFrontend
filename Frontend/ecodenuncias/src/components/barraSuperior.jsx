import React from "react";
import "../styles/barraSuperior.css";
import logoTexto from "../assets/logo_texto.png"; // 🔹 Asegúrate que la ruta sea correcta

function BarraSuperior() {
  return (
    <header className="barra-superior">
      <div className="logo-container">
        <img src={logoTexto} alt="EcoDenuncias" className="logo-img" />
      
      </div>
    </header>
  );
}

export default BarraSuperior;
