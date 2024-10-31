const regBtn = document.getElementById("reg-btn");
const fecharBtns = document.querySelectorAll(".m-fechar");

function abreReg(){
  modalRegistro.style.display = "block";
}

function abreProj(){
  modalProjetos.style.display = "block";
}

fecharBtns.forEach((button) => {
  button.addEventListener("click", () => {
    modalRegistro.style.display = "none";
    modalProjetos.style.display = "none";
  });
});

window.addEventListener("click", (event) => {
  if (event.target === modalRegistro) {
    modalRegistro.style.display = "none";
  }
  if (event.target === modalProjetos) {
    modalProjetos.style.display = "none";
  }
});

