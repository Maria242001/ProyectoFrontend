import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/denunciaDetalle.css";
import logo from "../../assets/logo.png";
import alarma from "../../assets/icons/alarma.png";

const DenunciaDetalle = () => {

  const { radicado } = useParams(); 

  const navigate = useNavigate();

  // 📦 Estado para adjuntos y actividades
  const [adjuntos, setAdjuntos] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState("");
  const [actividades, setActividades] = useState([]);

  // 📎 Función para agregar adjuntos
  const manejarAdjunto = (e) => {
    const archivos = Array.from(e.target.files);
    setAdjuntos([...adjuntos, ...archivos.map((a) => a.name)]);
  };

  // 📝 Función para agregar una nueva actividad
  const agregarActividad = () => {
    if (nuevaActividad.trim() !== "") {
      setActividades([...actividades, nuevaActividad]);
      setNuevaActividad("");
    } else {
      alert("Por favor escribe una actividad antes de agregarla.");
    }
  };

  // 🔙 Función para regresar al listado
  const regresar = () => {
    navigate("/admin/listado-denuncia");
  };

  return (
    <div className="detalle-container">
      {/* Header */}
      <header className="detalle-header">
        <a href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=167988"
          target="_blank"
          className="link-ley">
          Ley 2111 de 2021
        </a>
        <img src={logo} alt="EcoDenuncias Logo" className="logo" />
      </header>

      {/* Contenido principal */}
      <main className="detalle-main">
        <div className="titulo-contenedor">
          <img className="icono-alarma" src={alarma} alt="alarma icono" />
          <h1>DENUNCIA</h1>
        </div>

        <div className="detalle-box">
          <h2>Detalles</h2>

          <div className="detalle-content">
            {/* Columna izquierda */}
            <div className="columna-izquierda">
              <div className="card">
                <h3>Estado</h3>
                <p className="estado"></p>
                <h3>Denunciante</h3>
                <p></p>
                <h3>Días abierta</h3>
                <p></p>
                <h3>Responsable</h3>
                <p></p>
                <small>Última actualización: </small>
              </div>

              {/* Adjuntos */}
              <div className="card">
                <h3>Adjuntos</h3>
                {adjuntos.length > 0 ? (
                  <ul>
                    {adjuntos.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No hay archivos adjuntos</p>
                )}
                <input
                  type="file"
                  id="inputAdjunto"
                  multiple
                  style={{ display: "none" }}
                  onChange={manejarAdjunto}
                />
                <button
                  className="btn-adjuntar"
                  onClick={() => document.getElementById("inputAdjunto").click()}
                >
                  Adjuntar
                </button>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="columna-derecha">
              <div className="card">
                <div className="radicado-header">
                  <h3>Radicado</h3>
                  <span className="codigo">{radicado}</span>
                </div>

                <p><strong>Fecha:</strong> </p>
                <p><strong>Delito:</strong> </p>
                <p><strong>Lugar de los Hechos:</strong> </p>
                <p><strong>Hecho:</strong></p>
                <textarea
                  readOnly
                  value=""
                />
              </div>

              {/* Actividades */}
              <div className="card">
                <h3>Actividades Realizadas</h3>
                <ul>
                  {actividades.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>

                <textarea
                  value={nuevaActividad}
                  onChange={(e) => setNuevaActividad(e.target.value)}
                  placeholder="Escribe una nueva actividad..."
                />
                <button className="btn-agregar" onClick={agregarActividad}>
                  Agregar
                </button>
              </div>

              {/* Botón regresar */}
              <button className="btn-regresar" onClick={regresar}>
                Regresar
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="detalle-footer">
        <p>"Cuidar el medio ambiente es valorar la vida"</p>
      </footer>
    </div>
  );
};

export default DenunciaDetalle;
