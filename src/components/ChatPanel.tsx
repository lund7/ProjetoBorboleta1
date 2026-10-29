"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Message = { autor: string; texto: string; enviada?: boolean };
const quickReplies = [
  { pergunta: "Já registrei os remédios de hoje.", resposta: "Muito bem! Continue assim." },
  { pergunta: "Esqueci de tomar um remédio, e agora?", resposta: "Não tome dose dobrada para compensar. Siga a orientação do profissional de saúde ou da bula." },
  { pergunta: "Que horas você vem hoje?", resposta: "Vou chegar às 16h, como combinado." },
  { pergunta: "Você pode me ajudar com o almoço?", resposta: "Claro, chego em breve para te ajudar." },
  { pergunta: "Podemos marcar uma consulta médica?", resposta: "Posso ligar para o consultório amanhã de manhã." },
];

export default function ChatPanel({ mode = "medication" }: { mode?: "medication" | "caregiver" }) {
  const storageKey = mode === "caregiver" ? "batePapoMensagens" : "lembreteChatMensagens";
  const initial: Message[] = mode === "caregiver"
    ? [{ autor: "Maria Silva", texto: "Olá! Já tomou o remédio da tarde?" }, { autor: "Você", texto: "Sim, tomei agora pouco.", enviada: true }, { autor: "Maria Silva", texto: "Ótimo! Estarei aí às 16h para o passeio." }]
    : [{ autor: "Maria Silva", texto: "Não se esqueça de registrar os remédios após tomar!" }];
  const [messages, setMessages] = useState<Message[]>(initial);
  const [text, setText] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { const saved = localStorage.getItem(storageKey); if (saved) setMessages(JSON.parse(saved)); } catch { /* Mantém as mensagens iniciais. */ }
  }, [storageKey]);
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(messages)); chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight }); }, [messages, storageKey]);

  function addMessage(autor: string, texto: string, enviada = false) { setMessages(current => [...current, { autor, texto, enviada }]); }
  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const value = text.trim(); if (!value) return;
    addMessage("Você", value, true); setText("");
    window.setTimeout(() => addMessage("Maria Silva", "Recebi sua mensagem. Esta é uma resposta demonstrativa do protótipo."), 500);
  }
  function chooseReply(item: (typeof quickReplies)[number]) {
    addMessage("Você", item.pergunta, true);
    window.setTimeout(() => addMessage("Maria Silva", item.resposta), 500);
  }

  return <aside className="chat-panel">
    <h2>{mode === "caregiver" ? "Bate-papo com Maria" : "Bate-papo com Maria"}</h2>
    <div className="chat-box" id={mode === "caregiver" ? "chatMensagens" : "chatBox"} ref={chatRef}>
      {messages.map((message, index) => <div className={`chat-mensagem${message.enviada || message.autor === "Você" ? " enviada" : ""}`} key={`${index}-${message.autor}`}><strong>{message.autor}</strong><br />{message.texto}</div>)}
    </div>
    <div id="sugestoes" className="chat-suggestions">{quickReplies.map(item => <button key={item.pergunta} type="button" onClick={() => chooseReply(item)}>{item.pergunta}</button>)}</div>
    <form className="chat-input-area" onSubmit={send}><input id="mensagemInput" type="text" value={text} onChange={event => setText(event.target.value)} placeholder="Digite uma mensagem..." aria-label="Mensagem" /><button id="enviarBtn" className="btn-enviar" type="submit">Enviar</button></form>
    <small style={{ marginTop: 8, color: "var(--text-muted)" }}>Chat demonstrativo: as mensagens não são enviadas a uma pessoa real.</small>
  </aside>;
}
