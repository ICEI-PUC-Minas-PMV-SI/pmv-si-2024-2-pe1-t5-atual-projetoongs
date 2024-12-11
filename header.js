// script.js

// Tratamento global de erros
window.addEventListener('error', function (event) {
    console.error('Erro não capturado:', event.error);
});
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Construir o caminho dinâmico para o arquivo header.html
        const currentPath = window.location.pathname;
        const depth = (currentPath.match(/\//g) || []).length - 1; // Conta os níveis no path
        const headerPath = '../'.repeat(depth) + 'header.html'; // Sobe os níveis necessários

        // Carregar a header
        fetch(headerPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar a header: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const headerPlaceholder = document.getElementById('header-placeholder');
                if (!headerPlaceholder) {
                    throw new Error("Elemento 'header-placeholder' não encontrado no DOM.");
                }
                headerPlaceholder.innerHTML = data;
                // Inicializar eventos e atualizações da header
                initializeHeader();
            })
            .catch(err => {
                console.error('Erro ao carregar a header:', err);
            });

        // Inicializar eventos e comportamentos da header
        function initializeHeader() {
            try {
                // Seleção de elementos do DOM
                const elements = {
                    modalLogin: document.getElementById('loginModal'),
                    modalCadastro: document.getElementById('signupModal'),
                    btnFecharLogin: document.getElementById('closeLoginModal'),
                    btnFecharCadastro: document.getElementById('closeSignupModal'),
                    mensagemDivLogin: document.getElementById("mensagem-login"),
                    mensagemDivCadastro: document.getElementById("mensagem-signup")
                };

                // Funções para abrir e fechar modais
                function abrirModal(modal) {
                    if (!modal) {
                        console.error('Modal não encontrado:', modal);
                        return;
                    }
                    modal.style.display = 'block';
                    modal.setAttribute('aria-hidden', 'false');
                    // Focus no primeiro input para melhor acessibilidade
                    const firstInput = modal.querySelector('input');
                    if (firstInput) firstInput.focus();
                }

                function fecharModal(modal) {
                    if (!modal) {
                        console.error('Modal não encontrado:', modal);
                        return;
                    }
                    modal.style.display = 'none';
                    modal.setAttribute('aria-hidden', 'true');
                }

                // Attach close event listeners
                if (elements.btnFecharLogin) {
                    elements.btnFecharLogin.addEventListener('click', (e) => {
                        e.preventDefault();
                        fecharModal(elements.modalLogin);
                    });
                } else {
                    console.warn("Botão 'closeLoginModal' não encontrado.");
                }

                if (elements.btnFecharCadastro) {
                    elements.btnFecharCadastro.addEventListener('click', (e) => {
                        e.preventDefault();
                        fecharModal(elements.modalCadastro);
                    });
                } else {
                    console.warn("Botão 'closeSignupModal' não encontrado.");
                }

                // Função para exibir mensagens
                function exibirMensagem(mensagem, tipo, mensagemDiv) {
                    if (!mensagemDiv) {
                        console.error("Div para mensagem não encontrada:", mensagemDiv);
                        return;
                    }
                    
                    mensagemDiv.textContent = mensagem;
                    mensagemDiv.classList.remove("sucesso", "erro");
                    mensagemDiv.classList.add(tipo === "sucesso" ? "sucesso" : "erro");
                    mensagemDiv.classList.remove("hidden");
                    
                    // Timeout para esconder a mensagem após 5 segundos
                    setTimeout(() => {
                        mensagemDiv.classList.add("hidden");
                    }, 5000);
                }

                // Função para validar email
                function validarEmail(email) {
                    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return regex.test(String(email).toLowerCase());
                }

                // Função para verificar força da senha
                function verificarForcaSenha(senha) {
                    const forcaDiv = document.getElementById('password-strength-text');
                    const forcaBar = document.getElementById('password-strength-bar');
                    
                    if (!forcaDiv || !forcaBar) {
                        console.warn("Indicador de força da senha não encontrado.");
                        return;
                    }

                    let forca = 0;
                    if (senha.length >= 8) forca++;
                    if (senha.match(/[a-z]+/)) forca++;
                    if (senha.match(/[A-Z]+/)) forca++;
                    if (senha.match(/[0-9]+/)) forca++;
                    if (senha.match(/[$@#&!]+/)) forca++;

                    forcaBar.style.width = `${forca * 20}%`;
                    
                    switch(forca) {
                        case 0:
                        case 1:
                            forcaBar.style.backgroundColor = 'red';
                            forcaDiv.textContent = 'Muito fraca';
                            break;
                        case 2:
                            forcaBar.style.backgroundColor = 'orange';
                            forcaDiv.textContent = 'Fraca';
                            break;
                        case 3:
                            forcaBar.style.backgroundColor = 'yellow';
                            forcaDiv.textContent = 'Média';
                            break;
                        case 4:
                            forcaBar.style.backgroundColor = 'green';
                            forcaDiv.textContent = 'Forte';
                            break;
                        case 5:
                            forcaBar.style.backgroundColor = 'darkgreen';
                            forcaDiv.textContent = 'Muito forte';
                            break;
                        default:
                            forcaBar.style.backgroundColor = 'grey';
                            forcaDiv.textContent = '';
                    }
                }

                // Funções para limpar e exibir erros
                function limparErros(campos, spansErro) {
                    campos.forEach((campo) => {
                        if (campo) campo.classList.remove("invalid");
                    });
                    spansErro.forEach((span) => {
                        if (span) {
                            span.style.display = "none";
                            span.textContent = "";
                        }
                    });
                }

                function exibirErro(campo, mensagem, span) {
                    if (campo) campo.classList.add("invalid");
                    if (span) {
                        span.textContent = mensagem;
                        span.style.display = "block";
                    }
                }

                // Adicionar event listeners para links de login
                const linksLogin = document.querySelectorAll('a[href="#"]:not(#logout)');
                linksLogin.forEach(link => {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        abrirModal(elements.modalLogin);
                    });
                });

                // Fechar modais ao clicar fora
                window.addEventListener('click', function (e) {
                    if (e.target === elements.modalLogin) fecharModal(elements.modalLogin);
                    if (e.target === elements.modalCadastro) fecharModal(elements.modalCadastro);
                });

                // Eventos para alternar entre login e cadastro
                const switchToSignup = document.getElementById('switchToSignup');
                const switchToLogin = document.getElementById('switchToLogin');

                if (switchToSignup) {
                    switchToSignup.addEventListener('click', function (e) {
                        e.preventDefault();
                        fecharModal(elements.modalLogin);
                        abrirModal(elements.modalCadastro);
                    });
                } else {
                    console.warn("Link 'switchToSignup' não encontrado.");
                }

                if (switchToLogin) {
                    switchToLogin.addEventListener('click', function (e) {
                        e.preventDefault();
                        fecharModal(elements.modalCadastro);
                        abrirModal(elements.modalLogin);
                    });
                } else {
                    console.warn("Link 'switchToLogin' não encontrado.");
                }

                // Função para alternar visibilidade da senha
                window.alternarVisibilidadeSenha = function (inputId) {
                    try {
                        const inputSenha = document.getElementById(inputId);
                        if (!inputSenha) {
                            throw new Error(`Input com ID '${inputId}' não encontrado.`);
                        }
                        const tipo = inputSenha.type === 'password' ? 'text' : 'password';
                        inputSenha.type = tipo;
                    } catch (error) {
                        console.error(error);
                    }
                };

                // Submissão do formulário de login
                const loginForm = document.getElementById('loginForm');
                if (loginForm) {
                    loginForm.addEventListener('submit', function (e) {
                        try {
                            e.preventDefault();
                            const email = document.getElementById("email-login");
                            const senha = document.getElementById("password-login");

                            const erroEmail = document.getElementById("error-email-login");
                            const erroSenha = document.getElementById("error-password-login");

                            limparErros([email, senha], [erroEmail, erroSenha]);

                            let valido = true;

                            if (!email.value.trim()) {
                                exibirErro(email, "O email é obrigatório.", erroEmail);
                                valido = false;
                            } else if (!validarEmail(email.value)) {
                                exibirErro(email, "Formato de email inválido.", erroEmail);
                                valido = false;
                            }

                            if (!senha.value.trim()) {
                                exibirErro(senha, "A senha é obrigatória.", erroSenha);
                                valido = false;
                            }

                            if (!valido) return;

                            const usuarioArmazenado = localStorage.getItem(email.value);
                            if (!usuarioArmazenado) {
                                exibirErro(email, "Usuário não encontrado.", erroEmail);
                                return;
                            }

                            const dadosUsuario = JSON.parse(usuarioArmazenado);
                            if (dadosUsuario.newPassword !== senha.value) {
                                exibirErro(senha, "Senha incorreta.", erroSenha);
                                return;
                            }

                            // Atualizar estado de login
                            localStorage.setItem('loggedIn', 'true');
                            exibirMensagem(`Bem-vindo, ${dadosUsuario.username}!`, "sucesso", elements.mensagemDivLogin);
                            fecharModal(elements.modalLogin);
                            updateHeader(); // Atualiza a header com base no estado de login
                        } catch (error) {
                            console.error('Erro no formulário de login:', error);
                        }
                    });
                } else {
                    console.warn("Formulário 'loginForm' não encontrado.");
                }

                // Submissão do formulário de cadastro
                const signupForm = document.getElementById('signupForm');
                if (signupForm) {
                    signupForm.addEventListener('submit', function (e) {
                        try {
                            e.preventDefault();

                            const nomeUsuario = document.getElementById("username");
                            const email = document.getElementById("email-signup");
                            const novaSenha = document.getElementById("newPassword");
                            const tipoUsuario = document.getElementById("userType");

                            const erroNome = document.getElementById("error-username");
                            const erroEmail = document.getElementById("error-email-signup");
                            const erroSenha = document.getElementById("error-password");
                            const erroTipoUsuario = document.getElementById("error-userType");

                            limparErros(
                                [nomeUsuario, email, novaSenha, tipoUsuario],
                                [erroNome, erroEmail, erroSenha, erroTipoUsuario]
                            );

                            let valido = true;

                            if (!nomeUsuario.value.trim()) {
                                exibirErro(nomeUsuario, "O nome é obrigatório.", erroNome);
                                valido = false;
                            }

                            if (!email.value.trim()) {
                                exibirErro(email, "O email é obrigatório.", erroEmail);
                                valido = false;
                            } else if (!validarEmail(email.value)) {
                                exibirErro(email, "Formato de email inválido.", erroEmail);
                                valido = false;
                            } else if (localStorage.getItem(email.value)) {
                                exibirErro(email, "Este email já está cadastrado.", erroEmail);
                                valido = false;
                            }

                            if (!novaSenha.value.trim()) {
                                exibirErro(novaSenha, "A senha é obrigatória.", erroSenha);
                                valido = false;
                            }

                            // Verificar força da senha
                            verificarForcaSenha(novaSenha.value);

                            if (!tipoUsuario.value.trim()) {
                                exibirErro(tipoUsuario, "Selecione um tipo de usuário.", erroTipoUsuario);
                                valido = false;
                            }

                            if (!valido) return;

                            const dadosUsuario = {
                                username: nomeUsuario.value,
                                email: email.value,
                                newPassword: novaSenha.value,
                                userType: tipoUsuario.value,
                            };

                            localStorage.setItem(email.value, JSON.stringify(dadosUsuario));

                            exibirMensagem("Cadastro realizado com sucesso!", "sucesso", elements.mensagemDivCadastro);
                            fecharModal(elements.modalCadastro);
                        } catch (error) {
                            console.error('Erro no formulário de cadastro:', error);
                        }
                    });

                    // Adicionar verificação de força da senha no input
                    const novaSenhaInput = document.getElementById("newPassword");
                    if (novaSenhaInput) {
                        novaSenhaInput.addEventListener('input', function() {
                            verificarForcaSenha(this.value);
                        });
                    } else {
                        console.warn("Input 'newPassword' não encontrado.");
                    }
                } else {
                    console.warn("Formulário 'signupForm' não encontrado.");
                }

                // Atualizar a header com base no estado de login
                updateHeader();

            } catch (error) {
                console.error('Erro ao inicializar a header:', error);
            }
        }
    }
catch (error) {
    console.error('Erro ao configurar configurações:', error);
}
});

