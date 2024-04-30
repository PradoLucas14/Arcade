const usuario = document.querySelector('#user');
const contrasenia = document.querySelector('#password');
const direccionEmail = document.querySelector('#email');
const pais = document.querySelector('#countrie');
const formRegistro = document.querySelector('#todo-form');
const aviso = document.querySelector('#aviso');
const checkbox = document.getElementById('check');
aviso.style.display = 'none';

//? Navbar y links

const navElement = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navElement.classList.add('navbar-scrolled')
  }
  else {
    navElement.classList.remove('navbar-scrolled')
  }
});

//Registrar y controlar si existe el usuario

document.getElementById('todo-form').addEventListener('submit', function (event) {
  const checkbox = document.getElementById('check');

  if (!checkbox.checked) {
    alert('Debes aceptar los términos y condiciones para continuar.');
    event.preventDefault();
  }
});

const btn = document.getElementById('crear');
const destinatario = document.querySelector('#destinatario');
// destinatario.value = 'lucasnahuelprado0@gmail.com'
destinatario.value = 'tobifedearias@gmail.com';

fetch('https://json-server-proyecto2.onrender.com/usuarios', {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {
    btn.addEventListener('click', () => {
      formRegistro.addEventListener('submit', (event) => {
        event.preventDefault();
        const nuevoUsuario = {
          nombreUsuario: usuario.value,
          nombre: direccionEmail.value,
          contraseña: contrasenia.value,
          logueado: false,
          admin: false,
        };
        let userExists = data.some(element => element.nombre === direccionEmail.value || element.nombreUsuario === usuario.value);

        if (userExists) {
          aviso.style.display = "block";
          usuario.value = '';
          contrasenia.value = '';
          direccionEmail.value = '';
          checkbox.checked = false; // Desmarcar el checkbox
        } else {
          const serviceID = 'default_service';

          // Define el ID del template de Email.js
          const templateID = 'template_2wivkev';
          btn.value = 'Creando...';

          // Envía el formulario utilizando Email.js
          emailjs.sendForm(serviceID, templateID, formRegistro)
            .then(function (response) {
              console.log('CREADO!', response.status, response.text);
              usuario.value = '';
              contrasenia.value = '';
              direccionEmail.value = '';
              checkbox.checked = false; // Desmarcar el checkbox
              fetch('https://json-server-proyecto2.onrender.com/usuarios', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoUsuario),
              });

            }).catch(error => console.log('Error al guardar el usuario:', error));

        }
      });
    });
  });

const passwordField = document.getElementById("password");

function togglePasswordVisibility() {
  const togglePasswordButton = document.getElementById("togglePassword");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePasswordButton.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
  } else {
    passwordField.type = "password";
    togglePasswordButton.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
  }
}
const togglePasswordButton = document.getElementById("togglePassword");

togglePasswordButton.addEventListener('click', togglePasswordVisibility);