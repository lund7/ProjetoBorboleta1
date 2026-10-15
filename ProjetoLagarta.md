# Insights para a Evolução do Portal do Idoso e do Cuidador com ReactJS

**Projeto:** Projeto Borboleta — Portal do Idoso e do Cuidador
**Repositório analisado:** `lund7/ProjetoBorboleta1`
**Natureza:** projeto de extensão universitária
**Tipo de documento:** análise técnica e proposta de arquitetura (insights)

---

## Resumo

Este documento apresenta uma análise do estado atual do Projeto Borboleta, um site estático em HTML, CSS e JavaScript voltado a idosos e cuidadores, e propõe sua evolução para uma aplicação em ReactJS. A análise identifica limitações do protótipo atual, como a repetição de código entre páginas e a ausência de estado compartilhado, e apresenta insights de arquitetura, de acessibilidade e de organização de dados. Propõe-se ainda um modelo de **JSON estático** como fonte de dados na primeira fase, dispensando backend até a validação com o público-alvo. O objetivo é subsidiar decisões de implementação, não substituir a validação com usuários reais.

**Palavras-chave:** ReactJS; acessibilidade; envelhecimento; extensão universitária; componentização; dados estáticos.

---

## 1. Introdução

O envelhecimento populacional amplia a demanda por informação e por serviços de cuidado, mas o acesso a esses recursos permanece fragmentado, sobretudo para pessoas idosas com pouca familiaridade digital. O Projeto Borboleta busca reduzir essa lacuna ao reunir, em um único canal, conteúdo de saúde, orientação ao cuidador e localização de serviços da rede local (UBS, CRAS, hospitais e grupos de convivência).

O protótipo atual é composto por três páginas (Medicação, Navegação e Cuidador), uma folha de estilos, um script e a documentação em `tutorial.md`. Esta fase é adequada para validar a ideia, mas tende a se tornar custosa de manter quando o projeto crescer em páginas e funcionalidades.

## 2. Objetivos

**Objetivo geral:** propor uma arquitetura em ReactJS que preserve o propósito extensionista do projeto e facilite sua evolução.

**Objetivos específicos:**

1. Diagnosticar limitações do protótipo estático atual.
2. Apresentar insights de componentização, estado, rotas e acessibilidade.
3. Propor um modelo de dados em JSON estático que alimente a interface.
4. Definir um roteiro de migração incremental, priorizando um produto mínimo viável (MVP).

## 3. Fundamentação teórica

- **Componentização e estado declarativo.** O React organiza a interface em componentes reutilizáveis e faz a tela refletir o estado da aplicação (REACT, 2026). Isso reduz duplicação e facilita testes.
- **Acessibilidade.** As diretrizes WCAG organizam-se nos princípios perceptível, operável, compreensível e robusto (W3C, 2018), diretamente relevantes para um público com baixa visão, menor destreza motora e pouca familiaridade digital.
- **Proteção de dados.** Dados de saúde são considerados dados pessoais sensíveis pela Lei Geral de Proteção de Dados (BRASIL, 2018), o que exige consentimento e cuidado no armazenamento.
- **Direitos da pessoa idosa.** O Estatuto da Pessoa Idosa (BRASIL, 2003) fundamenta os conteúdos de direitos e o encaminhamento de denúncias de maus-tratos.

## 4. Diagnóstico do estado atual

| Aspecto | Situação observada | Consequência |
|---|---|---|
| Navegação | Menu repetido em cada página, com botões dentro de `<form>` | Duplicação e manutenção manual em cada arquivo |
| Estado | Sem compartilhamento entre páginas | Preferências (fonte, contraste) não persistem |
| Mapa | Placeholder ("Aqui ficará o mapa futuramente") | Funcionalidade central ainda não entregue |
| Dados | Conteúdo escrito direto no HTML | Difícil atualizar sem editar código |
| Acessibilidade | Prevista no tutorial, ainda não implementada | Risco de excluir o público-alvo |

## 5. Insights para a implementação em ReactJS

### Insight 1 — Componentizar o que se repete
O cabeçalho com o menu aparece nas três páginas. Um único componente `Header` elimina a repetição, e o `NavLink` do React Router destaca a página ativa, no lugar dos formulários usados hoje como navegação.

### Insight 2 — Tratar a acessibilidade como estado global
Tamanho de fonte, alto contraste e leitura em voz alta são preferências que atravessam todas as telas. Um contexto (`AccessibilityContext`) combinado a persistência local (`localStorage`) evita que o idoso reconfigure o site a cada visita. A leitura em voz alta pode usar a Web Speech API (`speechSynthesis`) encapsulada em um hook customizado.

