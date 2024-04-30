//Enviar mail al administrador
const destinatario = document.querySelector('#destinatario');
destinatario.value = 'lucasnahuelprado0@gmail.com'
// destinatario.value = 'tobifedearias@gmail.com'


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

//? Navbar y links

const navElement = document.querySelector('.navbar');
window.addEventListener('scroll', () =>{
    if(window.scrollY>50){
        navElement.classList.add('navbar-scrolled')
    }
    else{
        navElement.classList.remove('navbar-scrolled')
    }
});

//? Administrador, login, registro y cerrar sesión 

const linkNoLog = document.querySelectorAll('.sin-loguear');
const linkLog = document.querySelectorAll('.logueado');
const linkAdmin = document.querySelectorAll('.administrar-navbar');


//revisar usuarios y si hay alguno logueado

fetch('https://json-server-proyecto2.onrender.com/usuarios', {
  method: 'GET',
}).then(response => response.json()).then(data => {
        const usuarioLogueado = data.find(usuario => usuario.logueado);
        if(usuarioLogueado){
            if(usuarioLogueado.admin){
            console.log("esta logueado el admin");
            linkAdmin.forEach(link =>{
                link.style.display="block";
            })
            linkNoLog.forEach(link =>{
                link.style.display="none";
            })
            linkLog.forEach(link =>{
                link.style.display="block";
            })
        }else{
            linkNoLog.forEach(link =>{
                link.style.display="none";
            })
            console.log("esta logueado un random");
            linkLog.forEach(link =>{
                link.style.display="block";
            })
            linkAdmin.forEach(link =>{
                link.style.display="none";
            })
        }
        }
        else{
            console.log("no esta logueado nadie");
            linkLog.forEach(link =>{
                link.style.display="none";
            })
            linkAdmin.forEach(link =>{
                link.style.display="none";
            })
            linkNoLog.forEach(link =>{
                link.style.display="block";
            })
        }
    }
);

//Cerrar sesion de usuario
const linkSesion = document.getElementById('cerrar-sesion');

async function cerrarSesion(event){
     try {
        event.preventDefault();
        const response = await axios.get("https://json-server-proyecto2.onrender.com/usuarios");
        const usuarios = response.data;
        const usuarioLogueado = usuarios.find(usuario => usuario.logueado);
        if (usuarioLogueado) {
            usuarioLogueado.logueado = false;

            // Actualizar el estado del usuario en el servidor
            await axios.patch(`https://json-server-proyecto2.onrender.com/usuarios/${usuarioLogueado.id}`, { logueado: false });
            
            console.log("Usuario deslogueado:", usuarioLogueado.nombre);
            console.log("Estado de logueo actual:", usuarioLogueado.logueado);
            setTimeout(function() {
                window.location.reload();
            }, 200);
        } else {
            console.log("No hay ningún usuario logueado.");
        }
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

linkSesion.addEventListener("click",cerrarSesion);