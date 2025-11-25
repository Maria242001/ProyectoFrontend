// src/pages/Detalles.jsx
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';

import "../../styles/detallesFun.css";

// Importar recursos
import fondoUrl from "../../assets/fondo.png";
import logo from "../../assets/logo.png";
import iconoFuncionario from "../../assets/icons/funcionario.png";

const Detalles = () => {

    // ✔ Modal de formatos
    const [mostrarModalFormatos, setMostrarModalFormatos] = useState(false);

    // ✔ Modal de agregar actividad
    const [showAgregarActividad, setShowAgregarActividad] = useState(false);
    const [nuevaActividad, setNuevaActividad] = useState("");

    // ✔ ID de ruta
    const { radicado } = useParams();
    const navigate = useNavigate();


    // --- DATOS DE EJEMPLO ---
    const denunciaDetalle = {
        radicado: 'A-00000001', estado: 'En Trámite', denunciante: 'Pedro Antonio Ramírez',
        diasAbierta: '2 días', expira: '27/04/2023', ultimaActualizacion: '12/04/2023 10:45',
        fechaRadicado: '09/04/2023', delito: 'Tráfico de Especies', lugarHechos: 'Morales',
        hecho: 'En la calle 12 con carrera 24, se encuentran unas personas ofreciendo la venta loros y tortugas',
        actividadesRealizadas: 'Funcionario encargado:\nBuenas tardes.\nSe realiza la verificación...',
        adjuntos: [
            { nombre: 'Video001.mp4', subidoPor: 'el denunciante', fecha: '08/04/2023' },
            { nombre: 'imagen05.jpg', subidoPor: 'el denunciante', fecha: '08/04/2023' },
            { nombre: 'Acta 1234', subidoPor: 'el funcionario', fecha: '09/04/2023' },
        ]
    };

    // ✔ AHORA sí puedes usarlo sin romper la app
    const [actividades, setActividades] = useState(denunciaDetalle.actividadesRealizadas || "");

    const renderEstadoBadge = (estado) => {
        let className;
        switch (estado) {
            case 'En Trámite': className = 'en-tramite'; break;
            case 'Resuelta': className = 'resuelta'; break;
            case 'Vencida': className = 'vencida'; break;
            default: className = 'default';
        }
        return <span className={`estado-badge ${className}`}>{estado}</span>;
    };

    const fileInputRef = useRef(null);

    const handleAdjuntar = () => {
        fileInputRef.current.click();
    };

    const handleFileSelect = (event) => {
        const archivo = event.target.files[0];
        if (archivo) {
            alert(`Archivo seleccionado: ${archivo.name}`);
        }
    };

    const handleDescargarFormato = () => {
        

        // Redirigir después de 1 segundo
        setTimeout(() => {
            navigate("/resultados");
        }, 1000);
    };


    // 🔹 ABRIR MODAL DE AGREGAR
    const handleAgregarActividad = () => {
        setShowAgregarActividad(true);
    };

    // 🔹 GUARDAR ACTIVIDAD AGREGADA
    const handleGuardarActividad = () => {
        if (nuevaActividad.trim() === "") return;

        // Agregar actividad al texto existente
        setActividades(prev => prev + "\n• " + nuevaActividad);

        // Cerrar modal
        setShowAgregarActividad(false);

        // Limpiar textarea
        setNuevaActividad("");


    };



    return (
        <div
            className="fondo-pagina"
            style={{ backgroundImage: `url(${fondoUrl})` }}
        >
            <div className="ley">
                {/* Enlace a la Ley */}
                <a href="/documents/ley-2111-2021.pdf">Ley 2111 de 2021</a>
            </div>

            <div className="title d-flex align-items-center">
                <img className="icono-funcionario" src={iconoFuncionario} alt="iconoFuncionarios" />
                <h1>Funcionarios</h1>
                <img className="logo" src={logo} alt="logo" />
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <Container fluid className="main-content-area-fixed">

                <Row>
                    <Col xs={12}>
                        <Card className="main-details-card shadow-lg">
                            <Card.Body className="p-4">

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="titulo-seccion-detalles">Detalles</h2>
                                    <a href="/asignadas"><Button type="button">Regresar</Button></a>
                                </div>

                                <Row>

                                    {/* COLUMNA IZQUIERDA */}
                                    <Col md={5} className="mb-4 mb-md-0 d-flex flex-column">

                                        {/* Estado */}
                                        <Card className="sub-card info-card mb-4">
                                            <div>
                                                <h5 className="sub-card-title">Estado</h5>
                                                <p>{renderEstadoBadge(denunciaDetalle.estado)}</p>

                                                <h5 className="sub-card-title mt-3">Denunciante</h5>
                                                <p>{denunciaDetalle.denunciante}</p>

                                                <h5 className="sub-card-title mt-3">Días abierta</h5>
                                                <p>{denunciaDetalle.diasAbierta}</p>

                                                <h5 className="sub-card-title mt-3">Expira el</h5>
                                                <p>{denunciaDetalle.expira}</p>

                                                <p className="ultima-actualizacion">
                                                    Última actualización: {denunciaDetalle.ultimaActualizacion}
                                                </p>
                                            </div>
                                        </Card>

                                        {/* Adjuntos */}
                                        <Card className="sub-card adjuntos-card mt-auto">
                                            <Card.Body className="d-flex flex-column">
                                                <h5 className="sub-card-title">Adjuntos</h5>
                                                <div className="scroll-content-container flex-grow-1">
                                                    <ul className="list-unstyled">
                                                        {denunciaDetalle.adjuntos.map((adjunto, idx) => (
                                                            <li key={idx} className="mb-2">
                                                                📁 <a href="#" className="adjunto-link">{adjunto.nombre}</a><br />
                                                                <small>Subido por {adjunto.subidoPor} el {adjunto.fecha}</small>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="d-grid gap-2 d-md-block text-end mt-2">
                                                    <Button className="btn-adjuntar" onClick={handleAdjuntar}>Adjuntar</Button>
                                                </div>

                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    style={{ display: "none" }}
                                                    onChange={handleFileSelect}
                                                />

                                            </Card.Body>
                                        </Card>

                                    </Col>

                                    {/* COLUMNA DERECHA */}
                                    <Col md={7} className="d-flex flex-column">

                                        {/* Radicado */}
                                        <Card className="sub-card info-card radicado-card mb-4">

                                            <div className="d-flex align-items-start justify-content-start">
                                                <div>
                                                    <h5 className="sub-card-title">Radicado</h5>
                                                    <p className="radicado-info">Fecha: {denunciaDetalle.fechaRadicado}</p>
                                                    <p className="radicado-info">Delito: {denunciaDetalle.delito}</p>
                                                    <p className="radicado-info">Lugar de los Hechos: {denunciaDetalle.lugarHechos}</p>
                                                </div>
                                                <span className="radicado-numero">{denunciaDetalle.radicado}</span>
                                            </div>

                                            <h5 className="sub-card-title mt-3">Hecho:</h5>
                                            <div className="hecho-contenido">
                                                <p>{denunciaDetalle.hecho}</p>
                                            </div>

                                        </Card>

                                        {/* Actividades */}
                                        <Card className="sub-card actividades-card flex-grow-1">
                                            <h5 className="sub-card-title">Actividades Realizadas</h5>

                                            <div className="actividades-contenido flex-grow-1">
                                                <textarea
                                                    className="form-control"
                                                    value={actividades}
                                                    onChange={(e) => setActividades(e.target.value)}
                                                    rows={4}
                                                    placeholder="Escribe las actividades realizadas..."
                                                />
                                            </div>

                                            <div className="d-flex justify-content-end mt-3">

                                                {/* Modal formatos */}
                                                {mostrarModalFormatos && (
                                                    <div className="modal-backdrop-custom">
                                                        <div className="modal-contenido-custom">
                                                            <h4>Selecciona un formato</h4>

                                                            <button className="btn btn-primary w-100 mt-2">📄 PDF</button>
                                                            <button className="btn btn-success w-100 mt-2">📝 Word (DOCX)</button>
                                                            <button className="btn btn-warning w-100 mt-2">📁 Imagen (JPG/PNG)</button>

                                                            <button
                                                                className="btn btn-secondary w-100 mt-3"
                                                                onClick={() => setMostrarModalFormatos(false)}
                                                            >
                                                                Cerrar
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                <Button className="btn-agregar me-2" onClick={handleDescargarFormato}>
                                                    Formato de Descarga
                                                </Button>

                                                <Button className="btn-agregar" onClick={handleAgregarActividad}>
                                                    Agregar
                                                </Button>
                                            </div>

                                        </Card>

                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>

            <footer className="frase">
                “Cuidar el medio ambiente es valorar la vida”
            </footer>

            {/* 🔹 MODAL DE AGREGAR ACTIVIDAD 🔹 */}
            <Modal show={showAgregarActividad} onHide={() => setShowAgregarActividad(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Actividad</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Escribe la nueva actividad..."
                        value={nuevaActividad}
                        onChange={(e) => setNuevaActividad(e.target.value)}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAgregarActividad(false)}>
                        Cancelar
                    </Button>

                    <Button variant="success" onClick={handleGuardarActividad}>
                        Guardar Actividad
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Detalles;
