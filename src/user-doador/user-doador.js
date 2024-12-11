const editButton = document.querySelector('.edit-btn');
const bioTextarea = document.querySelector('.profile-info textarea');

editButton.addEventListener('click', () => {
    if (bioTextarea.disabled) {
        bioTextarea.disabled = false;
        bioTextarea.focus();
        editButton.textContent = 'Salvar';
    } else {
        bioTextarea.disabled = true;
        editButton.textContent = 'Editar';
        alert('Biografia salva: ' + bioTextarea.value);
    }
});
