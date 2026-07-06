# Docs as Code

## Introdução

Documentação quase sempre morre. Em empresas, docs vivem num Google Doc esquecido, num site interno sem dono, num PDF desatualizado. Devs escrevem docs apesar dos processos — não por causa deles.

Mas existe uma ideia que mudou isso em times maduros: **tratar documentação como código**. Mesmas regras. Mesma revisão. Mesmo versionamento.

Isso é "Docs as Code". Não é uma ferramenta — é uma **postura**. E mudou como times excelentes trabalham.

Quando você termina este módulo, entende por que documentar é parte do seu trabalho — não uma atividade extra. E como fazer isso sem virar burocracia.

---

## Contexto Histórico

### Documentação em Word (anos 90-2000)

Você escrevia o manual do sistema em Word, mandava por email. Versões se multiplicavam: `manual_v1.doc`, `manual_v2_FINAL.doc`, `manual_v2_FINAL_REAL.doc`. Ninguém sabia qual era a verdade.

### Wiki interna (anos 2000-2010)

Confluence, Notion, internal wikis. Melhor — todos editam o mesmo. Mas edição desordem: ninguém revisava. Histórico de mudanças sem commit message. Docs desatualizados sem saber quem mudou.

### Markdown + Git (~2010-presente)

Times de engenharia perceberam: código tem tudo que docs precisam. Versionamento (`git blame` me diz quem escreveu e quando). Revisão (`git diff` em PR). Distribuído (todo mundo tem cópia offline). Markdown é simples o suficiente para não-devs poderem escrever.

Movimento "Docs as Code" emergiu. GitHub Readme, ADRs (Architecture Decision Records), RFCs, design docs — tudo em markdown, tudo versionado.

---

## Explicação Intuitiva

Imagine um contrato de aluguel.

**Modelo Word**: alguém redige. Manda por email. Inquilino edita. Manda de volta. Email perdido. Versões divergentes. No dia da assinatura, ninguém sabe qual é a última.

**Modelo Git**: o contrato vive num lugar só. Toda mudança tem nome e motivo. Inquilino e proprietário veem o histórico. Se alguém rebateu do nada (mudou prazo de 30 para 60 dias), você vê exatamente quando e quem.

Documentação de software precisa disso. Decisões técnicas são discutíveis — você precisa poder voltar 6 meses atrás e ver por que algo foi escolhido. Quem escolheu. Em que contexto.

---

## Funcionamento Técnico

### Formato: Markdown

Markdown é texto puro com convenções mínimas:

```markdown
# Título
## Subtítulo

Parágrafo normal.

- lista
- com itens

[link](https://...)
`código inline`

\```js
bloco de código
\```
```

Por que markdown e não Word/HTML?

- **Leitura sem ferramenta**: você abre no notepad, entiende.
- **Versionável**: diff de markdown é limpo. Diff de Word é binário opaco.
- **Portável**: GitHub, Notion, VS Code, Obsidian todos renderizam.
- **Sem lock-in**: não depende de software proprietário.

### Onde cada tipo de doc vive

```
projeto/
├── README.md              # primeira coisa que devs leem
├── CONTRIBUTING.md        # como contribuir
├── docs/
│   ├── architecture/      # descrição da arquitetura
│   │   └── overview.md
│   ├── adr/               # Architecture Decision Records
│   │   ├── 001-postgres-vs-mongo.md
│   │   └── 002-no-orm.md
│   ├── api/               # documentação de endpoints
│   │   └── auth.md
│   └── runbooks/          # playbooks para incidentes
│       └── db-down.md
└── .github/
    └── PULL_REQUEST_TEMPLATE.md
```

### ADR — Architecture Decision Record

ADR é o tipo mais importante de Docs as Code. Um arquivo curto (1 página) que documenta uma decisão técnica. Estrutura:

```markdown
# ADR 007: Usar Supabase em vez de Firebase

## Contexto
Precisamos de auth + banco + realtime. Time é pequeno.

## Decisão
Supabase.

## Consequências
- ✓: Postgres acesso direto, mais flexível que Firestore
- ✓: Open source, podemos migrar self-host
- ✗: Acoplamento ao provedor
- ✗: Latência maior que Firebase em algumas regiões

## Status
Aceito em 2024-03-15
```

Por que importa? Em 6 meses, quando alguém perguntar "por que Supabase?", sem ADR, você lembra errado. Com ADR, você aponta o arquivo.

### Mudanças doc-and-code juntas

Regra de ouro: **mudar código sem mudar doc é bug**. Em PRs maduros:

```
feat: adiciona endpoint /api/export

- Adiciona endpoint
- Atualiza docs/api/export.md
```

Se a PR mexe em código sem mexer em doc, reviewer bloqueia. Não por burocracia — porque doc desatualizada é pior que nenhuma.

---

## Exemplos

### Exemplo 1: README de projeto UGP

Um README pobre:

