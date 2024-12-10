const fecharBtns = document.querySelectorAll(".m-fechar");

function abreInscr(){
  modalInscricao.style.display = "block";
}

fecharBtns.forEach((button) => {
  button.addEventListener("click", () => {
    modalInscricao.style.display = "none";
  });
});

window.addEventListener("click", (event) => {
  if (event.target === modalInscricao) {
    modalInscricao.style.display = "none";
  }
});
