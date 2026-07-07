<div align="center">

# UGP — Universidade Gratuita do Programador

**Aprenda engenharia de software construindo projetos corporativos reais. 100% gratuito e open source.**

Do curioso ao engenheiro de elite — uma trilha estruturada com 10 projetos corporativos, 8 níveis de progressão e conteúdo profundo de engenharia.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3FCF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## Sobre o projeto

A UGP nasceu de uma convicção simples: **cursos ensinam sintaxe, projetos ensinam engenharia**.

Existe hoje um abismo entre o que se aprende em cursos/bootcamps e o que o mercado real exige. A maioria dos materiais gratuitos ensina o "como" sem nunca explicar o "porquê". A UGP propõe o caminho inverso — conteúdo profundo, decisões técnicas defensáveis e projetos que simulam sistemas de empresas reais.

### O que torna a UGP diferente

| Cursos tradicionais                      | UGP                                            |
| --------------------------------------- | --------------------------------------------- |
| Ensina sintaxe                            | Ensina engenharia + sintaxe                   |
| Ferramentas relacionadas a Todo/Calculadora  | 10 projetos corporativos (SaaS, CMS, LMS, BaaS) |
| Avança por tempo de estudo               | Avança por conquistas mensuráveis (XP, níveis)|
| Conteúdo raso, sem contexto              | Conteúdo profundo, com contexto histórico + trade-offs |
| Sem conexão teoria ↔ prática              | Teoria + projeto conectados em cada módulo   |

### Para quem é a UGP

- **Adolescente** descobrindo a programação pela primeira vez
- **Universitário** que sente falta de prática real
- **Migrante de carreira** que precisa de um caminho estruturado
- **Dev já estabelecido** que quer consolidar engenharia
- **Sênior** que quer reorganizar fundamentos e mentorear melhor

---

## Stack Tecnológica

| Camada          | Tecnologia                          | Por quê?                                      |
| --------------- | ---------------------------------- | --------------------------------------------- |
| **Framework**   | Next.js 15 (App Router)             | SSR, Server Components, Server Actions, SEO  |
| **UI**          | React 19 + Tailwind CSS 3.4         | Componentização + estilos utility-first        |
| **Componentes** | shadcn/ui + Radix UI                 | Acessível, copiável, customizável             |
| **Ícones**      | lucide-react                        | Leve, tree-shakeable                          |
| **Markdown**    | react-markdown + remark-gfm         | Renderiza todo o conteúdo pedagógico           |
| **BaaS**        | Supabase (Postgres + Auth + RLS)     | Auth, banco, realtime e storage unificados    |
| **Cliente DB**  | @supabase/ssr                        | Cookies no server, SSR-friendly              |
| **Query Cache** | @tanstack/react-query               | Cache de dados no cliente                     |
| **Animações**   | tailwindcss-animate                  | Transições suaves                             |
| **Confete**     | canvas-confetti                      | Celebração ao concluir projeto                |
| **OTP**         | input-otp                           | Input de código de 6 dígitos                  |
| **Linguagem**   | TypeScript 5.7                      | Tipagem ponta a ponta                         |
| **Deploy**      | Vercel                              | Push no Git → deploy automático               |

---

## Arquitetura

```
┌────────────────────────────────────────────────────────────┐
│                       UGP — Arquitetura                     │
├────────────────────────────────────────────────────────────┤
│  Frontend: Next.js 15 (App Router) + React 19 + Tailwind   │
│  Backend:  Server Actions + Route Handlers (Next.js)       │
│  BaaS:    Supabase — Auth + Postgres + RLS                 │
│  Conteúdo: Markdown estático em src/content/*.md           │
│  Deploy:  Vercel                                            │
└────────────────────────────────────────────────────────────┘
```

### Estrutura de pastas

