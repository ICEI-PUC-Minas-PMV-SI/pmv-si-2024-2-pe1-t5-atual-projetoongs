<script>
     <!--FORMULÁRIO -->
    const form = document.getElementById('myForm');
    const message = document.getElementById('message');

    form.onsubmit = function (event)
    {
        event.preventDefault();
        const inputValue = document.getElementById('inputText').value;
        message.textContent = `Você digitou: ${inputValue}`;
        form.reset();
    }

    <!-- FORMULÁRIO-->
    const openPopup = document.getElementById('openPopup');
    const closePopup = document.getElementById('closePopup');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    openPopup.onclick = function ()
    {
    popup.style.display = 'block';
    overlay.style.display = 'block';
    }

    closePopup.onclick = function ()
    {
    popup.style.display = 'none';
    overlay.style.display = 'none';
    }

    overlay.onclick = function () {
    popup.style.display = 'none';
    overlay.style.display = 'none';
    }

    
    function mostrarMensagem()
    {

     const mensagem = document.createElement("div");
     mensagem.textContent = "Para este evento, solicitamos a entrega de 1kg de alimento não perecível ou um brinquedo em bom estado. Vamos juntos ajudar!";
     mensagem.style.position = "fixed";
     mensagem.style.left = "50%";
     mensagem.style.top = "50%";
     mensagem.style.transform = "translate(-50%, -50%)";
     mensagem.style.padding = "30px";
     mensagem.style.marginRight = "10px";
     mensagem.style.backgroundColor = "#d0d0d0de";
     mensagem.style.border = "3px solid #4eabf1";
     mensagem.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
     mensagem.style.zIndex = "1000";
     mensagem.style.display = "inline-block";


     const botaoFechar = document.createElement("button");
     botaoFechar.textContent = "FECHAR";
     botaoFechar.style.marginTop = "10px";
     botaoFechar.onclick = () => document.body.removeChild(mensagem);

     mensagem.appendChild(botaoFechar);
     document.body.appendChild(mensagem);
    }
</script>

