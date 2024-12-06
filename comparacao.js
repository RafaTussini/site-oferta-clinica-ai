document.addEventListener('DOMContentLoaded', () => {
    const colunas = document.querySelectorAll('.coluna');
    
    const observerConfig = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animacaoEntrada = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
                entry.target.style.opacity = '1';
            }
        });
    }, observerConfig);

    colunas.forEach(coluna => {
        coluna.style.opacity = '0';
        animacaoEntrada.observe(coluna);
    });
});