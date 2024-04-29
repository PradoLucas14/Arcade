/* --------------- Registrar Juegos --------------- */

async function createJuego() {
    const titulo = document.getElementById("titulo").value;
    const desarrollador = document.getElementById("desarrollador").value;
    const anio = document.getElementById("anio").value;
    const plataforma = document.getElementById("plataforma").value;
    const genero = document.getElementById("genero").value;
    const tamanio = document.getElementById("tamanio").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;
    const publicadoString = document.getElementById("publicado").value;
    const publicado = publicadoString === "true";
    const imagen1 = document.getElementById("imagen1").value;
    const imagen2 = document.getElementById("imagen2").value;
    const imagen3 = document.getElementById("imagen3").value;

    if (titulo !== "" && desarrollador !== "" && anio !== "" &&
        plataforma !== "" && genero !== "" && descripcion !== "" &&
        publicado !== "" && tamanio !== "" && precio !== "" &&
        imagen1 !== "" && imagen2 !== "" && imagen3 !== "") {

        const nuevoJuego = {
            titulo: titulo,
            desarrollador: desarrollador,
            anio: anio,
            plataforma: plataforma,
            genero: genero,
            tamanio: tamanio,
            precio: precio,
            descripcion: descripcion,
            publicado: publicado,
            imagen1: imagen1,
            imagen2: imagen2,
            imagen3: imagen3
        };

        try {
            await axios.post("https://json-server-proyecto2.onrender.com/juegos", nuevoJuego);
            Swal.fire({
                title: '¡Éxito!',
                text: 'Se registró un juego nuevo',
                icon: 'success',
                timer: 3000, // Duración en milisegundos (3 segundos en este caso)
                timerProgressBar: true, // Barra de progreso
                showConfirmButton: false // No mostrar el botón de confirmación
            });
        } catch (error) {
            Swal.fire({
                title: '¡Error!',
                text: 'No se pudo registrar el juego',
                icon: 'error',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    } else {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Se deben ingresar todos los campos',
            icon: 'warning',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }
}

/* --------------- Visualizar Juegos --------------- */
let paginaActual = 1;
const resultadosPorPagina = 10;

async function getJuegos() {
    try {
        const response = await axios.get("https://json-server-proyecto2.onrender.com/juegos");
        const juegos = response.data;
        mostrarJuegosEnTabla(juegos);
        actualizarSliderPaginas(juegos); // Llama a la función para actualizar el slider de páginas
    } catch (error) {
        console.error("Error al obtener los juegos:", error);
    }
}

function mostrarJuegosEnTabla(juegos) {
    // Obtener el índice inicial y final de los juegos para la página actual
    const indiceInicio = (paginaActual - 1) * resultadosPorPagina;
    const indiceFin = paginaActual * resultadosPorPagina;
    const juegosPaginados = juegos.slice(indiceInicio, indiceFin);

    const tablaJuegos = document.getElementById("tablaJuegos");
    tablaJuegos.innerHTML = "";

    juegosPaginados.forEach(juego => {
        const iconoTrue = '<i class="bi bi-check-square-fill"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-check-square-fill" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg></i>';
        const iconoFalse = '<i class="bi bi-x-square-fill"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#DE0202" class="bi bi-x-square-fill" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708"/></svg></i>';
        
        const esPublicado = juego.publicado;
        const iconoPublicado = esPublicado ? iconoTrue : iconoFalse;
        
        const fila = `
            <tr class="fila">
                <td class="text-center">${juego.id}</td>
                <td>${juego.titulo}</td>
                <td>${juego.genero}</td>
                <td class="descripcion-celda">${juego.descripcion}</td>
                <td class="text-center">${iconoPublicado}</td>
                <td class="funciones">
                    <button class="btn btn-sm editar" onclick="editarJuego('${juego.id}')"><i class="bi bi-pencil-square"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg></i></button>
                    <button class="btn btn-sm eliminar" onclick="eliminarJuego('${juego.id}')"><i class="bi bi-trash3-fill"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg></i></button>
                    <button class="btn btn-sm destacar" onclick="destacarJuego('${juego.id}')"><i class="bi bi-star-fill"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg></i></button>
                </td>
            </tr>`;
        tablaJuegos.innerHTML += fila;
    });
    
    // Actualizar el slider de páginas después de mostrar los juegos en la tabla
    actualizarSliderPaginas(juegos);
}

// Función para ir a la página anterior
function irPaginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        getJuegos();
    }
}

// Función para ir a la página siguiente
function irPaginaSiguiente() {
    paginaActual++;
    getJuegos();
}

function actualizarSliderPaginas(juegos) {
    const cantidadPaginas = Math.ceil(juegos.length / resultadosPorPagina);
    const paginaActualElemento = document.getElementById("paginaActual");

    // Verificar que la página actual no sea mayor que la cantidad total de páginas
    if (paginaActual > cantidadPaginas) {
        paginaActual = cantidadPaginas;
    }

    // Actualizar el contenido del elemento de página actual
    if (paginaActualElemento) {
        paginaActualElemento.textContent = paginaActual;
    }

    // Deshabilitar o habilitar botones de navegación según la página actual
    const botonAnterior = document.querySelector(".anterior");
    const botonSiguiente = document.querySelector(".siguiente");
    
    if (botonAnterior && botonSiguiente) {
        botonAnterior.disabled = paginaActual === 1;
        botonSiguiente.disabled = paginaActual === cantidadPaginas;
    }
}

// Cargar juegos al cargar la página
window.onload = function () {
    getJuegos();
};



/* --------------- Eliminar Juegos --------------- */

async function eliminarJuego(id) {
    try {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        });

        if (result.isConfirmed) {
            const response = await axios.delete(`https://json-server-proyecto2.onrender.com/juegos/${id}`);
            console.log("Juego eliminado correctamente:", response.data);
            // Actualizar la tabla de juegos después de eliminar el juego
            getJuegos();
            Swal.fire(
                '¡Eliminado!',
                'El juego ha sido eliminado.',
                'success'
            );
        }
    } catch (error) {
        console.error("Error al eliminar el juego:", error);
        Swal.fire(
            '¡Error!',
            'No se pudo eliminar el juego.',
            'error'
        );
    }
}