// Atualizar a header com base no estado de login
function updateHeader() {
    try {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        const loggedOutElements = document.querySelectorAll('.logged-out');
        const loggedInElements = document.querySelectorAll('.logged-in');

        if (isLoggedIn) {
            loggedOutElements.forEach(el => el.classList.add('hidden'));
            loggedInElements.forEach(el => el.classList.remove('hidden'));
        } else {
            loggedOutElements.forEach(el => el.classList.remove('hidden'));
            loggedInElements.forEach(el => el.classList.add('hidden'));
        }

        // Logout
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                try {
                    e.preventDefault();
                    localStorage.setItem('loggedIn', 'false');
                    updateHeader();
                    window.location.reload();
                } catch (error) {
                    console.error('Erro ao realizar logout:', error);
                }
            });
        }
    } catch (error) {
        console.error('Erro ao atualizar a header:', error);
    }
}


/************************************SAM**************************************/
// Funções auxiliares fora do DOMContentLoaded para evitar erros de referência

function openModal(){
    const modalc = document.getElementById('modalConfiguracoes');
    try {
        reiniciarModal();

        if(modalc){
            modalc.style.display = 'block';
        }
        const overlay = document.querySelector("#modalConfiguracoes")
        const modalContent = document.querySelector(".modal-conteudo")
        modalContent.addEventListener("click", (event) => {
            event.stopPropagation()
        })
        overlay.addEventListener("click", (event) => {
            event.stopPropagation()
            modalc.style.display = 'none';
        })
    } catch (error) {
        console.error('Erro ao abrir o modal de configurações:', error);
    }
}

