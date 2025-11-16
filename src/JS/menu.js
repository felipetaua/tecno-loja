const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMobileMenu = document.getElementById('close-mobile-menu');

function openMenu() {
    hamburgerMenu.classList.add('active');
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburgerMenu.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = ''; 
}

hamburgerMenu.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

closeMobileMenu.addEventListener('click', closeMenu);
mobileMenuOverlay.addEventListener('click', closeMenu);

const mobileMenuLinks = document.querySelectorAll('.mobile-menu-items a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        closeMenu();
    }
});
