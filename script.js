(function() {
    'use strict';

    // Плавная прокрутка
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Анимация появления при скролле
    const animated = document.querySelectorAll('.work-card, .review-card, .about__list li, .stat');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.15 });
        animated.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    } else {
        animated.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // Подсветка активного меню
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__list a');
    function updateNav() {
        let current = '';
        const scrollPos = window.scrollY + headerHeight + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.style.color = '';
            link.style.borderColor = 'transparent';
            const href = link.getAttribute('href').replace('#', '');
            if (href === current) {
                link.style.color = '#C0392B';
                link.style.borderColor = '#C0392B';
            }
        });
    }
    if (navLinks.length) {
        window.addEventListener('scroll', updateNav, { passive: true });
        window.addEventListener('load', () => setTimeout(updateNav, 100));
    }

    console.log('Ремонт в Новороссийске | Рафаэл Рамазян');
    console.log('Телефон: 8 (988) 666-23-03');
})();
