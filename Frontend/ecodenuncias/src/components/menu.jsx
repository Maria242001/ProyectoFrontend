import React, { useState } from "react";
import "../styles/menu.css";
import { useNavigate } from "react-router-dom"; // ✅ Importar hook para navegar

import licencia from "../assets/icons/licencia.png";
import forestal from "../assets/icons/forestal.png";
import aguas from "../assets/icons/agua.png";
import vertimientos from "../assets/icons/vertimiento.png";
import cauces from "../assets/icons/cauces.png";
import fondo from "../assets/fondo.png";

import BarraSuperior from "./barraSuperior.jsx";

const solicitudes = [
  {
    titulo: "Licencia ambiental",
    icono: licencia,
    texto:
      "Autorización para la ejecución de proyectos u obras con impacto ambiental significativo.",
    requisitos: "• Certificado de intersección\n• Estudio de Impacto Ambiental (EIA)\n• Documentación del proyecto",
  },
  {
    titulo: "Aprovechamiento Forestal",
    icono: forestal,
    texto: "Permiso para uso de bosques naturales con criterios de sostenibilidad.",
    requisitos: "• Plano de ubicación\n• Autorización de uso del predio\n• Inventario forestal",
  },
  {
    titulo: "Concesión de Aguas",
    icono: aguas,
    texto: "Permiso para uso de aguas superficiales o subterráneas.",
    requisitos: "• Estudio hídrico\n• Plano topográfico\n• Justificación del uso",
  },
  {
    titulo: "Permiso de Vertimientos",
    icono: vertimientos,
    texto: "Autorización para descargar residuos líquidos en cuerpos de agua.",
    requisitos: "• Análisis fisicoquímicos\n• Plan de manejo\n• Registro del vertimiento",
  },
  {
    titulo: "Ocupación de Cauces",
    icono: cauces,
    texto: "Permite usar el lecho o ribera de cauce público.",
    requisitos: "• Estudio hidráulico\n• Diseño de obra\n• Licencia de construcción",
  },
];

export default function MenuSolicitudes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [requisitosTexto, setRequisitosTexto] = useState("");

  const navigate = useNavigate(); // ✅ Hook para redirigir

  const abrirModal = (texto) => {
    setRequisitosTexto(texto);
    setModalOpen(true);
  };

  return (
    <div
      className="solicitudes-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <BarraSuperior />

      <div className="cards-grid">
        {solicitudes.map((sol, i) => (
          <div key={i} className="card-solicitud">
            <img src={sol.icono} className="icono-solicitud" alt="" />
            <h3>{sol.titulo}</h3>
            <p>{sol.texto}</p>

            <div className="botones">
              <button
                className="btn-requisitos"
                onClick={() => abrirModal(sol.requisitos)}
              >
                Requisitos
              </button>

              {/* ✅ Redirección al formulario de solicitudes */}
              <button
                className="btn-solicitar"
                onClick={() => navigate("/solicitud")}
              >
                Solicitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="frase-final">
        “Cuidar el medio ambiente es valorar la vida”
      </p>

      {/* ✅ Modal de requisitos */}
      {modalOpen && (
        <div className="modal-bg" onClick={() => setModalOpen(false)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <h4>Requisitos</h4>
            <pre>{requisitosTexto}</pre>
            <button
              className="btn-cerrar"
              onClick={() => setModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
