import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/ayuda.css"; // Opcional: tu CSS personalizado
import BarraSuperior from "../../components/barraSuperior";

function Ayuda() {
  return (
    <>
       <BarraSuperior />  {/* <-- agregar aquí */}
    <div className="container mt-5">
      <div className="card shadow-sm ayuda-card">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Manual de ayuda para EcoDenuncias</h1>

          <div className="ayuda-content">
            <h2>1. Introducción</h2>
            <p>
              Este formulario está diseñado para que los usuarios puedan consultar datos registrados en la base de datos de denuncias ambientales. Para avanzar, es necesario completar algunos campos obligatorios y validar un código de seguridad enviado por mensaje de texto.
            </p>

            <h2>2. Descripción del formulario</h2>
            <p><strong>Número de identificación:</strong> Ingresa tu número de identificación personal. Este campo es opcional pero recomendado para facilitar la búsqueda.</p>
            <p><strong>Número de denuncia:</strong> Ingresa el número que corresponde a la denuncia realizada. Este campo es obligatorio (marcado con *).</p>
            <p><strong>Número de teléfono:</strong> Debes ingresar el teléfono que usaste para hacer la denuncia. Es obligatorio para enviar el código de validación.</p>
            <p><strong>Código de validación:</strong> Debes ingresar el código que recibiste por mensaje de texto después de presionar el botón "Enviar Código".</p>

            <h2>3. Uso del formulario</h2>
            <ol>
              <li>Completar datos básicos: Rellena los campos "Número de denuncia" y "Número de teléfono". Opcionalmente, incluye el número de identificación.</li>
              <li>Enviar código: Presiona el botón <strong>Enviar Código</strong> para que se envíe un código único a tu teléfono móvil.</li>
              <li>Recibir y escribir el código: Revisa tu teléfono y anota el código que te llegó por mensaje de texto. Escríbelo en el campo correspondiente.</li>
              <li>Avanzar: Si el código es correcto, el botón <strong>Siguiente</strong> te permitirá continuar con el proceso.</li>
            </ol>

            <h2>4. Opciones adicionales</h2>
            <ul>
              <li><strong>Enviar nuevo código:</strong> Si no recibiste el código o expiró, haz clic en el enlace <em>Enviar nuevo código</em> en el formulario para solicitar uno nuevo.</li>
              <li><strong>Ayuda:</strong> Si tienes problemas, usa este manual o contacta al soporte.</li>
            </ul>

            <h2>5. Mensajes de error comunes</h2>
            <ul>
              <li>Campos obligatorios vacíos: El sistema te indicará que debes completar los campos marcados con *.</li>
              <li>Código incorrecto o vencido: Debes solicitar un nuevo código.</li>
              <li>Número de teléfono no válido: Asegúrate de ingresar un número correcto.</li>
            </ul>

            <h2>6. Consejos para un uso efectivo</h2>
            <ul>
              <li>Verifica que el número de teléfono esté activo y pueda recibir SMS.</li>
              <li>Guarda el código que recibas hasta completar la consulta.</li>
              <li>Si tienes dudas, utiliza el enlace de ayuda o contacta al soporte.</li>
            </ul>

            <h2>7. Contacto y soporte</h2>
            <ul>
              <li>Email: ecodenuncias25@gmail.com</li>
              <li>Teléfono: +57 3148979635</li>
              <li>Página web: www.eco-denuncias.com</li>
            </ul>

            <div className="text-center mt-4">
              <Link to="/consulta" className="btn btn-primary">Volver al formulario</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Ayuda;
