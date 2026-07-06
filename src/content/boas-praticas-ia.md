# Boas Práticas com IA

## Introdução

Se "Como NÃO fazer vibe coding" é o antipadrão, **Boas Práticas com IA** é o padrão.

Como usar IA de forma que produz valor, mantém responsabilidade técnica, e resulta em software profissional — não em protótipo encapotado de produção.

Quando você termina este módulo, tem um workflow. Replicável. Defensável em entrevista.

---

## Contexto Histórico

### Sem IA (até 2022)

Dev escrevia tudo. Stack Overflow para problemas específicos. Velocidade limitado pelo próprio conhecimento.

### Copy-paste IA (~2023)

IA gera. Você cola. Custo: baixo entendimento.

### Workflow estruturado IA (~2024-presente)

IA como junior dev. Você é senior que revisa. Workflow divide "geração" de "validação". Somente validação garante qualidade.

---

## Explicação Intuitiva

Imagine liderar uma equipe de júnior inteligente.

**Vibe coding**: júnior escreveu o sistema inteiro sem supervisão, você deployou.
**Boas práticas com IA**:
1. Você define a tarefa com clareza
2. Júnior rascunha
3. Você revisa
4. Você pede revisões
5. Você push com confiança

IA é esse júnior. Você é o revisor sênior. Programa é o produto.

---

## Funcionamento Técnico

### Workflow de 7 passos

#### Passo 1: Defina o problema (sem IA)

Antes de abrir IA, escreva em markdown:
- Qual problema estou resolvendo?
- Quais constraints (tipos, schema, performance)?
- Qual é o sucesso (funciona em X casos)?

Você clareia mentalmente antes de delegar.

#### Passo 2: Desenha a solução (sem IA)

Rabisco no papel ou diagrama ASCII:
- Quais arquivos tocar?
- Quais funções criar?
- Quais dependências?

Mesmo rabisco, força reflexão. IA reflete no código — você faz arquitetura.

#### Passo 3: Prompt inicial

Use a estrutura de [Engenharia de Prompt](/content/engenharia-prompt). Inclua:
- Contexto do sistema
- Restrições técnicas
- Sucesso esperado
- Trade-offs explicitamente pedidos

#### Passo 4: Leia linha por linha

Não cole sem ler. Pergunte: "o que essa linha faz?" — explique a si mesmo. Se não sabe, pergunte à IA: "explique a linha X".

#### Passo 5: Teste você mesmo

Não peça para IA testar. Você escreve (com IA ajuda talvez) os testes. Você roda. Você vê resultados. IA não pode ser sua única QA.

#### Passo 6: Refatore com estilo

Código IA tem estilo genérico. Ajuste para seu padrão. Renomeie variáveis. Descomponha funções longas. Adicione JSDoc.

Aqui você assume autoria.

#### Passo 7: Comita com transparência

Mensagem do commit pode incluir: "(co-authored with Cursor)". Você mantém responsabilidade técnica, mas é honesto.

### Quando IA NÃO é a ferramenta

- Criptografia: use libs verificadas.
- Regras de negócio específicas: leia docs oficiais.
- Performance crítica: faça benchmarks, não aceite "otimizado".
- Migração de dados: IA não conhece seu dataset específico.

### Quando IA É a ferramenta

- Boilerplate (CRUD básico)
- Testes para código já escrito (com revisão)
- Refactors mecânicos (rename em N arquivos)
- Explicações ("o que esse TypeError significa?")
- Brainstorm ("dadas alternativas para auth, qual trade-off?")

---

## Erros comuns

### 🟢 Iniciantes

**1. Misturam "primeira versão" com "versão final".**

Versão primeira da IA é rascunho. Trate como tal.

**2. Não documentam decisão.**

Output IA tem comentários sketchy ("// TODO"). Você Não documenta por que X. 6 meses depois, novopedev pergunta — ninguém explica.

### 🟡 Intermediários

**1. Usam IA para designs.**

IA não te conhece seu usuário. UX de IA é média genérica. Use para explorar opções, mas decida você.

**2. Sobre-dependência.**

Você não consegue mais debugar sem IA. Sem internet, você trava. Mantenha prática manual regular.

---

## Boas práticas

- **Termina com commits pequenos**: 2-3 arquivos por commit. Review fácil.
- **PR com co-author**: "(co-authored with Claude)". Honestidade.
- **Inclua testes**: gerado por IA é rascunho. Você owned.
- **Contexto no PR**: "Esse código foi gerado inicialmente por IA, revisado linhas 30-80, refatorado para nosso padrão. Teste X cobre."

### Como escalar

- Templating prompts essenciais em `prompts/` directory do projeto
- Reuse: "use prompt/design patterns `prompts/test-gen.md`"
- Codebase AI guidelines: `CONTRIBUTING_AI.md` — "como a IA deve ser usada nesse projeto"

### Como testar workflow

Proposta: você consegue explicar para uma outro dev o que o código IA-gerado faz? E porque escolheu essa abordagem de alternativas? Se não, refaça.

---

## Mundo Real

### Onde aparece

Empresas avançadas: Cursor agent + GitHub agent + human review ≈ produtividade +3-10x.

### Quando NÃO adota boas práticas

Toda empresa sem cultura engenheira tem developers vibe coding. Curto prazo: ganha velocidade. Longo: dívida técnica altíssima.

Stack Overflow 2024 dev survey: 76% devs usam IA. ~50% admitem que o código chega a produção sem revisão sustentável. Bug frequency subiu 14% YoY em empresas que adotaram IA sem guidelines.

### Quando adota boas práticas

- **Vercel**: guidelines internos "AI-generated code requires human review"
- **Stripe**: co-author tag obrigatório para PRs com IA. Auditória deedly.
- **GitHub Copilot Terms**: empresas usam commit-tagging opcional.

---

## Conexão com a UGP

- **Engenharia de Prompt** — extração valiosa com responsabilidade
- **Vibe Coding** — o que evitar
- **Portfólio** — commits co-authored com IA contam contra você? Não — basta transparente.
- **TDD** — última barreira contra outputs errados
- **Projetos 1-10** — use IA, mas atendav workflow aqui

> IA não é exceção — é tool. Boas práticas vs vibe coding é o mesmo debate que commit convencional vs "wip". Engenharia é escolha. Escolha a boa.