const nombreUsuarioIngresado = document.querySelector('#user');
const contraseñaIngresada = document.querySelector('#password');
const iniciarSesion = document.querySelector('#init');
const todoForm = document.querySelector('#todo-form');
fetch('http://localhost:3000/usuarios', {
  method: 'GET',
}).then(response => response.json()).then(data => {
  const nombreuruario = data[0].nombre;
  const contrasenausuario = data[0].contraseña;
  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
  })
  iniciarSesion.addEventListener('click', () => {
    const inputLogin = document.querySelector('#user');
    const contraseñaLogin = document.querySelector('#password');
    data.forEach(element => {
      const nombreUsuarioIngresado = document.querySelector('#user');
      const contraseñaIngresada = document.querySelector('#password');
      if (element.nombre === nombreUsuarioIngresado.value && element.contraseña === contraseñaIngresada.value) {
        if (nombreuruario === nombreUsuarioIngresado.value && contrasenausuario === contraseñaIngresada.value) {
          window.location.href = '../pages/adminstrador.html';

          inputLogin.value = '';
          contraseñaLogin.value = '';
        }
      }
      else {
        alert('El usuario o contraseña ingresados no existen');
        inputLogin.value = '';
        contraseñaLogin.value = '';
      }
    });
  })
});


const navElement = document.querySelector('.navbar');
window.addEventListener('scroll', () =>{
    if(window.scrollY>50){
        navElement.classList.add('navbar-scrolled')
    }
    else{
        navElement.classList.remove('navbar-scrolled')
    }
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
const codigo1 = document.querySelector('#codigo1');
const codigo2 = document.querySelector('#codigo2');
const codigo3 = document.querySelector('#codigo3');
const codigo4 = document.querySelector('#codigo4');
btnRec1.addEventListener('click', verificacion);
btnRec2.addEventListener('click', () => {
  let codigo = []
  if (codigo1.value != '' && codigo2.value != '' && codigo3.value != '' && codigo4.value != '') {
    codigo.push(codigo1);
    codigo.push(codigo2);
    codigo.push(codigo3);
    codigo.push(codigo4);
  }
  else {
    alert('Debe completar con el codigo enviado');
  }
  if (codigo.length === 4) {
    passRec3.style.display = "block";
    passRec2.style.display = "none";
    passRec1.style.display = "none";
  }

});
btnRec3.addEventListener('click', () => {
  let password1 = document.querySelector('#pass1').value;
  let password2 = document.querySelector('#pass2').value;
  const pass1 = String(password1);
  const pass2 = String(password2);
  if (pass1 === pass2) {
    form.submit();
  }
})
