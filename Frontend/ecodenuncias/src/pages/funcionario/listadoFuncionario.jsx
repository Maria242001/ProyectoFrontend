import React, { useState } from 'react';
import Swal from "sweetalert2";
import iconoActivo from "../../assets/icons/iconoActivo.png";
import iconoAgregar from "../../assets/icons/iconoAgregar.png";
import iconoFuncionarios from "../../assets/icons/iconoFuncionarios.png";
import iconoRolesPermisos from "../../assets/icons/iconoRolesPermisos.png";
import iconoInactivo from "../../assets/icons/iconoInactivo.png";
import logoTexto from "../../assets/logo_texto.png";
import "../../styles/listadoFuncionario.css";
import { Link } from "react-router-dom";

function ListadoFuncionario() {
  const [search, setSearch] = useState("");
  const [funcionarios, setFuncionarios] = useState([
    { id: '001', nombre: 'Andrés Felipe', apellido: 'Dorado Muñoz', correo: 'andres112@gmail.com', telefono: '3208068936', rol: 'Administrador', estado: 'Activo', dependencia: 'Gestión Ambiental', territorial: 'CENTRO' },
    { id: '002', nombre: 'Santiago', apellido: 'Dorado Muñoz', correo: 'santiago19@gmail.com', telefono: '3200000000', rol: 'Jefe Dependencia', estado: 'Activo', dependencia: 'Gestión Ambiental', territorial: 'CENTRO' },
    { id: '003', nombre: 'Juliana', apellido: 'Vargas', correo: 'juliana23@gmail.com', telefono: '3210000000', rol: 'Funcionario', estado: 'Inactivo', dependencia: 'Gestión Ambiental', territorial: 'CENTRO' },
  ]);

  const filtered = funcionarios.filter(f =>
    f.nombre.toLowerCase().includes(search.toLowerCase()) ||
    f.apellido.toLowerCase().includes(search.toLowerCase()) ||
    f.correo.toLowerCase().includes(search.toLowerCase()) ||
    f.rol.toLowerCase().includes(search.toLowerCase())
  );

  const agregarFuncionario = () => {
    Swal.fire({
      title: "Nuevo Funcionario",
      html: `
      <input id="nombreNuevo" class="swal2-input" placeholder="Nombre">
      <input id="apellidoNuevo" class="swal2-input" placeholder="Apellido">
      <input id="correoNuevo" class="swal2-input" placeholder="Correo">
      <input id="telefonoNuevo" class="swal2-input" placeholder="Teléfono">
      
       <select id="rolNuevo" class="swal2-input">
        <option value="">Seleccione Rol</option>
        <option value="Administrador">Administrador</option>
        <option value="Jefe Dependencia">Jefe Dependencia</option>
        <option value="Funcionario">Funcionario</option>
      </select>

      <select id="estadoNuevo" class="swal2-input">
        <option value="">Seleccione Estado</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>

      <select id="dependenciaNuevo" class="swal2-input">
        <option value="">Seleccione Dependencia</option>
        <option value="Gestión Ambiental">Gestión Ambiental</option>
        <option value="Control Territorial">Control Territorial</option>
        <option value="Plantas de Tratamiento">Plantas de Tratamiento</option>
      </select>

      <select id="territorialNuevo" class="swal2-input">
        <option value="">Seleccione Territorial</option>
        <option value="CENTRO">CENTRO</option>
        <option value="SUR">SUR</option>
        <option value="NORTE">NORTE</option>
      </select>
    `,
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: document.getElementById('nombreNuevo').value,
          apellido: document.getElementById('apellidoNuevo').value,
          correo: document.getElementById('correoNuevo').value,
          telefono: document.getElementById('telefonoNuevo').value,
          rol: document.getElementById('rolNuevo').value,
          estado: document.getElementById('estadoNuevo').value,
          dependencia: document.getElementById('dependenciaNuevo').value,
          territorial: document.getElementById('territorialNuevo').value,
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {

        const { nombre, apellido, correo, telefono, rol, estado, dependencia, territorial } = result.value;

        if (!nombre || !apellido || !correo || !telefono) {
          Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
          return;
        }

        const nuevoFuncionario = {
          id: String(funcionarios.length + 1).padStart(3, '0'),
          nombre,
          apellido,
          correo,
          telefono,
          rol,
          estado,
          dependencia,
          territorial,
        };

        setFuncionarios([...funcionarios, nuevoFuncionario]);
        Swal.fire("Agregado", "El funcionario fue agregado con éxito", "success");
      }
    });
  };

  const eliminarFuncionario = (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este funcionario?");
    if (!confirmar) return;

    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const editarFuncionario = (id) => {
    const funcionario = funcionarios.find(f => f.id === id);

    Swal.fire({
      title: 'Editar Funcionario',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre" value="${funcionario.nombre}">
        <input id="apellido" class="swal2-input" placeholder="Apellido" value="${funcionario.apellido}">
        <input id="correo" class="swal2-input" placeholder="Correo" value="${funcionario.correo}">
        <input id="telefono" class="swal2-input" placeholder="Teléfono" value="${funcionario.telefono}">
        <input id="rol" class="swal2-input" placeholder="Teléfono" value="${funcionario.rol}">
        <input id="estado" class="swal2-input" placeholder="Teléfono" value="${funcionario.estado}">
        <input id="dependencia" class="swal2-input" placeholder="Teléfono" value="${funcionario.dependencia}">
        <input id="territorial
        " class="swal2-input" placeholder="Teléfono" value="${funcionario.territorial}">
      `,
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: document.getElementById('nombre').value,
          apellido: document.getElementById('apellido').value,
          correo: document.getElementById('correo').value,
          telefono: document.getElementById('telefono').value,
          rol: document.getElementById('rol').value,
          estdo: document.getElementById('estado').value,
          dependencia: document.getElementById('dependencia').value,
          territorial: document.getElementById('territorial').value,
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevosDatos = result.value;

        setFuncionarios(funcionarios.map(f =>
          f.id === id ? { ...f, ...nuevosDatos } : f
        ));

        Swal.fire("Actualizado", "El funcionario fue actualizado", "success");
      }
    });
  };

  return (
    <div className="d-flex main-bg">
      {/* Contenido */}
      <div className="content flex-grow-1 p-4 text-dark">
        <div>
          <a href="../assets/documents/ley-2111-2021.pdf">ley 2111 de 2021</a>
        </div>
        <div className="d-flex align-items-center">
          <img className='iconoFuncionario' src={iconoFuncionarios} alt="logoFuncionario" />
          <h2 className="fw-bold text-success">FUNCIONARIOS</h2>
          <img className='logo' src={logoTexto} alt="logo" />
        </div>
        <p className="text-dark">Listado de Funcionarios</p>

        {/* Contadores */}
        <div className="d-flex gap-3 mb-4">
          <div className="card-counter active">
            <div className='counterIcon active'>
              <img className='iconoActivo' src={iconoActivo} alt="iconoActivo" />
            </div>
            <div>
              <h10>ACTIVOS</h10>
              <h5>90</h5>
            </div>
          </div>
          <div className="card-counter inactive">
            <div className='counterIcon inactive'>
              <img className='iconoInactivo' src={iconoInactivo} alt="iconoInactivo" />
            </div>
            <div>
              <h11>INACTIVOS</h11>
              <h5>20</h5>
            </div>
          </div>
          <div className='card-counter rolPer'>
            <div className='counterIcon'>
              <img className='iconoRolesPermisos' src={iconoRolesPermisos} alt="icionoRolesPermisos" />
            </div>
            <h11>
              <Link className='btn' to="/funcionario/rolesPermisos">Roles y Permisos</Link>
            </h11>
          </div>
        </div>

        <div className='content-table'>
          {/* Barra herramientas */}
          <div className="herramientas d-flex justify-content-between align-items-center mb-2">
            <div>
              <button className="btn btn-success btn-sm me-2" onClick={agregarFuncionario}>Nuevo</button>
              <button className="btn btn-primary btn-sm me-2">Excel</button>
              <button className="btn btn-danger btn-sm">PDF</button>
            </div>

            <input
              type="text"
              placeholder="Buscar..."
              className="form-control form-control-sm search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Tabla */}
          <div className="table-container shadow-sm">
            <table className="table table-bordered align-middle text-center">
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>APELLIDO</th>
                  <th>CORREO</th>
                  <th>TELÉFONO</th>
                  <th>ROL</th>
                  <th>ESTADO</th>
                  <th>DEPENDENCIA</th>
                  <th>TERRITORIAL</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((f) => (
                  <tr key={f.id}>
                    <td>{f.id}</td>
                    <td>{f.nombre}</td>
                    <td>{f.apellido}</td>
                    <td>{f.correo}</td>
                    <td>{f.telefono}</td>
                    <td>{f.rol}</td>
                    <td>
                      <span className={`badge ${f.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                        {f.estado}
                      </span>
                    </td>
                    <td>{f.dependencia}</td>
                    <td>{f.territorial}</td>
                    <td>
                      <button className="btn btn-info btn-sm me-1" onClick={() => editarFuncionario(f.id)}>✏️</button>
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarFuncionario(f.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListadoFuncionario;