```
ugp/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout + fonts + providers
│   │   ├── page.tsx               # Landing (pública)
│   │   ├── globals.css            # Design tokens + Tailwind
│   │   ├── not-found.tsx          # 404
│   │   ├── (auth)/                # Route group — Login/Register/Forgot/Reset
│   │   ├── gate/page.tsx          # Seleção de trilha (obrigatória)
│   │   ├── (app)/                 # Route group — área autenticada
│   │   │   ├── layout.tsx         # UGPLayout (sidebar + header)
│   │   │   ├── app/page.tsx       # Dashboard
│   │   │   ├── content/[slug]/    # Renderiza markdown
│   │   │   ├── content/roadmap/   # Roadmap (estático)
│   │   │   ├── content/cursos-gratuitos/
│   │   │   └── projects/[id]/     # Detalhe de projeto
│   │   └── auth/callback/route.ts # OAuth callback
│   │
│   ├── content/                   # Artigos markdown (19 módulos)
│   │   ├── manifesto.md
│   │   ├── arquitetura.md
│   │   ├── niveis.md
│   │   ├── matriz.md
│   │   ├── github.md
│   │   ├── docs-as-code.md
│   │   ├── arquitetura-software.md
│   │   ├── tdd.md
│   │   ├── fullstack.md
│   │   ├── portfolio.md
│   │   ├── primeira-vaga.md
│   │   ├── livros.md
│   │   ├── ux.md
│   │   ├── ia-aplicada.md
│   │   ├── engenharia-prompt.md
│   │   ├── como-nao-fazer-vibe-coding.md
│   │   ├── boas-praticas-ia.md
│   │   ├── projeto-ia-1.md
│   │   └── projeto-ia-2.md
│   │
│   ├── components/
│   │   ├── ugp/                    # Componentes específicos da UGP
│   │   │   ├── UGPLayout.tsx
│   │   │   ├── AppContent.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── MarkdownView.tsx
│   │   │   ├── MatrixVisual.tsx
│   │   │   └── ProjectChecklist.tsx
│   │   ├── auth/                   # AuthShell, GoogleIcon
│   │   └── ui/                     # shadcn/ui (button, dialog, etc)
│   │
│   ├── providers/                  # AuthProvider, UGPProvider, QueryProvider
│   ├── actions/                    # Server Actions
│   ├── lib/
│   │   ├── supabase/               # client.ts, server.ts, middleware.ts
│   │   ├── ugpContent.ts           # Dados estáticos + imports .md
│   │   ├── coursesContent.ts
│   │   ├── roadmapContent.ts
│   │   └── utils.ts                 # cn(), levelForXp(), nextLevel()
│   ├── types/                      # TypeScript types
│   └── hooks/                      # use-mobile, use-ugp-level
│
├── supabase/
│   ├── migrations/
│   │   └── 001_initial.sql         # Schema completo (idempotente)
│   └── seed.sql                    # Admin de teste opcional
│
├── middleware.ts                   # Auth middleware (redireciona /login)
├── next.config.ts                  # Webpack config para importar .md
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Começando (em 5 minutos)

### Pré-requisitos

- **Node.js 18.18+** (recomendado 22+)
- **npm** ou **pnpm** (qualquer um funciona)
- Conta gratuita no [Supabase](https://supabase.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/Pedrovisk19/UGP.git
cd ugp
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas chaves do Supabase (próxima seção explica como conseguir).

### 4. Aplique a migration no banco

Cole o conteúdo de `supabase/migrations/001_initial.sql` no **SQL Editor** do dashboard do Supabase e execute.

### 5. Rode em desenvolvimento

```bash
npm run dev
```

Acesse **http://localhost:3000**. Pronto!

---

## Como conseguir as chaves do Supabase

### Passo a passo com prints mentais

#### 1. Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com/) e faça login (GitHub ou email).
2. Clique em **"New Project"**.
3. Preencha:
   - **Name**: `ugp` (ou o nome que preferir)
   - **Database Password**: gere uma senha forte e **salve em local seguro**
   - **Region**: escolha a mais próxima (ex: São Paulo para Brasil)
4. Clique em **"Create new project"** e aguarde ~2 minutos.

#### 2. Pegar a URL e a Anon Key

1. No painel do projeto, vá em **Settings** (engrenagem no canto inferior esquerdo).
2. Clique em **API**.
3. Você verá:

```
Project URL:    https://xxxxxxxxxxxx.supabase.co
Project API keys:
  anon public:  sb_publishable_xxxxxxxxxxxxxxxxxxxxxxxx
  service_role: sb_secret_xxxxxxxxxxxxxxxxxxxxxxxx
```

#### 3. Preencher o `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

> **⚠️ Importante**: a `service_role` key NUNCA deve ser exposta no frontend (não use prefixo `NEXT_PUBLIC_` nela). Ela é usada apenas em Server Actions/middleware.

#### 4. Configurar URLs de redirecionamento

Ainda em **Settings → Authentication → URL Configuration**:

- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: adicione `http://localhost:3000/auth/callback`

Em produção, troque pela sua URL (ex: `https://ugp.vercel.app`).

#### 5. (Opcional) Habilitar login com Google

Em **Settings → Authentication → Providers → Google**:

