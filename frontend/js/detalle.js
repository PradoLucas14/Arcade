const apiUrl = 'http://localhost:3000/juegos';
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

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

const navElement = document.querySelector('.navbar');
window.addEventListener('scroll', () =>{
    if(window.scrollY>50){
        navElement.classList.add('navbar-scrolled')
    }
    else{
        navElement.classList.remove('navbar-scrolled')
    }
});


function volverCatalogo() {
	window.location.href = "../index.html";
}

function paginaError() {
	window.location.href = "./error.html";
}