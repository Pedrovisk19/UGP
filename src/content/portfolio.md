# Portfólio que Vende

## Introdução

Seu portfólio é a prova social da sua capacidade. CVs mentem. LinkedIn exagera. Portfólio não mente — porque o código está lá, acessível, julgável.

Quando você termina este módulo, sabe o que colocar e o que NÃO colocar. E sabe auawei o porquê de cada escolha.

---

## Contexto Histórico

### Era do Curriculum (1990-2010)

PDF com formação, experiências, contatos. Critério: onde trabalhou.

### Era do LinkedIn (2010-presente)

LinkedIn adiciona networking. Mas ainda é auto-declarativo: você afirma, sem prova.

### Era do GitHub (2015-presente)

Empresas começam a olhar GitHub antes de entrevistar. Por quê? Código é evidência. README é organização. Commits são disciplina. Issues são comunicação. PRs são colaboração.

Tudo isso é observável sem você precisa abrir a boca.

---

## Explicação Intuitiva

Imagine contratar um chef.

**CV**: "Cozinho ha 5 anos. Trabalhei na Padaria da Lucia."
**LinkedIn**: mesmo + 3 recomendações de amigos.
**Portfólio**: "Olha esses 5 pratos que cozinhei: têm foto, receita, ingredientes, fim de semana gasto nisso, e o prato que ficou é lithium."

Sobre qual você decide contratar?

Em software é igual. CV = indicação. LinkedIn = afirmação. GitHub = evidência.

---

## Funcionamento Técnico

### 4 peças essenciais

1. **GitHub**: código. Sinatra. Sem branches abandonados, README bom, conventional commits.
2. **Site próprio**: landing page com 3-5 projetos destacados. Pode ser no Projeto 05 da UGP (Blog Pessoal).
3. **LinkedIn atualizado**: na bio, "Fullstack. Veja meus projetos em [site]".
4. **Story**: para cada projeto, 3 frases — problema, solução, o que aprendeu.

### O que destacar em cada projeto

Cada projeto do seu portfólio deve ter:

- **Nome**: específico. "Todo List" é genérico. "TaskFlow — gerenciador de tarefas por contexto" é melhor.
- **Link produção**: app rodando online. SEMPRE. Sem isso, pessoas não vão clonarás.
- **README**: problema, stack, decisões, como rodar, prints.
- **Link GitHub**: código limpo, commits claros.

### Quantoe projetos?

**Não mais que 5**. 3 excelentes > 10 médios. Recrutador não tem tempo para 10. Ele olha os 3 primeiros.

Se seus 3 melhores são os 3 da UGP (projeto 01, 05 e 07), ótimo. Use-os.

---

## Erros comuns

### 🟢 Iniciantes

**1. Repositórios de tutorial.**

Todo React app com "Clone do Instagram" de YouTube tutorial: zero valor. Mostra que você segue instruções, não que você constrói.

Sua versão do projeto da UGP é diferente — porque você toma decisões.

**2. README "rodando: npm install && npm run dev".**

Sem o quê. Sem prints. Sem decisões. Sem "o que aprendi". Isso é README de código, não de portfólio.

README de portfólio tem: objetivo, stack, prints, deploys, desafios. 1 página, fácil de ler.

**3. Projetos sem produção link.**

"Roda localmente com `npm run dev`." Ninguém rod. Recrutadores tem 30 segundos. Vercel é grátis.

### 🟡 Intermediários

**1. Quantidade sobre qualidade.**

20 projetos medianos. Cada um clone tutorial. Nenhum tem README. Nenhum tem teste.

Refatore: 5 excelentes com CI, README, 1 com ADR, 1 com teste E2E.

**2. Projeto final sem manutenção.**

Bootcamp: projeto final bonito. Depois bootcamp acabou, abandou. 2 anos depois, potencial empregador olha: outdated. React 16 → 19 pulou, build quebra.

Mantenha pelo menos 2 projetos atualizados.

### 🔵 Seniores

**1. Escondem trabalho.**

"Esse é código da empresa, não posso mostrar." OK. Construa sideprojects que showcase skills. Senior sem portfólio parece júnior mitado.

**2. Não têm narrais técnicos.**

LinkedIn afirma "Arquiteto de Sistemas". Portfólio não tem ADR, diagrama. Seniores deviam ter isso — provam senioridade.

---

## Boas práticas

### Como fazer

- **3-5 projetos, não mais**
- **Cada um com produção URL ativa**
- **README de 80-150 linhas**: problema, stack, parte legal, prints, próxima feature
- **Último commit < 6 meses atrás**

### Como manter

- Atualize 1 versão/ano por projeto mantido
- Stale projects → marcar como "arquivado" no GitHub (não deletar: histórico tem valor)

### Como escalar

- Adicione métricas: 1 projeto com Sentry, 1 com analytics (Posthog). Mostra senioridade na prática.
- Apresente ARquitecturally: 1 projeto com diagrama C4 e 3 ADRs no `docs/`.

### Como testar seus portfólio

Pergunte a um amigo dev: "Em 30 segundos, você contrataria? Por quê?" Respostas em 30 segundos. Output é verdade real sobre a apresentação.

---

## Mundo Real

### Onde aparece

Toda vaga de dev moderna exige portfólio. Mesmo as que não explicitam.

Empresas como Vercel, Supabase, Resend contratam direto via GitHub тело. "Show me your open source work."

### Quando usa

- Aplicando a vaga: 1ª wheel = código aberto dele. 2ª = seu portfólio é avaliado.
- Networking: alguém pergunta "o que você faz?" → link para seu site.
- Unexpected job offers: he конкурс from companies based on your projects public.

---

## Conexão com a UGP

- **Projeto 05 (Blog Pessoal MDX)**: use COMO seu site de portfólio
- **Projetos 01-09**: cada um é uma peça.
- Comece com **3 projetos selecionados**: 01 (CRUD), 05 (frontend + SEO), 07 (fullstack + auth). Eternize esses.

> Portfólio é código falando por você. Silenciosamente. O tempo todo.ュ: nao precisa intervir numa entrevista, precisa entrevistar bem.