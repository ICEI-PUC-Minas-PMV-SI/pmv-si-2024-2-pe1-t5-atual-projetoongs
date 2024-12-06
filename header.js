document.addEventListener('DOMContentLoaded', () => {
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
      document.getElementById('header-placeholder').innerHTML = data;

      // Inicializar eventos e atualizações da header
      initializeHeader();
    })
    .catch(err => console.error(err));
});

// Inicializar eventos e comportamentos da header
function initializeHeader() {
    // Improved error handling and validation
    const elements = {
        modalLogin: document.getElementById('loginModal'),
        modalCadastro: document.getElementById('signupModal'),
        btnFecharLogin: document.getElementById('closeLoginModal'),
        btnFecharCadastro: document.getElementById('closeSignupModal'),
        mensagemDivLogin: document.getElementById("mensagem-login"),
        mensagemDivCadastro: document.getElementById("mensagem-signup")
    };

    // Enhanced modal handling with more accessibility
    function abrirModal(modal) {
        if (!modal) return;
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        // Focus first input in the modal for better accessibility
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
    }

    function fecharModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

    // Attach close event listeners
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

    // Enhanced message display with improved UX
    function exibirMensagem(mensagem, tipo, mensagemDiv) {
        if (!mensagemDiv) return;
        
        mensagemDiv.textContent = mensagem;
        mensagemDiv.classList.remove("sucesso", "erro");
        mensagemDiv.classList.add(tipo === "sucesso" ? "sucesso" : "erro");
        mensagemDiv.classList.remove("hidden");
        
        // Use a more robust timeout method
        const timeoutId = setTimeout(() => {
            mensagemDiv.classList.add("hidden");
            clearTimeout(timeoutId);
        }, 5000);
    }

    // Improved email validation
    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(String(email).toLowerCase());
    }

    // Enhanced password strength checker
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

    // Generalized error handling
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

    // Add event listeners to prevent default login for all links
    document.querySelectorAll('a[href="#"]:not(#logout)').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            abrirModal(elements.modalLogin);
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === elements.modalLogin) fecharModal(elements.modalLogin);
        if (e.target === elements.modalCadastro) fecharModal(elements.modalCadastro);
    });

    // Modal switching events
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

    // Password visibility toggle
    window.alternarVisibilidadeSenha = function (inputId) {
        const inputSenha = document.getElementById(inputId);
        const tipo = inputSenha.type === 'password' ? 'text' : 'password';
        inputSenha.type = tipo;
    };

    // Login form submission
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
            fecharModal(elements.modalLogin);
        });
    }

    // Signup form submission
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

            // Add password strength check
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
        });

        // Add password strength check on input
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

  // Logout
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
