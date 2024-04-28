//? Cargado de datos en banner
//Metodo get
const apiUrlDestacado = 'http://localhost:3000/destacado';
function getDestacado() {
    try {
        fetch(apiUrlDestacado, {
        method: 'GET',
        }).then(response => response.json()).then(data => {
            const juegoDestacado = document.getElementById("destacado-imagen");
            const tituloDestacado = document.getElementById("gameTitulo");
            const descripcionDestacado = document.getElementById("categoriaDestacado");
            idDestacadoGlobal =  data[0].id;
            tituloDestacado.innerHTML = `${data[0].titulo.toUpperCase()}
            `;
            descripcionDestacado.innerHTML = `<p class="datos-destacado"> <span>Desarrolladora:</span> ${data[0].desarrollador}<br><br> <span>Genero:</span> ${data[0].genero}<br><br><span>Año:</span> ${data[0].anio }</p>`;
            juegoDestacado.setAttribute("src",`${data[0].imagen1}`);
            console.log(`Fondo establecido: ${juegoDestacado.style.backgroundImage}`);
            
        
        })

    } catch (error) {
        console.error("Error al obtener los juegos:", error);
    }
}

window.onload = function() {
    getDestacado();
};

function volverCatalogo() {
	window.location.href = "./pages/auxiliar-catalogo.html";
}

function paginaDestacado() {
	window.location.href = `./pages/detalle.html?id=${idDestacadoGlobal}`;
}

function paginaError() {
	window.location.href = "./pages/error.html";
}


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


// ? Generación categorías
const apiUrlJuegos = 'http://localhost:3000/juegos';
function sliderMaker(categoria,clases) {
    try {
        fetch(apiUrlJuegos, {
        method: 'GET',
        }).then(response => response.json()).then(juegos => {
            const sliderContenedor = document.getElementById(`${clases}-slider`);
            juegos.forEach(juego => {                
                const juegoCard = `
                    <div class="jueguito ${clases}-jueguito">
                        <a class="link-juego" href= "./pages/detalle.html?id=${juego.id}"
                            ><img
                                src=${juego.imagen2}
                                alt=${juego.titulo}
                        /></a>
                    </div>`;
                if(juego.genero === categoria && juego.publicado === true){
                    sliderContenedor.innerHTML += juegoCard;
                }
                else{ 
                   
                }
        })
        colocarIndicadores(clases);
        activarHover(clases);
        flechasFuncionamiento(clases);
    })
    }
    catch (error) {
        console.error("Error al obtener los juegos:", error);
    };
} 

sliderMaker("Deporte","sport");
sliderMaker("Aventura","adventure");
sliderMaker("Acción","action");


// ? Funcionamiento para categorias


//? ------ Paginación ----- 
function colocarIndicadores(clases) {   
    const fila = document.querySelector(`.${clases}-carousel `);
    const paginas = Math.ceil(document.querySelectorAll(`.${clases}-jueguito`).length/5);
    const flechaIzquierda = document.getElementById(`flecha-izquierda-${clases}`);
    const flechaDerecha = document.getElementById(`flecha-derecha-${clases}`);
    if(paginas == 1){
        flechaDerecha.style.display="none";
        flechaIzquierda.style.display="none";
    }
    else{
        for (let i = 0; i<paginas; i++){
            const indicador = document.createElement('button');
            document.querySelector(`.indicadores-${clases}`).appendChild(indicador);
            if(i == 0){
                indicador.classList.add('activo');
            }
            indicador.addEventListener('click', (event) => {
                fila.scrollLeft = i * fila.offsetWidth;
                document.querySelector(`.indicadores-${clases} .activo`).classList.remove('activo');
                event.target.classList.add('activo');
            })
        }
}}



// ? Event listener para la flecha derecha

function flechasFuncionamiento (clases){
    const fila = document.querySelector(`.${clases}-carousel`);
    const flechaIzquierda = document.getElementById(`flecha-izquierda-${clases}`);
    const flechaDerecha = document.getElementById(`flecha-derecha-${clases}`);
    
    flechaDerecha.addEventListener('click',()=>{
        fila.scrollLeft += fila.offsetWidth;
        
        const indicadorActivo= document.querySelector(`.indicadores-${clases} .activo`);
        if(indicadorActivo.nextSibling) //pregunta si tengo un elemento a la derecha para cambiarlo
        {
            indicadorActivo.nextSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    })
    
    flechaIzquierda.addEventListener('click',()=>{
        fila.scrollLeft -= fila.offsetWidth;
        const indicadorActivo= document.querySelector(`.indicadores-${clases} .activo`);
        if(indicadorActivo.previousSibling) //pregunta si tengo un elemento a la derecha para cambiarlo
        {
            indicadorActivo.previousSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    })
}
    
//? ------ Hover ----- 

function activarHover(clases){    
    const fila = document.querySelector(`.${clases}-carousel`);
    const jueguitos = document.querySelectorAll(`.${clases}-jueguito`); 
    jueguitos.forEach((jueguito) => {
        jueguito.addEventListener('mouseenter', (e) => {
            const elemento = e.currentTarget;
            setTimeout(() => {
                jueguitos.forEach(jueguito => jueguito.classList.remove('hover'));
                elemento.classList.add('hover');
            }, 300);
        });
    });

    fila.addEventListener('mouseleave', () => {
        jueguitos.forEach(jueguito => jueguito.classList.remove('hover'));
    });
}



