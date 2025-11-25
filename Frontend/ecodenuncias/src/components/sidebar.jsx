import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Íconos
import denIcon from "../assets/icons/den_icon.png";
import soliIcon from "../assets/icons/soli_icon.png";
import consIcon from "../assets/icons/cons_icon.png";
import funcIcon from "../assets/icons/func_icon.png";
import userIcon from "../assets/icons/avatar.png";

export default function Sidebar() {
  return (
    <div className="eco-sidebar">
      <div className="sidebar-menu">
        <div className="menu-item active">
          <Link to="/" className="menu-link">
            <span>INICIO</span>
          </Link>
        </div>

        {/* ✅ Denuncias con enlace funcional */}
        <div className="menu-item">
          <Link to="/admin/denuncia" className="menu-link">
            <img src={denIcon} alt="Denuncias" className="menu-icon" />
            <span>DENUNCIAS</span>
          </Link>
        </div>

        {/* ✅ Solicitudes con enlace funcional */}
        <div className="menu-item">
          <Link to="/admin/solicitudes" className="menu-link">
            <img src={soliIcon} alt="Solicitudes" className="menu-icon" />
            <span>SOLICITUDES</span>
          </Link>
        </div>

        {/* ✅ Consultas con enlace funcional */}
        <div className="menu-item">
          <Link to="admin/consulta-admin" className="menu-link">
            <img src={consIcon} alt="Consultas" className="menu-icon" />
            <span>CONSULTAS</span>
          </Link>
        </div>

        {/* ✅ Funcionario con enlace funcional */}
        <div className="menu-item">
          <Link to="/funcionario/denuncias" className="menu-link">
            <img src={funcIcon} alt="Funcionario" className="menu-icon" />
            <span>FUNCIONARIO</span>
          </Link>
        </div>
      </div>

      <div className="sidebar-footer">
        <img src={userIcon} alt="Usuario" className="menu-icon" />
        <p className="username"></p>
        <button className="btn-logout">CERRAR SESIÓN</button>
      </div>
    </div>
  );
}
