import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/denuncia.css";

// Íconos
import logo from "../../assets/logo.png";
import alarma from "../../assets/icons/alarma.png";
import denunciaIcon from "../../assets/icons/denuncia.png";
import resueltaIcon from "../../assets/icons/resuelta.png";
import tramiteIcon from "../../assets/icons/tramite.png";
import vencidaIcon from "../../assets/icons/vencida.png";

const Denuncia = () => {
  const navigate = useNavigate();

  const tarjetas = [
    {
      titulo: "DENUNCIAS",
      icono: denunciaIcon,
      colorClass: "custom-card-total",
      onClick: () => navigate("/admin/listado-denuncia"),
      clickable: true,
    },
    {
      titulo: "RESUELTAS",
      icono: resueltaIcon,
      colorClass: "custom-card-resueltas",
    },
    {
      titulo: "EN TRÁMITE",
      icono: tramiteIcon,
      colorClass: "custom-card-tramite",
    },
    {
      titulo: "VENCIDAS",
      icono: vencidaIcon,
      colorClass: "custom-card-vencidas",
    },
  ];

  return (
    <div className="detalle-container">

      {/* Encabezado */}
      <header className="detalle-header d-flex justify-content-between align-items-center w-100 px-5">
        <a
          href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=167988"
          target="_blank"
          className="link-ley"
        >
          Ley 2111 de 2021
        </a>

        <img src={logo} alt="Eco Denuncias Logo" className="logo" />
      </header>

      {/* Título */}
      <div className="titulo-container">
        <img src={alarma} alt="Icono Alarma" className="icono-alarma" />
        <h1 className="titulo-izquierda">DENUNCIAS</h1>
      </div>

      {/* TARJETAS */}
      <div className="row mt-4 justify-content-center">

        {tarjetas.map((t, i) => (
          <div className="col-3" key={i}>
            <div
              className={`card p-3 shadow-sm d-flex flex-row align-items-center ${t.colorClass}`}
              style={{ cursor: t.clickable ? "pointer" : "default" }}
              onClick={t.onClick}
            >
              <div className="icon-box me-3">
                <img src={t.icono} alt={t.titulo} width={28} height={28} />
              </div>

              <div className="text-start">
                <p className="mb-0 fw-bold">{t.titulo}</p>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Gráficas / mapa */}
      <div className="contenedor-analitica">
        <div className="analitica-wrapper d-flex align-items-center justify-content-evenly">
          <div className="mapa">
            <img src={logo} alt="Mapa" />
          </div>
          <div className="grafica">
            <img src={logo} alt="Gráfica" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="lema">
        "Cuidar el medio ambiente es valorar la vida"
      </footer>
    </div>
  );
};

export default Denuncia;
