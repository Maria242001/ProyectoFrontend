import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/consulta.css";
import BarraSuperior from "../../components/barraSuperior";
import { useNavigate } from "react-router-dom";

const Consulta = () => {
  const [identificacion, setIdentificacion] = useState("");
  const [denuncia, setDenuncia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // --- Enviar Código ---
  const enviarCodigo = async () => {
    if (!telefono.trim()) return alert("Debe ingresar un número de teléfono");

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/enviar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono }),
      });

      const data = await response.json();
      alert(data.mensaje || "Código enviado");
    } catch (error) {
      alert("Error enviando código");
    } finally {
      setLoading(false);
    }
  };

  // --- Validar Código ---
  const validarCodigo = async (e) => {
    e.preventDefault();

    if (!identificacion || !denuncia || !telefono || !codigo) {
      return alert("Debe completar todos los campos obligatorios");
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/validar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identificacion,
          numero: denuncia,
          telefono,
          codigo,
        }),
      });

      const data = await response.json();

      if (data.ok === true) {
        alert("Código válido, avanzando...");

        if (data.tipo === "denuncia") {
          navigate(`/consultadenuncias/${data.id}`);
        } else if (data.tipo === "solicitud") {
          navigate(`/consulta-solicitud/${data.id}`);
        } else {
          alert("No se pudo determinar si es denuncia o solicitud.");
        }
      } else {
        alert(data.mensaje || "Código incorrecto");
      }
    } catch (error) {
      alert("Hubo un error validando el código");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BarraSuperior />

      <div className="consulta-fondo">
        <h1 className="text-center titulo-consulta">CONSULTAS</h1>

        <div className="container formulario-box">
          <h3 className="fw-bold">Registrados en la base de datos</h3>
          <p>
            Los campos marcados con <span className="text-danger">*</span> son obligatorios
          </p>

          <form onSubmit={validarCodigo}>
            {/* Identificación */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">
                Número de identificación <span className="text-danger">*</span>
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={identificacion}
                  onChange={(e) => setIdentificacion(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Denuncia o Solicitud */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">
                Número de denuncia y/o solicitud <span className="text-danger">*</span>
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={denuncia}
                  onChange={(e) => setDenuncia(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">
                Número de teléfono <span className="text-danger">*</span>
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Botón enviar código */}
            <div className="row mb-3">
              <div className="col-sm-4"></div>
              <div className="col-sm-6 d-flex align-items-center gap-3">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={enviarCodigo}
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar Código"}
                </button>

                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={enviarCodigo}
                  disabled={loading}
                >
                  Enviar nuevo código
                </button>
              </div>
            </div>

            {/* Código SMS */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label small">
                Ingrese el código enviado por SMS <span className="text-danger">*</span>
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Necesitas ayuda */}
            <button
              type="button"
              className="btn btn-link p-0 ms-2"
              onClick={() => navigate("/ayuda")}
            >
              ¿Necesitas ayuda?
            </button>

            {/* Botón Siguiente */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-success px-4"
                disabled={loading}
              >
                {loading ? "Validando..." : "Siguiente"}
              </button>
            </div>
          </form>
        </div>

        <p className="frase-eco">
          “Cuidar el medio ambiente es valorar la vida”
        </p>
      </div>
    </>
  );
};

export default Consulta;
