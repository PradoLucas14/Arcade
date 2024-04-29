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

//Enviar mail al administrador
const destinatario = document.querySelector('#destinatario');
destinatario.value = 'tobifedearias@gmail.com'

const btn = document.getElementById('enviar');
function enviarMail() {

  document.getElementById('todo-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      btn.value = 'Enviando...';

      const serviceID = 'default_service';
      const templateID = 'template_w9ehzob';

      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          btn.value = 'Enviado';
          alert('Enviado!');
        }, (err) => {
          btn.value = 'Enviar';
          console.log(JSON.stringify(err));
        });
    });
}

btn.addEventListener('click', enviarMail);