const API_URL = "http://localhost:3000/mensagens";

function carregarMensagens() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const lista = document.getElementById("lista-mensagens");
      lista.innerHTML = "";
      data.forEach((msg) => {
        const item = document.createElement("li");
        item.textContent = msg.texto;
        lista.appendChild(item);
      });
    });
}

function enviarMensagem() {
  const texto = document.getElementById("mensagem").value;
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  }).then(() => {
    document.getElementById("mensagem").value = "";
    carregarMensagens();
  });
}

carregarMensagens();
