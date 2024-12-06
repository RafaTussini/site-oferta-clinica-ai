document.addEventListener('DOMContentLoaded', () => {
    const beneficioItems = document.querySelectorAll('.beneficio-item');

    beneficioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Animação de hover
            gsap.to(item, {
                scale: 1.05,
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                duration: 0.3
            });
        });

        item.addEventListener('mouseleave', () => {
            // Reverter animação
            gsap.to(item, {
                scale: 1,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                duration: 0.3
            });
        });
    });

    // Animação de entrada
    gsap.from('.beneficios-linha', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
    });
});
