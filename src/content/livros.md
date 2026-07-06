# Livros para Engenheiros de Software

## Introdução

Livros técnicos parecem coisa dos anos 90 — quando tudo mudava devagar. Hoje, tutorials de YouTube passam mais rápido, certo?

Errado. **Tutoriais te ajudam a fazer; livros te ajudam a pensar.**

Frameworks mudam. React nasceu em 2013, hoje é #1, em 2030 pode nem existir. O conhecimento que permanece: como pensar sobre software, como tomar decisões de design, como julgar prós e contras. Esse conhecimento é dificil de achar em vídeos de 10 minutos.

Este módulo lista 5 livros essenciais que todo engenheiro de software deveria ler. E por quê.

---

## Contexto Histórico

Engenharia deSoftware tem ~50 anos. Outras engenhharias têm muito mais: civil (5000 anos), mecanica (séculos), electrical (150 anos).

Livros de software que duram são recentes — mas já existem. Os melhores exemplificam princípios que sobreviveram a ondas técnicas.

Clean Code (2008) ainda relevante porque trata de **não-framework**: trata de clareza, nomenclatura, funções pequenas. Vale para Java, Python, JS.

Jeff Wieners sobre software não vamos encontrar em outro lugar: como escolher abstração requer combinar insights de outros que escolheram abstraçao antes.

---

## Explicação Intuitiva

Imagine aprender de culinária só com vídeos.

"Receita de strogonoff, 5 minutos, siga e pronto."

Funciona. Mas você nunca entende por qual razão cebola antes do alho. Ou por qual razão spelled no recipe é diferente.

Agora imagine ler um livro de culinária "On Food and Cooking" de Harold McGee. Demora mais. Mas o conhecimento é transferível — não apenas a strogonoff, você entende qualquer receita.

Em software é igual. Vídeo = receita. Livro = entendimento.

---

## Funcionamento Técnico

### 5 livros essenciais

---

#### 1. Clean Code — Robert C. Martin (2008)

**Por quê**: ensina nomenclatura, funções pequenas, separação de responsabilidades. Fundação de legibilidade de código.

**Lição principal**: código é lido 10x mais que escrito. Otimize pra leitura.

**Pontos para destacar**:
- Nome de variável deve responder "o quê", não "como".
- Função deve fazer UMA coisa.
- Comentários são falhas — bom código não precisa de muitos.

**Cuidado**: alguns exemplos em Java parecem datados. Conceitos transcendem sintaxe.

**Quando ler**: Júnior 2-3.

---

#### 2. The Pragmatic Programmer — Andy Hunt & Dave Thomas (1999, 20th Anniversary 2019)

**Por quê**: ensina mentalidade de engenheiro. Não um frameworks — patterns de pensamento.

**Lição principal**: você é responsável por seu trabalho. Não tenha "medo de quebrar". Mas seja curado.

