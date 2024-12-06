class PlanosInteracao {
    constructor() {
        this.planos = document.querySelectorAll('.plano-card');
        this.botoes = document.querySelectorAll('.btn-plano');
        
        // Adicionar variáveis para armazenar estado
        this.leadCapturado = false;
        this.ultimoPlanoSelecionado = null;
        
        this.inicializarEventos();
    }

    // Métodos anteriores permanecem iguais...

    // Adicionar validação de formulário
    validarFormulario(formulario) {
        const campos = formulario.querySelectorAll('input');
        let formularioValido = true;

        campos.forEach(campo => {
            // Remover erros anteriores
            this.limparErro(campo);

            // Validações específicas
            switch(campo.name) {
                case 'nome':
                    if (!this.validarNome(campo.value)) {
                        this.mostrarErro(campo, 'Digite nome completo');
                        formularioValido = false;
                    }
                    break;
                case 'whatsapp':
                    if (!this.validarWhatsApp(campo.value)) {
                        this.mostrarErro(campo, 'WhatsApp inválido');
                        formularioValido = false;
                    }
                    break;
                case 'email':
                    if (!this.validarEmail(campo.value)) {
                        this.mostrarErro(campo, 'Email inválido');
                        formularioValido = false;
                    }
                    break;
            }
        });

        return formularioValido;
    }

    // Métodos de validação
    validarNome(nome) {
        return nome.trim().split(' ').length >= 2;
    }

    validarWhatsApp(whatsapp) {
        // Regex para validar formato de WhatsApp
        const regexWhatsApp = /^\(\d{2}\)\s*\d{4,5}-\d{4}$/;
        return regexWhatsApp.test(whatsapp);
    }

    validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    // Métodos para tratamento de erros
    mostrarErro(campo, mensagem) {
        const grupoForm = campo.closest('.form-grupo');
        const erroElemento = document.createElement('div');
        erroElemento.classList.add('erro-mensagem');
        erroElemento.textContent = mensagem;
        grupoForm.appendChild(erroElemento);
        campo.classList.add('input-erro');
    }

    limparErro(campo) {
        const grupoForm = campo.closest('.form-grupo');
        const erroAnterior = grupoForm.querySelector('.erro-mensagem');
        if (erroAnterior) {
            erroAnterior.remove();
        }
        campo.classList.remove('input-erro');
    }

    // Método de processamento de formulário atualizado
    processarFormulario(formulario, plano) {
        // Adicionar máscara de telefone
        this.aplicarMascaraWhatsApp(formulario);

        // Validar formulário antes de processar
        if (!this.validarFormulario(formulario)) {
            return;
        }

        const dadosFormulario = new FormData(formulario);
        const dadosLead = {
            nome: dadosFormulario.get('nome'),
            whatsapp: dadosFormulario.get('whatsapp'),
            email: dadosFormulario.get('email'),
            plano: plano
        };

        // Marcar lead como capturado
        this.leadCapturado = true;
        this.ultimoPlanoSelecionado = plano;

        // Enviar lead
        this.enviarLead(dadosLead);
    }

    // Adicionar máscara de WhatsApp
    aplicarMascaraWhatsApp(formulario) {
        const campoWhatsApp = formulario.querySelector('input[name="whatsapp"]');
        campoWhatsApp.addEventListener('input', (evento) => {
            let valor = evento.target.value.replace(/\D/g, '');
            valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
            valor = valor.replace(/(\d{4,5})(\d{4})$/, "$1-$2");
            evento.target.value = valor;
        });
    }

    // Método de envio de lead atualizado
    enviarLead(dadosLead) {
        // Log de lead capturado
        console.log('Lead capturado:', dadosLead);

        // Simular envio para API
        this.simularEnvioAPI(dadosLead)
            .then(resposta => {
                this.exibirSucesso(resposta);
            })
            .catch(erro => {
                this.exibirErro(erro);
            });
    }

    // Simular envio para API
    simularEnvioAPI(dadosLead) {
        return new Promise((resolve, reject) => {
            // Simulação de envio
            setTimeout(() => {
                // Simular sucesso ou falha
                if (Math.random() > 0.1) { // 90% de chance de sucesso
                    resolve({
                        status: 'sucesso',
                        mensagem: 'Lead capturado com sucesso!'
                    });
                } else {
                    reject({
                        status: 'erro',
                        mensagem: 'Falha ao enviar lead. Tente novamente.'
                    });
                }
            }, 1500); // Simular tempo de requisição
        });
    }

    // Método para exibir mensagem de sucesso
    exibirSucesso(resposta) {
        const modal = document.querySelector('.modal-lead');
        modal.innerHTML = `
            <div class="modal-sucesso">
                <h2>Proposta Solicitada!</h2>
                <p>${resposta.mensagem}</p>
                <button class="btn-fechar">Fechar</button>
            </div>
        `;

        // Adicionar evento para fechar
        const btnFechar = modal.querySelector('.btn-fechar');
        btnFechar.addEventListener('click', () => {
            document.querySelector('.modal-overlay').remove();
        });
    }

    // Método para exibir mensagem de erro
    exibirErro(erro) {
        const modal = document.querySelector('.modal-lead');
        modal.innerHTML = `
            <div class="modal-erro">
                <h2>Ops! Algo deu errado</h2>
                <p>${erro.mensagem}</p>
                <button class="btn-tentar-novamente">Tentar Novamente</button>
            </div>
        `;
    }

    // Método para tracking avançado
    registrarVisualizacao(plano) {
        const nomePlano = plano.querySelector('h3').textContent;
        
        // Enviar dados de visualização para analytics
        this.enviarAnalytics('visualizacao_plano', {
            plano: nomePlano,
            timestamp: new Date().toISOString(),
            duracaoVisualizacao: Date.now()
        });
    }

    // Método fictício de envio para analytics
    enviarAnalytics(evento, dados) {
        console.log(`Evento de Analytics: ${evento}`, dados);
        // Aqui você integraria com Google Analytics, Mixpanel, etc.
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new PlanosInteracao();
});