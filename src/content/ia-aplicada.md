# IA Aplicada para Devs

## Introdução

Inteligência Artificial virou hype. Todo mundo fala. Pouca gente entende o que é, no nível prático, para quem desenvolve software.

IA não é mágica. É um novo tipo de ferramenta que:
- **Prediz** texto com base em padrões (LLMs)
- **Reconhece** padrões em dados (ML clássico)
- **Gera** código, imagem, áudio (modelos generativos)

Para um dev, IA é uma camada extra no seu stack. Você precisa saber **onde ela resolve problemas**, **onde ela cria problemas**, e como **integrá-la sem virar dependência**.

Quando você termina este módulo, você sabe diferenciar IA aplicada (útil) de IA como buzzword (ruído).

---

## Contexto Histórico

### IA clássica (1950-2010)

Regras explícitas. "Se X então Y". Sistemas especialistas, xadrez, recomendação inicial. Limitada: você escreve as regras, IA segue.

### ML clássico (2010-2017)

Algoritmos aprendem com dados. Random forests, SVMs, redes neurais pequenas. Bom para classificação (spam, fraude, churn).

### Deep Learning (2012-presente)

Redes profundas. CNNs para imagem, RNNs para sequência. Transformers (2017) mudaram tudo. Escalam com dados.

### LLMs (2020-presente)

GPT, Claude, Llama. Modelos de linguagem com bilhões de parâmetros. Predizem próximo token. Surpreendentemente úteis. Custo de inferência significativo. Alucinam.

---

## Explicação Intuitiva

Imagine um bibliotecário.

**IA clássica**: o bibliotecário segue regras fixas. "Cada livro novo vai por tema alfabético." Repetitivo, mas funciona.

**ML clássico**: ele aprende com 1000 livros categorizados. Aí prediz a categoria de novos livros. Erra 5% das vezes.

**LLM**: ele leu TODA a Wikipedia. Você pergunta qualquer coisa — ele responde como um humano. Mas às vezes **inventa**. Não sabe o que sabe vs. o que parece saber.

O ponto: para tarefas estruturadas (validar CPF, calcular preço), use código. Para tarefas fuzzy (resumir, traduzir, sugerir), IA pode ajudar.

---

## Funcionamento Técnico

### Tipos de IA aplicada a dev

#### 1. Completion de código

Ferramentas: Copilot, Cursor, Codeium.

Lê contexto do seu arquivo + arquivos abertos. Prediz o que viria a seguir. Funciona para samples recorrentes (logs, testes simples, CRUD boilerplate).

**Quando usar**: boilerplate, padrões repetidos.
**Quando não**: código crítico, algoritmos novos, segurança.

#### 2. Chat assistente

Claude, ChatGPT. Conversação. Você pergunta, ele responde.

**Quando usar**: 
- Explicar conceito
- Debugar (colar erro + código)
- Brainstorm de arquitetura

**Quando não**:
- Você não entende o problema ainda (IA não vai adivinhar)
- Código de produção crítico sem revisão

#### 3. Geração de testes / docs

Aplica o LLM ao seu código, gera testes / comentários / docs.

**Quando usar**: rascunho. SEMPRE revise.
**Quando não**: docs automaticamente published sem review.

#### 4. RAG (Retrieval-Augmented Generation)

Combina LLM com base de conhecimento. Você pergunta: "como funciona X em nossa codebase?" IA busca documentos/code com embedding, responde.

**Quando usar**: onboarding, documentação interna, support.

#### 5. Agentes

LLM com tools: chama APIs, executa código, itera. Cursor agent, Aider.

**Quando usar**: refactors mecânicos em larga escala.
**Quando não**: code review autônomo.

---

## Erros comuns

### 🟢 Iniciantes

**1. Confiam cegamente.**

IA gera código, você cola sem ler. Funciona aparentemente. Em produção, buga. Sempre leia o output.

**2. Não explicam o contexto.**

Pergunta vaga: "faça uma função para calcular frete". IA adivinha contas. Você: spéci mesmo, raça de cep, peso, dimensões.

Context é o 80% do prompt útil.

### 🟡 Intermediários

**1. Usam IA para tudo.**

Tarefa trivial → custo maior em tempo de prompt do que escrevendo. IA é ferramenta, não default.

**2. Não citam trade-offs.**

IA gera versão A. Você aplica. Não para em: "será que B é melhor?" Peça alternativas.

---

## Boas práticas

- **Verifique tudo**: código, docs, fatos.
- **Cite IA em commits**: "feat: login com Google (autorado por Cursor)" — transparência é senioridade.
- **Defina context rich**: "this JS function receives... returns... here's the file Context:".
- **Peça trade-offs**: "Forneça 2 alternativas com prós/contras".

---

## Mundo Real

### Onde aparece

- **GitHub Copilot**: em todos os editores.
- **Cursor**: IDE IA-native.
- **Vercel v0**: gera componentes React.
- **CodeRabbit**: code review IA.

### Quando não usar IA

- Criptografia — regs específicas, implementações verificadas.
- Validação legal/fiscal — alíquotas variam por município.
- Performance crítica — otimização requer profiling, não opinião de LLM.

---

## Conexão com a UGP

- **Engenharia de Prompt** — como extrair valor das IAs
- **Como NÃO Fazer Vibe Coding** — erros comuns
- **Boas Práticas com IA** — workflow defensável
- **Projetos IA 1 e 2** — pratique IA em projetos reais

> IA é ferramenta. Não é mestre. Não é atalho. Você mantém a responsabilidade técnica. A IA gera; você valida.