import React from "react";
import Sidebar from "../../components/sidebar"; // Asegúrate de que la ruta coincida
import fondo from "../../assets/fondo.png";
import logo from "../../assets/logo_texto.png";
import "../../styles/homeAdmin.css";
import { Modal, Button } from "react-bootstrap";   // IGNORE

export default function Home() {
  const user = { username: "ANDRES13" };

  const handleLogout = () => {
    console.log("Cerrar sesión...");
  };

  return (
 
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden",
      }}
    >
  

      <Sidebar user={user} onLogout={handleLogout} />

      {/*logo centrado*/}
      <div className="logo-content">
        <img src={logo} alt="Logo EcoDenuncias" className="home-logo" />
      </div>
      
    </div>
  );
}
