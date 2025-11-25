import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/Asignadas.css";

import fondoUrl from "../../assets/fondo.png";
import logo from "../../assets/logo.png";
import iconoFuncionario from "../../assets/icons/funcionario.png";


const Asignadas = () => {
    const navigate = useNavigate();

    // 🔹 Estados
    const [busqueda, setBusqueda] = useState("");
    const [filtroAbierto, setFiltroAbierto] = useState(false);
    const [filtros, setFiltros] = useState({
        fecha: false,
        requerimiento: false,
        denuncia: false,
        solicitud: false,
        municipio: false,
        estado: false,
        radicado: false,
    });

    // 🔹 Manejadores
    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const toggleFiltro = () => {
        setFiltroAbierto(!filtroAbierto);
    };

    const handleFiltroChange = (e) => {
        const { name, checked } = e.target;
        setFiltros({
            ...filtros,
            [name]: checked,
        });
    };

    // 🔹 Datos simulados
    const datos = [
        { radicado: "A-00000001", fecha: "05/03/2024 15:00", tipo: "Denuncia", detalle: "Minería Ilegal", municipio: "Piendamó", estado: "En Trámite", dias: "3 días" },
        { radicado: "S-00000002", fecha: "03/02/2023 09:15", tipo: "Solicitud", detalle: "Visita Técnica", municipio: "Suarez", estado: "Resuelta", dias: "--------" },
        { radicado: "A-00000003", fecha: "09/01/2023 10:02", tipo: "Denuncia", detalle: "Deforestación", municipio: "Piendamó", estado: "Vencida", dias: "15 días" },
        { radicado: "A-00000004", fecha: "08/01/2023 11:45", tipo: "Solicitud", detalle: "Licencia Ambiental", municipio: "Popayán", estado: "Resuelta", dias: "--------" },
        { radicado: "A-00000005", fecha: "12/05/2024 15:20", tipo: "Solicitud", detalle: "Licencia Ambiental", municipio: "Popayán", estado: "En Trámite", dias: "7 días" },
        { radicado: "A-00000006", fecha: "30/08/2024 18:10", tipo: "Denuncia", detalle: "Caza Ilegal", municipio: "Popayán", estado: "Vencida", dias: "2 días" },
        { radicado: "A-00000007", fecha: "02/09/2024 10:10", tipo: "Solicitud", detalle: "Vertimientos", municipio: "Santander de Quilichao", estado: "En Trámite", dias: "6 días" },
        { radicado: "A-00000008", fecha: "15/10/2024 09:40", tipo: "Denuncia", detalle: "Ruido Excesivo", municipio: "Cajibío", estado: "Resuelta", dias: "--------" },
    ];

    // 🔹 Filtro + búsqueda
    // 🔹 Filtro + búsqueda (BUSCA EN TODOS LOS CAMPOS)
    // 🔹 Filtro + búsqueda inteligente
    const resultadosFiltrados = datos.filter((item) => {
        const texto = busqueda.toLowerCase();

        // Detectar si hay filtros activos
        const filtrosActivos = Object.entries(filtros)
            .filter(([key, value]) => value === true)
            .map(([key]) => key);

        // 🟢 Si NO hay filtros → buscar en todos los campos
        if (filtrosActivos.length === 0) {
            return (
                item.radicado.toLowerCase().includes(texto) ||
                item.detalle.toLowerCase().includes(texto) ||
                item.municipio.toLowerCase().includes(texto) ||
                item.estado.toLowerCase().includes(texto) ||
                item.tipo.toLowerCase().includes(texto) ||
                item.fecha.toLowerCase().includes(texto)
            );
        }

        // 🟡 SI HAY FILTROS → buscar solo en los campos seleccionados
        return filtrosActivos.some((filtro) => {
            if (filtro === "radicado") return item.radicado.toLowerCase().includes(texto);
            if (filtro === "fecha") return item.fecha.toLowerCase().includes(texto);
            if (filtro === "requerimiento") return item.tipo.toLowerCase().includes(texto);
            if (filtro === "denuncia") return item.detalle.toLowerCase().includes(texto);
            if (filtro === "solicitud") return item.tipo.toLowerCase().includes(texto);
            if (filtro === "municipio") return item.municipio.toLowerCase().includes(texto);
            if (filtro === "estado") return item.estado.toLowerCase().includes(texto);
            if (filtro === "dias") return item.dias.toLowerCase().includes(texto);
            return false;
        });
    });



    // 🔹 PAGINACIÓN
    const [paginaActual, setPaginaActual] = useState(1);
    const resultadosPorPagina = 5;
    const indiceUltimo = paginaActual * resultadosPorPagina;
    const indicePrimero = indiceUltimo - resultadosPorPagina;
    const datosPaginados = resultadosFiltrados.slice(indicePrimero, indiceUltimo);
    const totalPaginas = Math.ceil(resultadosFiltrados.length / resultadosPorPagina);

    const siguientePagina = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    const anteriorPagina = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    return (
        <div className="fondo-pagina" >

            <div className="ley">
                {/* Enlace a la Ley */}
                <a href="/documents/ley-2111-2021.pdf">Ley 2111 de 2021</a>
            </div>

            <div className="title d-flex align-items-center">
                <img className="icono-funcionario" src={iconoFuncionario} alt="iconoFuncionarios" />
                <h1>Funcionarios</h1>
                <img className="logo" src={logo} alt="logo" />
            </div>


            {/* 🔹 Contenedor principal */}
            <div className="layout-wrapper">
                {/* Panel lateral */}
                <aside className="panel-usuario">
                    <div className="usuario-icono">👤</div>
                    <p className="usuario-nombre">ANDRES13</p>
                    <p className="usuario-correo">andres1354@gmail.com</p>

                    <ul className="menu-usuario">
                        <li>Inicio</li>
                        <li className="activo">Asignadas</li>
                        <li>Notificaciones</li>
                        <li>Salir</li>
                    </ul>
                </aside>

                {/* 🔹 Contenido principal */}
                <main className="main-content-area">
                    <Card className="main-content-card">
                        <Card.Body>
                            {/* Filtros y búsqueda */}
                            <Row className="align-items-center mb-3 filtros-container">
                                {/* 🔍 Buscador */}
                                <Col xs="auto">
                                    <Form.Control
                                        type="text"
                                        placeholder="Buscar..."
                                        value={busqueda}
                                        onChange={handleBusqueda}
                                        className="search-input"
                                    />
                                </Col>

                                {/* Botón buscar */}
                                <Col xs="auto">
                                    <Button className="search-button">🔍</Button>
                                </Col>

                                {/* Botón filtro */}
                                <Col xs="auto" className="filtro-dropdown">
                                    <Button
                                        className="filter-button"
                                        onClick={toggleFiltro}
                                        type="button"
                                    >
                                        ⚙️ Filtrar
                                    </Button>

                                    {/* 🔽 Ventana flotante de filtros */}
                                    {filtroAbierto && (
                                        <div className="filtro-flotante">
                                            <div className="filtro-titulo">Filtrar por...</div>
                                            <Form>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Fecha"
                                                    name="fecha"
                                                    checked={filtros.fecha}
                                                    onChange={handleFiltroChange}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Requerimiento"
                                                    name="requerimiento"
                                                    checked={filtros.requerimiento}
                                                    onChange={handleFiltroChange}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Denuncia"
                                                    name="denuncia"
                                                    checked={filtros.denuncia}
                                                    onChange={handleFiltroChange}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Solicitud"
                                                    name="solicitud"
                                                    checked={filtros.solicitud}
                                                    onChange={handleFiltroChange}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Municipio"
                                                    name="municipio"
                                                    checked={filtros.municipio}
                                                    onChange={handleFiltroChange}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Estado"
                                                    name="estado"
                                                    checked={filtros.estado}
                                                    onChange={handleFiltroChange}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Radicado"
                                                    name="radicado"
                                                    checked={filtros.radicado}
                                                    onChange={handleFiltroChange}
                                                />
                                            </Form>
                                        </div>
                                    )}
                                </Col>
                            </Row>

                            {/* 🔹 Tabla */}
                            <Table striped bordered hover className="tabla-asignadas">
                                <thead>
                                    <tr>
                                        <th>RADICADO</th>
                                        <th>FECHA DE ASIGNACIÓN</th>
                                        <th>TIPO DE REQUERIMIENTO</th>
                                        <th>DELITO</th>
                                        <th>MUNICIPIO</th>
                                        <th>ESTADO</th>
                                        <th>DÍAS ABIERTA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosPaginados.map((dato, index) => (
                                        <tr key={index}>
                                            <td>{dato.radicado}</td>
                                            <td>{dato.fecha}</td>
                                            <td>{dato.tipo}</td>
                                            <td>{dato.detalle}{""}
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    style={{ padding: "2px 6px", marginLeft: "5px" }}
                                                    onClick={() => {
                                                        if (dato.tipo === "Denuncia") {
                                                            navigate(`/funcionario/detalles/${dato.radicado}`);
                                                        } else if (dato.tipo === "Solicitud") {
                                                            navigate(`/funcionario/DetallesSolicitudes/${dato.radicado}`);
                                                        }
                                                    }}
                                                >
                                                    <FaEye style={{ cursor: "pointer", color: "#2e7d32" }} size={20} />
                                                </Button>

                                            </td>
                                            <td>{dato.municipio}</td>
                                            <td>
                                                <span
                                                    className={`estado-badge ${dato.estado === "Resuelta"
                                                        ? "resuelta"
                                                        : dato.estado === "Vencida"
                                                            ? "vencida"
                                                            : "en-tramite"
                                                        }`}
                                                >
                                                    {dato.estado}
                                                </span>
                                            </td>
                                            <td>{dato.dias}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <Button
                                className="btn-regresar"
                                onClick={() => navigate("/funcionario/denuncias")}
                                style={{ position: "absolute", top: "10px", left: "1000px", zIndex: "9999" }}
                            >
                                ⬅ Regresar
                            </Button>


                            {/* 🔹 Paginación */}
                            <div className="d-flex justify-content-start align-items-center paginacion-izquierda">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={anteriorPagina}
                                    disabled={paginaActual === 1}
                                    style={{ position: "absolute", top: "370px", left: "1000px" }}
                                >
                                    Anterior
                                </Button>
                                <span>
                                    Página {paginaActual} de {totalPaginas}
                                </span>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={siguientePagina}
                                    disabled={paginaActual === totalPaginas}
                                    style={{ position: "absolute", top: "370px", left: "1080px" }}
                                >
                                    Siguiente
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </main>
            </div>
        </div>
    );
};

export default Asignadas;
