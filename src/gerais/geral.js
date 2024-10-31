let tipoPerfil = localStorage.getItem("tipoPerfil");

function meuPerfil(){
  if (tipoPerfil == 'doador'){
    window.location.href = '../'
  }else if (tipoPerfil == 'ong'){
    window.location.href = '../user-ong/user-ong.html'
  }else{
    alert('erro: tipo de perfil não encontrado, redirecionando para o login');
    window.location.href = '../index.html'
  }
};

function sairPerfil(){
  localStorage.clear();
  window.location.href = '../index.html';
};

function enviaInfosContato(){
  let  nomeContato = document.querySelector('#nomeContato').value
  let  sobrenomeContato = document.querySelector('#sobrenomeContato').value
  let  emailContato = document.querySelector('#emailContato').value
  let  msgContato = document.querySelector('#msgContato').value

  if (nomeContato !== '' && sobrenomeContato !== '' && emailContato !== '' && msgContato !== ''){
    console.log('nome: ' + nomeContato + ' ' + sobrenomeContato)
    window.location.href = '../index.html'
  }else{
    alert('Por favor, preencha as informações')
  }
}