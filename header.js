document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', () => {
        // Adicionar lógica de captura de lead
        Swal.fire({
            title: 'Demonstração Gratuita',
            text: 'Preencha seus dados para agendar!',
            // Configurações adicionais do modal
        });
    });

    // Adicionar animações GSAP se necessário
});