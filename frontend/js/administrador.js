//METODO POST

async function createJuego(){
    const titulo = document.getElementById("titulo").value
    const desarrollador = document.getElementById("desarrollador").value
    const anio = document.getElementById("anio").value
    const plataforma = document.getElementById("plataforma").value
    const genero = document.getElementById("genero").value
    const tamanio = document.getElementById("tamanio").value
    const precio = document.getElementById("precio").value
    const descripcion = document.getElementById("descripcion").value
    const publicado = document.getElementById("publicado").value
    const imagen1 = document.getElementById("imagen1").value
    const imagen2 = document.getElementById("imagen2").value
    const imagen3 = document.getElementById("imagen3").value

    if(titulo !== "" && desarrollador !== "" && anio !== "" &&
        plataforma !== "" && genero !== "" && descripcion !== "" &&
        publicado !== "" && tamanio !== "" && precio !=="" &&
        imagen1 !== "" && imagen2 !== "" && imagen3 !== ""){

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
        }

        try {
            const res = await axios.post("http://localhost:3000/juegos" , nuevoJuego);
            alert("Se registró un juego nuevo");
            return;
        } catch (error) {
            alert("No se pudo registrar el juego");
            return;
        }
    }else{
        alert("Se deben ingresar todos los campos");
    }
}

//metodo get

async function getJuegos() {
    try {
        const response = await axios.get("http://localhost:3000/juegos");
        const juegos = response.data;
        mostrarJuegosEnTabla(juegos);
    } catch (error) {
        console.error("Error al obtener los juegos:", error);
    }
}


function mostrarJuegosEnTabla(juegos) {
    const tablaJuegos = document.getElementById("tablaJuegos");
    tablaJuegos.innerHTML = "";    
    tablaJuegos.innerHTML
    juegos.forEach(juego => {
        const iconoTrue = '<i class="bi bi-check-square-fill"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-check-square-fill" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg></i>';
        const iconoFalse = '<i class="bi bi-x-square-fill"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#DE0202" class="bi bi-x-square-fill" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/></svg></i>';
        
        const esPublicado = juego.publicado;
        console.log("Valor de juego.publicado:", juego.publicado);
        const iconoPublicado = esPublicado ? iconoTrue : iconoFalse
        
        const fila = `
            <tr class = "fila">
                <td class="text-center">${juego.id}</td>
                <td>${juego.titulo}</td>
                <td>${juego.genero}</td>
                <td>${juego.descripcion}</td>
                <td class="text-center">${iconoPublicado}</td>
                <td class = "funciones">
                    <button class="btn btn-sm editar" onclick="editarJuego(${juego.id})"><i class="bi bi-pencil-square"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg></i></button>
                    <button class="btn btn-sm eliminar" onclick="eliminarJuego(${juego.id})"><i class="bi bi-trash3-fill"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg></i></button>
                    <button class="btn btn-sm destacar" onclick="destacarJuego(${juego.id})"><i class="bi bi-star-fill"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg></i></button>
                </td>
            </tr>`;
        tablaJuegos.innerHTML += fila;
    });
}

/*function mostrarJuegosEnTabla(juegos) {
    const tablaJuegos = document.getElementById("tablaJuegos");
    tablaJuegos.innerHTML = "";
    const encabezados = "<tr><th>Codigo</th><th>Título</th><th>Género</th><th>Descripción</th><th>Publicación</th><th>Funciones</th></tr>";
    tablaJuegos.innerHTML += encabezados;
    juegos.forEach(juego => {
        const fila = `
            <tr>
                <td>${juego.id}</td>
                <td>${juego.titulo}</td>
                <td>${juego.genero}</td>
                <td>${juego.descripcion}</td>
                <td>${juego.publicado}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="editarJuego(${juego.id})"><i class="bi bi-pencil-square"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></i></button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarJuego(${juego.id})"><i class="bi bi-trash3-fill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                  </svg></i></button>
                    <button class="btn btn-info btn-sm" onclick="DestacarJuego(${juego.id})"><i class="bi bi-star"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                  </svg></i></button>
                </td>
            </tr>`;
        tablaJuegos.innerHTML += fila;
    });
}*/


window.onload = function() {
    getJuegos();
};

async function eliminarJuego(id) {
    try {
        if (confirm("¿Estás seguro de que quieres eliminar este juego?")) {
            const response = await axios.delete(`http://localhost:3000/juegos/${id}`);
            console.log("Juego eliminado correctamente:", response.data);
            // Actualizar la tabla de juegos después de eliminar el juego
            getJuegos();
        }
    } catch (error) {
        console.error("Error al eliminar el juego:", error);
    }
}

async function editarJuego(id) {
    try {
        // Obtener el juego correspondiente al ID
        const response = await axios.get(`http://localhost:3000/juegos/${id}`);
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
                const genero = document.getElementById("genero").value;
                const descripcion = document.getElementById("editDescripcion").value;
                const imagen1 = document.getElementById("editImagen1").value;
                const imagen2 = document.getElementById("editImagen2").value;
                const imagen3 = document.getElementById("editImagen3").value;
                const tamanio = document.getElementById("editTamanio").value;
                const precio = document.getElementById("editPrecio").value;
                const publicado = document.getElementById("editPublicado").value;

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

                // Enviar solicitud PATCH para actualizar los datos del juego
                await axios.patch(`http://localhost:3000/juegos/${id}`, datosActualizados);

                // Cerrar el modal después de la actualización
                modal.hide();

                // Actualizar la tabla de juegos
                getJuegos();
            } catch (error) {
                console.error("Error al actualizar el juego:", error);
            }
        });
    } catch (error) {
        console.error("Error al obtener el juego para editar:", error);
    }
}


async function obtenerDatosJuego(id) {
    const url = `http://localhost:3000/juegos/${id}`;

    try {
        const response = await axios.get(url);
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
        const url = 'http://localhost:3000/destacados/1';

        // Datos del juego seleccionado
        const juegoSeleccionado = {
            titulo: datosJuego.titulo,
            desarrolladora: datosJuego.desarrolladora,
            imagen2: datosJuego.imagen2
        };

        try {
            // Realizar la solicitud PATCH al servidor JSON utilizando Axios y esperar la respuesta
            const response = await axios.patch(url, juegoSeleccionado);
            console.log('Juego destacado actualizado exitosamente:', response.data);
            alert("Se actualizó el juego destacado exitosamente");
        } catch (error) {
            console.error('Error al actualizar el juego destacado:', error);
            alert("No se pudo actualizar el juego destacado");
        }
    } else {
        console.error('No se pudieron obtener los datos del juego.');
    }
}