1. Ative o toggle.
2. Siga as instruções para criar OAuth credentials no **Google Cloud Console**:
   - Vá em [Google Cloud Console](https://console.cloud.google.com/).
   - Crie um projeto (ou use um existente).
   - **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
   - **Authorized redirect URIs**: adicione `https://xxxxxxxxxxxx.supabase.co/auth/v1/callback`
3. Cole Client ID e Client Secret de volta no Supabase.

#### 6. Regerar chaves (se necessário)

Se você perdeu a chave ou suspeita de vazamento:
- Em **Settings → API**, clique em **"Reset project API keys"** (invalide todas as apps que usam as antigas).
- **⚠️ Isto invalida todas chaves anteriores imediatamente**.

---

## Variáveis de ambiente

| Variável                        | Onde achar                         | Pública? |
| ------------------------------- | ---------------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Dashboard → Settings → API         | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dashboard → Settings → API (anon)  | ✅       |
| `SUPABASE_SERVICE_ROLE_KEY`     | Dashboard → Settings → API (role)  | ❌       |
| `NEXT_PUBLIC_SITE_URL`          | URL onde o app roda                 | ✅       |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | Seu WhatsApp (com DDI, sem +)     | ✅       |

---

## Schema do banco

O arquivo `supabase/migrations/001_initial.sql` cria tudo de forma **idempotente** (rode quantas vezes quiser sem erro).

### Tabelas

```
users (Supabase nativo)
  │
  ├── profiles (1:1)               # Dados customizados (role, trail, level, XP)
  │
  ├── module_progress (1:N)        # Módulos marcados como concluídos
  │
  ├── project_checklist_progress (1:N) # Estado dos checkboxes dos projetos
  │
  └── project_submissions (1:N)    # Entregas (GitHub URL + produção URL)
```

### RLS (Row Level Security)

Cada tabela tem **RLS habilitada** com policies que garantem:

- ✅ Usuário vê/apenas modifica **suas próprias** linhas
- ✅ Admins (campo `role = 'admin'`) veem todas as submissões (para revisão)
- ✅ A recursão infinita em policies foi resolvida com uma função `is_admin()` `SECURITY DEFINER` que consulta `auth.users` (não passa pela RLS de `profiles`)

### Admin de teste (opcional)

Rode `supabase/seed.sql` no SQL Editor:

```
Email: admin@ugp.dev
Senha: admin123
```

---

## Funcionalidades principais

### Autenticação

- [x] Registro com email + senha (link de confirmação por email)
- [x] Login com email + senha
- [x] Login com Google OAuth
- [x] Recuperação de senha (link por email)
- [x] Proteção de rotas via middleware
- [x] Sessão persiste entre reloads

### Gate de trilha

- [x] Primeira tela pós-login obrigatória
- [x] 3 trilhas: Dev Iniciante / Pleno / Sênior
- [x] Sem trilha selecionada → bloqueia acesso ao `/app`

### Dashboard

- [x] Barra de XP animada com gradiente âmbar
- [x] Nível atual + progresso para próximo nível
- [x] Matriz visual interativa (clique nos níveis)
- [x] 10 cards de projetos com tags

### Conteúdo

- [x] **19 módulos** em markdown renderizado (Manifesto, GitHub, TDD, IA, etc.)
- [x] Navegação sequencial prev/next
- [x] Marcar módulos como concluído (toggle persistido)
- [x] Progresso (%) no header
- [x] Renderização de código com botão "Copiar"
- [x] Tabelas, blockquotes, headings estilizados

### Projetos

- [x] Checklist persistido com **update otimista** (UI atualiza antes do servidor)
- [x] Barra de progresso por projeto
- [x] Botão "Concluir e Avançar Nível" só ativa com 100% concluído
- [x] XP é aditivo: submete → atualiza `profiles.xp_points`
- [x] Submissão com GitHub URL + produção URL (status: `pending`/`approved`/`rejected`)
- [x] Confete 🎉 ao concluir projeto
- [x] Dialog de compartilhamento (LinkedIn, Twitter, WhatsApp)

### IA Aplicada (novo grupo)

6 módulos cobrindo IA como ferramenta de engenharia:
- IA Aplicada para Devs
- Engenharia de Prompt
- Como NÃO Fazer Vibe Coding
- Boas Práticas com IA
- Projeto IA 1 — SaaS de Flashcards com LLM
- Projeto IA 2 — Code Reviewer com RAG

---

## Scripts

```bash
npm run dev          # Inicia em modo desenvolvimento (http://localhost:3000)
npm run build        # Build de produção
npm run start        # Sobe o build de produção
npm run lint         # ESLint (next lint)
npm run type-check   # tsc --noEmit (verificação de tipos)
```

---

## Deploy na Vercel

### 1. Instale a CLI

```bash
npm install -g vercel
```

### 2. Deploy

```bash
vercel
```

Siga as instruções (linke o repositório quando pedido).

### 3. Configure variáveis de ambiente

No dashboard da Vercel: **Project → Settings → Environment Variables**.

Adicione **todas** as variáveis do `.env.local`, com esses ajustes:

- `NEXT_PUBLIC_SITE_URL` → `https://ugp.vercel.app` (sua URL final)
- Adicione esta URL em **Supabase → Authentication → URL Configuration → Redirect URLs**

### 4. Pronto

Cada `git push` dispara um deploy automaticamente.

---

## Design System

A UGP tem um design system dark-mode-first com tokens CSS em `src/app/globals.css`.

### Paleta principal

| Token            | Hex       | Uso                       |
| ---------------- | --------- | ------------------------- |
| `--canvas`       | `#0d0d12` | Fundo principal            |
| `--canvas-subtle`| `#111118` | Sidebar, drawers           |
| `--canvas-raised`| `#16161f` | Cards                      |
| `--accent-purple`| `#8b5cf6` | Botões, links primary     |
| `--accent-indigo`| `#6366f1` | Gradientes                |
| `--accent-amber` | `#f59e0b` | XP, destaques             |
| `--accent-green` | `#10b981` | Success, conquista        |

### Gradientes recorrentes

```css
/* Botão primário */
linear-gradient(135deg, #6366f1, #8b5cf6)

/* Barra de XP */
linear-gradient(90deg, #f59e0b, #fbbf24)

/* Barra de progresso de módulos */
linear-gradient(90deg, #6366f1, #8b5cf6)

/* CTA primário da landing */
linear-gradient(135deg, #0ea5e9, #6366f1)
```

---

## Filosofia Editorial

Todo conteúdo da UGP segue uma estrutura obrigatória:

1. **Introdução** — contexto, problema, por quê
2. **Contexto Histórico** — como era antes, evolução
3. **Explicação Intuitiva** — analogias antes de código
4. **Funcionamento Técnico** — detalhes sem pulos
5. **Exemplos** — pequenos → médios → grandes, comentados
6. **Erros comuns** — iniciante, intermediário, sênior
7. **Boas práticas** — fazer, manter, escalar, testar, documentar
8. **Mundo Real** — empresas, sistemas, casos práticos
9. **Conexão com a UGP** — ligação teoria ↔ projetos

Princípios norteadores:
- **Ensinar a pensar antes de programar**
- **Engenharia, não apenas frameworks**
- **Trade-offs explícitos**
- **Linguagem simples, conteúdo profundo**

---

## Roadmap

- [ ] Tema claro/dark toggle
- [ ] Sistema de certificados automáticos ao concluir níveis
- [ ] Página de admin para revisão de submissões
- [ ] Realtime para progresso de módulos
- [ ] i18n (Inglês)
- [ ] Sistema de mentoria 1:1

---

## Contribuindo

Contribuições são bem-vindas! A UGP é 100% open source.

### Tipos de contribuição

- **Conteúdo**: melhorias/expansões em artigos (`src/content/*.md`)
- **Bugs**: abra issue ou PR
- **Funcionalidades**: sugira antes (issue) para alinhar com roadmap

### Workflow

1. Fork o repositório
2. Crie uma branch: `git checkout -b feat/minha-melhoria`
3. Commit seguindo [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` nova feature
   - `fix:` correção de bug
   - `docs:` documentação
   - `content:` melhorias em conteúdo markdown
4. Abra um Pull Request com descrição clara do que mudou e por quê

### Verificação antes do PR

```bash
npm run type-check   # deve passar sem erros
npm run lint         # deve passar
npm run build        # deve compilar
```

---

## FAQ

### Posso usar a UGP para ensinar minha turma?

**Sim!** Foi exatamente para isso que ela foi construída. Clone, personalize o conteúdo para seu público, e use.

### Preciso pagar pelo Supabase?

O **Free Tier** do Supabase é suficiente para a UGP rodar sem custo. Limites: 500MB de banco, 50k MAU (monthly active users). Para uma turma de 100 alunos, sobra.

### O conteúdo é traduzível?

Sim. Os artigos são markdown em `src/content/`. Para i18n, copie os arquivos para `src/content/en/` e ajuste os imports em `ugpContent.ts`.

### Tenho que seguir a ordem dos módulos?

Recomendado, mas não obrigatório. Cada módulo aponta os pré-requisitos no final ("Conexão com a UGP").

### Como adiciono um novo módulo?

1. Crie `src/content/meu-modulo.md` (markdown puro, segue a estrutura)
2. Adicione o item ao `NAV_TREE` em `src/lib/ugpContent.ts`
3. Importe o `.md` no topo do arquivo
4. Adicione o slug em `CONTENT`
5. PRonto, ele aparece no sidebar e é navegável

---

## Licença

MIT — veja [LICENSE](LICENSE).

Você pode usar, modificar, distribuir e ensinar com este projeto. A única exigência é manter o crédito original.

---

## Agradecimentos

A UGP existe porque muita gente compartilhou conhecimento gratuitamente ao longo de décadas. Este projeto é nossa forma de devolver.

<div align="center">

**[⬆ Voltar ao topo](#sobre-o-projeto)**

Feito com 💜 por [@pedrogoncalvesht](https://github.com/pedrogoncalvesht)

</div>