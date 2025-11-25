import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/radicadoSolicitud.css";
import BarraSuperior from "../components/barraSuperior";
import { useNavigate } from "react-router-dom"; 




const SolicitudRadicada = () => {
  const navigate = useNavigate(); // ➤ Hook para navegar

  const numeroRadicado = ""; // luego lo reemplazas con el real

  // Función del botón
  const handleFinish = () => {
    navigate("/inicio"); 
  };

  return (
    <div className="solicitud-container">
      <BarraSuperior />
      
      <div className="card radicado-card p-4 shadow">
        <h2 className="text-center fw-bold">
          Tu Solicitud fue <br /> Radicada
        </h2>

        <h3 className="text-center fw-bold mt-3">
          {numeroRadicado}
        </h3>

        <p className="mt-3 text-center px-2">
          Tu solicitud fue radicada con éxito<br />
          Se envió comprobante al correo ********@gmail.com.<br />
          Conserva este número de radicado, con el cual puedes hacer seguimiento.
          Gracias por contribuir a proteger el medio ambiente.
        </p>

        <div className="text-center mt-4">
          <button
            className="btn btn-success px-4 rounded-3"
            onClick={handleFinish}   // ➤ Evento del botón
          >
            Finalizar
          </button>
        </div>
      </div>

      <p className="frase-eco">
        “Cuidar el medio ambiente es valorar la vida”
      </p>
    </div>
  );
};

export default SolicitudRadicada;
