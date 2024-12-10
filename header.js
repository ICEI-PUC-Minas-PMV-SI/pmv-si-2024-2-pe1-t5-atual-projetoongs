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
  // Atualizar estado de login na header
  updateHeader();

  // Configurar eventos de modal
  const modal = document.getElementById('login-modal');
  const loginButton = document.getElementById('login-btn');
  const closeButton = document.getElementById('close-modal');
  const loginForm = document.getElementById('login-form');

  // Abrir modal
  if (loginButton) {
    loginButton.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
    });
  }

  // Fechar modal
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  // Submeter formulário
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Simular validação de login
      if (username === 'admin' && password === 'admin') {
        alert('Login bem-sucedido!');
        localStorage.setItem('loggedIn', 'true');
        modal.classList.add('hidden');
        updateHeader();
      } else {
        alert('Usuário ou senha inválidos.');
      }
    });
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