```markdown
# Meu Projeto
Projeto feito em React.
```

Um README excelente:

```markdown
# Dashboard de Vendas

Visualiza métricas de vendas com gráficos, filtros por período e export CV.

## Tech
- Next.js 15 + Tailwind
- Recharts (gráficos)
- MSW (mock de API em desenvolvimento)

## Como rodar
\```bash
git clone ...
npm install
npm run db:seed
npm run dev
\```

## Estrutura
- app/(auth) — autenticação
- app/(dashboard) — páginas internas
- lib/supabase — clients

## Decisões
Ver docs/adr/ para decisões arquiteturais.
```

### Exemplo 2: ADR de decisão difícil

Você decide entre REST e GraphQL.

```markdown
# ADR 003: REST em vez de GraphQL

## Contexto
Backstage interno precisa expor API para mobile, web e bots.

## Decisão
REST com OpenAPI.

## Consequências
- ✓: bibliotecas de cliente disponíveis em qualquer stack
- ✓: cache HTTP emerge natural
- ✗: over-fetching em mobile (precisa múltiplos endpoints)
- ✗: cliente precisa lidar com composição

## Alternativas consideradas
- GraphQL: ótimo para mobile, mas adiciona complexidade de servidor
- gRPC: ótimo interno, mas mobile/web precisam de REST gateway
```

### Exemplo 3: Runbook (incident playbook)

Quando o Postgres cai:

```markdown
# Runbook: Postgres offline

## Sintomas
- Healthcheck falha
- 500 em /api/*

## Diagnóstico
1. Verifique Supabase Status page (status.supabase.com)
2. Se apenas seu projeto: check Supabase Dashboard

## Mitigação
- Se região caiu: redirecione para região backup (configurar no Vercel)
-_reads: componente mostra cached data
- writes: enfileira em Redis (se configurado)
```

---

## Erros comuns

### 🟢 Iniciantes

**1. Não documentam "porque é pessoal".**

"Meu projeto, eu sei o que fiz." Em 3 meses você não lembra. Inclusive.

**2. README só tem "Como rodar".**

Falta tudo: o que é, decisões, estrutura. Setup é só parte. README é porta de entrada — mostre o essencial.

### 🟡 Intermediários

**1. Documentam em excesso (sem struttura).**

Escrevem um README de 500 linhas. Esse README virou documentação morta — ninguém mantém. Foque em pequenas, atualizáveis.

**2. Conflitam doc viva com morta.**

Mantêm Wiki no Notion e Git. Um morre e ninguém sabe qual é a fonte. Escolha UM.

### 🔵 Seniores

**1. Não exigem doc em PRs cedo demais.**

Docs exigidos só quando time cresce → backlog enorme de "migrar docs para README". Comece exigindo pequeno. Cresça.

**2. Confundem "documentação" com "memória de reunião".**

Notas de reunião em docs.md viram lixo. ADRs são decisões **tomadas**, não discussões.

---

## Boas práticas

### Como fazer

- README: 50 linhas máx. Setup + estrutura + pointer para docs/
- ADR: 1 página máx. Contexto → decisão → consequências
- Runbooks: testados (simule incident com runbook ao lado)

### Como manter

- **Auditoria trimestral**: liste 10 docs. Verifique se ainda refletem realidade.
- **Link em PR**: se PR muda arquitetura, link ADR atualizada

### Como escalar

- **Generator de docs**: docusaurus, mkdocs, nextra assumem markdown/ e geram site
- **Linter de markdown**: markdownlint no CI
- **Links verificados**: lychee checa links quebrados

### Como testar docs

Pergunte a 2 devs: "implemente isso usando só README e docs/". Se travam, docs estão ruins.

---

## Mundo Real

### Onde aparece

- **Google**: design docs são parte de promoção de engenheiro
- **Stripe**: toda feature grande começa com design doc review
- **Spotify**: ADRs são parte do onboarding de novo engenheiro
- **GitHub**: RFCs públicos para mudanças grandes (ex: mudanças no Actions)

### Quando você usa

- Toda feature grande: design doc primeiro
- Toda decisão técnica não-trivial: ADR
- Todo incidente: postmortem (docs em si mesmo)
- Todo novo dev: precisa de docs para onboarding

### Empresas

Nubank, Thoughtworks, Resend, Vercel, Supabase — todas têm docs/ markdown em seus repositórios. Olhe os repositórios open source delas. Você vai ver docs/ pasta, ADRs, RFCs, contributing guides.

---

## Conexão com a UGP

- **Projeto 05 (Blog MDX)** — você constrói um sistema de docs as code literalmente
- **Projeto 07 (SaaS)** — README + ADR são requisitos de aprovação
- **Projeto 09 (LMS)** — documentação técnica como critério do projeto
- **Todos os projetos da UGP** — cada um precisa README + CONTRIBUTING

> Documentação é código. Código sem explicação é binário — funciona, mas ninguém mantém. Inclusive você.