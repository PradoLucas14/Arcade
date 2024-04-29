//? Navbar y links

const navElement = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navElement.classList.add('navbar-scrolled')
  }
  else {
    navElement.classList.remove('navbar-scrolled')
  }
});