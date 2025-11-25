import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/listadoDenuncia.css";
import logo from "../../assets/logo.png";
import alarma from "../../assets/icons/alarma.png";
import fondo from "../../assets/fondo.png";

function ListadoDenuncia() {
  const navigate = useNavigate();

  // 🔹 Lista simulada de denuncias
  const [denuncias] = useState([
    {
      radicado: "DEN-001",
      fecha: "2025-10-01",
      denunciante: "Carlos Pérez",
      municipio: "Popayán",
      estado: "En proceso",
      dias: 12,
      actualizacion: "2025-10-10",
    },
    {
      radicado: "DEN-002",
      fecha: "2025-09-25",
      denunciante: "Ana Gómez",
      municipio: "Cajibío",
      estado: "Finalizada",
      dias: 30,
      actualizacion: "2025-10-05",
    },
    {
      radicado: "DEN-003",
      fecha: "2025-10-05",
      denunciante: "María Ruiz",
      municipio: "Santander de Quilichao",
      estado: "Pendiente",
      dias: 5,
      actualizacion: "2025-10-07",
    },
  ]);

  // 🔹 Estado para la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // 🔹 Filtrar las denuncias según la búsqueda
  const filtradas = denuncias.filter((d) => {
    const texto = busqueda.toLowerCase();

    return (
      d.radicado.toLowerCase().includes(texto) ||
      d.denunciante.toLowerCase().includes(texto) ||
      d.municipio.toLowerCase().includes(texto) ||
      d.estado.toLowerCase().includes(texto) ||
      d.fecha.includes(texto) // 🔥 Se agregó búsqueda por fecha
    );
  });

  // 🔹 Función para ir al detalle
  const verDetalle = (radicado) => {
    navigate(`/admin/denuncia-detalle/${radicado}`);
  };


  // 🔹 Función para regresar a la página principal
  const regresar = () => {
    navigate("/"); // Va a la ruta principal (Denuncia)
  };

  return (
    <div
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#333",
      }}
      className="p-3"
    >
      {/* Ley */}
      <a href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=167988"
        target="_blank"
        className="link-ley">
        Ley 2111 de 2021
      </a>

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="titulo-principal d-flex align-items-center text-success fw-bold">
          <img className="icono-alarma" src={alarma} alt="alarma icono" />
          DENUNCIAS
        </h1>
        <img
          src={logo}
          alt="logo"
          style={{ height: "80px", filter: "drop-shadow(0 0 5px #000)" }}
        />
      </div>

      {/* Contenedor principal */}
      <div
        className="container mt-4"
        style={{
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(8px)",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-semibold text-success">Listado de Denuncias</h4>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={regresar}
          >
            <i className="bi bi-arrow-left"></i> Regresar
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="d-flex gap-2 mb-3">

          {/* 🔍 Campo de búsqueda con icono */}
          <div className="input-group buscador">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <span className="input-group-text icono-buscar">
              <i className="bi bi-search"></i>
            </span>
          </div>

          {/* 🔽 Dropdown de filtros */}
          <select className="form-select filtro-select">
            <option value="">Todos</option>
            <option value="fecha">Fecha</option>
            <option value="dependencia">Municipio</option>
            <option value="estado">Estado</option>
          </select>

        </div>


        {/* Tabla */}
        <div className="table-responsive">
          <table className="denuncias-table table table-hover">
            <thead className="table-success">
              <tr>
                <th>RADICADO</th>
                <th>FECHA</th>
                <th>DENUNCIANTE</th>
                <th>MUNICIPIO</th>
                <th>ESTADO</th>
                <th>DÍAS ABIERTA</th>
                <th>ÚLTIMA ACTUALIZACIÓN</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.length > 0 ? (
                filtradas.map((d, i) => (
                  <tr key={i}>
                    <td>{d.radicado}</td>
                    <td>{d.fecha}</td>
                    <td>{d.denunciante}</td>
                    <td>{d.municipio}</td>
                    <td>
                      <span
                        className={
                          d.estado === "Finalizada"
                            ? "estado-finalizada"
                            : d.estado === "Pendiente"
                              ? "estado-pendiente"
                              : "estado-proceso"
                        }
                      >
                        {d.estado}
                      </span>
                    </td>

                    <td>{d.dias}</td>
                    <td>{d.actualizacion}</td>
                    <td>
                      <Link
                        to={`/admin/denuncia-detalle/${d.radicado}`} className="btn btn-info btn-sm">
                        <i className="bi bi-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No se encontraron denuncias
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Frase inferior */}
      <div
        className="lema"
        style={{
          position: "fixed",
          bottom: 0,
          left: "20px",
          textShadow: "2px 2px 4px #000",
          fontFamily: "'Just Another Hand', cursive",
        }}
      >
        “Cuidar el medio ambiente es valorar la vida”
      </div>
    </div>
  );
}

export default ListadoDenuncia;
