document.getElementById("diaatualiza").textContent = new Date().getDate();
document.getElementById("mesatualiza").textContent = new Date().toLocaleString('pt-br', { month: 'long' });
document.getElementById("anoatualiza").textContent = new Date().getFullYear();
