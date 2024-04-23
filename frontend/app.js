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
            idDestacadoGlobal =  data[0].id;
            tituloDestacado.innerHTML = `${data[0].titulo.toUpperCase()}
            `;
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
                if(juego.genero === categoria && juego.publicado === "true"){
                    sliderContenedor.innerHTML += juegoCard;
                    console.log("Se agregó una tarjeta")
                }
                else{ 
                    console.log(`No hay nada que agregar: ${juego.publicado} y ${juego.genero}`);
                    console.log(juego.genero === clases && juego.publicado === true);
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


// ? Funcionamiento para categorias


//? ------ Paginación ----- 
function colocarIndicadores(clases) {   
    const fila = document.querySelector(`.${clases}-carousel `);
    const paginas = Math.ceil(document.querySelectorAll(`.${clases}-jueguito`).length/5);
    if(paginas == 1){
        flechaDerecha.style.display="none";
        flechaIzquierda.style.display="none";
    }
    else{
        console.log(paginas);
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



