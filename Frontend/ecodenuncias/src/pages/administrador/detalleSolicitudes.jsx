import React from "react";
import { Card, Button, Badge, ListGroup } from "react-bootstrap";
import "../../styles/detalleSolicitud.css"

const DetalleSolicitud = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/fondo.jpg")`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h2 className="text-white fw-bold mb-4">SOLICITUDES</h2>

      <Card className="p-4 shadow bg-light bg-opacity-75 rounded-4">
        
        <div className="d-flex justify-content-end">
          <Button variant="secondary">Regresar</Button>
        </div>

        <h4 className="mt-2 mb-4 fw-bold">Detalles</h4>

        <div className="row">

          {/* COLUMNA IZQUIERDA */}
          <div className="col-lg-3 col-12 mb-3">

            {/* Estado */}
            <Card className="p-3 shadow-sm mb-3 rounded-4">
              <h6 className="fw-bold">Estado</h6>
              <Badge bg="warning" text="dark"> </Badge>

              <hr />
              <h6 className="fw-bold">Solicitante</h6>
              <p className="mb-1"> </p>

              <h6 className="fw-bold">Días abierta</h6>
              <p className="mb-1"> </p>

              <h6 className="fw-bold">Expira el</h6>
              <p> </p>

              <small className="text-muted"> </small>
            </Card>

            {/* Adjuntos */}
            <Card className="p-3 shadow-sm rounded-4">
              <h6 className="fw-bold">Adjuntos</h6>

              <ListGroup className="mb-2">
                {/* Adjuntos vacíos */}
                <ListGroup.Item> </ListGroup.Item>
                <ListGroup.Item> </ListGroup.Item>
                <ListGroup.Item> </ListGroup.Item>
              </ListGroup>

              <Button variant="success" size="sm" className="w-100">
                Adjuntar
              </Button>
            </Card>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="col-lg-9 col-12">

            {/* Radicado */}
            <Card className="p-3 shadow-sm mb-3 rounded-4">
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold">Radicado</h6>
                <h6 className="fw-bold text-success"> </h6>
              </div>

              <div className="row">
                <div className="col-md-3 fw-bold">Fecha:</div>
                <div className="col-md-9"> </div>

                <div className="col-md-3 fw-bold">Requerimiento:</div>
                <div className="col-md-9"> </div>

                <div className="col-md-3 fw-bold">Municipio:</div>
                <div className="col-md-9"> </div>

                <div className="col-md-3 fw-bold">Dirección:</div>
                <div className="col-md-9"> </div>
              </div>

              <h6 className="fw-bold mt-3">Motivos:</h6>
              <textarea
                className="form-control"
                rows="3"
                defaultValue=""
              />
            </Card>

            {/* Actividades realizadas */}
            <Card className="p-3 shadow-sm rounded-4">
              <h6 className="fw-bold">Actividades Realizadas</h6>

              <textarea
                className="form-control mb-3"
                rows="5"
                defaultValue=""
              />

              <div className="d-flex justify-content-end gap-2">
                <Button variant="outline-success">Formato de Descarga</Button>
                <Button variant="success">Agregar</Button>
              </div>
            </Card>

          </div>
        </div>
      </Card>
    </div>
  );
};

export default DetalleSolicitud;
