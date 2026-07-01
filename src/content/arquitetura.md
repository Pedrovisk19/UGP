# Arquitetura da UGP

## Introdução

Sabe quando você entra num prédio e nunca pensou em como ele foi construído? Você só usa. Mas alguém, em algum momento, decidiu onde os conduítes iam passar, onde os pilares aguentariam mais peso, onde o sol bateria às 15h.

A UGP também tem arquitetura. Você está dentro dela agora. Entender essa arquitetura não é curiosidade — é parte do seu aprendizado. Porque quando você entender como a UGP funciona por dentro, você estará pronto para entender como **qualquer software moderno** funciona por dentro. As decisões são parecidas.

Este módulo explica, sem mistério, **como a plataforma que você está usando foi construída** — e por que cada peça foi escolhida. vai colocar você do outro lado da tela: não mais como usuário, mas como alguém que consegue olhar para um sistema e enxergar as decisões que ele esconde.

---

## Contexto Histórico

### Como platforms de ensino eram construídas

Antigamente, uma plataforma de curso online era isso:

- Um servidor monolítico em PHP
- Um banco MySQL
- HTML renderado no servidor
- Vídeos hospedados em servidor dedicado
- Usuários e progresso numa única tabela

Simples. Funcionava. Mas o problema era: cada novo curso exigia desenvolvedor mexendo no código. Mudar um texto era ticket. Publicar um curso era deploy.

### Como evoluiu

Depois veio a era dos LMS (Learning Management Systems) — Moodle, Canvas, Blackboard. Sophisticados em features, mas lentos para manter. Ainda centralizados.

Hoje, uma plataforma moderna é:

- **Frontend**: React/Next.js, renderizado em servidor (SSR) para SEO
- **Backend**: BaaS (Backend as a Service) como Supabase — auth, database, realtime, storage em um só lugar
- **Conteúdo**: arquivo estático (markdown, JSON) — não precisa de CMS para conteúdo que muda pouco
- **Deploy**: Vercel/Netlify — push no Git, deploy automático

### A decisão da UGP

A UGP escolheu a arquitetura moderna não por moda, mas porque é **a mesma arquitetura que você vai usar nos projetos**. Quando você aprende a arquitetura da UGP, você está aprendendo o stack que vai usar no Projeto 05 (Blog), 07 (SaaS de Notas) e 09 (LMS).

Você não está só usando a plataforma. Está estudando ela.

---

## Explicação Intuitiva

Imagine uma cozinha de restaurante.

- A **cozinha** é onde o food é preparado (backend, banco de dados)
- O **salão** é onde o cliente pede e recebe (frontend, interface)
- O **cardapio** é estático — você não imprime um novo cardapio toda vez que muda um preço (conteúdo em arquivo)
- O **garçom** leva pedidos entre salão e cozinha (API)
- O **sistema de segurança** sabe quem pode entrar na cozinha (auth, RLS)

A UGP é assim:
- Cozinha: **Supabase** (Postgres + Auth + RLS)
- Salão: **Next.js + Tailwind** (interface)
- Cardápio: **Markdown em arquivos** (este texto que você lê)
- Garçom: **Server Actions** (funções que rodaram no servidor, seguras)
- Segurança: **Supabase Auth + RLS** (cada usuário só vê o que é seu)

Cada uma dessas peças tem um motivo de existir. Vamos olhar técnico.

---

## Funcionamento Técnico

### Stack completo

```
┌──────────────────────────────────────────────────────────┐
│                       UGP — Arquitetura                   │
├──────────────────────────────────────────────────────────┤
│  Frontend: Next.js 15 (App Router) + React 19 + Tailwind  │
│  Auth+DB:  Supabase (Postgres, RLS, Auth, Realtime)       │
│  Conteúdo: Markdown estático em src/content/*.md          │
│  Deploy:   Vercel (automático via Git)                    │
└──────────────────────────────────────────────────────────┘
```

Por que cada peça?

### Por que Next.js e não Vite ou Remix?

Next.js é o framework de React mais usado em produção. E por uma razão que importa para você:

- **App Router**: estrutura de pastas = rotas. Mais intuitivo que `react-router`
- **Server Components**: renderiza no servidor, manda menos JS ao cliente (mais rápido)
- **Server Actions**: você escreve código server-side sem criar API routes separadas
- **SSR/SSG**: SEO pronto — essencial para um blog ou conteúdo público
- **Imagens otimizadas**: `next/image` redimensiona sozinho

**Trade-off**: Next.js é mais complexo que Vite. Mais arquivos de configuração, mais conceitos (Server vs Client Components). Para um botão isolado, é overkill. Para um produto, vale.

### Por que Supabase e não um backend próprio?

Você **poderia** construir um backend com Express + Postgres instalado à mão. Em produção, muita gente faz. Mas a UGP usa Supabase porque:

