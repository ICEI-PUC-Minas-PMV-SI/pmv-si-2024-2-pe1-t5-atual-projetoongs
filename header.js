document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const depth = (currentPath.match(/\//g) || []).length - 1;
  const headerPath = '../'.repeat(depth) + 'header.html';

  fetch(headerPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar a header: ${response.statusText}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
      initializeHeader();
    })
    .catch(err => console.error(err));
});

function initializeHeader() {
    updateHeader();

    const elements = {
        modalLogin: document.getElementById('loginModal'),
        modalCadastro: document.getElementById('signupModal'),
        btnFecharLogin: document.getElementById('closeLoginModal'),
        btnFecharCadastro: document.getElementById('closeSignupModal'),
        mensagemDivLogin: document.getElementById("mensagem-login"),
        mensagemDivCadastro: document.getElementById("mensagem-signup")
    };

    function abrirModal(modal) {
        if (!modal) return;
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
    }

    function fecharModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

    if (elements.btnFecharLogin) {
        elements.btnFecharLogin.addEventListener('click', (e) => {
            e.preventDefault();
            fecharModal(elements.modalLogin);
        });
    }

    if (elements.btnFecharCadastro) {
        elements.btnFecharCadastro.addEventListener('click', (e) => {
            e.preventDefault();
            fecharModal(elements.modalCadastro);
        });
    }

    function exibirMensagem(mensagem, tipo, mensagemDiv) {
        if (!mensagemDiv) return;
        
        mensagemDiv.textContent = mensagem;
        mensagemDiv.classList.remove("sucesso", "erro");
        mensagemDiv.classList.add(tipo === "sucesso" ? "sucesso" : "erro");
        mensagemDiv.classList.remove("hidden");
        
        const timeoutId = setTimeout(() => {
            mensagemDiv.classList.add("hidden");
            clearTimeout(timeoutId);
        }, 5000);
    }

    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(String(email).toLowerCase());
    }

    function verificarForcaSenha(senha) {
        const forcaDiv = document.getElementById('password-strength-text');
        const forcaBar = document.getElementById('password-strength-bar');
        
        if (!forcaDiv || !forcaBar) return;

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
        }
    }

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

    document.querySelectorAll('a[href="#"]:not(#logout)').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            abrirModal(elements.modalLogin);
        });
    });

    window.addEventListener('click', function (e) {
        if (e.target === elements.modalLogin) fecharModal(elements.modalLogin);
        if (e.target === elements.modalCadastro) fecharModal(elements.modalCadastro);
    });

    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');

    if (switchToSignup) {
        switchToSignup.addEventListener('click', function (e) {
            e.preventDefault();
            fecharModal(elements.modalLogin);
            abrirModal(elements.modalCadastro);
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function (e) {
            e.preventDefault();
            fecharModal(elements.modalCadastro);
            abrirModal(elements.modalLogin);
        });
    }

    window.alternarVisibilidadeSenha = function (inputId) {
        const inputSenha = document.getElementById(inputId);
        const tipo = inputSenha.type === 'password' ? 'text' : 'password';
        inputSenha.type = tipo;
    };

    function redirectToIndex() {
        window.location.href = "/index.html";
    }
    
    

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
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

            exibirMensagem(`Bem-vindo, ${dadosUsuario.username}!`, "sucesso", elements.mensagemDivLogin);
            localStorage.setItem('loggedIn', 'true');
            updateHeader();
            fecharModal(elements.modalLogin);
            redirectToIndex();
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
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
            redirectToIndex();
        });

        const novaSenha = document.getElementById("newPassword");
        if (novaSenha) {
            novaSenha.addEventListener('input', function() {
                verificarForcaSenha(this.value);
            });
        }
    }
}

// Atualizar a header com base no estado de login
function updateHeader() {
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
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('loggedIn', 'false');
            updateHeader();
            window.location.reload();
            });
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
                codigoAlteracao.classList.remove('escondido');
                novaInformacao.innerHTML = `
                    <p>Insira o novo e-mail: <input class="input" type="email" id="novoEmail" aria-label="Digite o novo email"></p>
                    <button class="buttonConf" id="confirmarTroca">Confirmar Troca</button>
                `;
                adicionarEventoConfirmacao();
            } catch (error) {
                console.error('Erro ao alterar o e-mail:', error);
            }
        });
    } else {
        console.warn("Botão 'alterarEmail' não encontrado.");
    }
};

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
                    modalc.style.display = 'none';
                    setTimeout(() => {
                            codigoExclusaoInserido = '';
                            codigoInserido = '';
                            closeModal(); 
                    }, 500); 
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
function adicionarEventoConfirmacao() {
    try {
            const confirmarTrocaBtn = document.getElementById('confirmarTroca');
            if (confirmarTrocaBtn) {
                confirmarTrocaBtn.addEventListener('click', () => {
                    try {
                        const novoEmail = document.getElementById('novoEmail');
                        if (novoEmail) {
                            alert('Troca de e-mail sucedida!');
                            if (novaInformacao) {
                                const novaInformacao = document.getElementById('novaInformacao');
                                novaInformacao.innerHTML = `<p>E-mail alterado com sucesso!</p>`;
                            }
                        } else {
                            const senha1 = document.getElementById('novaSenha1').value;
                            const senha2 = document.getElementById('novaSenha2').value;
                            if (senha1 === senha2) {
                                alert('Troca de senha sucedida!');
                                if (novaInformacao) {
                                    novaInformacao.innerHTML = `<p>Senha alterada com sucesso!</p>`;
                                }
                            } else {
                                alert('As senhas não coincidem.');
                            }
                        }
                        if (novaInformacao) {
                            novaInformacao.innerHTML += `<button id="voltarInicio">Voltar ao Início</button>`;
                            const voltarInicioBtn = document.getElementById('voltarInicio');
                            if (voltarInicioBtn) {
                                voltarInicioBtn.addEventListener('click', reiniciarModal);
                            }
                        }
                    } catch (error) {
                        console.error('Erro ao confirmar troca:', error);
                    }
                });
            }
            if (novaInformacao) {
                novaInformacao.classList.add('escondido');
            }
    } catch (error) {
        console.error('Erro ao adicionar evento de confirmação:', error);
    }
}

// Preferências
function add() {
        try {
        const input = document.querySelector('#preferenciasInput');
        const button = document.getElementById('adicionarPreferencia');
        const listaCompleta = document.querySelector('.pref');
        let minhasPreferencias = [];

        if (button) {
            button.addEventListener('click', adicionarPref);
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

                minhasPreferencias.push(valor);
                mostrarTarefas();
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
                    <img src="../img/delete.png" id="delete" (${onclick="deletarPref"}${posicao})>
                    <p>${tarefa}</p> 
                </li>
                `;
            });
            listaCompleta.innerHTML = nova;
        };

        function deletarPref(posicao) {
            try {
                minhasPreferencias.splice(posicao, 1);
                mostrarTarefas();
            } catch (error) {
                console.error('Erro ao deletar preferência:', error);
            }
        };
    } catch (error) {
        console.error('Erro ao configurar configurações:', error);
    };
};



function solicitarNovoToken() {
    alert('Novo código enviado: 1234');
    document.getElementById('codigoInserido').value = '';
}
