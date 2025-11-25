import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/inicio.css";
import logo from "../assets/logo_texto.png";  // ← tu logo nuevo
import consultaIcon from "../assets/icons/consulta.png";
import solicitudIcon from "../assets/icons/solicitud.png";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div className="inicio-container">

      {/* 🔹 Barra superior */}
      <div className="barra-superior">
        <a
          href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=167988"
          target="_blank"
          rel="noopener noreferrer"
          className="ley-text text-decoration-none fw-bold"
        >
          Ley 2111 de 2021
        </a>
      </div>

      {/* 🔹 Contenido principal */}
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between contenido">

        {/* 🟢 LOGO Y SLOGAN */}
        <div className="logo-section">
          <img
          
            src={logo}
            alt="EcoDenuncias"
            className="logo-img"
            onClick={(e) => e.target.classList.toggle("activo")}
          />
 
        </div>

        {/* 🟢 TARJETAS */}
        <div className="cards-container d-flex flex-column flex-md-row gap-4">
          <Link to="/consulta" className="boton-card text-center text-decoration-none">
            <img src={consultaIcon} alt="Consultas" className="icono-card" />
            <h5>Consultas</h5>
          </Link>

          <Link to="/menu-solicitud" className="boton-card text-center text-decoration-none">
            <img src={solicitudIcon} alt="Solicitudes" className="icono-card" />
            <h5>Solicitudes</h5>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Inicio;
