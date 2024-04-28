usuario = document.querySelector('#user');
contrasenia = document.querySelector('#password');
direccionEmail = document.querySelector('#email');
formRegistro = document.querySelector('#form');
saveRegistro = document.querySelector('#crear');
aviso = document.querySelector('#aviso');
aviso.style.display = "none"


const users = JSON.parse(localStorage.getItem('users')) || []

const btn = document.getElementById('crear');

fetch('http://localhost:3000/usuarios', {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {
    formRegistro.addEventListener('submit', (event) => {
      event.preventDefault();
      btn.value = 'Creando...';

      const serviceID = 'default_service';
      const templateID = 'template_2wivkev';

      const nuevoUsuario = {
        nombreUsuario: usuario.value,
        nombre: direccionEmail.value,
        contraseña: contrasenia.value,
        logeado: false,
        admin: false,
      };
      let userExists = data.some(element => element.nombre === direccionEmail.value || element.nombreUsuario === usuario.value);

      if (userExists) {
        aviso.style.display = "block";
      } else {
        fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoUsuario),
        })
          .then(response => response.json())
          .then(data => {
            usuario.value = '';
            contrasenia.value = '';
            direccionEmail.value = '';

          }).catch(error => console.log('Error al guardar el usuario:', error));
        emailjs.sendForm(serviceID, templateID, document.getElementById('form'))
          .then(() => {
            btn.value = 'Creado';
            console.log('Sent!');
          }, (err) => {
            btn.value = 'Crear';
            console.log(JSON.stringify(err));
          });

      }
    });
  });