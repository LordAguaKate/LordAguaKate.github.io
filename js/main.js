document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });

    // 2. Scroll Animation (Fade-In)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.animate-on-scroll');
    fadeElements.forEach(el => {
        el.classList.add('fade-in'); // Add base class from CSS
        observer.observe(el);
    });

    // 3. Highlight Active Nav Link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            link.classList.add('text-slate-300');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary');
                link.classList.remove('text-slate-300');
            }
        });
    });

    // 4. Validación robusta del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Expresión regular (Regex) robusta para validar correos reales
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(emailInput.value)) {
                // Si el correo NO es válido, detenemos el envío del formulario
                e.preventDefault();
                
                // Mostramos el texto de error
                emailError.classList.remove('hidden');
                
                // Le ponemos un borde rojo al input para resaltarlo
                emailInput.classList.add('border-red-500');
                emailInput.classList.remove('border-slate-600');
            }
        });

        // Este evento quita el error en cuanto el usuario empieza a corregir el texto
        emailInput.addEventListener('input', function() {
            emailError.classList.add('hidden');
            emailInput.classList.remove('border-red-500');
            emailInput.classList.add('border-slate-600');
        });
    }
});
