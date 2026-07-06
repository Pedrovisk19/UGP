# Fullstack Moderno

## Introdução

"Fullstack" virou palavra de moda. Mercado pede "dev fullstack" como se fosse uma coisa única. Mas o que é?

**Fullstack** significa: capacidade de construir software que envolve frontend, backend e infraestrutura — entendendo o suficiente de cada camada para tomar decisões.

Não é "saber tudo". Não é "dominar tudo". É ter fluência para navegar todo o stack, identificar problemas em qualquer parte, e escolher tecnologias com consciência.

Quando você termina este módulo, entende as peças que compõem um stack moderno, **por que cada uma existe**, e como se conectam.

---

## Contexto Histórico

### Fullstack era simples (1995-2010)

LAMP: Linux, Apache, MySQL, PHP. Tudo num server. Você escrevia PHP que gerava HTML, conversava com MySQL, e pronto. Deploy? Manda via FTP para o servidor.

Simples. Mas limitado — depois que app crescia, PHP virava spaghetti, MySQL virava gargalo, Apache não lidava com concorrência.

### Separação de camadas (~2010-2018)

Aplicação vira duas:
- **Frontend**: SPA (single-page application) — React, Vue, Angular
- **Backend**: API REST — Node/Express, Django, Rails

Frontend roda no browser. Backend roda no servidor. Conversam por JSON.

Vantagens: times separados, frontend fast, frontend pode trocar sem tocar backend.

Desvantagens: codebase duplicado (types), SEO difícil (SPA não renderiza no servidor), infra mais complexa.

### Era BaaS (~2018-presente)

Firebase, Supabase, Appwrite. Em vez de você criar backend, usa plataforma: auth, banco, storage, realtime — tudo pronto. Frontend fala direto com SDK do BaaS.

A UGP usa Supabase. O Projeto 07 (SaaS de Notas) é um exemplo.

### Meta-frameworks (~2020-presente)

Next.js, Remix, Nuxt, SvelteKit. Misturam as eras: você escreve frontend e backend no mesmo código. Server components, server actions. Deploy em Vercel/Netlify.

"Fullstack" agora significa: você constrói produto end-to-end com poucos arquivos, framework decide onde cada código roda.

---

## Explicação Intuitiva

Imagine um restaurante.

**LAMP**: uma só pessoa cozinha e atende. Funciona se restaurante pequeno.

**Separação SPA + API**: cozinha (backend) e salão (frontend). Garçom (HTTP) leva pratos. Para pratos complexos, ótimo. Mas muito trabalho de coordinating.

**BaaS**: você terceiriza a cozinha para uma central culinária (Supabase). Você só monta o prato e atende. Se precisar de receita muito custom, a central não serve.

**Meta-framework (Next.js)**: você tem salão e cozinha no mesmo edifício, com cozinha (server) visível do salão (client). Garçom não precisa sair do edifício. Eficiente.

Cada modelo funciona para casos diferentes.

---

## Funcionamento Técnico

### Stack fullstack moderno (camadas)

```
┌──────────────┐
│   Frontend   │  React + Tailwind (UI)
│   (browser)  │  - Components
└──────┬───────┘
       │ HTTP / Server Actions
       ▼
┌──────────────┐
│   Backend    │  Next.js App Router (server components, API routes)
└──────┬───────┘
       │ SDK (Supabase JS) / SQL / ORM
       ▼
┌──────────────┐
│   Database   │  Postgres (Supabase)
└──────────────┘
```

Cada camada conversa com a de baixo por uma forma definida:

- **Frontend → Backend**: fetch, Server Actions, ou links
- **Backend → DB**: SDK Supabase, ou SQL direto (raro), ou via ORM (Drizzle, Prisma)
- **DB → Frontend**: nunca direto. Sempre via backend. **Exceto** com RLS no Supabase (o DB mesmo valida permissões).

### Frontend moderno

