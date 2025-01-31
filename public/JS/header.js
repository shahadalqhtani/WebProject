document.addEventListener('DOMContentLoaded', function() {
    const menuTrigger = document.querySelector('.menu-trigger');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header-area');

    // Mobile menu toggle
    menuTrigger?.addEventListener('click', function() {
        this.classList.toggle('active');
        nav?.classList.toggle('active');
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('header-sticky');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('header-sticky')) {
            // Scroll Down
            header.classList.add('header-sticky');
        } else if (currentScroll < lastScroll && header.classList.contains('header-sticky')) {
            // Scroll Up
            header.classList.remove('header-sticky');
        }
        lastScroll = currentScroll;
    });
});