**Pts para destacar**:
- DRY (Don't Repeat Yourself) — não só código, mas conhecimento.
- "Tracer bullets" vs " sarcastic defense" — abordagens de prototypagem.
- "Rubber ducking": explique doença para um pato de borracha. Vária vezes você vê sua propria burris.
- "Law of Demeter" — fale com seus amigos diret, não com amigos de amigos.

**Quando ler**: Júnior 3 / Pleno 1.

---

#### 3. Refactoring — Martin Fowler (1999, 2a ed. 2018)

**Por quê**: refatoração é parte do trabalho. Sem a systematic approach, vira caos.

**Lição principal**: código vivo precisa mudar. Quando mudar, preservar comportamento. Para preservar, testar antes e depois.

**Pts para destacar**:
- Code smells (sinais de ruim): função longa, classe grande, paga divergent etc.
- Refactorings nomeados: "Extract Function", "Move Method", "Replace Conditional with Polymorphism".
- Refactor tem passos pequenos, irrevocáveis.

**Quando ler**: Pleno 1.

---

#### 4. Designing Data-Intensive Applications — Martin Kleppmann (2017)

**Por quê**: você precisa entender onde os dados vivem, e o que isso significa em escala.

**Lição principal**: armazenamentos não são "escolha certa". São "escolha com trade-offs". SQL vs NoSQL, ACID vs eventualmente consistente, replication vs sharding — todos válidos para casos diferentes.

**Pts para destacar**:
- Replicação: master-slave, multi-leader, leaderless.
- Transações: isolation levels e o que significam.
- Stream processing: log como inverso de tabelas.
- Compatibility: backward/forward evolution.

** quando ler**: Pleno 2-3.

---

#### 5. Domain-Driven Design — Eric Evans (2003)

**Por quê**: software existe para resolver problemas de negócio. Negócio tem linguagem própria (ubiquitous language). Software deve refletir.

**Lição principal**: seu usuários (* developers*) são expertos do domínio. Escute-os. Modele o domínio em código primeiro, eryone else é detalhe técnico.

**Pts para destacar**:
- Bounded Contexts (fronteiras de modelo).
- Aggregates (consistência transacional).
- Repositories (abstrações de persistência).

**Cuidado**: livro difícil. Leia quando estiver em Pleno 2 com projetos complexos.

**Quando ler**: Pleno 2/3, Sênior.

---

### Outros (wish list)

- **Refactoring UI** — Adam Wathan & Steve Schoger: design para devs que não são designers. Excelente.
- **Testing JavaScript Applications** — Lucas da Costa: prático. Útil em Júnior 3/Pleno 2.
- **Software Engineering at Google**: trio de 3 authors. Excelente sobre procesos em escala.

---

## Exemplos

### Como aplicar um livro — passo-a-passo

Você lêu Clean Code. E agora?

1. **Identifique 1 pattern** que você usa no trabalho/projetos que o livro contradiz.
   - Exemplo: função de 80 linhas que faz três coisas.
2. **Refatore 1 função** com o livro ao lado. Veja a coisa.
3. **Se gostou, aplique em mais funções**.
4. **Se não**: escreva por quê — em ADR ou em readme. Não pode ser "não gosto" sem argumento.

Read não = watching vídeo. "Li" é um nivel raso. "Apliquei" é prova.

### Cronograma realista

- 1 livro/3 meses, 30min/dia
- Em 2 anos: 8 livros. Praticamente você cobre essenciais.
- Em 4 anos: você é a pessoa no time que cita autores. Não por Kenny — por ter lido.

---

## Erros comuns

### 🟢 Iniciantes

**1. Não terminam livros.**

Compram, leem 30 páginas, encaram outros. Reclamam: "já é data."

Não tem data. Conceito perana. Acorde hábito: 30 min diárias. Em 6 meses você termina Clean Code.

**2. Só leem blogs.**

Tutoriais/medium blogs são ótimos para "como faço X". Mas não substituem livros. Blog não pode se alongar em trade-offs.

### 🟡 Intermediários

**1. Pulam para"avançado" sem base.**

Tentam "Designing Data-Intensive Applications" sem ter lido Clean Code. Resultado: entiende nada. Base primeiro.

**2. Coleccionam não-aplicados.**

Têm 30 livros na lista de "leia em 2024". Nenhum lido. Aplique 1 capítulo.

### 🔵 Seniores

**1. Citam mas não vivem.**

"Código deve ser SOLID" — mas seu próprio código não é. Livros são espelhos.

---

## Boas práticas

### Como ler

- **Ativamente:** sublinhe, anote. Sem isso, leitura = visual consuming.
- **Contexto:** leia perto do projeto que aplicará. Conceito é ancorado por código real.
- **Discussão:** fofque com colega, ou escreva review em LinkedIn.

### Como manter

- 1 livro a cada 3-6 meses, sustainable cadência.
- Re-leia: Clean Code depois de 3 anos de prática é outro livro. Você é outro leitor.

### Como escalar

- Convide amigo para buddy read. Discuss forçando concluir.
- Para cada livro, escreva 1 page-summary em markdown.

### Como testar

Você terminou um livro?
1. Liste 3 conceitos que aprendeu.
2. 1 caso onde você aplicaria.
3. 1 caso onde você NÃO aplicaria (limites).

Sem isso, leitura permanece abstrata.

---

## Mundo Real

### Onde aparece

Empresas com cultura de engenhharia:
- **Stripe**: employee book clubs.
- **Google**: virtual library em escritórios.
- **Thoughtworks:** ships you books for personal development.

### Quando usar

- Para evoluir soft skills (~todos os momentos).
- Em entrevistas: citação de principles de Fowler/Story/Beck transforma "pleno" em "engenheiro".
- Em promoções internas: "fundamentação" em ADR com referências bibliography.

---

## Conexão com a UGP

- **Clean Code**: projetos da UGP exigem legibilidade. Use.
- **Pragmatic Programmer**: abordagem em cada projeto da UGP.
- **Refactoring**: Projeto 06 → refatore projeto 03 com novos padrões. Aplique.
- **DDIA**: Projeto 10 (Clone do Supabase) exige entender trade-offs de replicação.
- **DDD**: Projeto 09 (LMS) tem domínio complexo (cursos, alunos, certificados). Aplique bounded contexts.

> Livros não são um vague-gesture para "fique melhor". Eles são ferramenta: te dão trechos de 20 anos de outras pessoas, digeridos em 200 páginas. Cada livro li其urma um shortcut com você e a fonte de conhecimento. Skip shortcut é questao de orgulho. Respeite seu tempo.