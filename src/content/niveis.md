# Níveis de Progressão

## Introdução

Em qualquer profissão séria, existe uma jornada. Na medicina, você não passa de estudante a cirurgião num dia. Há degraus: estagiário, residente, plantonista, especialista, cirurgião chefe. Cada degrau tem critérios. Cada degrau redefine o que você pode fazer sozinho.

Em software, curiosamente, muita gente não tem clareza de onde está. "Sou júnior", dizem alguns — mas o que isso significa? "Sou pleno", dizem outros — mas pleno em quê? Em React? Em arquitetura? Em comunicação?

A UGP propõe uma estrutura de **8 níveis**, do Extremo Iniciante ao Sênior. Cada nível é definido por:

- **O que você conhece** — não teorias, mas concretudes
- **O que ainda te limita** — onde você trava
- **Como saber que dominou** — uma métrica de saída
- **O que precisa dominar** — checklist de avanço

Este módulo explica cada nível em detalhe. Você vai sair sabendo exatamente onde está e o que falta para o próximo.

---

## Contexto Histórico

### Como o mercado define níveis

Tradicionalmente, o mercado usa "anos de experiência" como proxy para nível:
- 0-2 anos = Júnior
- 3-5 anos = Pleno
- 5+ anos = Sênior

Isso não é totalmente errado, mas **não é confiável**. Tem gente com 5 anos que aprendeu numa empresa boa e é sênior. Tem gente com 10 anos na mesma empresa, fazendo a mesma coisa, que não passou de júnior компетенencial.

### O que mudou

Empresas com cultura de engenharia forte (Stripe, Thoughtworks, Spotify) definem níveis por **competências observáveis**, não por tempo. Em vez de "5 anos de experiência", elas dizem:

- "Você consegue decompor um problema grande em 3 menores e implementar sozinho?"
- "Você consegue defender uma decisão técnica para um time cético?"
- "Você consegue mentorear alguém te identificando o que elea precisa aprender?"

Isso é mais justo e mais preciso. A UGP usa esse modelo.

### Por que 8 níveis e não 3?

"Júnior, Pleno, Sênior" é muito granular dentro de cada nível. Dentro do "Júnior", tem muita diferença entre quem acabou de sair do bootcamp vs. quem já constrói features sozinho. Por isso a UGP subdivide:

- **Extremo Iniciante** → **Júnior 1** → **Júnior 2** → **Júnior 3** → **Pleno 1** → **Pleno 2** → **Pleno 3** → **Sênior**

Você sempre sabe exatamente em qual degrau está, não num range vago.

---

## Explicação Intuitiva

Imagine aprender uma língua estrangeira.

- **Extremo Iniciante**: você não sabe dizer "olá". Mas sente o alfabeto.
- **Júnior 1**: você pede comida. Travou, mas se vira.
- **Júnior 2**: você tem conversas curtas. Comete erros, mas se faz entender.
- **Júnior 3**: você conversa fluido sobre assuntos familiares.
- **Pleno 1**: você lê um livro técnico no original. Anota词汇 nou caderno.
- **Pleno 2**: você escreve um texto claro, sem soletrar como estrangeiro.
- **Pleno 3**: você entende ironia, humor, sutilezas culturais.
- **Sênior**: você argumenta jurídico ou faz apresentação em conferência.

A transição não é "num ano você vira X". É quando você dominou **métricas de saída**. Se você consegue conversar em inglês fluido, você é Júnior 3, mesmo que tenha 3 meses.aprendendo. Se não consegue, mesmo com 5 anos, você ainda é Júnior 2.

A UGP funciona assim — mas para software.

---

## Funcionamento Técnico

### Os 8 níveis em detalhe

#### Extremo Iniciante (0 XP)

**Conhecimento**: Sabe ligar o computador. Curioso sobre programação.

**Limitação**: Nunca escreveu uma linha de código.

**Métrica de saída**: Consegue instalar Node.js e Git, sem travar.

**Checklist**:
- [ ] Instalar Node.js e verificar com `node -v`
- [ ] Criar conta no GitHub
- [ ] Clonar um repositório e abrir no VS Code
- [ ] Rodar `npm install` e `npm run dev` em um projeto

---

#### Júnior 1 (100 XP)

**Conhecimento**: HTML, CSS básico, JavaScript inicial. Sintaxe de variáveis, funções, loops.

**Limitação**: Trava em bugs simples. Não sabe depurar.

**Métrica de saída**: Constrói uma página estática com formulário que funciona.

**Checklist**:
- [ ] Entender box model e flexbox no CSS
- [ ] Manipular DOM com JavaScript puro
- [ ] Fazer fetch de uma API pública (ex: github API)
- [ ] Entender o que é assíncrono (promises, async/await)

