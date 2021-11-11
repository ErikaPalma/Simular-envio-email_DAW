//VARIABLES

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");

const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
//Expresiones regulares para email. La pongo aquí para que tenga ámbito global
const er =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

cargarEventListeners();
function cargarEventListeners() {
  //Cuando la App arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //Campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  //Enviar email
  formulario.addEventListener("submit", enviarEmail);

  //Resetear formulario
  btnReset.addEventListener("click", resetearFormulario);
}

//FUNCIONES

function iniciarApp() {
  btnEnviar.disabled = true; //Deshabilitar el botón
  /*Se añaden clases de Tailwind para que la apariencia del
  botón indique que no se puede enviar hasta que no este rellenado*/
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

//Validar el formulario

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    //Eliminar mensaje error cuando se rellena un campo
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }

  //Validar email
  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("El email no es válido");
    }
  }

  if (er.test(email.value) && asunto.value != "" && mensaje.value != "") {
    //Una vez pasada la validación, vuelvo a activar el botón
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "background-color-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "error"
  );

  /*Para evitar que muestre los errores muchas veces, solo añadimos
  el mensaje de erro si no está*/
  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

//Enviar email
function enviarEmail(e) {
  e.preventDefault();
  console.log("Enviando");

  //Mostrar spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  //Ocultar spinner después de 3 segundos y mostrar mnsj éxito
  setTimeout(() => {
    spinner.style.display = "none";
    //Mensaje éxito
    const mensajeExito = document.createElement("p");
    mensajeExito.textContent = "Enviado correctamente";
    mensajeExito.classList.add(
      "bg-teal-100",
      "border-t-4",
      "border-teal-500",
      "rounded-b",
      "text-teal-900",
      "px-4",
      "py-3",
      "shadow-md",
      "mt-5"
    );
    formulario.appendChild(mensajeExito);
    //Eliminar mensaje de éxito tras segundos y reset de formulario
    setTimeout(() => {
      mensajeExito.remove();
      resetearFormulario();
    }, 3000);
  }, 3000);
}

//Resetear formulario

function resetearFormulario() {
  formulario.reset();
  iniciarApp(); //Para que se vuelva a deshabilitar el botón de enviar
}
