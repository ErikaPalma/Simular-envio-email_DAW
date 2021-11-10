//VARIABLES

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");

const btnEnviar = document.querySelector("#enviar");
console.log(btnEnviar);

cargarEventListeners();
function cargarEventListeners() {
  //Cuando la App arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //Campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
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
    console.log("hay algo");
  } else {
    e.target.classList.add("border", "border-red-500");
    mostrarError();
  }
}

function mostrarError() {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = "*Todos los campos son obligatorios";
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