**Projetos UGP**: Projeto 01 (Todo List), Projeto 02 (Carrinho de Compras)

---

#### Júnior 2 (300 XP)

**Conhecimento**: JavaScript intermediário, ES6+, consumo de APIs REST.

**Limitação**: Código procedural, sem separação de responsabilidades.

**Métrica de saída**: Constrói um CRUD completo em React.

**Checklist**:
- [ ] Dominar array methods (map, filter, reduce)
- [ ] Entender promises e async/await na prática
- [ ] Usar localStorage e sessionStorage
- [ ] Implementar loading e error states em UI

**Projetos UGP**: Projeto 03 (Dashboard de Vendas), Projeto 04 (Kanban)

---

#### Júnior 3 (600 XP)

**Conhecimento**: React completo, componentização, hooks, rotas, estado global leve.

**Limitação**: Não testa o código. CSS ainda bagunçado em componentes grandes.

**Métrica de saída**: Constrói um dashboard com gráficos e dados dinâmicos.

**Checklist**:
- [ ] Dominar hooks (useState, useEffect, useMemo, useReducer)
- [ ] Integrar bibliotecas (recharts, framer-motion)
- [ ] Implementar responsividade real (mobile-first)
- [ ] Entender Server vs Client Components (Next.js)

**Projetos UGP**: Projeto 05 (Blog Pessoal MDX), Projeto 06 (App de Treinos PWA)

---

#### Pleno 1 (1000 XP)

**Conhecimento**: Arquitetura de software, padrões, separação de camadas, backend com Node.

**Limitação**: Ainda não escreve testes automatizados consistentemente.

**Métrica de saída**: Constrói um app fullstack com auth e banco de dados.

**Checklist**:
- [ ] Criar API REST com Express ou Next API routes
- [ ] Modelar tabelas no PostgreSQL
- [ ] Implementar autenticação JWT ou Supabase Auth
- [ ] Entender RLS (Row Level Security)

**Projetos UGP**: Projeto 07 (SaaS de Notas), Projeto 08 (CMS)

---

#### Pleno 2 (1600 XP)

**Conhecimento**: TDD, testes E2E, CI/CD, docs-as-code, observabilidade básica.

**Limitação**: Ainda trata deploy como evento traumático.

**Métrica de saída**: Faz deploy automatizado com pipeline de testes passando.

**Checklist**:
- [ ] Escrever testes unitários com Vitest/Jest
- [ ] Escrever testes E2E com Playwright
- [ ] Configurar pipeline no GitHub Actions
- [ ] Escrever documentação técnica (ADR, README)

**Projetos UGP**: Projeto 09 (LMS)

---

#### Pleno 3 (2400 XP)

**Conhecimento**: Microsserviços, mensageria, design de sistema em escala.

**Limitação**: Sistemas distribuídos ainda são território parcialmente desconhecido.

**Métrica de saída**: Desenha a arquitetura de um sistema em escala.

**Checklist**:
- [ ] Entender filas e workers (Redis, RabbitMQ)
- [ ] Modelar para multi-tenancy
- [ ] Aplicar patterns de resiliência (circuit breaker, retry)
- [ ] Ler logs distribuídos e traçar requests

---

#### Sênior (3500 XP)

**Conhecimento**: Engenharia de elite — arquitetura, decisões defensáveis, mentoria.

**Limitação**: Limites são narrativos — dependem do contexto e do domínio.

**Métrica de saída**: Lidera tecnicamente um produto do zero ao escalável.

**Checklist**:
- [ ] Defender decisões técnicas com trade-offs claros
- [ ] Mentorar devs mais juniores
- [ ] Desenhar e revisar arquiteturas end-to-end
- [ ] Communicar com non-tech stakeholders (PM, designers, sales)

---

## Exemplos

Vamos ver 3 cenários reais para ilustrar.

### Cenário 1: Maria, 22, recém-saída de bootcamp

Maria fez um bootcamp de 6 meses. Sabe React, construiu 3 projetos. Não sabe Postgres. Nunca deployou sozinha. Não escreve testes.

**Nível**: Júnior 2 (constrói em React, mas sem arquitetura nem backend).

**Para avançar para Júnior 3**: precisa dominar responsividade mobile-first e integrar bibliotecas. Projetos 03 e 04.
**Para Pleno 1 eventualmente**: precisa aprender backend. Projeto 07.

### Cenário 2: João, 30, migrando de carreira

João era contador. Aprendeu Python em 1 ano. Constrói scripts de automação. Já mexe com pandas, regex, web scraping. Mas não constrói UI.

**Nível**: Júnior 3 na parte de dados, mas Júnior 1 em frontend/web.