### Insight 3 — Separar dados de interface
Mover conteúdo (medicações, serviços, guias, oficinas) para um arquivo JSON permite que a equipe de extensão atualize informações sem alterar componentes. É a base da proposta da seção 6.

### Insight 4 — Priorizar a emergência
O botão de emergência deve ser persistente e usar ligação direta (`tel:`), pois é a ação de maior criticidade para o público-alvo. Os números oficiais (SAMU 192, Bombeiros 193, Polícia 190 e Disque 100) devem estar sempre a um toque de distância.

### Insight 5 — Evoluir o mapa em fases
Fase 1: lista de serviços filtrável por tipo e bairro, com link externo para o mapa (sem chave de API). Fase 2: mapa interativo com React-Leaflet e OpenStreetMap. Fase 3: ordenação por proximidade via geolocalização. Essa gradação reduz risco técnico e entrega valor desde a primeira fase.

### Insight 6 — Transformar o lembrete de medicação em interação
Com `useState` e métodos de array (`map`, `filter`, `reduce`), a tela pode listar medicamentos, separar pendentes e tomados e exibir um resumo diário ("3 de 5 tomados"). Os lembretes por horário podem usar `useEffect` e, mediante permissão do usuário, a Notification API.

### Insight 7 — Triagem como orientação, nunca diagnóstico
O formulário de triagem do cuidador pode somar pontuações com `reduce` e retornar uma orientação por faixa. O texto deve declarar que não substitui avaliação profissional e que o portal apenas encaminha.

### Insight 8 — Dados de extensão geram evidência acadêmica
Indicadores de uso (acessos por seção, temas mais buscados) alimentam relatórios e justificam a continuidade do projeto. Na fase estática, podem ser simulados com dados de exemplo e exibidos com Recharts.

## 6. Proposta de modelo de dados: JSON estático

### 6.1 Justificativa
Em um projeto acadêmico em fase de validação, um backend traz custo de infraestrutura, segurança e manutenção sem ser ainda necessário. Um JSON versionado no repositório oferece: (a) simplicidade, pois é importado diretamente pelo React; (b) rastreabilidade, já que cada alteração fica registrada no Git; (c) facilidade de edição por membros sem experiência em programação; e (d) caminho natural de migração, pois a mesma estrutura pode ser servida depois por uma API.

### 6.2 Princípios de modelagem
- Um arquivo por domínio quando o volume crescer (ex.: `servicos.json`, `medicacoes.json`); enquanto for pequeno, um único `borboleta-dados.json`.
- Identificadores (`id`) estáveis em todos os registros, usados como `key` no React.
- Textos já escritos em linguagem simples, coerente com as diretrizes de acessibilidade.
- Dados fictícios sinalizados explicitamente até serem substituídos pela rede local real.
- Nenhum dado pessoal ou sensível de pessoas reais no repositório.

### 6.3 Estrutura proposta (trecho ilustrativo)

```json
{
  "projeto": {
    "nome": "Portal do Idoso e do Cuidador",
    "versao": "0.1.0-estatico",
    "aviso": "Dados fictícios para desenvolvimento."
  },
  "menu": [
    { "id": "medicacao", "rotulo": "Medicação", "rota": "/medicacao" },
    { "id": "navegacao", "rotulo": "Navegação", "rota": "/mapa" },
    { "id": "cuidador", "rotulo": "Cuidador", "rota": "/cuidador" }
  ],
  "acessibilidade": {
    "tamanhosFonte": [
      { "rotulo": "A-", "escala": 0.9 },
      { "rotulo": "A", "escala": 1 },
      { "rotulo": "A+", "escala": 1.25 }
    ],
    "altoContraste": false,
    "leituraEmVozAlta": true
  },
  "medicacoes": [
    {
      "id": 1,
      "nome": "Losartana",
      "dose": "50 mg",
      "horario": "08:00",
      "instrucao": "Tomar em jejum com um copo de água.",
      "frequencia": "diária"
    }
  ],
  "servicos": [
    {
      "id": 1,
      "tipo": "ubs",
      "nome": "UBS Exemplo Centro",
      "bairro": "Centro",
      "horario": "Seg a Sex, 7h às 17h",
      "latitude": -23.5505,
      "longitude": -46.6333
    }
  ],
  "areaCuidador": {
    "sinaisDeAlerta": [
      { "id": 1, "sinal": "Confusão mental repentina", "acao": "Procurar atendimento de urgência." }
    ],
    "triagem": {
      "aviso": "Orientação apenas; não substitui avaliação profissional.",
      "perguntas": [
        { "id": 1, "texto": "A pessoa cuidada teve queda recente?", "peso": 2 }
      ]
    }
  },
  "oficinas": [
    {
      "id": 1,
      "titulo": "Roda de conversa: cuidando de quem cuida",
      "data": "2026-11-20",
      "horario": "15:00",
      "vagas": 30,
      "publico": "cuidadores"
    }
  ]
}
```

