const menuToggle = document.querySelector('.hamburguer-menu');
const mobileNavbar = document.querySelector('.navbar.mobile-menu');

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