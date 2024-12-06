class DepoimentosInteracao {
    constructor() {
        this.slider = document.querySelector('.depoimentos-slider');
        this.cards = document.querySelectorAll('.depoimento-card');
        this.estatisticas = document.querySelectorAll('.estatistica-item');
        
        this.inicializarAnimacoes();
        this.configurarInteracaoSlider();
        this.animarEstatisticas();
    }

    inicializarAnimacoes() {
        const observerConfig = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const appearObserver = new IntersectionObserver((entries) => {
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
            appearObserver.observe(card);
        });
    }

    configurarInteracaoSlider() {
        let isDragging = false;
        let startX, scrollLeft;

        const stopDragging = () => {
            isDragging = false;
            this.slider.classList.remove('dragging');
        };

        const startDragging = (e) => {
            isDragging = true;
            this.slider.classList.add('dragging');
            startX = e.pageX - this.slider.offsetLeft;
            scrollLeft = this.slider.scrollLeft;
        };

        const drag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - this.slider.offsetLeft;
            const walk = (x - startX) * 2;
            this.slider.scrollLeft = scrollLeft - walk;
        };

        // Eventos de mouse
        this.slider.addEventListener('mousedown', startDragging);
        this.slider.addEventListener('mouseleave', stopDragging);
        this.slider.addEventListener('mouseup', stopDragging);
        this.slider.addEventListener('mousemove', drag);

        // Eventos de toque
        this.slider.addEventListener('touchstart', (e) => {
            startDragging(e.touches[0]);
        });

        this.slider.addEventListener('touchmove', (e) => {
            drag(e.touches[0]);
        });

        this.slider.addEventListener('touchend', stopDragging);
    }

    animarEstatisticas() {
        const animarNumero = (elemento) => {
            const valorFinal = parseInt(elemento.textContent);
            let valorAtual = 0;

            const animacao = setInterval(() => {
                valorAtual += Math.ceil(valorFinal / 50);
                
                if (valorAtual >= valorFinal) {
                    valorAtual = valorFinal;
                    clearInterval(animacao);
                }

                elemento.textContent = valorAtual + 
                    (elemento.nextElementSibling.textContent.includes('%') ? '%' : '');
            }, 20);
        };

        const observerConfig = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const estatisticaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numeroElemento = entry.target.querySelector('h3');
                    animarNumero(numeroElemento);
                    entry.target.classList.add('animate__fadeIn');
                }
            });
        }, observerConfig);

        this.estatisticas.forEach(estatistica => {
            estatistica.style.opacity = '0';
            estatisticaObserver.observe(estatistica);
        });
    }
}

// Inicialização quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    new DepoimentosInteracao();
});