import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/consultaSolicitud.css";
import BarraSuperior from "../../components/barraSuperior.jsx";
import jsPDF from "jspdf";

function ConsultaSolicitud() {
  const navigate = useNavigate();
  const [idioma, setIdioma] = useState("es");

  const textos = {
    es: {
      titulo: "Consulta de solicitud en base de datos",
      radicado: "Radicado",
      tipo: "Tipo de solicitud",
      estado: "Estado",
      dependencia: "Dependencia encargada",
      fechaAsignacion: "Fecha de Asignación",
      direccion: "Dirección",
      municipio: "Municipio",
      telefono: "Teléfono",
      correoElectronico: "Correo Electrónico",
      comentarios: "Observaciones",
      descargar: "Descargar",
      finalizar: "Finalizar",
    },
    en: {
      titulo: "Request Database Query",
      radicado: "Registered",
      tipo: "Request Type",
      estado: "Status",
      dependencia: "Responsible Department",
      fechaAsignacion: "Assignment Date",
      direccion: "Address",
      municipio: "Municipality",
      telefono: "Phone",
      correoElectronico: "Email",
      comentarios: "Remarks",
      descargar: "Download",
      finalizar: "Finish",
    },
  };

  // Función para descargar PDF vacío
  const handleDescargarClick = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Consulta de Solicitud", 20, 20);

    doc.setFontSize(12);
    let yPos = 40;

    [
      "radicado",
      "tipo",
      "estado",
      "dependencia",
      "fechaAsignacion",
      "direccion",
      "municipio",
      "telefono",
      "correoElectronico",
    ].forEach((campo) => {
      doc.text(`${textos[idioma][campo]}: `, 20, yPos);
      yPos += 10;
    });

    doc.text(`${textos[idioma].comentarios}: `, 20, yPos + 5);

    doc.save("solicitud.pdf");
  };

  // Función para finalizar la consulta
  const handleFinalizarClick = () => {
    if (window.confirm("¿Desea finalizar la consulta y volver al inicio?")) {
      navigate("/inicio");
    }
  };

  return (
    <div className="consulta-fondo">
      <Container fluid className="consulta-solicitud-page p-3">
        {/* BARRA SUPERIOR */}
        <BarraSuperior />

        {/* TÍTULO */}
        <h1 className="text-center my-3 titulo-consulta">
          {textos[idioma].titulo}
        </h1>

        {/* CUADRÍCULA DE DATOS */}
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card className="mb-3 card-datos">
              <Card.Body>
                {[
                  "radicado",
                  "tipo",
                  "estado",
                  "dependencia",
                  "fechaAsignacion",
                  "direccion",
                  "municipio",
                  "telefono",
                  "correoElectronico",
                ].map((campo) => (
                  <Row key={campo} className="data-row align-items-center">
                    <Col xs={6} sm={4} className="label-col">
                      <strong>{textos[idioma][campo]}</strong>
                    </Col>
                    <Col xs={6} sm={8} className="value-col">
                      {/* Aquí se mostrará la información que venga del backend */}
                    </Col>
                  </Row>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* OBSERVACIONES */}
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card className="mb-3 card-comentarios">
              <Card.Body>
                <Card.Title className="text-start titulo-comentarios">
                  {textos[idioma].comentarios}
                </Card.Title>
                <Card.Text className="comentario-texto">
                  {/* Comentarios del backend */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* BOTONES */}
        <Row className="justify-content-center my-3">
          <Col xs="auto">
            <Button
              variant="success"
              onClick={handleDescargarClick}
              className="mx-2 boton-descargar"
            >
              {textos[idioma].descargar}
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-success"
              onClick={handleFinalizarClick}
              className="mx-2 boton-finalizar"
            >
              {textos[idioma].finalizar}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ConsultaSolicitud;
