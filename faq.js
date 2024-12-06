document.addEventListener('DOMContentLoaded', () => {
    const accordeonItems = document.querySelectorAll('.accordeon-item');
    const faqSection = document.querySelector('.faq');

    // Função para gerenciar a abertura/fechamento dos itens
    function toggleAccordeon(clickedItem) {
        // Remove a classe 'active' de todos os itens
        accordeonItems.forEach(item => {
            if (item !== clickedItem) {
                item.classList.remove('active');
                
                // Resetar ícone
                const icon = item.querySelector('.accordeon-icon i');
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });

        // Alterna o item clicado
        clickedItem.classList.toggle('active');

        // Atualiza o ícone
        const icon = clickedItem.querySelector('.accordeon-icon i');
        if (clickedItem.classList.contains('active')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    }

    // Adiciona evento de clique em cada item do acordeão
    accordeonItems.forEach(item => {
        const header = item.querySelector('.accordeon-header');
        
        header.addEventListener('click', () => {
            toggleAccordeon(item);
        });

        // Adiciona efeito de hover
        header.addEventListener('mouseenter', () => {
            header.style.backgroundColor = '#f0f4f8';
        });

        header.addEventListener('mouseleave', () => {
            header.style.backgroundColor = '';
        });
    });

    // Animação de entrada com Intersection Observer
    const observerConfig = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animacaoEntrada = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animação de fade-in nos itens
                const items = entry.target.querySelectorAll('.accordeon-item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100); // Delay escalonado
                });

                // Remove o observer após a animação
                animacaoEntrada.unobserve(entry.target);
            }
        });
    }, observerConfig);

    // Observa a seção de FAQ
    if (faqSection) {
        animacaoEntrada.observe(faqSection);
    }

    // Funcionalidade de pesquisa (opcional)
    function setupSearchFunctionality() {
        // Adiciona barra de pesquisa
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('faq-search');
        searchContainer.innerHTML = `
            <input type="text" placeholder="Pesquisar perguntas..." id="faq-search-input">
            <i class="fas fa-search"></i>
        `;

        // Insere antes dos itens do acordeão
        const faqHeader = document.querySelector('.faq-header');
        faqHeader.appendChild(searchContainer);

        const searchInput = document.getElementById('faq-search-input');

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            accordeonItems.forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                const answer = item.querySelector('p').textContent.toLowerCase();

                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Adiciona funcionalidade de pesquisa
    setupSearchFunctionality();

    // Acessibilidade - Navegação por teclado
    function adicionarAcessibilidade() {
        accordeonItems.forEach(item => {
            const header = item.querySelector('.accordeon-header');
            
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');

            header.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    toggleAccordeon(item);
                }
            });

            // Atualiza aria-expanded quando o estado muda
            header.addEventListener('click', () => {
                const isExpanded = item.classList.contains('active');
                header.setAttribute('aria-expanded', isExpanded.toString());
            });
        });
    }

    // Inicializa acessibilidade
    adicionarAcessibilidade();
});
