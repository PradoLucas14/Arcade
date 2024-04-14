const apiUrl = 'http://localhost:3000/juegos';

function cargarPeliculas() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const gameList = document.getElementById('movieList');
        gameList.innerHTML = '';

        data.forEach(game => {
            const li = document.createElement('li');
            
            const link = document.createElement('a');
            link.href = `detalle.html?id=${game.id}`;
            link.textContent = `${game.titulo} - ${game.anio}`;

            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.onclick = () => eliminarPelicula(game.id);

            li.appendChild(link);
            li.appendChild(btnEliminar);
            gameList.appendChild(li);
        });
    });
}

function agregarPelicula() {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const anio = document.getElementById('anio').value;

    const game = {
        titulo,
        descripcion,
        anio: parseInt(anio)
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
    })
    .then(response => response.json())
    .then(() => {
        cargarPeliculas();
        document.getElementById('titulo').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('anio').value = '';
    });
}

function eliminarPelicula(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => cargarPeliculas());
}

// Cargar películas al inicio
cargarPeliculas();