class FuncionalidadesInteracao {
    constructor() {
        this.cards = document.querySelectorAll('.funcionalidade-card');
        this.inicializarAnimacoes();
        this.adicionarInteracaoCards();
    }

    inicializarAnimacoes() {
        const observerConfig = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const aparecer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__fadeInUp');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerConfig);

        this.cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            aparecer.observe(card);
        });
    }

    adicionarInteracaoCards() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', this.adicionarEfeitoHover);
            card.addEventListener('mouseleave', this.removerEfeitoHover);
        });
    }

    adicionarEfeitoHover(evento) {
        const card = evento.currentTarget;
        card.style.transform = 'scale(1.05)';
        card.style.zIndex = '10';
    }

    removerEfeitoHover(evento) {
        const card = evento.currentTarget;
        card.style.transform = 'scale(1)';
        card.style.zIndex = '1';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FuncionalidadesInteracao();
});