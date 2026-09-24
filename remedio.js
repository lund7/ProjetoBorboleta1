const CHAVE_STORAGE_LEMBRETE = "lembreteChatMensagens";

const perguntasRespostasLembrete = [
  { pergunta: "Já registrei os remédios de hoje.", resposta: "Muito bem! Continue assim." },
  { pergunta: "Esqueci de tomar um remédio, e agora?", resposta: "Tome assim que lembrar, mas não tome dose dobrada." },
  { pergunta: "Que horas você vem hoje?", resposta: "Vou chegar às 16h, como combinado." },
  { pergunta: "Você pode me ajudar com o almoço?", resposta: "Claro, chego em breve para te ajudar." },
  { pergunta: "Podemos marcar uma consulta médica?", resposta: "Posso ligar para o consultório amanhã de manhã." }
];

function criarMensagemNoChatBox(autor, texto) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = "chat-mensagem";
  const strong = document.createElement("strong");
  strong.textContent = autor;
  div.appendChild(strong);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createTextNode(texto));
  chatBox.appendChild(div);
}

function salvarMensagensLembrete() {
  const chatBox = document.getElementById("chatBox");
  const lista = [];
  chatBox.querySelectorAll(".chat-mensagem").forEach(function (div) {
    const autor = div.querySelector("strong").textContent;
    const texto = div.lastChild.textContent;
    lista.push({ autor: autor, texto: texto });
  });
  localStorage.setItem(CHAVE_STORAGE_LEMBRETE, JSON.stringify(lista));
}

function carregarMensagensLembrete() {
  const salvo = localStorage.getItem(CHAVE_STORAGE_LEMBRETE);
  if (!salvo) return;
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";
  JSON.parse(salvo).forEach(function (item) {
    criarMensagemNoChatBox(item.autor, item.texto);
  });
}

function adicionarMensagemLembrete(autor, texto) {
  criarMensagemNoChatBox(autor, texto);
  const chatBox = document.getElementById("chatBox");
  chatBox.scrollTop = chatBox.scrollHeight;
  salvarMensagensLembrete();
}

function enviarMensagem() {
  const input = document.getElementById("mensagemInput");
  const texto = input.value.trim();
  if (texto === "") return;
  adicionarMensagemLembrete("Você", texto);
  input.value = "";
  setTimeout(function () {
    adicionarMensagemLembrete("Maria Silva", "Recebi sua mensagem, já te respondo!");
  }, 800);
}

document.addEventListener("DOMContentLoaded", function () {
  carregarMensagensLembrete();

  const sugestoes = document.getElementById("sugestoes");
  if (sugestoes) {
    perguntasRespostasLembrete.forEach(function (item) {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.textContent = item.pergunta;
      botao.addEventListener("click", function () {
        adicionarMensagemLembrete("Você", item.pergunta);
        setTimeout(function () {
          adicionarMensagemLembrete("Maria Silva", item.resposta);
        }, 800);
      });
      sugestoes.appendChild(botao);
    });
  }
});
