const API_URL = "http://localhost:3000/mensagens";

async function carregarMensagens() {
  const lista = document.getElementById("lista-mensagens");

  try {
    const result = await fetch(API_URL);
    const response = await result.json();

    lista.innerHTML = "";
    response.forEach((msg) => {
      const item = document.createElement("li");
      item.textContent = msg.texto;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error("Erro ao carregar mensagens:", error);
    alert("Erro ao carregar mensagens. Tente novamente.");
    return;
  }
}

async function enviarMensagem() {
  const texto = document.getElementById("mensagem").value;
  try {
    const result = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
    });

    document.getElementById("mensagem").value = "";
    carregarMensagens();
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    alert("Erro ao enviar mensagem. Tente novamente.");
    return;
  }
}

carregarMensagens();
