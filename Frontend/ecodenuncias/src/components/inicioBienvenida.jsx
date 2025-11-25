import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/inicioBienvenida.css";
import logoTexto from "../assets/logo_texto.png";

const InicioBienvenida = () => {
  return (
    <div className="fondo-container">

      {/* 🔹 Barra superior */}
      <div className="d-flex justify-content-between align-items-center p-3 barra-superior">
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
      <div className="container d-flex flex-column flex-md-row align-items-start justify-content-start gap-4 contenido">


        {/* 🔸 Lado izquierdo (LOGO) */}
        <div className="col-12 col-md-4 text-center text-md-start">
          <img
            src={logoTexto}
            alt="EcoDenuncias"
            className="logo logo-animado"
            onClick={(e) => {
              e.target.classList.toggle("activo");
            }}
          />
        </div>

        {/* 🔸 Lado derecho (CUADRO DE TEXTO) */}
        <div className="col-12 col-md-6">
          <div className="card bienvenida p-4 shadow-lg">
            <h2 className="text-center mb-3">¡Bienvenidos!</h2>

            <p>
              Nos complace enormemente contar con su participación activa en la
              protección de nuestro invaluable patrimonio natural.
            </p>
            <p>
              Esta plataforma ha sido diseñada como un espacio seguro y
              confidencial para que los ciudadanos como usted puedan reportar
              cualquier información de actividades que atenten contra el medio
              ambiente en nuestro departamento.
            </p>
            <p>
              Su reporte es fundamental para identificar y combatir flagelos como
              la deforestación, la contaminación ambiental, el tráfico de especies,
              la minería ilegal y cualquier otra acción que cause daño a nuestros
              ecosistemas.
            </p>
            <p>
              Le aseguramos que cada denuncia será tratada con la seriedad y la
              diligencia que merece, garantizando la confidencialidad de su
              identidad.
            </p>
            <p>
              Juntos, podemos marcar la diferencia y construir un futuro más
              sostenible para nuestro departamento.
            </p>

            <p className="text-center fw-semibold">
              ¡Gracias por unirse a esta importante causa!
            </p>
          </div>
        </div>
      </div>

      {/* 🔘 Botón debajo */}
      <div className="text-center mt-3">
        <Link
          to="/inicio"
          className="btn btn-success btn-ingresar px-5 py-2 rounded-pill"
        >
          INGRESAR
        </Link>
      </div>
    </div>
  );
};

export default InicioBienvenida;