- **React 19** com Server Components: alguns componentes rodam no servidor (sem JS no client), outros rodam no browser
- **Tailwind**: estilos utility-first
- **shadcn/ui**: componentes copiáveis baseados em Radix UI
- **TanStack Query**: cache de dados no client (não obrigatório com RSC, mas útil para mutações)

### Backend moderno (Next.js)

Três modos:

- **Server Components**: rodam no servidor, não mandam JS ao browser. Bom para conteúdo, listas, dados authenticated.
- **Server Actions**: funções chamadas do form/button, rodam no servidor. Bom para mutações (criar user, salvar nota).
- **Route Handlers** (`app/api/foo/route.ts`): HTTP endpoints tradicionais. Bom para webhoooks, APIs externas.

### Database moderno

Postgres é dominante hoje. Por quê?

- **ACID**: transações garantidas
- **RLS**: row-level security, multi-tenant sem mudar app
- **JSONB**: documentos como JSON, mas em SQL. Híbrido.
- **Open source**: rodável local, escalável em cloud (Supabase, Neon, Aurora)

### Auth moderno

- **BaaS Auth (Supabase, Auth0, Clerk)**: login social (Google, GitHub), email/senha, magic link. Pronto.
- **Sessões (cookies): clássico, seguro se bem feito
- **JWT stateless**: scale sem server de sessão. Trade-off: revogação difícil.

UGP usa Supabase Auth — você viu no projeto 07.

### Deploy moderno

- **Vercel/Netlify**: Git push → detecta → build → CDN. Zero config.
- **Docker**: total controle. Você gerencia. Para apps com requisitos específicos.
- **Self-host em VPS**: maximum control. Para sistemas comerciais sem cloud.

Escolha por contexto. Para 90% dos projetos lado: Vercel.

---

## Exemplos

### Exemplo pequeno: To-Do (Júnior 1)

```
Frontend: React puro (Vite)
Backend: nenhum (localStorage)
Database: nenhum (localStorage)
Deploy: Vercel
```

Stack: ~5 dependencies. Funciona. Limites: dados não sincronizam entre dispositivos.

### Exemplo médio: Blog Pessoal (Júnior 3)

```
Frontend: Next.js + Tailwind
Backend: Next.js SSG (gera HTML estático)
Database: nenhum (markdown em arquivos)
Deploy: Vercel
```

Stack: Next + Tailwind + 2 libs. Site rápido, SEO pronto, sem servidor para manter. Sem DB.

### Exemplo grande: SaaS de Notas (Pleno 1)

```
Frontend: Next.js App Router + Tailwind
Backend: Server Actions + Route Handlers
Database: Supabase (Postgres + RLS)
Auth: Supabase Auth (Google + email)
Realtime: Supabase Realtime (notas sincronizam)
Deploy: Vercel
CI: GitHub Actions (lint, typecheck, test)
```

Stack: 20+ dependências. Complexidade média. Capacidades: multi-user, auth, realtime, deploy automatizado.

### Exemplo muito grande: LMS como Khan Academy

```
Frontend: micro-frontends em React
Backend: 8 microsserviços (progress, certificates, video, billing...)
Database: Postgres + Redis (cache) + ElasticSearch (busca)
Auth: interno SSO + Google
Realtime: Kafka para eventos
Infra: Kubernetes em AWS
```

Stack: centenas de dependências. Time de platform engineering mantém infra. Você como dev foca em própria feature.

### Padrão: escolher por ETAPA

| Etapa | Stack |
|-------|-------|
| Protótipo | Vite + localStorage |
| MVP | Next.js + Supabase (Auth + DB) |
| Crescimento | Refatorar para módulos claros, adicionar CI |
| Escala | Extrair microsserviços quando necessário, não antes |

---

## Erros comuns

### 🟢 Iniciantes

**1. "Fullstack = tudo, tudo agora".**

Quer montar stack de startup valuada 1bi em projeto de portfólio. Perde-se em configuração.

Comece com 1 frontend. Adicione backend quando precisar. Adicione DB quando persistência fizer sentido.

**2. Confundem frontend com tudo.**