A versão completa, com todas as seções, está no arquivo `borboleta-dados.json`.

### 6.4 Consumo no React

```jsx
import dados from "../data/borboleta-dados.json";

const [tipo, setTipo] = useState("todos");
const [busca, setBusca] = useState("");

const servicosVisiveis = dados.servicos
  .filter((s) => tipo === "todos" || s.tipo === tipo)
  .filter((s) => s.bairro.toLowerCase().includes(busca.toLowerCase()));
```

### 6.5 Limitações da abordagem
- Dados somente leitura: preferências e marcações do usuário (como "já tomei") ficam apenas no navegador.
- Atualizar o conteúdo exige novo deploy.
- Não há autenticação nem sincronização entre dispositivos.
- Para inscrições em oficinas e cadastro de voluntários, será necessário backend ou serviço de formulários na fase seguinte.

## 7. Arquitetura proposta

```
src/
  components/   Header, AccessibilityBar, MedicationCard, ServiceCard, EmergencyButton
  pages/        Home, Medicacao, Mapa, Cuidador, Oficinas, Voluntarios
  context/      AccessibilityContext
  hooks/        useLocalStorage, useSpeech, useDebounce
  data/         borboleta-dados.json
  routes/       AppRoutes
```

| Rota | Página | Origem |
|---|---|---|
| `/` | Home | nova |
| `/medicacao` | Medicação | `index.html` |
| `/mapa` | Mapa de serviços | `mapa.html` |
| `/cuidador` | Área do Cuidador | `batePapo.html` |
| `/oficinas` | Oficinas | nova |
| `/voluntarios` | Voluntários | nova |

**Bibliotecas sugeridas:** `react-router-dom` (rotas), `react-leaflet` (mapa), `react-hook-form` (formulários), `recharts` (indicadores) e `vitest` com React Testing Library (testes).

## 8. Considerações éticas e de proteção de dados

- Consentimento explícito antes de qualquer triagem ou registro de acompanhamento.
- Dados de saúde mantidos apenas no dispositivo do usuário na fase estática.
- O portal encaminha casos de suspeita de negligência ou maus-tratos aos órgãos competentes, sem pretender resolvê-los.
- Validação do conteúdo de saúde com profissionais ou com o orientador do projeto antes da publicação.

## 9. Roteiro de migração (MVP)

1. Criar o projeto com Vite e migrar o `style.css`.
2. Implementar `Header`, `AccessibilityBar` e as rotas.
3. Migrar Medicação e Mapa (versão em lista) usando o JSON.
4. Migrar a Área do Cuidador (guias, sinais de alerta, triagem).
5. Incluir Oficinas e Voluntários.
6. Evoluir o mapa (React-Leaflet) e, por fim, avaliar um backend.
7. Testar a usabilidade com um grupo pequeno de idosos e cuidadores.

O recorte do MVP segue o `tutorial.md`: Home, Área do Cuidador e Agendamento, com Medicação e Mapa por já existirem no protótipo.

## 10. Considerações finais

A migração para ReactJS não é apenas uma troca de tecnologia: ela viabiliza a componentização, o estado compartilhado de acessibilidade e a separação entre conteúdo e interface, três requisitos coerentes com o caráter extensionista do projeto. O JSON estático permite avançar rapidamente com baixo custo e prepara a transição para uma API. Como limitação, este documento se baseia na leitura do repositório e não substitui testes de usabilidade com o público-alvo, que devem orientar as prioridades reais.

## Referências

BRASIL. **Lei nº 10.741, de 1º de outubro de 2003.** Estatuto da Pessoa Idosa.

BRASIL. **Lei nº 13.709, de 14 de agosto de 2018.** Lei Geral de Proteção de Dados Pessoais (LGPD).

REACT. **Documentação oficial do React.** Disponível em: https://react.dev.

W3C. **Web Content Accessibility Guidelines (WCAG) 2.1.** 2018. Disponível em: https://www.w3.org/TR/WCAG21/.
