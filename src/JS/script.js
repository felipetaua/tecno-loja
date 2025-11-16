document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            // Se rolou mais que o limite, adiciona a classe para encolher
            header.classList.add('header-scrolled');
        } else {
            // Caso contrário, remove a classe para voltar ao tamanho original
            header.classList.remove('header-scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    handleScroll();
});