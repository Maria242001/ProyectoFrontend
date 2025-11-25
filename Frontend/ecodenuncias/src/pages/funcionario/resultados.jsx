import React from "react";
import "../../styles/Resultados.css";
import logo from "../../assets/logo.png";
import fondoUrl from "../../assets/fondo.png";
import funcionario from "../../assets/icons/funcionario.png";
import { useNavigate } from "react-router-dom";



const Resultados = () => {
  const navigate = useNavigate();

  return (
    <div className="fondo-pagina">
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
        {/* Capa inferior */}
        <div className="caja caja1"></div>

        {/* Capa intermedia */}
        <div className="caja caja2">
          <h2 className="titulo-descarga">Formato de Descarga</h2>
        </div>

        {/* Capa superior */}
        <div className="caja caja3">
          <button className="btn-regresar" onClick={() => navigate("/detalles/:radicado")}>
            Regresar
          </button>

          <h3 className="titulo-resultados">Resultados</h3>

          <form className="lista-resultados">
            <label>
              <input type="checkbox" defaultChecked />
              Se verificó la infracción y se inició proceso sancionatorio Nro:
              <input type="text" className="campo-texto" />
            </label>

            <label>
              <input type="checkbox" />
              No se encontraron evidencias del hecho denunciado.
            </label>

            <label>
              <input type="checkbox" />
              Se emitieron recomendaciones o medidas de manejo ambiental.
            </label>

            <label>
              <input type="checkbox" />
              Se realizó visita técnica y seguimiento sin hallazgos adicionales.
            </label>

            <label>
              <input type="checkbox" />
              El hecho denunciado corresponde a competencias de otra entidad
              (entidad remitida):
            </label>

            <label>
              <input type="checkbox" />
              Se ordenó medida preventiva de suspensión de actividades.
            </label>

            <label>
              <input type="checkbox" />
              Se realizó restauración o compensación ambiental voluntaria.
            </label>

            <label>
              <input type="checkbox" />
              Se archivó la denuncia por falta de mérito o pruebas suficientes.
            </label>

            <label>
              <input type="checkbox" />
              Otros: <input type="text" className="campo-texto" />
            </label>

            <div className="boton-siguiente">
              <a href="/observaciones">
                <button type="button">Siguiente</button>
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Frase final */}
      <p className="frase">“Cuidar el medio ambiente es valorar la vida”</p>
    </div>
  );
};

export default Resultados;
