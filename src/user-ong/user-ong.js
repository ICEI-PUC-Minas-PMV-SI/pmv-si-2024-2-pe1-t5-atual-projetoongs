const regBtn = document.getElementById("reg-btn");
const fecharBtns = document.querySelectorAll(".m-fechar");

/* --------------- abrir e fechar modais -------------- */
function abreReg(){
  modalRegistro.style.display = "block";
}
function abreProj(){
  modalProjetos.style.display = "block";
}
function abreInscr(){
  modalInscricao.style.display = "block";
}

// fechar modal no X
fecharBtns.forEach((button) => {
  button.addEventListener("click", () => {
    modalRegistro.style.display = "none";
    modalProjetos.style.display = "none";
    modalInscricao.style.display = "none";
  });
});

// fechar modal clicando fora dele
window.addEventListener("click", (event) => {
  if (event.target === modalRegistro) {
    modalRegistro.style.display = "none";
  }
  if (event.target === modalProjetos) {
    modalProjetos.style.display = "none";
  }
  if (event.target === modalInscricao) {
    modalInscricao.style.display = "none";
  }
});

/* ------------- add novo registro ------------------ */
document.addEventListener('DOMContentLoaded', () => {
const overlay = document.getElementById("overlay");
const btnCriar = document.getElementById("create-news-btn");
const regGroupCards = document.getElementById("novoCard");
const newsPhoto = document.getElementById("cardPhoto");
const newsTitle = document.getElementById("news-title");
const newsDescription = document.getElementById("news-description");


btnCriar.addEventListener('click', () => {
  const photo = newsPhoto.files[0];
  const title = newsTitle.value.trim();
  const description = newsDescription.value.trim();

  if (title && description) {
    // Criar o novo card
    const newCard = document.createElement('div');
    newCard.classList.add('card');

    const cardPhoto = document.createElement('img');
    cardPhoto.src = URL.createObjectURL(photo);
    cardPhoto.alt = title;

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = title;

    const cardDescription = document.createElement('p');
    cardDescription.textContent = description;

    newCard.appendChild(cardPhoto);
    newCard.appendChild(cardTitle);
    newCard.appendChild(cardDescription);

    cardPhoto.classList.add('reg-img');
    cardTitle.classList.add('reg-card-h3');
    cardDescription.classList.add('reg-card-paragrafo');

    // Adicionar o card ao container
    regGroupCards.appendChild(newCard);

    // Fechar o modal e limpar os campos
    modalRegistro.style.display = 'none';
    overlay.style.display = 'none';
    clearModalInputs();
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});

function clearModalInputs() {
  newsTitle.value = '';
  newsDescription.value = '';
  newsPhoto.value = '';
}
});

/* ---------------- add novo projeto --------------- */
document.addEventListener('DOMContentLoaded', () => {
  const overlayProj = document.getElementById("overlay-proj");
  const btnCriar = document.getElementById("create-proj");
  const regGroupCards = document.getElementById("novoCardProj");
  const newsPhoto = document.getElementById("cardPhotoProj");
  const newsTitle = document.getElementById("news-title-proj");
  const newsDescription = document.getElementById("news-description-proj");
  const newsLupa = document.getElementById("newLupa");
  
  btnCriar.addEventListener('click', () => {
    const photo = newsPhoto.files[0];
    const lupa = "../img/lupa.png"
    const title = newsTitle.value.trim();
    const description = newsDescription.value.trim();
  
    if (title && description) {
      // Criar o novo card
      const newCard = document.createElement('div');
      newCard.classList.add('pj-card');

      const newCardInfo = document.createElement('div');
      newCardInfo.classList.add('pj-card-info');

      const newCardLupa = document.createElement('div');
      newCardLupa.classList.add('pj-card-lupa')
  
      const cardPhoto = document.createElement('img');
      cardPhoto.src = URL.createObjectURL(photo);
      cardPhoto.alt = title;
  
      const cardTitle = document.createElement('h3');
      cardTitle.textContent = title;
  
      const cardDescription = document.createElement('p');
      cardDescription.textContent = description;

      const cardVerMais = document.createElement('a');
      cardVerMais.textContent = "ver mais";

      const cardLupa = document.createElement('img');
      cardLupa.src = lupa;
      cardLupa.alt = "lupa";
  
      newCard.appendChild(cardPhoto);
      newCard.appendChild(newCardInfo);
      newCard.appendChild(newCardLupa);

      //dentro de pj-card-info
      newCardInfo.appendChild(cardTitle);
      newCardInfo.appendChild(cardDescription);
      newCardInfo.appendChild(cardVerMais);

      newCardLupa.appendChild(cardLupa);
  
      cardPhoto.classList.add('pj-img');
      cardTitle.classList.add('pj-card-h3');
      cardDescription.classList.add('pj-card-paragrafo');
      cardVerMais.classList.add('pj-ver-mais');
      cardLupa.classList.add('pj-lupa')
  
      // Adicionar o card ao container
      regGroupCards.appendChild(newCard);
  
      // Fechar o modal e limpar os campos
      modalRegistro.style.display = 'none';
      overlay.style.display = 'none';
      clearModalInputs();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });
  
  function clearModalInputs() {
    newsTitle.value = '';
    newsDescription.value = '';
    newsPhoto.value = '';
  }
  });

/* ---------------- editar dashboard ------------ */
let isEditing = false;

function toggleEdit() {
  const valueDisplay = document.getElementById('value-display');
  const editButton = document.querySelector('.edit-btn');

  if (!isEditing) {
    valueDisplay.contentEditable = "true";
    valueDisplay.focus();
    editButton.textContent = "Salvar";
  } else {
    valueDisplay.contentEditable = "false";
    editButton.textContent = "Editar";
  }

  isEditing = !isEditing;
}

function editarPerfil() {
  const editaveis = document.querySelectorAll('.editavel');
  const editButton = document.getElementById('btn-editar-perfil');

  if (!isEditing) {
    editaveis.forEach(el => {
      el.contentEditable = "true";
      el.style.border = "1px solid #ccc";
    });
    editButton.textContent = "Salvar";
    editaveis[0].focus();
  } else {
    editaveis.forEach(el => {
      el.contentEditable = "false";
      el.style.border = "none";
    });
    editButton.textContent = "Editar";
  }

  isEditing = !isEditing;
}


/* ---------------- modal inscrição --------------- */

m-proj-insc