function closeModal(){
    const modalc = document.getElementById('modalConfiguracoes');
    try {
        if(modalc){
            opcoesAlteracao.classList.add('escondido');
            codigoAlteracao.classList.add('escondido');
            codigoInserido.value = '';
            modalc.style.display = 'none';
        }
        
    } catch (error) {
        console.error('Erro ao fechar o modal de configurações:', error);
    }
}

function reiniciarModal() {
    try {
        const novaInformacao = document.getElementById('novaInformacao');
        const opcoesAlteracao = document.getElementById('opcoesAlteracao');
        const codigoAlteracao = document.getElementById('codigoAlteracao');
        const codigoInserido = document.getElementById('codigoInserido');
        if (novaInformacao) novaInformacao.innerHTML = '';
        if (opcoesAlteracao) opcoesAlteracao.classList.add('escondido');
        if (codigoAlteracao) codigoAlteracao.classList.add('escondido');
        if (codigoInserido) codigoInserido.value = '';
        
    } catch (error) {
        console.error('Erro ao reiniciar o modal:', error);
    }
}

// Alternar opções de alteração
function alterarEmailESenha(){
    const alterarEmailSenhaBtn = document.getElementById('alterarEmailSenha');
    if (alterarEmailSenhaBtn) {
        alterarEmailSenhaBtn.addEventListener('click', () => {
            try {
                opcoesAlteracao.classList.toggle('escondido');
            } catch (error) {
                console.error('Erro ao alternar opções de alteração:', error);
            }
        });
    } else {
        console.warn("Botão 'alterarEmailSenha' não encontrado.");
    }
};


