import React from "react";
import Sidebar from "../../components/sidebar";
import "../../styles/solicitudesAdmin.css";
import consIcon from "../../assets/icons/soli_icon.png";
import soliIcon from "../../assets/icons/icono_solicitud.png";
import resulIcon from "../../assets/icons/icono_resuelta.png";
import tramIcon from "../../assets/icons/icono_tramite.png";
import venIcon from "../../assets/icons/icono_vencido.png";
import logo from "../../assets/logo_texto.png";
import { useNavigate } from "react-router-dom";



// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// ----  Gráfica ----
const data = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
  datasets: [
    {
      label: "Solicitudes",
      data: [25, 40, 35, 50, 65, 70],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4,
    },
  ],
};



const options = {
  responsive: true,
  scales: {
    y: { beginAtZero: true },
  },
};


// ---- Componente ----
const SolicitudesAdmin = () => {
  const navigate = useNavigate();
  return (

  <>  
   {/* Enlace fuera del contenedor principal */}
      <div className="consultas-ley">
        <a
          href="/docs/ley-2111-2021.pdf"
          className="ley-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ley 2111 de 2021
        </a>
      </div>
    <div className="sol-container">

  {/* === Logo fuera del contenedor, esquina superior derecha === */}
      <img src={logo} alt="Logo" className="logo-superior" />

 {/* Título fuera del contenedor */}
      <div className="consultas-titulo">
        <img src={consIcon} alt="icono consultas" className="consultas-icono" />
        <h1>SOLICITUDES</h1>
      </div>

  {/* TARJETAS */}
  <div className="sol-cards">

    <div className="sol-card" onClick={() => navigate("/admin/listado-solicitudes")} style={{ cursor: 'pointer' }}>
      <div className="sol-icon-box">
        <img src= {soliIcon} className="sol-icon" />
      </div>
      <div className="sol-info">
        <p className="sol-label">SOLICITUDES</p>
        <p className="sol-number">150</p>
      </div>
    </div>

    <div className="sol-card">
      <div className="sol-icon-box">
        <img src={resulIcon} className="sol-icon" />
      </div>
      <div className="sol-info">
        <p className="sol-label">RESUELTAS</p>
        <p className="sol-number">98</p>
      </div>
    </div>

    <div className="sol-card">
      <div className="sol-icon-box">
        <img src={tramIcon} className="sol-icon" />
      </div>
      <div className="sol-info">
        <p className="sol-label">EN TRÁMITE</p>
        <p className="sol-number">12</p>
      </div>
    </div>

    <div className="sol-card">
      <div className="sol-icon-box">
        <img src={venIcon} className="sol-icon" />
      </div>
      <div className="sol-info">
        <p className="sol-label">VENCIDAS</p>
        <p className="sol-number">04</p>
      </div>
    </div>

  </div>

  {/* MAPA + GRÁFICO */}
  <div className="sol-bottom">

    <div className="sol-map">
      <MapContainer
        center={[4.710989, -74.07209]}
        zoom={11}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[4.710989, -74.07209]}>
          <Popup>Bogotá</Popup>
        </Marker>
      </MapContainer>
    </div>

    <div className="sol-chart">
      <h2>PRIMER SEMESTRE 2024</h2>
      <Line data={data} options={options} />
    </div>

  </div>

</div>

   </> 
  );
};

export default SolicitudesAdmin;
