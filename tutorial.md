# Tutorial — Portal do Idoso e do Cuidador

## Idealização e explicação do projeto  
- Murillo Vassoler 10438656 - Matheus Maglio 10756191 - Ali Ahmad 10427712 - Pedro Henrique 10440155

---

## 1. O que é o projeto

O **Portal do Idoso e do Cuidador** é um site pensado como ferramenta de **extensão universitária**, funcionando como ponte entre:

- **Idosos**, que precisam de informação confiável e acessível sobre saúde, direitos e convivência;
- **Cuidadores** (familiares ou profissionais), que precisam de orientação prática e apoio emocional;
- **Rede de serviços locais** (UBS, CRAS, ILPIs, grupos de convivência), que muitas vezes é desconhecida por quem mais precisa dela.

O site não é apenas informativo — ele **conecta pessoas a atendimento real**, o que é o que dá a ele caráter extensionista (e não só um blog de saúde).

---

## 2. Justificativa

O envelhecimento populacional aumenta a demanda por cuidado, mas o acesso à informação de qualidade e a serviços de apoio ainda é fragmentado e pouco acessível para idosos e cuidadores, especialmente os de baixa renda ou pouca familiaridade digital. Um portal como este busca:

- Reduzir a exclusão digital de idosos;
- Aliviar a sobrecarga (física e emocional) de cuidadores;
- Aproximar a universidade da comunidade, com prática real de extensão;
- Centralizar informação que hoje está espalhada (ou não existe) em um único canal confiável.

---

## 3. Público-alvo

| Público | Necessidade principal |
|---|---|
| Idosos | Informação simples, companhia, acesso a direitos e serviços |
| Cuidadores familiares | Orientação prática, suporte emocional, rede de apoio |
| Cuidadores profissionais | Capacitação, materiais de referência |
| Comunidade/gestores públicos | Indicadores sobre demandas locais de cuidado |

---

## 4. Estrutura do site (mapa de páginas)

```
Home
├── Área do Idoso
│    ├── Cartilhas e vídeos de saúde
│    ├── Lembretes de medicação/vacina
│    ├── Exercícios adaptados
│    ├── Direitos do idoso
│    └── Mural / fórum de convivência
│
├── Área do Cuidador
│    ├── Guias práticos de cuidado
│    ├── Sinais de alerta
│    ├── Saúde mental do cuidador
│    ├── Planilha de rotina/medicação
│    ├── Triagem rápida (formulário)
│    └── Canal de apoio (negligência/maus-tratos)
│
├── Agendamento / Extensão
│    ├── Oficinas e rodas de conversa
│    └── Diário de acompanhamento (uso interno)
│
├── Mapa de Serviços
│    └── Busca por bairro/tipo de serviço
│
├── Seja Voluntário
│    └── Cadastro de disponibilidade
│
└── Fale Conosco / Sobre o projeto
```

Essa estrutura corresponde diretamente ao arquivo `wireframe.html`, que apresenta cada uma dessas telas de forma navegável.

---

## 5. Funcionalidades com caráter extensionista

O diferencial deste projeto em relação a um site comum de saúde é que ele **gera prática de extensão** e não só consumo passivo de conteúdo:


1. **Diário de acompanhamento** — registro (com consentimento) da evolução de casos acompanhados, usado depois em relatórios do projeto de extensão.
2. **Oficinas e rodas de conversa** — divulgação e inscrição em atividades presenciais, conduzidas pelos próprios extensionistas.
3. **Banco de voluntários** — cadastro de pessoas dispostas a apoiar idosos, ampliando a rede de cuidado além da universidade.
4. **Canal de apoio a casos de negligência/maus-tratos** — encaminhamento a órgãos responsáveis, com protocolo de sigilo.
5. **Coleta de dados** — formulários alimentam indicadores (nº de atendimentos, temas mais buscados, satisfação), usados para relatórios acadêmicos e para justificar continuidade do projeto.
6. **Alfabetização digital** — tutoriais simples (WhatsApp, videochamada, aplicativos de banco), reduzindo a exclusão digital do idoso.

> É esse conjunto de funcionalidades — que geram **atendimento, dado e prática real** — que diferencia um "portal informativo" de um verdadeiro **projeto de extensão**.

---

## 6. Diretrizes de acessibilidade (obrigatórias no design final)

- Fonte grande e ajustável (botões A-/A/A+);
- Alto contraste entre texto e fundo;
- Botões grandes, fáceis de clicar/tocar;
- Navegação simples, poucos cliques até a informação essencial;
- Opção de leitura em voz alta (texto para fala);
- Versão para impressão, pensando em quem não tem internet em casa;
- Linguagem clara, evitando termos técnicos sem explicação.

Essas diretrizes já aparecem representadas no wireframe (barra de acessibilidade no topo da Home).

---

## 7. Considerações éticas e de proteção de dados

- Consentimento explícito antes de qualquer registro de atendimento ou triagem;
- Dados sensíveis (saúde, situação de vulnerabilidade) armazenados apenas para uso interno do projeto, nunca públicos;
- Protocolo claro para casos de suspeita de negligência ou abuso, com encaminhamento aos órgãos competentes (não cabe ao site "resolver" o caso, apenas encaminhar);

---

## 8. Próximos passos sugeridos

1. Validar a estrutura de páginas com a equipe/orientador do projeto de extensão;
2. Definir quais páginas serão prioridade na primeira versão (MVP): sugestão — Home, Área do Cuidador, Agendamento;
3. Levantar a rede real de serviços locais para popular o Mapa de Serviços;
4. Definir protocolo de triagem e de encaminhamento em caso de urgência;
5. Testar a usabilidade com um grupo pequeno de idosos e cuidadores reais antes do lançamento.

---