A UGP respeita que conhecimento é asymétrico. João não precisa recomeçar — ele pula os módulos de JS básico. Mas precisa construir os projetos da UGP para pegar arquitetura web.

### Cenário 3: Ana, 35, dev há 8 anos

Ana trabalha com Java/Spring em banco. Sabe arquitetura, escreve testes. Mas nunca usou React ou Supabase.

**Nível**: Pleno 2 em backend/arquitetura, Júnior 2 em frontend moderno.

Ana usa a UGP para preencher lacunas. Ela não precisa ler sobre TDD — já domina. Mas Projeto 07 (SaaS) é novo para ela porque envolve Supabase + Next.js.

---

## Erros comuns

### 🟢 O que iniciantes fazem

**1. Acham que nível é sobre velocidade.**

Não é. Você pode fazer tudo rápido e ainda ser Júnior 2. Nível é sobre **autonomia** — consegue fazer sem supervisão?

**2. Pulam níveis.**

"Eu já sei React, vou pular para microsserviços." Sem Pleno 1 (arquitetura de camadas), microsserviços viram bagunça distribuída. Não pule.

### 🟡 O que intermediários fazem

**1. Subestimam Pleno 1.**

"Eu sei fazer um CRUD, sou Pleno." Pleno 1 é saber por que o CRUD é estruturado assim, não só fazer. Saber trade-offs de cada escolha.

**2. Confundem anos com nível.**

"Tenho 4 anos, deveria ser Pleno." Tempo não é competência. Competência demonstrada é competência.

### 🔵 O que seniores evitam

**1. Não param de aprender.**

Sênior não é destino. É base. Você pode ser Sênior em frontend e Júnior em ML. A honestidade sobre onde você é forte e onde é fraco define maturidade.

---

## Boas práticas

### Como usar os níveis

**1. Auto-avalie com honestidade.**

Pegue o checklist do nível em que você acha que está. Tente fazer tudo sem consultar. Se travou em 2 itens, você ainda é do nível anterior. Não é vergonha — é clareza.

**2. Use o nível para escolher projetos.**

Se você é Júnior 1, não tente o Projeto 07 (SaaS). Vai ser frustante. Faça Projeto 01. Cada nível tem projetos alinhados.

**3. Reconheça quando ultrapassou.**

Seu nível muda. A cada projeto concluído, re-avalie. Você pode ter subido sem perceber.

### Como mentorear usando níveis

Se você já está Pleno 2+ e mentoreia alguém:
- Identifique o nível do seu mentorado (pelos checklists)
- Dê tarefas do nível +1 dele — nem muito fáceis, nem muito difíceis
- Acompanhe o checklist — se ele td dominou, ele subiu

### Como documentar seu nível

- LinkedIn: "Atualmente Júnior 2 (construo CR em React, mas sem testes ainda). Objetivo: Pleno 1."
- Entrevistas: "meu nível atual é X, posso demonstrar com o projeto Y"

Isso é muito mais forte que "4 anos de experiência".

---

## Mundo Real

### Onde isso aparece em empresas?

Empresas com trilhas de carreira técnicas usam níveis como esses. Tabela do Google:

| Google | UGP equivalente |
|--------|-----------------|
| L3 (entry) | Júnior 1-2 |
| L4 (mid) | Júnior 3 / Pleno 1 |
| L5 (senior) | Pleno 2-3 |
| L6 (staff) | Sênior |
| L7 (senior staff) | Sênior+ |

A diferença: Google paga muito para validar. A UGP te dá o mesmo framework — grátis — para auto-validar.

### Por que isso importa em entrevistas?

Entrevistadores experientes detectam nível em 30 minutos. Eles perguntam:
- "Por que escolheu Postgres?" (trade-offs → Pleno+)
- "Como testaria isso?" (TDD → Pleno 2+)
- "Como mentorearia um júnior?" (Sênior)

Se suas respostas demonstram clareza sobre seu próprio nível, você ganha credibilidade.

---

## Conexão com a UGP

Depois deste módulo, você sabe quais são os 8 níveis e onde está neles. Próximos passos:

- **Matriz** — visualização interativa dos níveis. Clique em cada um para ver detalhes.
- **Manifesto** — se você ainda não leu, entenda por que estamos aqui
- **Arquitetura da UGP** — como a plataforma é construída
- **GitHub** — seu primeiro módulo de Engenharia: onde o código vive
- **Roadmap de Estudos** — plano de 28 semanas para avançar entre níveis

> Seu nível atual não é julgamento. É ponto de partida. A pergunta nunca é "por que eu sou só Júnior 2?" É "o que falta para Júnior 3?"

A resposta está no checklist. Foque nele.