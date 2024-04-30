const nombreUsuarioIngresado = document.querySelector('#user');
const contraseñaIngresada = document.querySelector('#password');
const iniciarSesion = document.querySelector('#init');
const todoForm = document.querySelector('#todo-form');

fetch('https://json-server-proyecto2.onrender.com/usuarios', {
  method: 'GET',
}).then(response => response.json()).then(data => {
  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });
  iniciarSesion.addEventListener('click', () => {
    const inputLogin = document.querySelector('#user');
    const contraseñaLogin = document.querySelector('#password');
    const busquedaUsuario = data.find(user => user.nombre === inputLogin.value && user.contraseña === contraseñaLogin.value)
    if (busquedaUsuario) {
      if (busquedaUsuario.admin) {
        logueado(busquedaUsuario.id);
        inputLogin.value = '';
        contraseñaLogin.value = '';
    
        // Esperar 10 milisegundos antes de redirigir
        setTimeout(function() {
            window.location.href = '../pages/adminstrador.html';
        }, 200);
    }
      else {
        logueado(busquedaUsuario.id);
        inputLogin.value = '';
        contraseñaLogin.value = '';
        setTimeout(function() {
          window.location.href = '../index.html';
      }, 800);
      }
    }
    else {
      if (inputLogin.value === '' && contraseñaLogin.value === '') { let a = 1 }
      else {
        alert('El usuario o contraseña ingresados no existen');
        inputLogin.value = '';
        contraseñaLogin.value = '';
      }
    }
  })
});



const passRec1 = document.querySelector('#part1');
const passRec2 = document.querySelector('#part2');
const passRec3 = document.querySelector('#part3');
const btnRec1 = document.querySelector('#btnPart1');
const btnRec2 = document.querySelector('#btnPart2');
const btnRec3 = document.querySelector('#btnPart3');
const password2 = document.querySelector('#pass2');
const Input = document.querySelector('#usuario');
const Input1 = document.querySelector('#codigo1');
const Input2 = document.querySelector('#codigo2');
const Input3 = document.querySelector('#codigo3');
const Input4 = document.querySelector('#codigo4');
const btnclose = document.querySelector('#close');
const form = document.querySelector('#form');

passRec2.style.display = "none";
passRec3.style.display = "none";
btnclose.addEventListener('click', () => {
  passRec2.style.display = "none";
  passRec3.style.display = "none";
  passRec1.style.display = "block";
  Input.value = '';
  Input1.value = '';
  Input2.value = '';
  Input3.value = '';
  Input4.value = '';
})

function verificacion() {
  let usuario = document.getElementById('usuario').value;
  const user = String(usuario);
  a = 0;
  for (let i = 0; i < user.length; i++) {
    if (user[i] === '@') {
      if (usuario.length != 0) {
        passRec2.style.display = "block";
        passRec1.style.display = "none";
      }
      a = 1;
    }

  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
})

btnRec1.addEventListener('click', verificacion);

// Obtener todos los inputs
const codeBoxes = document.querySelectorAll('.codeBoxes');

// Función para manejar el evento input en los inputs
function handleInput(event, index) {
  if (event.inputType === 'deleteContentBackward' && index > 0) {
    codeBoxes[index - 1].focus();
  } else if (index < codeBoxes.length - 1 && event.data !== null) {
    codeBoxes[index + 1].focus();
  }
}

// Agregar event listeners a los inputs
codeBoxes.forEach((box, index) => {
  box.addEventListener('input', (event) => {
    handleInput(event, index);
  });

  box.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' && index > 0 && box.value.length === 0) {
      codeBoxes[index - 1].focus();
    }
  });

  // Manejar el evento keydown para el último input
  if (index === codeBoxes.length - 1) {
    box.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && box.value.length === 0) {
        codeBoxes[index - 1].focus();
      }
    });
  }
});

aviso = document.querySelector('#aviso');
aviso2 = document.querySelector('#aviso2');
aviso.style.display = "none";
aviso2.style.display = "none";

// Mostrar el siguiente paso al hacer clic en el botón btnRec2
btnRec2.addEventListener('click', () => {
  const codigo1 = document.getElementById('codigo1').value;
  const codigo2 = document.getElementById('codigo2').value;
  const codigo3 = document.getElementById('codigo3').value;
  const codigo4 = document.getElementById('codigo4').value;

  // Verificar si todos los inputs tienen algún valor
  if (codigo1 && codigo2 && codigo3 && codigo4) {
    // Si todos los inputs están completos, mostrar el siguiente paso
    passRec3.style.display = "block";
    passRec2.style.display = "none";
    passRec1.style.display = "none";
  } else {
    aviso.style.display = "block";
  }
});

btnRec3.addEventListener('click', () => {
  let password1 = document.querySelector('#pass1').value;
  let password2 = document.querySelector('#pass2').value;
  const pass1 = String(password1);
  const pass2 = String(password2);
  if (pass1 === pass2) {
    form.submit();
    password1.value = '';
    password2.value = '';
  }
  else {
    aviso2.style.display = "block";
  }
})

//Funcion logueado
async function logueado(id) {
  await axios.patch(`https://json-server-proyecto2.onrender.com/usuarios/${id}`, { logueado: true });fetch(`https://json-server-proyecto2.onrender.com/usuarios/${id}`)
}

const passwordField = document.getElementById("password");
const passwordField2 = document.getElementById("pass1");
const passwordField3 = document.getElementById("pass2");

function togglePasswordVisibility(passwordField) {
  const togglePasswordButton = document.getElementById("togglePassword");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePasswordButton.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
  } else {
    passwordField.type = "password";
    togglePasswordButton.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
  }
}
const togglePasswordButton = document.getElementById("togglePassword");
const togglePasswordButton1 = document.getElementById("togglePassword1");
const togglePasswordButton2 = document.getElementById("togglePassword2");

togglePasswordButton.addEventListener('click', () => {
  togglePasswordVisibility(passwordField)
});
togglePasswordButton1.addEventListener('click', () => {
  togglePasswordVisibility(passwordField2)
});
togglePasswordButton2.addEventListener('click', () => {
  togglePasswordVisibility(passwordField3)
});
//Funcion logueado
async function logueado(id) {
  fetch(`https://json-server-proyecto2.onrender.com/usuarios/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      logueado: true,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
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
        } else {
            console.log("No hay ningún usuario logueado.");
        }
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

linkSesion.addEventListener("click",cerrarSesion);