// Alterar e-mail
function alterarEmail(){
    const alterarEmailBtn = document.getElementById('alterarEmail');
    if (alterarEmailBtn) {
        alterarEmailBtn.addEventListener('click', () => {
            try {
                solicitarNovoToken();

                // Obtém os elementos necessários
                const codigoAlteracao = document.getElementById('codigoAlteracao');
                const novaInformacao = document.getElementById('novaInformacao');

                // Garante que os elementos existem
                if (codigoAlteracao && novaInformacao) {
                    codigoAlteracao.classList.remove('escondido');
                    novaInformacao.innerHTML = `
                        <p>Insira o novo e-mail: <input class="input" type="email" id="novoEmail" aria-label="Digite o novo email"></p>
                        <button class="buttonConf" id="confirmarTroca">Confirmar Troca</button>
                    `;

                    // Adiciona o evento de clique no botão de confirmação
                    const confirmarTrocaBtn = document.getElementById('confirmarTroca');
                    if (confirmarTrocaBtn) {
                        confirmarTrocaBtn.addEventListener('click', alterarEmailESenha);
                    }
                } else {
                    console.warn('Elementos necessários para alterar e-mail não encontrados.');
                }
            } catch (error) {
                console.error('Erro ao alterar o e-mail:', error);
            }
        });
    } else {
        console.warn("Botão 'alterarEmail' não encontrado.");
    }
}


    // Alterar senha
function alterarSenha(){
    const alterarSenhaBtn = document.getElementById('alterarSenha');
    if (alterarSenhaBtn) {
        alterarSenhaBtn.addEventListener('click', () => {
            try {
                solicitarNovoToken();
                codigoAlteracao.classList.remove('escondido');
                novaInformacao.innerHTML = `
                    <p>Nova senha: <input class="input" type="password" id="novaSenha1" aria-label="Digite a nova senha"></p>
                    <p>Confirmar senha: <input class="input" type="password" id="novaSenha2" aria-label="Confirme a nova senha"></p>
                    <button class="buttonConf" id="confirmarTroca">Confirmar Troca</button>
                `;
                adicionarEventoConfirmacao();
            } catch (error) {
                console.error('Erro ao alterar a senha:', error);
            }
        });
    } else {
        console.warn("Botão 'alterarSenha' não encontrado.");
    }
};

// Excluir conta
function excluirConta(){
    const excluirContaBtn = document.getElementById('excluirConta');
    if (excluirContaBtn) {
        excluirContaBtn.addEventListener('click', () => {
            try {
                alert('Código de exclusão enviado: 4321');
                codigoExclusao.classList.remove('escondido');
                
            } catch (error) {
                console.error('Erro ao excluir a conta:', error);
            }
        });
    } else {
        console.warn("Botão 'excluirConta' não encontrado.");
    }
};

