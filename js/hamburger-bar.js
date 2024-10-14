const menuToggle = document.getElementById('hamburguer-menu');
const mobileNavbar = document.getElementById('navbar');


menuToggle.addEventListener('click', () => {
    mobileNavbar.classList.toggle('active'); 
});


menuToggle.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        mobileNavbar.classList.toggle('active');
    }
});


document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !mobileNavbar.contains(event.target)) {
        mobileNavbar.classList.remove('active');
    }
});


menuToggle.addEventListener('click', () => {
    console.log('Menu toggle clicado');  
    mobileNavbar.classList.toggle('active');
});