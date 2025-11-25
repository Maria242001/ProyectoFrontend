import React, { useState } from "react";
import { FaEdit, FaTrash, FaKey } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/rolesPermisosFuncionario.css";
import { Link } from "react-router-dom";
import iconoFuncionarios from "../../assets/icons/iconoFuncionarios.png";
import logo_texto from "../../assets/logo_texto.png";

function RolesPermisosFuncionario() {
  const [funcionarios, setFuncionarios] = useState([
    { id: "001", nombre: "Administrador", descripcion: "Personal técnico de sistemas...", estado: "Activo" },
    { id: "002", nombre: "Jefe de Dependencia", descripcion: "Directivo o coordinador...", estado: "Activo" },
    { id: "003", nombre: "Funcionario", descripcion: "Encargado de verificar denuncias...", estado: "Inactivo" },
    { id: "004", nombre: "Usuario", descripcion: "Persona que reporta infracciones...", estado: "Inactivo" },
  ]);

  // Modal de agregar/editar rol
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [rolEditando, setRolEditando] = useState(null);
  const [nuevoRol, setNuevoRol] = useState({ id: "", nombre: "", descripcion: "", estado: "Activo" });

  // Modal de permisos
  const [showPermisos, setShowPermisos] = useState(false);
  const [permisos, setPermisos] = useState({
    Denuncia: { Administrador: true, "Jefe Dependencia": true, Funcionario: false, Usuario: true },
    "Informes Tec.": { Administrador: true, "Jefe Dependencia": true, Funcionario: false, Usuario: false },
    Usuarios: { Administrador: true, "Jefe Dependencia": false, Funcionario: false, Usuario: false },
    Reportes: { Administrador: true, "Jefe Dependencia": false, Funcionario: false, Usuario: false },
    Configuración: { Administrador: true, "Jefe Dependencia": false, Funcionario: false, Usuario: false },
  });

  // 🔹 Abrir modal nuevo
  const handleShowNuevo = () => {
    setModoEdicion(false);
    setNuevoRol({ id: "", nombre: "", descripcion: "", estado: "Activo" });
    setShowModal(true);
  };

  // 🔹 Abrir modal editar
  const handleEditar = (rol) => {
    setModoEdicion(true);
    setRolEditando(rol);
    setNuevoRol(rol);
    setShowModal(true);
  };

  // 🔹 Guardar o actualizar
  const handleGuardar = () => {
    if (!nuevoRol.nombre || !nuevoRol.descripcion) return alert("Completa todos los campos");

    if (modoEdicion && rolEditando) {
      setFuncionarios(funcionarios.map((r) => (r.id === rolEditando.id ? nuevoRol : r)));
    } else {
      const nuevo = { ...nuevoRol, id: (funcionarios.length + 1).toString().padStart(3, "0") };
      setFuncionarios([...funcionarios, nuevo]);
    }

    setShowModal(false);
    setRolEditando(null);
  };

  // 🔹 Eliminar
  const handleEliminar = (id) => {
    if (window.confirm("¿Eliminar este rol?")) {
      setFuncionarios(funcionarios.filter((r) => r.id !== id));
    }
  };

  // 🔹 Permisos
  const handleAbrirPermisos = () => {
    setShowPermisos(true);
  };

  const handleTogglePermiso = (modulo, rol) => {
    setPermisos({
      ...permisos,
      [modulo]: { ...permisos[modulo], [rol]: !permisos[modulo][rol] },
    });
  };

  const handleGuardarPermisos = () => {
    alert("Permisos guardados correctamente ✅");
    setShowPermisos(false);
  };

  return (
    <div className="roles-container flex-grow-1 p-4 text-dark">
      <div>
        <a href="../assets/documents/ley-2111-2021.pdf">Ley 2111 de 2021</a>
      </div>

      <div className="title d-flex align-items-center">
        <img className="iconoFuncionarios" src={iconoFuncionarios} alt="iconoFuncionarios" />
        <h1>Funcionarios</h1>
        <img className="logo" src={logo_texto} alt="logo" />
      </div>

      <h4 className="roles-title">Roles y Permisos</h4>

      <div className="counterTable">
        <div className="roles-header">
          <button className="btn btn-sm btn-primary" onClick={handleShowNuevo}>
            ➕ Nuevo
          </button>
          <button className="regresar">
            <Link className="btn" to="/funcionario/listaFuncionario">Regresar</Link>
          </button>
        </div>
        <div className="d-flex">
          {/* 🔹 Tabla */}
          <div className="roles-card shadow flex-grow-1">

            <table className="table table-hover table-bordered align-middle">
              <thead className="table-success text-center">
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>ESTADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {funcionarios.map((rol) => (
                  <tr key={rol.id}>
                    <td>{rol.id}</td>
                    <td className="fw-semibold">{rol.nombre}</td>
                    <td className="text-start">{rol.descripcion}</td>
                    <td>
                      <span className={`badge ${rol.estado === "Activo" ? "bg-success" : "bg-danger"}`}>
                        {rol.estado}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success me-2" onClick={handleAbrirPermisos}>
                        <FaKey />
                      </button>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(rol)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(rol.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🔹 Modal agregar/editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar Rol" : "Agregar Rol"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nuevoRol.nombre}
                onChange={(e) => setNuevoRol({ ...nuevoRol, nombre: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={nuevoRol.descripcion}
                onChange={(e) => setNuevoRol({ ...nuevoRol, descripcion: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={nuevoRol.estado}
                onChange={(e) => setNuevoRol({ ...nuevoRol, estado: e.target.value })}
              >
                <option>Activo</option>
                <option>Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={handleGuardar}>
            {modoEdicion ? "Actualizar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 🔹 Modal de permisos */}
      <Modal show={showPermisos} onHide={() => setShowPermisos(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>🔐 Permisos del Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-bordered text-center align-middle">
            <thead className="table-secondary">
              <tr>
                <th>Módulo</th>
                <th>Administrador</th>
                <th>Jefe Dependencia</th>
                <th>Funcionario</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(permisos).map((modulo) => (
                <tr key={modulo}>
                  <td className="fw-semibold">{modulo}</td>
                  {Object.keys(permisos[modulo]).map((rol) => (
                    <td key={rol}>
                      <Form.Check
                        type="switch"
                        id={`${modulo}-${rol}`}
                        checked={permisos[modulo][rol]}
                        onChange={() => handleTogglePermiso(modulo, rol)}
                        label={permisos[modulo][rol] ? "ON" : "OFF"}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleGuardarPermisos}>
            Guardar
          </Button>
          <Button variant="danger" onClick={() => setShowPermisos(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RolesPermisosFuncionario;