// Validar código de alteração
function validaCodigo(){
    
    if (validarCodigoAlteracao) {
        const validarCodigoAlteracao = document.getElementById('validarCodigoAlteracao');
        validarCodigoAlteracao.addEventListener('click', () => {
            try {
                const codigoInserido = document.getElementById('codigoInserido').value;
                if (codigoInserido === '1234') {
                    document.getElementById('codigoInserido').value = '';
                    novaInformacao.classList.remove('escondido');
                    alert('Código válido! Agora, insira as informações.');
                    codigoAlteracao.classList.add('escondido');
                    adicionarEventoConfirmacao()
                } else {
                    alert('Código incorreto!');
                }
            } catch (error) {
                console.error('Erro ao validar código de alteração:', error);
            }
        });
    } else {
        console.warn("Botão 'validarCodigoAlteracao' não encontrado.");
    }

    // Validar código de exclusão
    if (validarCodigoExclusao) {
        const codigoExclusao = document.getElementById('codigoExclusao');
        validarCodigoExclusao.addEventListener('click', () => {
            try {
                const codigoExclusaoInserido = document.getElementById('codigoExclusaoInserido').value;
                if (codigoExclusaoInserido === '4321') {
                    alert('Conta excluída com sucesso!');
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                } else {
                    alert('Código incorreto!');
                }
            } catch (error) {
                console.error('Erro ao validar código de exclusão:', error);
            }
        });
    } else {
        console.warn("Botão 'validarCodigoExclusao' não encontrado.");
    }

  
}
// Adicionar evento de confirmação
function adicionarEventoConfirmacao() {
    try {
        const confirmarTrocaBtn = document.getElementById('confirmarTroca');
        if (confirmarTrocaBtn) {
            confirmarTrocaBtn.addEventListener('click', () => {
                try {
                    const novoEmail = document.getElementById('novoEmail');
                    const novaSenha1 = document.getElementById('novaSenha1');
                    const novaSenha2 = document.getElementById('novaSenha2');
                    const novaInformacao = document.getElementById('novaInformacao');

                    if (novoEmail) {
                        alert('Troca de e-mail sucedida!');
                        novaInformacao.innerHTML = '<p>E-mail alterado com sucesso!</p>';
                    } else if (novaSenha1 && novaSenha2) {
                        if (novaSenha1.value === novaSenha2.value) {
                            alert('Troca de senha sucedida!');
                            novaInformacao.innerHTML = '<p>Senha alterada com sucesso!</p>';
                        } else {
                            alert('As senhas não coincidem.');
                            return;
                        }
                    }
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                } catch (error) {
                    console.error('Erro ao confirmar troca:', error);
                }
            });
        }
    } catch (error) {
        console.error('Erro ao adicionar evento de confirmação:', error);
    }
};

function solicitarNovoToken() {
    alert('Novo código enviado: 1234');
    document.getElementById('codigoInserido').value = '';
};

// Preferências
function add() {
        try {
        const input = document.querySelector('#preferenciasInput');
        const limpa = document.querySelector('#limpa');
        const button = document.getElementById('adicionarPreferencia');
        const listaCompleta = document.querySelector('.pref');
        let minhasPreferencias = [];

        if (button) {
            button.addEventListener('click', adicionarPref);
        }else{
                button.addEventListener('click', limparPref)
        }

        function adicionarPref() {
            try {
                const valor = input.value.trim();
                if (valor === '') {
                    return;
                }

                if (minhasPreferencias.length >= 5) {
                    alert('Você só pode adicionar até 5 preferências.');
                    return;
                }

                // Adicionar a nova preferência à lista
                minhasPreferencias.push(valor);
                mostrarTarefas();
                
                // Limpar o campo de entrada
                input.value = '';

            } catch (error) {
                console.error('Erro ao adicionar preferência:', error);
            }
        }

        function mostrarTarefas() {
            let nova = '';
            minhasPreferencias.forEach((tarefa, posicao) => {
                nova += `
                <li class="selecao" id="list">
                    <img src="./src/img/delete.png" id="delete" onclick="deletarPref(${posicao})" style="cursor: pointer;">
                    <p>${tarefa}</p> 
                </li>
                `;
            });
            listaCompleta.innerHTML = nova;
        };
        function limparPref() {
            minhasPreferencias.splice(posicao, 1);
            mostrarTarefas();
        }

    } catch (error) {
        console.error('Erro ao configurar configurações:', error);
    };
};


 

