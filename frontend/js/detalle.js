const apiUrl = 'http://localhost:3000/juegos';
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

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

fetch('http://localhost:3000/usuarios', {
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
        const response = await axios.get("http://localhost:3000/usuarios");
        const usuarios = response.data;
        const usuarioLogueado = usuarios.find(usuario => usuario.logueado);
        if (usuarioLogueado) {
            usuarioLogueado.logueado = false;

            // Actualizar el estado del usuario en el servidor
            await axios.patch(`http://localhost:3000/usuarios/${usuarioLogueado.id}`, { logueado: false });

            console.log("Usuario deslogueado:", usuarioLogueado.nombre);
            console.log("Estado de logueo actual:", usuarioLogueado.logueado);
        } else {
            console.log("No hay ningún usuario logueado.");
        }
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

linkSesion.addEventListener("click",cerrarSesion);







function cargarDetalle() {
    fetch(`${apiUrl}/${gameId}`)
    .then(response => response.json())
    .then(game => {
		console.log(game)
        const gameBanner = document.getElementById('gameBanner');
		const gameDetail = document.getElementById('gameDetalle');
        const gameTitulo = document.getElementById('gameTitulo');
        const gameEspec = document.getElementById('gameEspect');
		const body = document.getElementById('body-detalle');
		document.getElementById('pageTitulo').textContent = game.titulo;
		gameTitulo.innerHTML = `
		${game.titulo.toUpperCase()}
        `;
		gameBanner.innerHTML = `
            <p class="fs-5">Desarrolladora: ${game.desarrollador} <br> Año: ${game.anio}</p>
        `;
		gameDetail.innerHTML = `
			<p>${game.descripcion}</p>
        `;
		body.style.backgroundImage = `url(${game.imagen1})`;
        console.log(`Fondo establecido: ${body.style.backgroundImage}`);
        gameEspec.innerHTML = `
        <div class="row flex-wrap">
                        <div class="col-12">
                            <p class="my-2">
                                <strong>Desarrolladora:</strong> ${game.desarrollador}
                            </p>
                            <p class="my-2"><strong>Año:</strong> ${game.anio}</p>
                        </div>
                        <div class="col-12">
                            <p class="my-2"><strong>Genero:</strong>  ${game.genero}</p>
                            <p class="my-2">
                                <strong>Plataforma:</strong> ${game.plataforma}
                            </p>
                        </div>  
                        <div class="col-12  d-flex justify-content-center">
                            <button
                                onclick="volverCatalogo()"
                                class="btn boton-catalogo px-1" 
                            >
                                <p class="txt-boton-catalogo fs-6 my-1 ">
                                    <i
                                        class="fas fa-angle-left"
                                        aria-hidden="true"
                                    ></i>
                                    Volver a Inicio
                                </p>
                            </button>
                   `;
    });
}

// Cargar detalle al inicio
cargarDetalle();


function volverCatalogo() {
	window.location.href = "../index.html";
}

function paginaError() {
	window.location.href = "./error.html";
}