import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importar para navegar
import "../../styles/busqueda.css";
import logo from "../../assets/logo.png";
import alarma from "../../assets/icons/alarma.png";

const Busqueda = () => {
  const navigate = useNavigate(); // 👈 Hook para redirigir a otras páginas

  // Estado para controlar si el menú desplegable está abierto o cerrado
  const [filtroAbierto, setFiltroAbierto] = useState(false);

  // Estado para manejar las opciones seleccionadas
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState({
    Fecha: false,
    Dependencia: true,
    Responsable: false,
    Delito: false,
    FechaFinal: false,
    Estado: false,
  });

  // Función para abrir/cerrar el menú de filtro
  const toggleFiltro = () => {
    setFiltroAbierto(!filtroAbierto);
  };

  // Función para manejar la selección de opciones
  const handleOpcionChange = (nombreOpcion) => {
    setOpcionesSeleccionadas((prev) => ({
      ...prev,
      [nombreOpcion]: !prev[nombreOpcion],
    }));
  };

  // Función del botón "Regresar"
  const handleRegresar = () => {
    navigate("/admin/denuncia-detalle"); // 👈 Lleva a la página DenunciaDetalle
  };

  // Opciones del filtro
  const opcionesFiltro = [
    "Fecha",
    "Dependencia",
    "Responsable",
    "Delito",
    "Fecha Final",
    "Estado",
  ];

  return (
    <div className="busqueda-page">
      {/* ---------- ENCABEZADO ---------- */}
      <div className="encabezado">
        <a
          href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=167988"
          target="_blank"
          className="link-ley"
          rel="noreferrer"
        >
          Ley 2111 de 2021
        </a>
        <img className="logo" src={logo} alt="Logo Eco_Denuncias" />
      </div>

      {/* ---------- TÍTULO ---------- */}
      <div className="titulo">
        <img className="icono-alarma" src={alarma} alt="Icono alarma" />
        <h1>DENUNCIAS</h1>
      </div>

      {/* ---------- CAJA PRINCIPAL ---------- */}
      <div className="caja-principal">
        <h2 className="titulo-caja">Búsqueda</h2>

        {/* ---------- Barra de búsqueda ---------- */}
        <div className="barra-busqueda">
          <input type="text" placeholder="Buscar..." />
          <button className="boton-buscar">
            <i className="fas fa-search"></i>
          </button>

          {/* ---------- FILTRO DESPLEGABLE ---------- */}
          <div className="filtro-dropdown">
            <button className="filtro-header" onClick={toggleFiltro}>
              <i className="fas fa-filter"></i> Filtrar por...
            </button>

            {filtroAbierto && (
              <div className="filtro-opciones">
                <p className="filtro-titulo">Filtrar por...</p>
                <hr className="filtro-separator" />
                {opcionesFiltro.map((opcion) => (
                  <label key={opcion} className="opcion-filtro-label">
                    <input
                      type="checkbox"
                      name={opcion.replace(" ", "")}
                      checked={opcionesSeleccionadas[opcion.replace(" ", "")]}
                      onChange={() => handleOpcionChange(opcion.replace(" ", ""))}
                    />
                    {opcion}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* ---------- BOTÓN REGRESAR ---------- */}
          <button className="boton-regresar" onClick={handleRegresar}>
            Regresar
          </button>
        </div>

        {/* ---------- TABLA DE DATOS ---------- */}
        <table className="tabla-denuncias">
          <thead>
            <tr>
              <th>Estado</th>
              <th>Delito</th>
              <th>Fecha Emisión</th>
              <th>Dependencia</th>
              <th>Responsable</th>
              <th>Fecha Final</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="estado en-tramite">En Trámite</td>
              <td>Tráfico de especies</td>
              <td>12/03/23 19:00</td>
              <td>Gestión Ambiental</td>
              <td>Carlos M. Rodríguez</td>
              <td>--------------</td>
            </tr>
            <tr>
              <td className="estado resuelta">Resuelta</td>
              <td>Pesca ilegal</td>
              <td>16/07/22 12:00</td>
              <td>Gestión Ambiental</td>
              <td>Juliana Vargas</td>
              <td>12/03/23 19:00</td>
            </tr>
            <tr>
              <td className="estado vencida">Vencida</td>
              <td>Deforestación</td>
              <td>05/04/24 09:45</td>
              <td>Gestión Ambiental</td>
              <td>María F. Rodríguez</td>
              <td>--------------</td>
            </tr>
            <tr>
              <td className="estado en-tramite">En Trámite</td>
              <td>Minería ilegal</td>
              <td>06/01/24 05:00</td>
              <td>Gestión Ambiental</td>
              <td>Pedro Sánchez Cruz</td>
              <td>--------------</td>
            </tr>
            <tr>
              <td className="estado resuelta">Resuelta</td>
              <td>Contaminación Auditiva</td>
              <td>16/08/24 20:00</td>
              <td>Gestión Ambiental</td>
              <td>María del Pilar Chanchi</td>
              <td>17/08/24 09:00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ---------- FRASE FINAL ---------- */}
      <footer className="frase-final">
        <p>“Cuidar el medio ambiente es valorar la vida”</p>
      </footer>
    </div>
  );
};

export default Busqueda;
