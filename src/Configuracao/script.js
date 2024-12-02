// Referências dos elementos HTML para abrir, fechar o modal e exibir o modal
const abrirModal = document.getElementById('abrirModal'); // Botão para abrir o modal
const fecharModal = document.getElementById('fecharModal'); // Fechar o modal
const modal = document.getElementById('modalConfiguracoes'); //modal
document.getElementById('codigoInserido').value = ''; // Limpa o campo de código ao carregar o script

// Função para reiniciar o modal para seu estado inicial
function reiniciarModal() {
    novaInformacao.innerHTML = ''; 
    opcoesAlteracao.classList.add('escondido');
    codigoAlteracao.classList.add('escondido');
    document.getElementById('codigoInserido').value = ''; 
    const codigoInserido = document.getElementById('codigoInserido');
    if (codigoInserido) {
        codigoInserido.value = ''; 
    }
}

// Função para solicitar um novo token
function solicitarNovoToken() {
    alert('Novo código enviado: 1234'); 
    document.getElementById('codigoInserido').value = ''; 
}

abrirModal.addEventListener('click', () => {
    reiniciarModal(); 
    modal.style.display = 'block'; // Exibe o modal
});

// Fechar o modal ao clicar no botão de fechar
fecharModal.addEventListener('click', () => modal.style.display = 'none');

// Fechar o modal ao clicar fora dele
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Lógica para a alteração de e-mail ou senha
const alterarEmailSenhaBtn = document.getElementById('alterarEmailSenha'); 
const opcoesAlteracao = document.getElementById('opcoesAlteracao'); 
const alterarEmailBtn = document.getElementById('alterarEmail'); 
const alterarSenhaBtn = document.getElementById('alterarSenha'); 
const codigoAlteracao = document.getElementById('codigoAlteracao'); 
const validarCodigoAlteracao = document.getElementById('validarCodigoAlteracao'); // Botão para validar o código de alteração
const novaInformacao = document.getElementById('novaInformacao'); // Área para exibir informações de sucesso

// Excluir conta
const excluirContaBtn = document.getElementById('excluirConta');
const codigoExclusao = document.getElementById('codigoExclusao');
const validarCodigoExclusao = document.getElementById('validarCodigoExclusao');

// Evento para mostrar ou esconder as opções de alteração (e-mail ou senha)
alterarEmailSenhaBtn.addEventListener('click', () => opcoesAlteracao.classList.toggle('escondido')
);

// Valida o código inserido pelo usuário
validarCodigoAlteracao.addEventListener('click', () => {
    const codigoInserido = document.getElementById('codigoInserido').value;
    if (codigoInserido === '1234') {
        // Limpa o campo de código e esconde o campo
        document.getElementById('codigoInserido').value = '';
        novaInformacao.classList.remove('escondido'); // Exibe o formulário de alteração
        alert('Código válido! Agora, insira as informações.'); // Alerta de código correto
        codigoAlteracao.classList.add('escondido');
    } else {
        alert('Código incorreto!'); // Alerta de código incorreto
    }
});

// Evento para iniciar a alteração de e-mail
alterarEmailBtn.addEventListener('click', () => {
    solicitarNovoToken(); // Solicita um novo token
    codigoAlteracao.classList.remove('escondido'); 
    novaInformacao.innerHTML = ` 
        <p>Insira o novo e-mail: <input class="input" type="email" id="novoEmail"></p>
        <button id="confirmarTroca">Confirmar Troca</button>
    `;
    adicionarEventoConfirmacao(); 
});
// Evento para iniciar a alteração de senha
alterarSenhaBtn.addEventListener('click', () => {
    solicitarNovoToken(); // Solicita um novo token
    codigoAlteracao.classList.remove('escondido'); 
    novaInformacao.innerHTML = `
        <p>Nova senha: <input class="input"  type="password" id="novaSenha1"></p>
        <p>Confirmar senha: <input class="input"  type="password" id="novaSenha2"></p>
        <button id="confirmarTroca">Confirmar Troca</button>`;
    adicionarEventoConfirmacao();
});

// Função para adicionar o evento de confirmação para troca de e-mail ou senha
function adicionarEventoConfirmacao() {
    setTimeout(() => {
        const confirmarTrocaBtn = document.getElementById('confirmarTroca'); // Botão para confirmar a troca
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
                // Adiciona o botão "Voltar ao Início" para reiniciar o modal
                novaInformacao.innerHTML += `<button id="voltarInicio">Voltar ao Início</button>`;

                // Evento para o botão "Voltar ao Início"
                const voltarInicioBtn = document.getElementById('voltarInicio');
                voltarInicioBtn.addEventListener('click', reiniciarModal); // Reinicia o modal ao clicar no botão
            });
        }
        novaInformacao.classList.add('escondido');
    }, 500); // Atraso de 500ms antes de adicionar o evento
}
/**********EXCLUIR********/

excluirContaBtn.addEventListener('click', () => {
    alert('Código de exclusão enviado: 4321');
    codigoExclusao.classList.remove('escondido');
});

validarCodigoExclusao.addEventListener('click', () => {
    const codigoExclusaoInserido = document.getElementById('codigoExclusaoInserido').value;
    if (codigoExclusaoInserido === '4321') {
        alert('Conta excluída com sucesso!');
        modal.style.display = 'none';
    } else {
        alert('Código incorreto!');
    }
    codigoExclusao.classList.add('escondido');
});

/**PREFERENCIAS**/
const input = document.querySelector('#preferenciasInput');
const button = document.querySelector('.addPref');
const listaCompleta = document.querySelector('.pref');

let minhasPreferencias = [];

function adicionarPref() {
    const valor = input.value.trim(); // Remove espaços extras

    // Verificar se o valor é nulo ou vazio
    if (valor === '') {
        alert('O valor não pode ser nulo ou vazio.');
        return;
    }

    // Verificar se já atingiu o limite de 5 inserções
    if (minhasPreferencias.length >= 5) {
        alert('Você só pode adicionar até 5 preferências.');
        return;
    }

    // Adicionar a nova preferência à lista
    minhasPreferencias.push(valor);
    mostrarTarefas();

    // Limpar o campo de entrada
    input.value = '';
}

function mostrarTarefas() {
    let nova = '';
    minhasPreferencias.forEach((tarefa, posicao) => {
        nova += `
        <li class="selecao" id="list">
            <img src="../img/delete.png" id="delete" onclick="deletarPref(${posicao})">
            <p>${tarefa}</p> 
        </li>
        `;
    });
    listaCompleta.innerHTML = nova;
}

function deletarPref(posicao) {
    minhasPreferencias.splice(posicao, 1);
    mostrarTarefas();
}

button.addEventListener('click', adicionarPref);