/* --------------- Editar Juegos --------------- */

async function editarJuego(id) {
    try {
        // Obtener el juego correspondiente al ID
        const response = await axios.get(`https://json-server-proyecto2.onrender.com/juegos/${id}`);
        const juego = response.data;

        // Rellenar el formulario del modal con los datos del juego
        document.getElementById("editTitulo").value = juego.titulo;
        document.getElementById("editDesarrollador").value = juego.desarrollador;
        document.getElementById("editAnio").value = juego.anio;
        document.getElementById("editPlataforma").value = juego.plataforma;
        document.getElementById("editGenero").value = juego.genero;
        document.getElementById("editDescripcion").value = juego.descripcion;
        document.getElementById("editImagen1").value = juego.imagen1;
        document.getElementById("editImagen2").value = juego.imagen2;
        document.getElementById("editImagen3").value = juego.imagen3;
        document.getElementById("editTamanio").value = juego.tamanio;
        document.getElementById("editPrecio").value = juego.precio;
        document.getElementById("editPublicado").value = juego.publicado;

        const modal = new bootstrap.Modal(document.getElementById('modalEditarJuego'));
        modal.show();

        // Agregar evento para actualizar el juego al hacer clic en el botón de guardar
        document.getElementById("btnGuardarEdicion").addEventListener("click", async () => {
            try {
                // Obtener los nuevos valores del formulario
                const titulo = document.getElementById("editTitulo").value;
                const desarrollador = document.getElementById("editDesarrollador").value;
                const anio = document.getElementById("editAnio").value;
                const plataforma = document.getElementById("editPlataforma").value;
                const genero = document.getElementById("editGenero").value;
                const descripcion = document.getElementById("editDescripcion").value;
                const imagen1 = document.getElementById("editImagen1").value;
                const imagen2 = document.getElementById("editImagen2").value;
                const imagen3 = document.getElementById("editImagen3").value;
                const tamanio = document.getElementById("editTamanio").value;
                const precio = document.getElementById("editPrecio").value;
                const publicadoString = document.getElementById("editPublicado").value;
                const publicado = publicadoString === "true";
                
                // Crear objeto con los datos actualizados
                const datosActualizados = {
                    titulo,
                    desarrollador,
                    anio,
                    plataforma,
                    genero,
                    descripcion,
                    imagen1,
                    imagen2,
                    imagen3,
                    tamanio,
                    precio,
                    publicado
                };

                const result = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: "Se actualizarán los datos del juego",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, actualizar'
                });

                if (result.isConfirmed) {
                    // Enviar solicitud PATCH para actualizar los datos del juego
                    await axios.patch(`https://json-server-proyecto2.onrender.com/juegos/${id}`, datosActualizados);

                    // Cerrar el modal después de la actualización
                    modal.hide();

                    // Actualizar la tabla de juegos
                    getJuegos();

                    Swal.fire(
                        '¡Actualizado!',
                        'Los datos del juego han sido actualizados.',
                        'success'
                    );
                }
            } catch (error) {
                console.error("Error al actualizar el juego:", error);
                Swal.fire(
                    '¡Error!',
                    'No se pudo actualizar el juego.',
                    'error'
                );
            }
        });
    } catch (error) {
        console.error("Error al obtener el juego para editar:", error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al obtener el juego para editar',
        });
    }
}

/* --------------- Destacar Juegos --------------- */

async function obtenerDatosJuego(id) {
    const url = `https://json-server-proyecto2.onrender.com/juegos/${id}`;

    try {
        const response = await axios.get(url);
        console.log(response.data)
        return response.data;
        
    } catch (error) {
        console.error('Error al obtener datos del juego:', error);
        return null;
    }
}

async function destacarJuego(id) {
    // Obtener los datos del juego seleccionado
    const datosJuego = await obtenerDatosJuego(id);

    if (datosJuego) {
        // URL del servidor JSON para actualizar los datos del juego destacado con el ID 1
        const url = 'https://json-server-proyecto2.onrender.com/destacado/';
        console.log(url);
        const response = await axios.get(url);
        console.log(response);
        const primerDestacado = response.data[0];
        console.log(primerDestacado);

        // Datos del juego seleccionado
        const juegoSeleccionado = {
            id: datosJuego.id,
            titulo: datosJuego.titulo,
            desarrollador: datosJuego.desarrollador,
            anio: datosJuego.anio,
            genero: datosJuego.genero,
            imagen1: datosJuego.imagen1,
        };

        try {
            console.log(datosJuego.id);
            console.log(juegoSeleccionado.id);
            // Realizar la solicitud PATCH al servidor JSON utilizando Axios y esperar la respuesta
            const response = await axios.patch(`${url}${primerDestacado.id}`, juegoSeleccionado);
            console.log('Juego destacado actualizado exitosamente:', response.data);
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se actualizó el juego destacado exitosamente',
            });
        } catch (error) {
            console.error('Error al actualizar el juego destacado:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'No se pudo actualizar el juego destacado',
            });
        }
    } else {
        console.error('No se pudieron obtener los datos del juego.');
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'No se pudieron obtener los datos del juego',
        });
    }
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
                window.location.href = '../index.html';
            }, 200);
        } else {
            console.log("No hay ningún usuario logueado.");
        }
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

linkSesion.addEventListener("click",cerrarSesion);



