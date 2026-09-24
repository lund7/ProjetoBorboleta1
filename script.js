// ============================================================
// ElderCare — script.js
// ============================================================

// ============================================================
// REMÉDIOS
// ============================================================

const remediosSalvos = localStorage.getItem('remedios');

let remedios;

if (remediosSalvos === null) {
    remedios = [
        {
            id: 1,
            nome: 'Remédio 1',
            horario: '08:00',
            tomado: false
        },
        {
            id: 2,
            nome: 'Remédio 2',
            horario: '12:00',
            tomado: false
        },
        {
            id: 3,
            nome: 'Remédio 3',
            horario: '18:00',
            tomado: false
        }
    ];

    localStorage.setItem(
        'remedios',
        JSON.stringify(remedios)
    );
} else {
    try {
        remedios = JSON.parse(remediosSalvos);

        if (!Array.isArray(remedios)) {
            remedios = [];
        }
    } catch (erro) {
        console.error(
            'Erro ao carregar remédios:',
            erro
        );

        remedios = [];
    }
}

// ============================================================
// PRÓXIMO ID
// ============================================================

let proximoId = remedios.length > 0
    ? Math.max(
        ...remedios.map(r => Number(r.id) || 0)
    ) + 1
    : 1;

// ============================================================
// SALVAR
// ============================================================

function salvar() {
    localStorage.setItem(
        'remedios',
        JSON.stringify(remedios)
    );
}

// ============================================================
// RESET DIÁRIO
// ============================================================

function verificarResetDiario() {
    const hoje = new Date().toDateString();
    const ultimoReset =
        localStorage.getItem('ultimoReset');

    if (ultimoReset !== hoje) {
        remedios = remedios.map(remedio => ({
            ...remedio,
            tomado: false
        }));

        salvar();

        localStorage.setItem(
            'ultimoReset',
            hoje
        );
    }
}

// ============================================================
// RENDERIZAR LISTA
// ============================================================

