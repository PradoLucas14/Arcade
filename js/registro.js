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

const btn = document.getElementById('crear');
const destinatario = document.querySelector('#destinatario');
// destinatario.value = 'lucasnahuelprado0@gmail.com'
destinatario.value = 'tobifedearias@gmail.com'


document.addEventListener('DOMContentLoaded', function () {

  async function obtenerUsuarios() {
    try {
      const response = await axios.get('https://json-server-proyecto2.onrender.com/usuarios');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  }
  
  async function enviarCorreoYGuardarUsuario() {
    try {
      const data = await obtenerUsuarios();
  
      formRegistro.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const nuevoUsuario = {
          nombreUsuario: usuario.value,
          nombre: direccionEmail.value,
          contraseña: contrasenia.value,
          logueado: false,
          admin: false,
        };
  
        let userExists = data.some(element => element.nombre === direccionEmail.value || element.nombreUsuario === usuario.value);
  
        if (userExists || !checkbox.checked) {
          if (userExists) {
            aviso.style.display = "block";
          } else {
            alert('Debes aceptar los términos y condiciones para continuar.');
          }
        } else {
          const serviceID = 'default_service';
          const templateID = 'template_2wivkev';
          btn.value = 'Creando...';
  
          try {
            const response = await emailjs.sendForm(serviceID, templateID, formRegistro);
            console.log('Correo enviado!', response.status, response.text);
            usuario.value = '';
            contrasenia.value = '';
            direccionEmail.value = '';
            checkbox.checked = false; // Desmarcar el checkbox
  
            try {
              const response = await axios.post('https://json-server-proyecto2.onrender.com/usuarios', nuevoUsuario, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              console.log('Usuario creado:', response.data);
            } catch (error) {
              console.error('Error al guardar el usuario:', error);
            }
          } catch (error) {
            console.error('Error al enviar el correo:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  }
  
  enviarCorreoYGuardarUsuario();
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
