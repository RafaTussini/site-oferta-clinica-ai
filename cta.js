document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-final');
    const botaoSubmit = formulario.querySelector('.btn-submit');

    // Validação de campos em tempo real
    const camposValidacao = formulario.querySelectorAll('input, select');
    camposValidacao.forEach(campo => {
        campo.addEventListener('blur', () => {
            validarCampo(campo);
        });

        campo.addEventListener('input', () => {
            limparValidacao(campo);
        });
    });

    // Função de validação individual de campo
    function validarCampo(campo) {
        if (campo.value.trim() === '') {
            mostrarErro(campo, 'Campo obrigatório');
            return false;
        }

        // Validações específicas
        switch(campo.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(campo.value)) {
                    mostrarErro(campo, 'E-mail inválido');
                    return false;
                }
                break;
            
            case 'tel':
                const telefoneRegex = /^\d{10,11}$/;
                if (!telefoneRegex.test(campo.value.replace(/\D/g, ''))) {
                    mostrarErro(campo, 'Telefone inválido');
                    return false;
                }
                break;
        }

        return true;
    }

    // Mostrar mensagem de erro
    function mostrarErro(campo, mensagem) {
        // Remove erros anteriores
        const erroExistente = campo.parentElement.querySelector('.erro-validacao');
        if (erroExistente) {
            erroExistente.remove();
        }

        // Cria elemento de erro
        const erroElemento = document.createElement('div');
        erroElemento.classList.add('erro-validacao');
        erroElemento.textContent = mensagem;
        
        // Adiciona estilo de erro
        campo.classList.add('input-erro');
        campo.parentElement.appendChild(erroElemento);
    }

    // Limpar validação
    function limparValidacao(campo) {
        campo.classList.remove('input-erro');
        const erroElemento = campo.parentElement.querySelector('.erro-validacao');
        if (erroElemento) {
            erroElemento.remove();
        }
    }

    // Submissão do formulário
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação geral
        let formularioValido = true;
        camposValidacao.forEach(campo => {
            if (!validarCampo(campo)) {
                formularioValido = false;
            }
        });

        // Se formulário válido, processa o envio
        if (formularioValido) {
            // Estado de carregamento
            botaoSubmit.innerHTML = `
                Enviando 
                <i class="fas fa-spinner fa-spin"></i>
            `;
            botaoSubmit.disabled = true;

            // Simula envio assíncrono
            simularEnvioFormulario()
                .then(resposta => {
                    // Sucesso
                    botaoSubmit.innerHTML = `
                        Cadastro Realizado! 
                        <i class="fas fa-check"></i>
                    `;
                    botaoSubmit.style.backgroundColor = '#2ecc71';
                    
                    // Reseta o formulário após 3 segundos
                    setTimeout(() => {
                        formulario.reset();
                        botaoSubmit.innerHTML = 'Garantir Minha Vaga <i class="fas fa-chevron-right"></i>';
                        botaoSubmit.style.backgroundColor = ''; // Volta ao original
                        botaoSubmit.disabled = false;
                    }, 3000);
                })
                .catch(erro => {
                    // Erro no envio
                    botaoSubmit.innerHTML = `
                        Erro no Envio 
                        <i class="fas fa-times"></i>
                    `;
                    botaoSubmit.style.backgroundColor = '#e74c3c';
                    
                    // Reseta após 3 segundos
                    setTimeout(() => {
                        botaoSubmit.innerHTML = 'Garantir Minha Vaga <i class="fas fa-chevron-right"></i>';
                        botaoSubmit.style.backgroundColor = ''; // Volta ao original
                        botaoSubmit.disabled = false;
                    }, 3000);
                });
        }
    });

    // Função simulada de envio
    function simularEnvioFormulario() {
        return new Promise((resolve, reject) => {
            // Simula uma chamada de API
            setTimeout(() => {
                // 80% de chance de sucesso
                Math.random() > 0.2 ? resolve() : reject();
            }, 2000);
        });
    }

    // Animação de entrada
    const ctaConteudo = document.querySelector('.cta-conteudo');
    
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

    ctaConteudo.style.opacity = '0';
    animacaoEntrada.observe(ctaConteudo);
});
