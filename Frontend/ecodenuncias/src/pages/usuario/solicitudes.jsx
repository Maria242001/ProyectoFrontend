import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/solicitudesUsu.css";
import BarraSuperior from "../../components/barraSuperior";
import { useNavigate } from "react-router-dom";

function SolicitudesU() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    cc: "",
    email: "",
    celular: "",
    municipio: "",
    descripcion: "",
    archivo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, cc, email, celular, municipio, descripcion } = form;

    // Validación de campos obligatorios
    if (!nombre.trim() || !cc.trim() || !email.trim() || !celular.trim() || !municipio || !descripcion.trim()) {
      alert("Por favor, complete todos los campos obligatorios 🌱");
      return;
    }

    // Generar radicado
    const radicado = "RAD-" + Math.floor(100000 + Math.random() * 900000);

    // Enviar a la página del radicado
    navigate("/radicado-solicitud", {
      state: { radicado },
    });
  };

  return (
    <div className="solicitudes-container">
      <BarraSuperior />
      <div className="overlay">
        <div className="container text-dark py-4">
          <h1 className="title text-center mb-4">SOLICITUDES</h1>

          <form onSubmit={handleSubmit} className="row">
            {/* Columna izquierda */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Nombre<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">C.C<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="cc"
                  value={form.cc}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email<span className="text-danger">*</span></label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Celular<span className="text-danger">*</span></label>
                <input
                  type="tel"
                  className="form-control"
                  name="celular"
                  value={form.celular}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Municipio<span className="text-danger">*</span></label>
                <select
                  className="form-select"
                  name="municipio"
                  value={form.municipio}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione el municipio...</option>
                  <option value="Bogotá">Bogotá</option>
                  <option value="Medellín">Medellín</option>
                  <option value="Cali">Cali</option>
                </select>
              </div>

              <div className="mt-3">
                <label className="fw-bold">Tipo de Solicitud:</label>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">
                  Adjuntar Archivo (JPG, PDF) 100MB (Opcional)
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept=".jpg,.jpeg,.png,.pdf"
                  name="archivo"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Columna derecha */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Descripción <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  name="descripcion"
                  rows="10"
                  placeholder="Describa los hechos en 70 palabras."
                  value={form.descripcion}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="text-end mt-4">
                <button type="submit" className="btn btn-success px-5">
                  Siguiente
                </button>
              </div>
            </div>
          </form>

          {/* Texto informativo inferior */}
          <div className="alerta mt-5">
            En el momento que quede registrada su solicitud, mediante mensaje de texto se brindará el número de radicado.
            Este número es esencial para hacer seguimiento en <strong>EcoDenuncias</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolicitudesU;
