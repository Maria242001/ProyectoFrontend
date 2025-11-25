
import "../../styles/Observaciones.css";
import logo from "../../assets/logo.png";
import funcionario from "../../assets/icons/funcionario.png";
import fondo from "../../assets/fondo.png"; // ✅ importación segura del fondo
import { Modal, Button } from "react-bootstrap";
import { useState, useRef, React } from "react";

const Observaciones = () => {


  const [showModalFormatos, setShowModalFormatos] = useState(false);
  const fileInputRef = useRef(null);

  return (
    <div
      className="fondo-pagina"
      style={{ backgroundImage: `url(${fondo})` }}
    >
            <div className="ley">
                {/* Enlace a la Ley */}
                <a href="/documents/ley-2111-2021.pdf">Ley 2111 de 2021</a>
            </div>

            <div className="title d-flex align-items-center">
                <img className="icono-funcionario" src={funcionario} alt="iconoFuncionarios" />
                <h1>Funcionarios</h1>
                <img className="logo" src={logo} alt="logo" />
            </div>

      {/* Contenedor de cajas */}
      <div className="contenedor-cajas">
        {/* Caja inferior */}
        <div className="caja caja1"></div>

        {/* Caja intermedia */}
        <div className="caja caja2">
          <h2 className="titulo-formato">Formato de Descarga</h2>
        </div>

        {/* Caja superior */}
        <div className="caja caja3">
          <h3 className="titulo-observaciones">Observaciones</h3>

          <form className="formulario-observaciones">
            <label>Observaciones generales del trámite:
              <input type="text" className="campo-observaciones" />
            </label>

            <div className="checkbox-group">
              <label >Recomendaciones o acciones futuras</label>

              <label className="checkbox-item">
                <input type="checkbox" />
                Programar nueva visita de seguimiento
              </label>

              <label className="checkbox-item">
                <input type="checkbox" />
                Requerir al infractor para cumplimiento de medida corrrectiva
              </label>

              <label className="checkbox-item">
                <input type="checkbox" />
                Coordinar con autoridades municipales o Policía Ambiental
              </label>

              <label> otro:</label>
              <input type="text" className="campo-texto" />


              {/* Contenedor para los dos últimos checkboxes alineados a la derecha */}
              <div className="checkbox-right">
                <label className="checkbox-item">
                  <input type="checkbox" />
                  Remitir información a otra dependencia correspondiente
                </label>

                <label className="checkbox-item">
                  <input type="checkbox" />
                  Archivar expediente por cumplimiento de obligaciones
                </label>
              </div>


            </div>


            <div className="boton-anterior">
              <a href="/resultados">
                <button type="button">Anterior</button>
              </a>
              <button
                type="button"
                onClick={() => setShowModalFormatos(true)}
              >
                Guardar y Finalizar
              </button>

            </div>
          </form>
        </div>
      </div>

      {/* Frase final */}
      <p className="frase">“Cuidar el medio ambiente es valorar la vida”</p>

      {/* ==== MODAL FORMATOS ==== */}
      <Modal
        show={showModalFormatos}
        onHide={() => setShowModalFormatos(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Selecciona el formato</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Button className="w-100 mb-2" variant="primary">
            📄 Descargar en PDF
          </Button>

          <Button className="w-100 mb-2" variant="success">
            📝 Descargar en Word
          </Button>

          <Button
            className="w-100 mb-2"
            variant="warning"
            onClick={() => fileInputRef.current.click()}
          >
            📁 Subir Imagen
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalFormatos(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </div >
  );
};

export default Observaciones;
