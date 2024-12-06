document.addEventListener('DOMContentLoaded', () => {
    const garantiaConteudo = document.querySelector('.garantia-conteudo');
    
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

    garantiaConteudo.style.opacity = '0';
    animacaoEntrada.observe(garantiaConteudo);
});