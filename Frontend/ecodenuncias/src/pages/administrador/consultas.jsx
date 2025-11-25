import React, { useMemo, useState } from "react";
import "../../styles/consultasAdmin.css";
import consIcon from "../../assets/icons/cons_icon.png";
import logo from "../../assets/logo_texto.png";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Consultas() {
  // Tipo principal (botones Denuncias / Solicitudes)
  const [tipo, setTipo] = useState("denuncias");

  // Estados de los filtros
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [territorial, setTerritorial] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estado, setEstado] = useState("");

  /* ============================
     Datos base (estructura JSON)
     - fecha en formato ISO "YYYY-MM-DD" para facilitar comparaciones
     - agrega/ajusta registros reales según necesites
     ============================ */
  const registros = [
    {
      radicado: "A-00000001",
      tipo: "Denuncia",
      categoria: "Trafico de especies",
      municipio: "Piendamó",
      territorial: "Centro",
      fecha: "2024-03-05",
      estado: "En Trámite",
      responsable: "Carlos M. Rodríguez",
    },
    {
      radicado: "S-00000001",
      tipo: "Solicitud",
      categoria: "Permiso de Vertimientos",
      municipio: "Piendamó",
      territorial: "Centro",
      fecha: "2024-03-09",
      estado: "Archivada",
      responsable: "Carlos M. Rodríguez",
    },
    {
      radicado: "A-00000003",
      tipo: "Denuncia",
      categoria: "Deforestacion",
      municipio: "Popayán",
      territorial: "Centro",
      fecha: "2023-01-09",
      estado: "Vencida",
      responsable: "María F. Rodríguez",
    },
    {
      radicado: "A-00000004",
      tipo: "Denuncia",
      categoria: "Contaminación",
      municipio: "Suárez",
      territorial: "Pacífico",
      fecha: "2023-02-15",
      estado: "En Trámite",
      responsable: "Luis A. Gómez",
    },
    {
      radicado: "S-00000005",
      tipo: "Solicitud",
      categoria: "Licencia Ambiental",
      municipio: "Rosas",
      territorial: "Macizo",
      fecha: "2023-02-20",
      estado: "Resuelta",
      responsable: "Ana M. Díaz",
    },
    {
      radicado: "A-00000006",
      tipo: "Denuncia",
      categoria: "Ruido Ambiental",
      municipio: "Timbío",
      territorial: "Macizo",
      fecha: "2023-02-22",
      estado: "Archivada",
      responsable: "David M. Castro",
    },
    {
      radicado: "S-00000007",
      tipo: "Solicitud",
      categoria: "Uso de Suelos",
      municipio: "Popayán",
      territorial: "Centro",
      fecha: "2023-03-05",
      estado: "En Trámite",
      responsable: "Camila H. Soto",
    },
    {
      radicado: "A-00000008",
      tipo: "Denuncia",
      categoria: "Basuras",
      municipio: "Piendamó",
      territorial: "Centro",
      fecha: "2023-03-07",
      estado: "Resuelta",
      responsable: "José L. Gutiérrez",
    },
    {
      radicado: "S-00000009",
      tipo: "Solicitud",
      categoria: "Visita Tecnica",
      municipio: "Suárez",
      territorial: "Pacífico",
      fecha: "2023-03-12",
      estado: "En Trámite",
      responsable: "Sofía M. Ortiz",
    },
    {
      radicado: "A-00000010",
      tipo: "Denuncia",
      categoria: "Vertimientos Ilegales",
      municipio: "Rosas",
      territorial: "Macizo",
      fecha: "2023-03-15",
      estado: "Resuelta",
      responsable: "Daniel T. Rojas",
    },
    {
      radicado: "A-00000011",
      tipo: "Denuncia",
      categoria: "Ruido Industrial",
      municipio: "Timbío",
      territorial: "Macizo",
      fecha: "2023-03-17",
      estado: "Archivada",
      responsable: "Carla G. Pérez",
    },
    {
      radicado: "S-00000012",
      tipo: "Solicitud",
      categoria: "Uso de suelos",
      municipio: "Popayán",
      territorial: "Centro",
      fecha: "2023-03-18",
      estado: "En Trámite",
      responsable: "Juan M. Hernández",
    },
    {
      radicado: "A-00000013",
      tipo: "Denuncia",
      categoria: "Deforestación",
      municipio: "Piendamó",
      territorial: "Centro",
      fecha: "2023-03-20",
      estado: "Resuelta",
      responsable: "Laura C. Núñez",
    },
    {
      radicado: "S-00000014",
      tipo: "Solicitud",
      categoria: "Control de Fauna",
      municipio: "Suárez",
      territorial: "Pacífico",
      fecha: "2023-03-21",
      estado: "Archivada",
      responsable: "María L. Gómez",
    },
    {
      radicado: "A-00000015",
      tipo: "Denuncia",
      categoria: "Contaminación Sonora",
      municipio: "Timbío",
      territorial: "Macizo",
      fecha: "2023-03-22",
      estado: "En Trámite",
      responsable: "Carlos J. Mejía",
    },
  ];

  /* ============================
     Valores de UI basados en datos
     (listas de territoriales y municipios disponibles)
     ============================ */
  const territorialesDisponibles = useMemo(() => {
    const setTerr = new Set(registros.map((r) => r.territorial));
    return ["", ...Array.from(setTerr)];
  }, [registros]);

  const municipiosDisponibles = useMemo(() => {
    const setMun = new Set(registros.map((r) => r.municipio));
    return ["", ...Array.from(setMun)];
  }, [registros]);

  /* ============================
     FILTRADO: aplica todos los filtros al conjunto de registros
     - tipo: si 'denuncias' -> solo 'Denuncia', si 'solicitudes' -> solo 'Solicitud'
     - fechas: compara por Date
     - territorial, municipio, estado: coincidencia exacta si se selecciona
     ============================ */
  const datosFiltrados = useMemo(() => {
    // convertimos fechas una sola vez
    const inicio = fechaInicio ? new Date(fechaInicio) : null;
    // Si fechaFin se selecciona la convertimos y la ajustamos para incluir el día completo
    const fin = fechaFin ? new Date(fechaFin + "T23:59:59") : null;

    return registros.filter((r) => {
      // filtro por tipo (botones)
      if (tipo === "denuncias" && r.tipo !== "Denuncia") return false;
      if (tipo === "solicitudes" && r.tipo !== "Solicitud") return false;

      // filtro territorial
      if (territorial && territorial !== "" && r.territorial !== territorial)
        return false;

      // filtro municipio
      if (municipio && municipio !== "" && r.municipio !== municipio) return false;

      // filtro estado
      if (estado && estado !== "" && r.estado !== estado) return false;

      // filtro fechas por campo fecha (ISO)
      if (inicio) {
        const fechaRegistro = new Date(r.fecha);
        if (fechaRegistro < inicio) return false;
      }
      if (fin) {
        const fechaRegistro = new Date(r.fecha);
        if (fechaRegistro > fin) return false;
      }

      return true;
    });
  }, [registros, tipo, territorial, municipio, estado, fechaInicio, fechaFin]);

  /* ============================
     ESTADÍSTICAS CALCULADAS desde datosFiltrados
     ============================ */
  const stats = useMemo(() => {
    const total = datosFiltrados.length;
    // activas: contamos los que tienen estado que contenga 'Trámite' / 'En Trámite' (ajustable)
    const activas = datosFiltrados.filter((d) =>
      /Trámite/i.test(d.estado)
    ).length;
    const archivadas = datosFiltrados.filter(
      (d) => /Archivad/i.test(d.estado) || /Archivada/i.test(d.estado)
    ).length;
    // promedio simple: ejemplo: promedio fijo basado en current mock (puedes calcular en base a tiempos reales)
    // Aquí solo calculamos un promedio de días entre fecha y hoy para demostración si quisieras
    let promedio = 0;
    if (total > 0) {
      // promedio = promedio de antigüedad en días (solo ejemplo)
      const hoy = new Date();
      const sumaDias = datosFiltrados.reduce((acc, cur) => {
        const diff = Math.abs((hoy - new Date(cur.fecha)) / (1000 * 60 * 60 * 24));
        return acc + diff;
      }, 0);
      promedio = Math.round(sumaDias / total);
    }

    return { total, activas, archivadas, promedio };
  }, [datosFiltrados]);

  /* ============================
     GRÁFICA: Flujo mensual calculado desde datosFiltrados
     ============================ */
  const flujoMensual = useMemo(() => {
    const meses = new Array(12).fill(0);
    datosFiltrados.forEach((d) => {
      const m = new Date(d.fecha).getMonth();
      meses[m] += 1;
    });
    return meses;
  }, [datosFiltrados]);

  const dataFlujo = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [
      {
        label: tipo === "denuncias" ? "Denuncias" : "Solicitudes",
        data: flujoMensual,
        backgroundColor:
          tipo === "denuncias"
            ? "rgba(76, 175, 80, 0.7)"
            : "rgba(139, 195, 74, 0.7)",
        borderRadius: 8,
      },
    ],
  };

  /* ============================
     GRÁFICA: Distribución por tipo (Denuncias / Solicitudes / Otros)
     - Nota: si el filtro 'tipo' está activo la gráfica reflejará ese filtro.
     ============================ */
  const dataDistribucion = useMemo(() => {
    const contDen = datosFiltrados.filter((d) => d.tipo === "Denuncia").length;
    const contSol = datosFiltrados.filter((d) => d.tipo === "Solicitud").length;
    const contOtros = Math.max(0, datosFiltrados.length - contDen - contSol);

    return {
      labels: ["Denuncias", "Solicitudes", "Otros"],
      datasets: [
        {
          data: [contDen, contSol, contOtros],
          backgroundColor: [
            "rgba(76, 175, 80, 0.8)",
            "rgba(139, 195, 74, 0.8)",
            "rgba(200, 230, 201, 0.8)",
          ],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    };
  }, [datosFiltrados]);

  /* ============================
     TABLAS MINI: agregados por Territorial y por Municipio
     calculamos DENUNCIAS y SOLICITUDES por territoral/municipio
     ============================ */
  const agregadosTerritorial = useMemo(() => {
    const map = {};
    registros.forEach((r) => {
      const key = r.territorial || "Sin Territorial";
      if (!map[key]) map[key] = { denuncia: 0, solicitud: 0 };
      if (r.tipo === "Denuncia") map[key].denuncia++;
      if (r.tipo === "Solicitud") map[key].solicitud++;
    });

    // Convertimos a array
    return Object.entries(map).map(([territorial, counts]) => ({
      territorial,
      denuncias: counts.denuncia,
      solicitudes: counts.solicitud,
    }));
  }, [registros]);

  // NOTA: para mostrar los mini-tablas *filtrados por los filtros actuales* (como pediste),
  // calculamos usando datosFiltrados:
  const agregadosTerritorialFiltrados = useMemo(() => {
    const map = {};
    datosFiltrados.forEach((r) => {
      const key = r.territorial || "Sin Territorial";
      if (!map[key]) map[key] = { denuncia: 0, solicitud: 0 };
      if (r.tipo === "Denuncia") map[key].denuncia++;
      if (r.tipo === "Solicitud") map[key].solicitud++;
    });
    return Object.entries(map).map(([territorial, counts]) => ({
      territorial,
      denuncias: counts.denuncia,
      solicitudes: counts.solicitud,
    }));
  }, [datosFiltrados]);

  const agregadosMunicipioFiltrados = useMemo(() => {
    const map = {};
    datosFiltrados.forEach((r) => {
      const key = r.municipio || "Sin Municipio";
      if (!map[key]) map[key] = { denuncia: 0, solicitud: 0 };
      if (r.tipo === "Denuncia") map[key].denuncia++;
      if (r.tipo === "Solicitud") map[key].solicitud++;
    });
    return Object.entries(map).map(([municipio, counts]) => ({
      municipio,
      denuncias: counts.denuncia,
      solicitudes: counts.solicitud,
    }));
  }, [datosFiltrados]);

  /* ============================
     Opciones de chart (puedes mantener las tuyas)
     ============================ */
  const optionsFlujo = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#2e5b27",
          font: { size: 11, family: "Poppins, sans-serif" },
        },
      },
      tooltip: {
        backgroundColor: "rgba(50, 90, 50, 0.9)",
        titleColor: "#fff",
        bodyColor: "#f6fff2",
        borderColor: "#a3d18d",
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: "#2e5b27", font: { size: 10 } },
      },
      y: {
        ticks: { color: "#2e5b27", font: { size: 10 } },
        grid: { color: "rgba(46,91,39,0.1)" },
      },
    },
  };

  const optionsDistribucion = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "#2e5b27",
          font: { size: 11, family: "Poppins, sans-serif" },
          padding: 10,
        },
      },
      tooltip: {
        backgroundColor: "rgba(50, 90, 50, 0.9)",
        titleColor: "#fff",
        bodyColor: "#f6fff2",
        borderColor: "#a3d18d",
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
  };

  /* ============================
     RENDER
     ============================ */
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

      {/* Logo superior */}
      <img src={logo} alt="Logo" className="logo-superior" />

      {/* Título */}
      <div className="consultas-titulo">
        <img src={consIcon} alt="icono consultas" className="consultas-icono" />
        <h1>CONSULTAS</h1>
      </div>

      <div className="consultas-container">
        <section className="consultas-filtros">
          <h3>Consulta y Análisis de Requerimientos</h3>

          <div className="filtros-grid">
            {/* Tipo */}
            <div>
              <label>Tipo</label>
              <div className="btn-group">
                <button
                  className={`btn btn-light btn-sm ${tipo === "denuncias" ? "active" : ""}`}
                  onClick={() => setTipo("denuncias")}
                >
                  Denuncia
                </button>
                <button
                  className={`btn btn-light btn-sm ${tipo === "solicitudes" ? "active" : ""}`}
                  onClick={() => setTipo("solicitudes")}
                >
                  Solicitud
                </button>
              </div>
            </div>

            {/* Fecha */}
            <div>
              <label>Fecha (Inicio - Fin)</label>
              <div className="d-flex gap-2">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>
            </div>

            {/* Territorial */}
            <div>
              <label>Territorial</label>
              <select
                className="form-select form-select-sm"
                value={territorial}
                onChange={(e) => setTerritorial(e.target.value)}
              >
                <option value="">Seleccione...</option>
                {territorialesDisponibles
                  .filter((t) => t !== "")
                  .map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
              </select>
            </div>

            {/* Municipio */}
            <div>
              <label>Municipio</label>
              <select
                className="form-select form-select-sm"
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
              >
                <option value="">Seleccione...</option>
                {municipiosDisponibles
                  .filter((m) => m !== "")
                  .map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
              </select>
            </div>

            {/* Estado */}
            <div>
              <label>Estado</label>
              <select
                className="form-select form-select-sm"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Seleccione...</option>
                {/* Lista dinámica de estados únicos */}
                {Array.from(new Set(registros.map((r) => r.estado))).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Estadísticas principales calculadas desde datosFiltrados */}
        <section className="consultas-stats">
          <div className="stat-card">
            <h5>Total Requerimientos</h5>
            <h2>{stats.total}</h2>
          </div>
          <div className="stat-card">
            <h5>{tipo === "denuncias" ? "Denuncias Activas" : "Solicitudes Activas"}</h5>
            <h2>{stats.activas}</h2>
          </div>
          <div className="stat-card">
            <h5>Archivados</h5>
            <h2>{stats.archivadas}</h2>
          </div>
          <div className="stat-card">
            <h5>Tiempo Promedio</h5>
            <h2>{stats.promedio} días</h2>
          </div>
        </section>

        {/* Gráficas y tablas pequeñas (se actualizan según filtros) */}
        <section className="consultas-graficos">
          <div className="grafico-card">
            <h6>Flujo mensual de Requerimientos</h6>
            <div className="chart-container">
              <Bar data={dataFlujo} options={optionsFlujo} />
            </div>
          </div>

          <div className="grafico-card">
            <h6>Distribución por tipo de requerimiento</h6>
            <div className="chart-container">
              <Doughnut data={dataDistribucion} options={optionsDistribucion} />
            </div>
          </div>

          <div className="tabla-card">
            <h6>Requerimiento por Territorial</h6>
            <table className="tabla-mini">
              <thead>
                <tr>
                  <th>TERRITORIAL</th>
                  <th>DENUNCIAS</th>
                  <th>SOLICITUDES</th>
                </tr>
              </thead>
              <tbody>
                {agregadosTerritorialFiltrados.length > 0 ? (
                  agregadosTerritorialFiltrados.map((row) => (
                    <tr key={row.territorial}>
                      <td>{row.territorial}</td>
                      <td>{row.denuncias}</td>
                      <td>{row.solicitudes}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      No hay datos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="tabla-card">
            <h6>Requerimiento por Municipio</h6>
            <table className="tabla-mini">
              <thead>
                <tr>
                  <th>MUNICIPIO</th>
                  <th>DENUNCIAS</th>
                  <th>SOLICITUDES</th>
                </tr>
              </thead>
              <tbody>
                {agregadosMunicipioFiltrados.length > 0 ? (
                  agregadosMunicipioFiltrados.map((row) => (
                    <tr key={row.municipio}>
                      <td>{row.municipio}</td>
                      <td>{row.denuncias}</td>
                      <td>{row.solicitudes}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      No hay datos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tabla de resultados (filtrada) */}
        <section className="consultas-tabla">
          <h6>Resultados</h6>

          <div className="tabla-scroll">
            <table className="tabla-resultados">
              <thead>
                <tr>
                  <th>RADICADO</th>
                  <th>TIPO</th>
                  <th>CATEGORÍA</th>
                  <th>MUNICIPIO</th>
                  <th>FECHA RECEPCIÓN</th>
                  <th>ESTADO</th>
                  <th>RESPONSABLE</th>
                </tr>
              </thead>
              <tbody>
                {datosFiltrados.length > 0 ? (
                  datosFiltrados.map((row, index) => (
                    <tr key={index}>
                      <td>{row.radicado}</td>
                      <td>{row.tipo}</td>
                      <td>{row.categoria}</td>
                      <td>{row.municipio}</td>
                      <td>
                        {new Date(row.fecha).toLocaleDateString("es-CO", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td>{row.estado}</td>
                      <td>{row.responsable}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">
                      No se encontraron resultados con los filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
