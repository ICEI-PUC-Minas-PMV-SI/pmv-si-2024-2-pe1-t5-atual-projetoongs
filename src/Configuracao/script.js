
document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos do DOM
    const validarCodigoAlteracao = document.getElementById('validarCodigoAlteracao');
    const alterarEmailSenhaBtn = document.getElementById('alterarEmailSenha');
    const opcoesAlteracao = document.getElementById('opcoesAlteracao');
    const alterarEmailBtn = document.getElementById('alterarEmail');
    const alterarSenhaBtn = document.getElementById('alterarSenha');
    const codigoAlteracao = document.getElementById('codigoAlteracao');
    const novaInformacao = document.getElementById('novaInformacao');
    const excluirContaBtn = document.getElementById('excluirConta');
    const codigoExclusao = document.getElementById('codigoExclusao');
    const validarCodigoExclusao = document.getElementById('validarCodigoExclusao');
    const abrirModal = document.getElementById('abrirModal');
    const fecharModal = document.getElementById('fecharModal');
    const modal = document.getElementById('modalConfiguracoes');
    const add = document.getElementById('adicionarPreferencia');

    // Abrir e fechar o modal
    if (abrirModal) {
        abrirModal.addEventListener('click', () => {
            reiniciarModal();
            modal.style.display = 'block';
        });
    }

    if (fecharModal) {
        fecharModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Alternar opções de alteração
    if (alterarEmailSenhaBtn) {
        alterarEmailSenhaBtn.addEventListener('click', () => {
            opcoesAlteracao.classList.toggle('escondido');
        });
    }

    // Validar código de alteração
    if (validarCodigoAlteracao) {
        validarCodigoAlteracao.addEventListener('click', () => {
            const codigoInserido = document.getElementById('codigoInserido').value;
            if (codigoInserido === '1234') {
                document.getElementById('codigoInserido').value = '';
                novaInformacao.classList.remove('escondido');
                alert('Código válido! Agora, insira as informações.');
                codigoAlteracao.classList.add('escondido');
            } else {
                alert('Código incorreto!');
            }
        });
    }

    // Alterar email
    if (alterarEmailBtn) {
        alterarEmailBtn.addEventListener('click', () => {
            solicitarNovoToken();
            codigoAlteracao.classList.remove('escondido');
            novaInformacao.innerHTML = `
                <p>Insira o novo e-mail: <input class="input" type="email" id="novoEmail"></p>
                <button id="confirmarTroca">Confirmar Troca</button>
            `;
            adicionarEventoConfirmacao();
        });
    }
    // Alterar senha
    if (alterarSenhaBtn) {
    alterarSenhaBtn.addEventListener('click', () => {
            solicitarNovoToken();
            codigoAlteracao.classList.remove('escondido');
            novaInformacao.innerHTML = `
                <p>Nova senha: <input class="input" type="password" id="novaSenha1"></p>
                <p>Confirmar senha: <input class="input" type="password" id="novaSenha2"></p>
                <button id="confirmarTroca">Confirmar Troca</button>
            `;
            adicionarEventoConfirmacao();
        });
    }

    // Excluir conta
    if (excluirContaBtn) {
        excluirContaBtn.addEventListener('click', () => {
            alert('Código de exclusão enviado: 4321');
            codigoExclusao.classList.remove('escondido');
        });
    }

    if(validarCodigoExclusao){
        validarCodigoExclusao.addEventListener('click', () => {
            const codigoExclusaoInserido = document.getElementById('codigoExclusaoInserido').value;
            if (codigoExclusaoInserido === '4321') {
                alert('Conta excluída com sucesso!');
                modal.style.display = 'none';
            } else {
                alert('Código incorreto!');
            }
            codigoExclusao.classList.add('escondido');
            document.getElementById('codigoInserido').value = '';
        });
    }
    if(add){
    button.addEventListener('click', adicionarPref);
    }
});

// Funções auxiliares
function reiniciarModal() {
    novaInformacao.innerHTML = '';
    opcoesAlteracao.classList.add('escondido');
    codigoAlteracao.classList.add('escondido');
    const codigoInserido = document.getElementById('codigoInserido');
    if (codigoInserido) {
        codigoInserido.value = '';
    }
}

function solicitarNovoToken() {
    alert('Novo código enviado: 1234');
    document.getElementById('codigoInserido').value = '';
}

function adicionarEventoConfirmacao() {
    setTimeout(() => {
        const confirmarTrocaBtn = document.getElementById('confirmarTroca');
        if (confirmarTrocaBtn) {
            confirmarTrocaBtn.addEventListener('click', () => {
                if (document.getElementById('novoEmail')) {
                    alert('Troca de e-mail sucedida!');
                    novaInformacao.innerHTML = `<p>E-mail alterado com sucesso!</p>`;
                } else {
                    const senha1 = document.getElementById('novaSenha1').value;
                    const senha2 = document.getElementById('novaSenha2').value;
                    if (senha1 === senha2) {
                        alert('Troca de senha sucedida!');
                        novaInformacao.innerHTML = `<p>Senha alterada com sucesso!</p>`;
                    } else {
                        alert('As senhas não coincidem.');
                    }
                }
                novaInformacao.innerHTML += `<button id="voltarInicio">Voltar ao Início</button>`;
                document.getElementById('voltarInicio').addEventListener('click', reiniciarModal);
            });
        }
        novaInformacao.classList.add('escondido');
    }, 500);
}

// Preferências
const input = document.querySelector('#preferenciasInput');
const button = document.querySelector('.addPref');
const listaCompleta = document.querySelector('.pref');
let minhasPreferencias = [];

function adicionarPref() {
    const valor = input.value.trim();
    if (valor === '' || minhasPreferencias.length >= 5) {
        alert('Você só pode adicionar até 5 preferências.');
        return;
    }
    minhasPreferencias.push(valor);
    mostrarTarefas();
    input.value = '';
}

function mostrarTarefas() {
    listaCompleta.innerHTML = minhasPreferencias
        .map((tarefa, posicao) => `
            <li class="selecao" id="list">
                <img src="../img/delete.png" id="delete" onclick="deletarPref(${posicao})">
                <p>${tarefa}</p>
            </li>
        `)
        .join('');
}

function deletarPref(posicao) {
    minhasPreferencias.splice(posicao, 1);
    mostrarTarefas();
}
