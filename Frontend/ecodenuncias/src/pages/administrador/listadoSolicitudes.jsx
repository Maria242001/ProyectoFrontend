import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/listadoSolicitudes.css";
import HomeAdmin from "../../components/sidebar.jsx";   // <-- TU BARRA

const ListadoSolicitudes = () => {
  const navigate = useNavigate();

  return (
    <div className="layout-admin">

      {/* BARRA LATERAL */}
      <HomeAdmin />

      {/* CONTENIDO PRINCIPAL */}
      <div className="contenedor-listado">

        {/* Panel izquierdo */}
        <div className="left-panel">
          <button className="btn-regresar" onClick={() => navigate(-1)}>
            Regresar
          </button>

          <input
            type="text"
            placeholder="Buscar..."
            className="input-buscar"
          />
        </div>

        {/* Panel central */}
        <div className="center-panel">
          <h2>Listado de Solicitudes</h2>

          <table className="tabla-solicitudes">
            <thead>
              <tr>
                <th>N°</th>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>001</td>
                <td>2024-01-15</td>
                <td>Ana Torres</td>
                <td>Ambiental</td>
                <td><span className="estado resuelto">Resuelto</span></td>
                <td>
                  <button className="btn-detalle">Ver</button>
                </td>
              </tr>

              <tr>
                <td>002</td>
                <td>2024-02-03</td>
                <td>Jorge Pérez</td>
                <td>Queja</td>
                <td><span className="estado tramite">En trámite</span></td>
                <td>
                  <button className="btn-detalle">Ver</button>
                </td>
              </tr>

              <tr>
                <td>003</td>
                <td>2024-02-10</td>
                <td>Luisa Gómez</td>
                <td>Solicitud</td>
                <td><span className="estado vencido">Vencido</span></td>
                <td>
                  <button className="btn-detalle">Ver</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Panel derecho */}
        <div className="right-panel"></div>

      </div>
    </div>
  );
};

export default ListadoSolicitudes;
