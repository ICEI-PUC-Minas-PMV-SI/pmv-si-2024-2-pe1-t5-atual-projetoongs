const checkboxes = document.querySelectorAll(
  '.checkboxes input[type="checkbox"]'
);
const searchBar = document.querySelector(".search-bar input");
const resultItems = document.querySelectorAll(".result-item");
const contactButton = document.querySelector("#footer-contato button");

function filterByCategory() {
  const selectedCategories = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.nextElementSibling.textContent.trim());

  resultItems.forEach((item) => {
    const category = item.querySelector(".title").textContent.trim();
    if (selectedCategories.includes(category)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

function searchResults() {
  const searchText = searchBar.value.toLowerCase();
  resultItems.forEach((item) => {
    const title = item.querySelector(".title").textContent.toLowerCase();
    const description = item
      .querySelector(".description")
      .textContent.toLowerCase();
    if (title.includes(searchText) || description.includes(searchText)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

function showMoreInfo(event) {
  const title = event.target.parentElement.querySelector(".title").textContent;
  alert(`Mais informações sobre ${title} serão exibidas aqui.`);
}

function submitContactForm() {
  alert("Mensagem enviada com sucesso! Obrigado por entrar em contato.");
}

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", filterByCategory)
);

searchBar.addEventListener("input", searchResults);

document
  .querySelectorAll(".btn")
  .forEach((button) => button.addEventListener("click", showMoreInfo));
contactButton.addEventListener("click", submitContactForm);