function renderizarLista() {
    const ul = document.querySelector('#Lista ul');

    if (!ul) return;

    ul.innerHTML = '';

    // ----------------------------------------------------------
    // NENHUM REMÉDIO
    // ----------------------------------------------------------

    if (remedios.length === 0) {
        const li = document.createElement('li');

        li.textContent =
            'Nenhum remédio cadastrado.';

        li.style.cssText = `
            justify-content: center;
            color: var(--text-muted);
            opacity: 1;
            text-decoration: none;
        `;

        ul.appendChild(li);

        atualizarProgresso();

        return;
    }

    // ----------------------------------------------------------
    // ORDENA POR HORÁRIO
    // ----------------------------------------------------------

    remedios.sort((a, b) =>
        a.horario.localeCompare(b.horario)
    );

    // ----------------------------------------------------------
    // CRIA CADA REMÉDIO
    // ----------------------------------------------------------

    remedios.forEach(remedio => {
        const li = document.createElement('li');

        li.dataset.id = remedio.id;

        // --------------------------------------------------------
        // ESTILO SE TOMADO
        // --------------------------------------------------------

        if (remedio.tomado) {
            li.style.opacity = '0.6';

            li.style.textDecoration =
                'line-through';
        }

        // --------------------------------------------------------
        // TEXTO
        // --------------------------------------------------------

        const span =
            document.createElement('span');

        const partes =
            remedio.horario.split(':');

        const hora =
            Number(partes[0]);

        const minuto =
            Number(partes[1]);

        const horaFormatada =
            new Date(
                2000,
                0,
                1,
                hora,
                minuto
            ).toLocaleTimeString(
                'pt-BR',
                {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            );

        span.textContent =
            `${remedio.nome} — ${horaFormatada}`;

        // --------------------------------------------------------
        // CONTAINER DOS BOTÕES
        // --------------------------------------------------------

        const botoes =
            document.createElement('div');

        botoes.style.cssText = `
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        `;

        // ========================================================
        // BOTÃO TOMAR / DESMARCAR
        // ========================================================

        const botaoTomar =
            document.createElement('button');

        botaoTomar.className =
            'btn-acao';

        botaoTomar.type =
            'button';

        if (remedio.tomado) {
            botaoTomar.textContent =
                '↩ Desmarcar';

            botaoTomar.style.background =
                '#6b7280';
        } else {
            botaoTomar.textContent =
                'Já tomei';
        }

        botaoTomar.addEventListener(
            'click',
            function () {
                toggleTomado(remedio.id);
            }
        );

        // ========================================================
        // BOTÃO REMOVER
        // ========================================================

        const botaoRemover =
            document.createElement('button');

        botaoRemover.className =
            'btn-acao';

        botaoRemover.type =
            'button';

        botaoRemover.textContent =
            'Remover';

        botaoRemover.style.background =
            '#dc2626';

        botaoRemover.addEventListener(
            'click',
            function () {
                removerRemedio(remedio.id);
            }
        );

        // --------------------------------------------------------
        // MONTA ELEMENTOS
        // --------------------------------------------------------

        botoes.appendChild(botaoTomar);
        botoes.appendChild(botaoRemover);

        li.appendChild(span);
        li.appendChild(botoes);

        ul.appendChild(li);
    });

    atualizarProgresso();
}

// ============================================================
// MARCAR / DESMARCAR
// ============================================================

function toggleTomado(id) {
    const remedio =
        remedios.find(
            r => Number(r.id) === Number(id)
        );

    if (!remedio) return;

    remedio.tomado =
        !remedio.tomado;

    salvar();

    renderizarLista();
}

// ============================================================
// REMOVER
// ============================================================

function removerRemedio(id) {
    const remedio =
        remedios.find(
            r => Number(r.id) === Number(id)
        );

    if (!remedio) return;

    const confirmar =
        confirm(
            `Remover "${remedio.nome}" da lista?`
        );

    if (!confirmar) return;

    remedios =
        remedios.filter(
            r => Number(r.id) !== Number(id)
        );

    salvar();

    renderizarLista();
}

// ============================================================
// MODAL ADICIONAR
// ============================================================

function abrirModalAdicionar() {

    // Evita abrir dois modais
    if (
        document.getElementById(
            'modalBackdrop'
        )
    ) {
        return;
    }

    const backdrop =
        document.createElement('div');

    backdrop.id =
        'modalBackdrop';

    backdrop.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;

    backdrop.innerHTML = `
        <div
            style="
                background: var(--card-bg);
                color: var(--text-main);
                padding: 28px;
                border-radius: 16px;
                width: 320px;
                max-width: calc(100vw - 40px);
                display: flex;
                flex-direction: column;
                gap: 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
            "
        >

            <h3
                style="
                    margin: 0;
                    font-size: 1.1rem;
                "
            >
                Adicionar Remédio
            </h3>

            <div
                style="
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                "
            >

                <label
                    for="nomeRemedio"
                    style="
                        font-size: 0.9rem;
                        font-weight: 600;
                    "
                >
                    Nome do remédio
                </label>

                <input
                    id="nomeRemedio"
                    type="text"
                    placeholder="Ex: Losartana 50mg"
                    autocomplete="off"
                    style="
                        padding: 10px 14px;
                        border: 1px solid var(--border-color);
                        border-radius: 8px;
                        font-size: 1rem;
                        background: var(--bg-main);
                        color: var(--text-main);
                        outline: none;
                        box-sizing: border-box;
                        width: 100%;
                    "
                >

            </div>

            <div
                style="
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                "
            >

                <label
                    for="horarioRemedio"
                    style="
                        font-size: 0.9rem;
                        font-weight: 600;
                    "
                >
                    Horário
                </label>

                <input
                    id="horarioRemedio"
                    type="time"
                    style="
                        padding: 10px 14px;
                        border: 1px solid var(--border-color);
                        border-radius: 8px;
                        font-size: 1rem;
                        background: var(--bg-main);
                        color: var(--text-main);
                        outline: none;
                        box-sizing: border-box;
                        width: 100%;
                    "
                >

            </div>

            <div
                id="erroModal"
                style="
                    color: #dc2626;
                    font-size: 0.85rem;
                    display: none;
                "
            ></div>

            <div
                style="
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                "
            >

                <button
                    id="cancelarModal"
                    type="button"
                    style="
                        padding: 10px 18px;
                        border: 1px solid var(--border-color);
                        border-radius: 8px;
                        background: transparent;
                        color: var(--text-main);
                        cursor: pointer;
                        font-weight: 600;
                    "
                >
                    Cancelar
                </button>

                <button
                    id="confirmarModal"
                    type="button"
                    style="
                        padding: 10px 18px;
                        background: var(--primary-color);
                        color: #fff;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    "
                >
                    Adicionar
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(backdrop);

    // ==========================================================
    // ELEMENTOS DO MODAL
    // ==========================================================

    const nomeInput =
        document.getElementById(
            'nomeRemedio'
        );

    const horarioInput =
        document.getElementById(
            'horarioRemedio'
        );

    const erroDiv =
        document.getElementById(
            'erroModal'
        );

    const cancelar =
        document.getElementById(
            'cancelarModal'
        );

    const confirmar =
        document.getElementById(
            'confirmarModal'
        );

    // Foco automático
    nomeInput.focus();

    // ==========================================================
    // CANCELAR
    // ==========================================================

    cancelar.addEventListener(
        'click',
        fecharModal
    );

    // ==========================================================
    // ADICIONAR
    // ==========================================================

    confirmar.addEventListener(
        'click',
        confirmarAdicionar
    );

    // ==========================================================
    // ENTER / ESC
    // ==========================================================

    backdrop.addEventListener(
        'keydown',
        function (event) {

            if (event.key === 'Enter') {
                event.preventDefault();
                confirmarAdicionar();
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                fecharModal();
            }
        }
    );
}

// ============================================================
// FECHAR MODAL
// ============================================================

function fecharModal() {
    const modal =
        document.getElementById(
            'modalBackdrop'
        );

    if (modal) {
        modal.remove();
    }
}

// ============================================================
// CONFIRMAR ADIÇÃO
// ============================================================

function confirmarAdicionar() {

    const nomeInput =
        document.getElementById(
            'nomeRemedio'
        );

    const horarioInput =
        document.getElementById(
            'horarioRemedio'
        );

    const erroDiv =
        document.getElementById(
            'erroModal'
        );

    if (
        !nomeInput ||
        !horarioInput ||
        !erroDiv
    ) {
        return;
    }

    const nome =
        nomeInput.value.trim();

    const horario =
        horarioInput.value;

    // ==========================================================
    // VALIDA NOME
    // ==========================================================

    if (!nome) {

        erroDiv.textContent =
            'Por favor, informe o nome do remédio.';

        erroDiv.style.display =
            'block';

        nomeInput.focus();

        return;
    }

    // ==========================================================
    // VALIDA HORÁRIO
    // ==========================================================

    if (!horario) {

        erroDiv.textContent =
            'Por favor, informe o horário.';

        erroDiv.style.display =
            'block';

        horarioInput.focus();

        return;
    }

    // ==========================================================
    // CRIA REMÉDIO
    // ==========================================================

    const novoRemedio = {
        id: proximoId++,
        nome: nome,
        horario: horario,
        tomado: false
    };

    // Adiciona
    remedios.push(novoRemedio);

    // Ordena
    remedios.sort(
        (a, b) =>
            a.horario.localeCompare(
                b.horario
            )
    );

    // Salva
    salvar();

    // Fecha
    fecharModal();

    // Atualiza
    renderizarLista();
}

// ============================================================
// PROGRESSO
// ============================================================

function atualizarProgresso() {

    const barra =
        document.querySelector(
            '#progresso progress'
        );

    if (!barra) return;

    const total =
        remedios.length;

    const tomados =
        remedios.filter(
            r => r.tomado
        ).length;

    const porcentagem =
        total === 0
            ? 0
            : Math.round(
                (tomados / total) * 100
            );

    barra.value =
        porcentagem;

    barra.max =
        100;

    let texto =
        document.getElementById(
            'textoProgresso'
        );

    if (!texto) {

        texto =
            document.createElement('p');

        texto.id =
            'textoProgresso';

        texto.style.cssText = `
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 4px;
        `;

        barra.parentNode.appendChild(
            texto
        );
    }

    texto.textContent =
        `${tomados} de ${total} remédio${
            total !== 1 ? 's' : ''
        } tomado${
            tomados !== 1 ? 's' : ''
        } hoje (${porcentagem}%)`;
}

// ============================================================
// ACESSIBILIDADE — FONTE
// ============================================================

let tamanhoFonte =
    parseFloat(
        localStorage.getItem(
            'tamanhoFonte'
        )
    ) || 16;

function alterarFonte(acao) {

    if (
        acao === 'mais' &&
        tamanhoFonte < 26
    ) {
        tamanhoFonte += 2;
    }

    else if (
        acao === 'menos' &&
        tamanhoFonte > 12
    ) {
        tamanhoFonte -= 2;
    }

    else if (
        acao === 'reset'
    ) {
        tamanhoFonte = 16;
    }

    document.documentElement.style
        .setProperty(
            '--font-scale',
            tamanhoFonte + 'px'
        );

    document.body.style.fontSize =
        tamanhoFonte + 'px';

    localStorage.setItem(
        'tamanhoFonte',
        tamanhoFonte
    );
}

// ============================================================
// ACESSIBILIDADE — CONTRASTE
// ============================================================

function toggleContraste() {

    document.body.classList.toggle(
        'high-contrast'
    );

    localStorage.setItem(
        'altoContraste',
        document.body.classList.contains(
            'high-contrast'
        )
    );
}

// ============================================================
// CHAT
// ============================================================

function enviarMensagem() {

    const input =
        document.getElementById(
            'mensagemInput'
        );

    const chatBox =
        document.getElementById(
            'chatBox'
        );

    if (!input || !chatBox) {
        return;
    }

    const texto =
        input.value.trim();

    if (!texto) {
        return;
    }

    const mensagem =
        document.createElement('div');

    mensagem.className =
        'chat-mensagem enviada';

    mensagem.textContent =
        texto;

    chatBox.appendChild(
        mensagem
    );

    input.value = '';

    chatBox.scrollTop =
        chatBox.scrollHeight;
}

// ============================================================
// BOTÃO "+ ADICIONAR"
// ============================================================

function configurarBotaoAdicionar() {

    const botao =
        document.getElementById(
            'btnAdicionarRemedio'
        );

    if (!botao) {

        console.error(
            'Botão de adicionar remédio não encontrado.'
        );

        return;
    }

    botao.addEventListener(
        'click',
        function (event) {

            event.preventDefault();

            abrirModalAdicionar();
        }
    );
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener(
    'DOMContentLoaded',
    function () {

        // ========================================================
        // RESET DIÁRIO
        // ========================================================

        verificarResetDiario();

        // ========================================================
        // CONTRASTE
        // ========================================================

        if (
            localStorage.getItem(
                'altoContraste'
            ) === 'true'
        ) {
            document.body.classList.add(
                'high-contrast'
            );
        }

        // ========================================================
        // FONTE
        // ========================================================

        const fonteSalva =
            localStorage.getItem(
                'tamanhoFonte'
            );

        if (fonteSalva) {

            tamanhoFonte =
                parseFloat(
                    fonteSalva
                );

            document.documentElement.style
                .setProperty(
                    '--font-scale',
                    tamanhoFonte + 'px'
                );

            document.body.style.fontSize =
                tamanhoFonte + 'px';
        }

        // ========================================================
        // BOTÃO ADICIONAR
        // ========================================================

        configurarBotaoAdicionar();

        // ========================================================
        // LISTA
        // ========================================================

        renderizarLista();
    }
);

document.addEventListener("DOMContentLoaded", function () {

  const mensagens = document.getElementById("chatMensagens");
  const sugestoes = document.getElementById("sugestoes");
  const input = document.getElementById("mensagemInput");
  const botaoEnviar = document.getElementById("enviarBtn");

  if (!mensagens || !sugestoes) return;

  const CHAVE_STORAGE = "batePapoMensagens";

  const perguntasRespostas = [
    { pergunta: "Que horas você vem hoje?", resposta: "Vou chegar às 16h, como combinado." },
    { pergunta: "Posso tomar o remédio mais tarde?", resposta: "Pode, mas tente não atrasar muito o horário." },
    { pergunta: "Você pode me ajudar com o almoço?", resposta: "Claro, chego em breve para te ajudar." },
    { pergunta: "Estou com dor, o que eu faço?", resposta: "Vou até aí agora, aguenta firme." },
    { pergunta: "Podemos marcar uma consulta médica?", resposta: "Posso ligar para o consultório amanhã de manhã." }
  ];

  function salvarMensagens() {
    const lista = [];
    mensagens.querySelectorAll("p").forEach(function (p) {
      const autor = p.querySelector("strong").textContent;
      const texto = p.lastChild.textContent;
      lista.push({ autor: autor, texto: texto });
    });
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  }

  function carregarMensagens() {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    if (!salvo) return;
    const lista = JSON.parse(salvo);
    mensagens.innerHTML = "";
    lista.forEach(function (item) {
      criarMensagemNoDOM(item.autor, item.texto);
    });
  }

  function criarMensagemNoDOM(autor, texto) {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = autor;
    p.appendChild(strong);
    p.appendChild(document.createElement("br"));
    p.appendChild(document.createTextNode(texto));
    mensagens.appendChild(p);
  }

  function adicionarMensagem(autor, texto) {
    criarMensagemNoDOM(autor, texto);
    mensagens.scrollTop = mensagens.scrollHeight;
    salvarMensagens();
  }

  function enviarPergunta(pergunta, resposta) {
    adicionarMensagem("Você", pergunta);
    setTimeout(function () {
      adicionarMensagem("Maria Silva", resposta);
    }, 800);
  }

  perguntasRespostas.forEach(function (item) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = item.pergunta;
    botao.addEventListener("click", function () {
      enviarPergunta(item.pergunta, item.resposta);
    });
    sugestoes.appendChild(botao);
  });

  if (input && botaoEnviar) {
    botaoEnviar.addEventListener("click", function () {
      const texto = input.value.trim();
      if (texto === "") return;
      adicionarMensagem("Você", texto);
      input.value = "";
      setTimeout(function () {
        adicionarMensagem("Maria Silva", "Recebi sua mensagem, já te respondo!");
      }, 800);
    });
  }

  carregarMensagens();

});
