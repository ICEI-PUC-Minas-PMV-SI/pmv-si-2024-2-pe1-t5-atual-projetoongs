const openLoginModalBtn = document.getElementById("openLoginModalBtn");
const openSignupModalBtn = document.getElementById("openSignupModalBtn");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const closeButtons = document.querySelectorAll(".close");
const mensagemDivLogin = document.getElementById("mensagem-login");
const mensagemDivSignup = document.getElementById("mensagem-signup");

// Função para exibir mensagens
function mostrarMensagem(mensagem, tipo, mensagemDiv) {
  mensagemDiv.textContent = mensagem;
  mensagemDiv.style.color = tipo === "sucesso" ? "green" : "red";
  mensagemDiv.style.display = "block";
  setTimeout(() => {
    mensagemDiv.style.display = "none";
  }, 5000);
}

// Função para validar email
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Abrir e fechar modais
function toggleModal(modal, show) {
  if (modal) {
    if (show) {
      modal.classList.add("show");
      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");
      modal.querySelector("form input").focus();
    } else {
      modal.classList.remove("show");
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  }
}

// Resetar mensagens de erro
function resetarErros(campos, spansErro) {
  campos.forEach((campo) => campo.classList.remove("invalid"));
  spansErro.forEach((span) => {
    span.style.display = "none";
    span.textContent = "";
  });
}

// Mostrar erro no campo
function mostrarErro(campo, mensagem, span) {
  campo.classList.add("invalid");
  span.textContent = mensagem;
  span.style.display = "block";
}

// Abrir modais
openLoginModalBtn.addEventListener("click", () =>
  toggleModal(loginModal, true)
);
openSignupModalBtn.addEventListener("click", () =>
  toggleModal(signupModal, true)
);

// Fechar modais
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleModal(loginModal, false);
    toggleModal(signupModal, false);
  });
});

window.addEventListener("click", (event) => {
  if (event.target === loginModal) toggleModal(loginModal, false);
  if (event.target === signupModal) toggleModal(signupModal, false);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleModal(loginModal, false);
    toggleModal(signupModal, false);
  }
});

// Validação e cadastro
signupModal.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username");
  const email = document.getElementById("email-signup");
  const newPassword = document.getElementById("newPassword");
  const userType = document.getElementById("userType");

  const errorUsername = document.getElementById("error-username");
  const errorEmail = document.getElementById("error-email-signup");
  const errorPassword = document.getElementById("error-password");
  const errorUserType = document.getElementById("error-userType");

  resetarErros(
    [username, email, newPassword, userType],
    [errorUsername, errorEmail, errorPassword, errorUserType]
  );

  let isValid = true;

  if (!username.value.trim()) {
    mostrarErro(username, "O nome é obrigatório.", errorUsername);
    isValid = false;
  }

  if (!email.value.trim()) {
    mostrarErro(email, "O email é obrigatório.", errorEmail);
    isValid = false;
  } else if (!validarEmail(email.value)) {
    mostrarErro(email, "Formato de email inválido.", errorEmail);
    isValid = false;
  } else if (localStorage.getItem(email.value)) {
    mostrarErro(email, "Este email já está cadastrado.", errorEmail);
    isValid = false;
  }

  if (!newPassword.value.trim()) {
    mostrarErro(newPassword, "A senha é obrigatória.", errorPassword);
    isValid = false;
  }

  if (!userType.value.trim()) {
    mostrarErro(userType, "Selecione um tipo de usuário.", errorUserType);
    isValid = false;
  }

  if (!isValid) return;

  const userData = {
    username: username.value,
    email: email.value,
    newPassword: newPassword.value,
    userType: userType.value,
  };

  localStorage.setItem(email.value, JSON.stringify(userData));

  mostrarMensagem(
    "Cadastro realizado com sucesso!",
    "sucesso",
    mensagemDivSignup
  );
  toggleModal(signupModal, false);
  window.location.href = "../../../index.html";
});

// Validação e login
loginModal.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email-login");
  const password = document.getElementById("password-login");

  const errorEmail = document.getElementById("error-email-login");
  const errorPassword = document.getElementById("error-password-login");

  resetarErros([email, password], [errorEmail, errorPassword]);

  let isValid = true;

  if (!email.value.trim()) {
    mostrarErro(email, "O email é obrigatório.", errorEmail);
    isValid = false;
  } else if (!validarEmail(email.value)) {
    mostrarErro(email, "Formato de email inválido.", errorEmail);
    isValid = false;
  }

  if (!password.value.trim()) {
    mostrarErro(password, "A senha é obrigatória.", errorPassword);
    isValid = false;
  }

  if (!isValid) return;

  const storedUser = localStorage.getItem(email.value);
  if (!storedUser) {
    mostrarErro(email, "Usuário não encontrado.", errorEmail);
    return;
  }

  const userData = JSON.parse(storedUser);
  if (userData.newPassword !== password.value) {
    mostrarErro(password, "Senha incorreta.", errorPassword);
    return;
  }

  mostrarMensagem(
    `Bem-vindo, ${userData.username}!`,
    "sucesso",
    mensagemDivLogin
  );
  toggleModal(loginModal, false);
  window.location.href = "../../../index.html";
});

// Logout
function logout() {
  sessionStorage.clear();
  mostrarMensagem("Você saiu com sucesso!", "sucesso", mensagemDivLogin);
  location.reload();
}

function mostrarInformacoesUsuario(usuario) {
  const userInfo = document.createElement("div");
  userInfo.innerHTML = `<h3>Bem-vindo, ${usuario.username}!</h3>
                        <p>Tipo de usuário: ${usuario.userType}</p>`;
  document.body.prepend(userInfo);
}