- **Auth pronto**: email, Google, GitHub OAuth sem você configurar SMTP
- **RLS (Row Level Security)**: o banco de dados sabe qual usuário pode ver qual linha. Você não precisa escrever middleware de permissão. O Postgres faz isso.
- **Realtime**: se você quer um chat, Supabase te dá websockets sem infra
- **SDKs**: em JS, você não escreve SQL — usa a client library
- **Studio**: interface visual para ver tabelas, rodar SQL, gestionar usuários

**Trade-off**: você deixa seu banco na mão de um provedor. Se Supabase sair do ar (acontece), seu app sai também. Para um projeto pessoal é aceitável. Para um sistema crítico com 1 milhão de usuários, você poderia questionar.

### Por que conteúdo estático?

Aqui está uma decisão que surpreende quem nunca pensou: o conteúdo que você está lendo não está num banco de dados. Está num arquivo markdown (`src/content/manifesto.md`).

Por quê?

- **Conteúdo muda pouco** — uma vez escrito, raramente atualizado. CMS seria overkill.
- **Versionamento** — todo change passa por Git. Você vê quem alterou, quando, por quê.
- **Sem latência** — não há fetch de banco para mostrar este texto.
- **Sem dependência** — se Supabase cair, este conteúdo ainda aparece.

**Quando NÃO usar estático**: se seu conteúdo é dinâmico (preços que mudam, estoque, user-generated), aí vem do banco. O README da sua empresa é estático. O feed do Instagram é dinâmico.

### Por que Tailwind?

Tailwind é CSS utility-first. Em vez de criar classes como `.card`, você escreve `p-4 rounded-md border`. Isso parece estranho no início. Mas tem vantagens:

- **Sem arquivo CSS crescente** — cada componente tem seu estilo inline
- **Sem colisão de nomes** — nada de `.card` sendo sobrescrito em outro arquivo
- **Refactor fácil** — muda estilo direto no JSX, sem caçar arquivo CSS

**Trade-off**: JSX fica mais verboso. Para designers que querem mexer em CSS sem ler JSX, é pior. Para devs, é mais rápido.

---

## Exemplos

Vamos olhar para uma decisão REAL que foi tomada ao construir a UGP: **como guardar o progresso do usuário**.

### Decisão 1: Onde guardar "este módulo foi concluído"?

**Opção A**: Em localStorage (navegador do usuário).
**Opção B**: Em uma tabela `module_progress` no Postgres.

Opção A é mais simples. Mas:
- Se o usuário troca de dispositivo, perde tudo.
- Não dá para calcular XP global.
- Não dá para sincronizar entre desktop e mobile.

Opção B é mais complexa. Mas:
- Persiste entre dispositivos.
- Pode ser usado para analytics.
- Pode ser usado para gamificação (XP).

A UGP escolheu B. E a implementação é:

```sql
CREATE TABLE module_progress (
  id UUID PRIMARY KEY,
  created_by_id UUID REFERENCES profiles(id),
  module_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ
);

-- RLS: cada usuário só vê SUAS linhas
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_sees_own" ON module_progress
  FOR SELECT USING (auth.uid() = created_by_id);
```

A mágica é a última linha. Não é o frontend que decide o que mostrar. É o **banco** que recusa devolver dados de outro usuário. Mesmo se você hackeasse o frontend, o banco não entregaria.

### Decisão 2: Como marcar concluído?

```ts
// Server Action — roda no servidor, segura
async function toggleModuleProgress(moduleId: string, completed: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  // Se já existe, atualiza. Se não, cria.
  return supabase.from('module_progress').upsert({
    module_id: moduleId,
    completed: completed,
    created_by_id: user.id
  })
}
```

Note três coisas:
1. **Server Action, não client**: o código roda no servidor. O browser nunca tem a chave do banco.
2. **Pega o user autenticado**: o `user.id` vem da sessão, não do input do usuário (alguém não pode fingir ser outro).
3. **Upsert**: idempotente. Não duplica linhas se clicar 2 vezes.

Cada uma dessas decisões é o tipo de coisa que separa código amador de código profissional.

---

## Erros comuns

### 🟢 O que iniciantes fazem

**1. Acham que existe "stack certo".**

Não existe. Existe stack certo para o problema. Para um blog, WordPress funciona melhor que Next.js. Para um SaaS, Next.js funciona melhor que WordPress.

A pergunta nunca é "qual o melhor framework". É "qual trade-offs eu aceito".

**2. Confundem frontend com tudo.**

"Eu sou frontend, não mexo no banco." Se você trabalha com software que tem usuários, você precisa entender o banco. Não necessariamente para escrever SQL otimizado. Mas para entender por que sua lista não carrega quando 1000 filas são inseridas.

### 🟡 O que intermediários fazem

**1. Super-architect.**

Adicionam Redis, Kafka, microserviços num app com 100 usuários. Cada peça a mais é uma peça que pode quebrar. Cool tech não justifica complexidade.

