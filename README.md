# ElderCare — adaptação para Next.js

Esta versão adapta as páginas HTML originais (`index.html`, `mapa.html` e `batePapo.html`) para o App Router do Next.js e converte as interações JavaScript para componentes React.

## Executar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Estrutura

- `src/app/page.tsx`: lembrete de medicamentos (antigo `index.html`).
- `src/app/mapa/page.tsx`: navegação e busca de serviços (antigo `mapa.html`).
- `src/app/cuidador/page.tsx`: área do cuidador (antigo `batePapo.html`).
- `src/app/globals.css`: CSS original adaptado à estrutura de layout do Next.js.
- `src/components/MedicationDashboard.tsx`: cadastro, remoção, marcação de doses e progresso diário.
- `src/components/ChatPanel.tsx`: chat demonstrativo e respostas rápidas.
- `src/components/AccessibilityBar.tsx`: controles de fonte e contraste.
- `src/components/Sidebar.tsx`: navegação entre rotas.
- `src/components/AppShell.tsx`: estrutura compartilhada da aplicação.

Os dados de medicamentos e as mensagens ficam no `localStorage` do navegador. O chat continua sendo demonstrativo e não envia mensagens a pessoas reais. Os links de localização abrem pesquisas externas no Google Maps.