"Eu só faço frontend, então não sei backend." Fullstack moderno é RSC em Next.js — frontend dev **precisa** entender server components para usar bem.

### 🟡 Intermediários

**1. Adicionam Redis/Kafka/etc sem necessitar.**

"Storage em cache com Redis? Vai ser mais rápido." Para quê? Seus 100 usuários não precisam. Postgres faz cache das queries.

Adicionar infra só quando medida demonstra necessidade.

**2. Não entendem onde código roda.**

"Isso roda no servidor ou client?" Sem essa clareza, RSC vira bagunça. Você instala libs de DOM no server, quebra. Você importa `fs` no client, quebra.

Regra: se usa `use client`, roda no browser. Sem isso, server.

### 🔵 Seniores

**1. Não pensam em multi-tenant desde início.**

SaaS de 1 empresa vira SaaS de N empresas. Você fez schema pensando em "user". Agora precisa de "tenant_id" em cada tabela. Refatorar é caro.

Ainda que tenha 1 tenant, modele com `tenant_id` desde cedo.

**2. Não planejam migração.**

Saída do BaaS (Supabase → self-host). Sem interface de buffer, código inteiro acoplado ao vendor SDK. Planeje pontos de abstração.

---

## Boas práticas

### Como fazer

- **Defina camadas**: UI, lógica, dados. Cada uma com responsabilidade.
- **Tipagem ponta a ponta**: TypeScript compartilhado entre frontend e backend evita drift.
- **Env vars**: server tem CAS, public tem `NEXT_PUBLIC_*`. Nunca exponha secrets no client.

### Como manter

- **Logs estruturados**: não `console.log("foi")`, mas `logger.info({ user_id, action })` para poder filtrar.
- **Health endpoint**: `/api/health` checa DB, etc. Auto-scalers usam.

### Como escalar

- **Observabilidade**: Sentry (errors), Posthog (analytics), OpenTelemetry (tracing).
- **Cache HTTP**: headers de cache corretos em APIs públicas. CDN faz milagre.
- **DB pooling**:连接 pool (PgBouncer para Postgres). Lida com concorrência.

### Como testar

- Unit: funções de domínio.
- Integration: routes + DB (com Postgres real, não mock — passa-container).
- E2E: Playwright no fluxo crítico (signup → use feature → logout).

### Como documentar

- OpenAPI para APIs públicas.
- README com setup (1 clone → rodar).
- Diagrama de arquitetura (Mermaid).

---

## Mundo Real

### Onde aparece

Toda startup moderna. Stripe, Linear, Vercel, Resend, Notion, Cal.com — stacks parecidos: Next.js + Postgres + Auth provider (Supabase, WorkOS, interno).

### Empresas

- **Vercel**: com Next.js em produção. Site todo em RSC.
- **Cal.com**: open source. Stack: Next + Prisma + Postgres. Bom para estudar.
- **Resend**: email API. Stack: Remix + Postgres.
- **Linear**: SaaS de issues. Stack: Next/Mobile + backend em Node.

### Quando usa

100% do seu tempo como dev fullstack. Mesmo front-end solo usa BaaS. Mesmo backend solo constrói admin UI.

Fullstack não é prêmio — é realidade.

---

## Conexão com a UGP

- **Projeto 01-04**: stacks pequenos. Frontend puro.
- **Projeto 05 (Blog Pessoal)**: Next.js + SSG. Primeiro fullstack leve.
- **Projeto 07 (SaaS)**: Next.js + Supabase Auth + RLS. Stack completo.
- **Projeto 09 (LMS)**: fullstack + tests + CI. Stack profissional.
- **Projeto 10 (Clone do Supabase)**: microservices. Stack distribuído.

> Fullstack não é "tudo". É "o suficiente de tudo para decidir". Você não precisa ser sênior em 50 tecnologias. Você precisa ser capaz de ler qualquer uma e tomar decisões. Isso é fluência fullstack.

Próximo módulo: **Portfólio** — como organizar tudo isso em algo que o mercado enxerga.