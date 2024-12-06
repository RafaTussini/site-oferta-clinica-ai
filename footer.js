document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseover', (e) => {
            e.target.style.color = '#2ecc71';  // Verde destaque
        });

        link.addEventListener('mouseout', (e) => {
            e.target.style.color = 'white';
        });
    });

    const columnTitles = document.querySelectorAll('.footer-column h4');
    
    columnTitles.forEach(title => {
        title.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateX(10px)';
            e.target.style.transition = 'transform 0.3s ease';
        });

        title.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'translateX(0)';
        });
    });

    // Animação sutil de entrada
    const footer = document.querySelector('.footer');
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(50px)';

    setTimeout(() => {
        footer.style.transition = 'all 0.8s ease';
        footer.style.opacity = '1';
        footer.style.transform = 'translateY(0)';
    }, 100);
});