import { Routes, Route } from "react-router-dom";

// IMPORTS DE USUARIO
import InicioBienvenida from "../components/inicioBienvenida.jsx";
import Inicio from "../components/inicio.jsx";
import SolicitudesU from "../pages/usuario/solicitudes.jsx";
import MenuSolicitudes from "../components/menu.jsx";
import SolicitudRadicada from "../components/RadicadoSolicitud.jsx";
import Consulta from "../pages/usuario/consulta.jsx";
import ConsultaDenuncia from "../pages/usuario/consultaDenuncia.jsx";
import ConsultaSolicitud from "../pages/usuario/consultaSolicitud.jsx";

// IMPORTS DE ADMINISTRADOR
import ListadoDenuncia from "../pages/administrador/listadoDenuncia.jsx";
import DenunciaDetalle from "../pages/administrador/denunciaDetalle.jsx";
import Busqueda from "../pages/administrador/busqueda.jsx";
import Denuncia from "../pages/administrador/denuncia.jsx";
import ConsultasA from "../pages/administrador/consultas.jsx";
import Sidebar from "../components/sidebar.jsx";
import Ayuda from "../pages/usuario/ayuda.jsx";
import SolicitudesAdmin from "../pages/administrador/solicitudesAdmin.jsx";
import DetalleSolicitud from "../pages/administrador/detalleSolicitudes.jsx";

//IMPORTS DE FUNCIONARIO
import Denuncias1 from "../pages/funcionario/denuncias1.jsx";
import Asignadas from "../pages/funcionario/Asignadas.jsx";
import SolicitudesAsignadas from "../pages/funcionario/SolicitudesAsignadas.jsx";
import Detalles from "../pages/funcionario/Detalles.jsx";
import DetallesSolicitudes from "../pages/funcionario/DetallesSolicitudes.jsx";
import Resultados from "../pages/funcionario/Resultados.jsx";
import Observaciones from "../pages/funcionario/Observaciones.jsx";
import ListadoFuncionario from "../pages/funcionario/listadoFuncionario.jsx";
import RolesPermisosFuncionario from "../pages/funcionario/rolesPermisosFuncionario.jsx";
import ListadoSolicitudes from "../pages/administrador/listadoSolicitudes.jsx";




function AppRouter() {
  return (
    <Routes>
      {/* 🔹 RUTAS DE INICIO DE SESIÓN */}




      {/* 🔹 RUTAS DE USUARIO */}
      <Route path="/" element={<Sidebar />} />
      <Route path="/inicioBienvenida" element={<InicioBienvenida />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/menu-solicitud" element={<MenuSolicitudes />} />
      <Route path="/solicitud" element={<SolicitudesU />} />
      <Route path="/radicado-solicitud" element={<SolicitudRadicada />} />
      <Route path="/consulta" element={<Consulta />} />
      <Route path="/consultadenuncias" element={<ConsultaDenuncia />} />
      <Route path="/consulta-solicitud" element={<ConsultaSolicitud />} />
      <Route path="/ayuda" element={<Ayuda />} />


      {/* 🔹 RUTAS DE ADMINISTRADOR */}
      
      <Route path="/admin/denuncia" element={<Denuncia />} />
      <Route path="/admin/listado-denuncia" element={<ListadoDenuncia />} />
      <Route path="/admin/denuncia-detalle/:radicado" element={<DenunciaDetalle />} />
      <Route path="/admin/busqueda" element={<Busqueda />} />
      <Route path="/admin/consulta-admin" element={<ConsultasA />} />
      <Route path="/admin/solicitudes" element={<SolicitudesAdmin />} /> 
      <Route path="/admin/listado-solicitudes" element={<ListadoSolicitudes />} />
      <Route path="/admin/detalle-Solicitud" element={<DetalleSolicitud />} />



      {/*RUTAS DE FUNCIONARIO*/ }
      <Route path="/funcionario/denuncias" element={<Denuncias1 />} />
      <Route path="/funcionario/asignadas" element={<Asignadas />} />
      <Route path="/funcionario/SolicitudesAsignadas" element={<SolicitudesAsignadas />} />
      <Route path="/funcionario/detalles/:radicado" element={<Detalles />} />
      <Route path="/funcionario/DetallesSolicitudes/:radicado" element={<DetallesSolicitudes />} />
      <Route path="/funcionario/resultados" element={<Resultados />} />
      <Route path="/funcionario/observaciones" element={<Observaciones />} />
      <Route path="/funcionario/listaFuncionario" element={<ListadoFuncionario />} />
      <Route path="/funcionario/rolesPermisos" element={<RolesPermisosFuncionario />} />
    </Routes>
  );
}

export default AppRouter;