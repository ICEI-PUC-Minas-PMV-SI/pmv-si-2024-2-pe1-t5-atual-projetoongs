// Selecionar os botões e os modais
const openLoginModalBtn = document.getElementById("openLoginModalBtn");
const openSignupModalBtn = document.getElementById("openSignupModalBtn");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const closeButtons = document.querySelectorAll(".close");

// abrir o modal de login
openLoginModalBtn.addEventListener("click", () => {
  loginModal.style.display = "block";
});

// abrir o modal de cadastro
openSignupModalBtn.addEventListener("click", () => {
  signupModal.style.display = "block";
});

// fechar os modais ao clicar no "x"
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
  });
});

// fechar os modais ao clicar fora deles
window.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target === signupModal) {
    signupModal.style.display = "none";
  }
});