A UGP é um monolito com Supabase. Por quê? Porque tem 1000 usuários, não 1 milhão. Se crescesse para 1 milhão, daí sim, poderia reconsiderar.

**2. Não documentam trade-offs.**

Escolhem Postgres "porque é melhor" sem explicar melhor para quê. Quando outro dev entra, ele vê a escolha mas não entiende por quê. E sem "por quê", ele não tem base para saber se ainda faz sentido.

### 🔵 O que seniores evitam

**1. Não adotam tecnologia sem questionar.**

Antes de adicionar Supabase, um sênior pergunta: "E se eu precisar migrar? Quanto do código fica acoplado?" A resposta é sempre alguma acoplação. A questão é saber quanta, e aceitar conscientemente.

**2. Não confiam cegamente no BaaS.**

Supabase é ótimo. Mas caiu já. Um sênior adiciona retry, fallback, ou ao menos monitora. "Funcionou até hoje" não é argumento técnico.

---

## Boas práticas

### Como fazer

**1. Documente o porquê das escolhas em ADRs.**

ADR = Architecture Decision Record. Um markdown curto:
```
# ADR 001: Escolha do Supabase

Contexto: Precisamos de auth + db + realtime...
Decisão: Usar Supabase.
Consequências: Acoplamento ao provedor, deploy mais simples...
```

Isso é o que times maduros fazem.

**2. Mantenha o stack pequeno.**

Cada nova dependência é uma nova superfície de bug. Antes de `npm install`, pergunte: "consigo fazer sem isso?"

### Como manter

**1. Atualize versões com cadência.**

Next.js 14 → 15. React 18 → 19. Atualizar é dor (alguma coisa quebra). Não atualizar é dívida (verseões antigas param de receber patches de segurança). Escolha sua dor.

**2. Monitore.**

Sentry, Vercel Analytics, ou pelo menos `console.error` no server. Se seu app caiu e ninguém reclamou ainda, você ainda tem tempo.

### Como escalar

Quando a UGP crescer, algumas decisões vão precisar mudar:
- **Conteúdo dinâmico**: aí sai de markdown e entra num CMS
- **Realtime para mais features**: talvez Socket.io dedicado em vez de Supabase Realtime
- **Search**: talvez Elasticsearch, porque `LIKE %texto%` em Postgres não escala

O ponto é: **essas decisões serão ADRs futuras**. Nada é definitivo.

### Como testar

**Teste de arquitetura**: tente descrever em 3 frases por que cada peça do stack foi escolhida. Se você não consegue, você não entende sua própria arquitetura.

### Como documentar

- **README.md** na raiz: como rodar local, o que cada comando faz
- **ADR/**: pasta com decisions
- **Comentários no código**: por quê, não o quê (o quê o código já diz)

---

## Mundo Real

### Onde isso aparece em empresas?

Toda startup moderna usa uma variação deste stack:
- **Nuxt/Next + Vercel + Supabase/Firebase** — startups enxutas
- **Next + Node + Postgres na AWS** — startups com mais controle
- **Microsserviços + Kubernetes + gRPC** — Nubank, iFood, grandes

A UGP escolheu o primeiro, mas **te prepara para o terceiro**. Por quê? Porque os conceitos são os mesmos: auth, banco, cache, API. O que muda é a complexidade da implantação.

### Quando você realmente vai usar?

**Amanhã**. O Projeto 05 (Blog) usa Next.js. O Projeto 07 (SaaS) usa Supabase + RLS. O Projeto 09 (LMS) replica a arquitetura da UGP — você vai construir uma versão menor dela.

### Que tipo de sistema depende disso?

Qualquer SaaS moderno. Você não constrói um SaaS sem:
- Auth (alguém retorna)
- Banco com permissão por usuário (alguém ve coisas que não deve)
- Frontend com SSR (SEO importa)
- Conteúdo separado de código (editor não tem que deployar)

---

## Conexão com a UGP

Depois deste módulo, você entende a estrutura técnica da plataforma. Isso te prepara para:

- **Níveis** — como a progressão técnica que você vai aprender mapeia para a arquitetura
- **GitHub** — onde todo esse código vive e versiona
- **Arquitetura de Software** — como decidir entre stacks quando o problema muda
- **Fullstack Moderno** — cada peça deste stack, em profundidade

E te prepara para os projetos onde você vai reconstruir versões menores desta arquitetura:
- **Projeto 05** (Blog) — você escolhe Next.js vs Remix e documenta o trade-off
- **Projeto 07** (SaaS de Notas) — você implementa Supabase + RLS
- **Projeto 09** (LMS) — você replica algo parecido com a própria UGP

> Arquitetura não é sobre o que usar. É sobre por quê. Se você entende o porquê da UGP, você está pronto para ter seus próprios porquês.

Próximo módulo: **Níveis** — onde você está, para onde vai, e como saber que chegou.