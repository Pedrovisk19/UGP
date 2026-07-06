# Como NÃO Fazer Vibe Coding

## Introdução

"Vibe coding" é um termo recente. Significa: programar sentindo, sem entender. Pedir para IA gerar código, copiar, colar, "parece que funciona", seguir.

Resulta em software que **parece funcionar** mas **não é entendido** por ninguém — nem por você, autor aparente.

Empresas estão contratando gente com 3 meses de vibe coding. Esses devs não conseguem debugar o próprio código quando IA não está disponível. Não explicam decisões técnicas. Não preveem consequências.

Este módulo é explícito sobre **o que NÃO fazer** com IA. Sim, é um guia negativo. As vezes você aprende mais com o que evitar.

---

## Contexto Histórico

### Copy-paste de Stack Overflow (~2010)

Devs colavam código de respostas sem entender. Resultado: 80% das apps tinham bloqueios de CORS mal-explicados. Mas código era menor — ainda exigia leitura.

### Era dos tutorials YouTube (~2015)

Seguiu receitas sem entender. Apps "funcionavam" até precisar mudar.

### Vibe coding (~2024-presente)

IA gera blocos de 200 linhas. Você colava. Tudo aparentemente funciona. Você não leu uma linha. Substituiu entendimento por fé.

Diferença crítica: copy-paste antigo pelo menos te obrigava ler. Vibe coding permite não ler.

---

## Explicação Intuitiva

 imagining construir um prédio.

Vibe coding equivaleria a:

Pedir para um robozão AI "construa um prédio de escritórios de 5 andares". Robô faz. Você não leu as plantas. Não checou cálculo de carga. Não validou materiais.

Prédio fica de pé. Gente entra. Parece ótimo.

Em 3 anos, chove forte. Vazamentos. Eletricidade falha. Pessoais. Você é o engenheiro responsável. Você olha o prédio e pensa "não sei ondejácanalizaa passa".

Isso é vibe coding em software. Exceto que em software, o "prédio" despenca mais rápido — bugs aparecem em dias, não anos.

---

## Funcionamento Técnico

### Os 5 antipadrões do vibe coding

#### 1. Colar e push

IA gera código. Você colar num arquivo. Não leu. Commitou. Pushou. Produção.

Risco: você enviou código que **não foi validado**. IA "sabe" parecer correto. Em software, não basta — tem que ser correto sob edge cases.

#### 2. Não entender o código gerado

Você pushou algo que não entende. Quando um bug nesse código surgir, você não vai saber debugar. Vai ter que ir na IA de novo e pedir "debugue isso". IA também não vai saber — não sabe seu contexto de produção.

Regra: **nunca commita código que não consegue explicar linha por linha**.

#### 3. Pedir sistema inteiro de uma vez

"Faça um sistema de notas completo com auth,permissions e realtime". IA cospe 5 arquivos. Cada um com 200 linhas. Você cola 5 arquivos. Não testou entre eles. Erro: variável de auth tinha que ser exportada em file 3, mas file 4 não importou. IA não sabia sua estrutura.

Regra: **build incremental**. Peça uma peça. Teste. Peça a próxima.

#### 4. Confundir "funciona" com "está certo"

IA gera um useEffect que roda infinite loop. UI ainda funciona — frames dropam. Você não mede FPS. "Looks fine."

Em produção sob escala: memory leak. Crash. Mas IA já "resolveu".

Regra: **funciona em local ≠ certo em produção**. Meça. Teste.

#### 5. Assumir que IA sabe o seu sistema

IA tem um modelo mental genérico. Não sabe que você tem `tenant_id` em todas as tabelas. Não sabe que o seu `discount` field é numérico de 0-1.

Regra: **explique seu sistema em cada prompt**. Lhs dão context, este context é ouro.

---

## Erros comuns

### 🟢 Iniciantes

**1. Não leem o que colaram.**

A IA escreveu "para produção, faça isso:" com placeholder TODO. Você pushou. TODO foi para prod.

**2. Estilo Copy Twitter.**

"Em 2 minutos, com IA, fiz esse app completo 😎". Funciona como demo. Não como software.

### 🟡 Intermediários

**1. Vibe coding em produção crítica.**

A mesma pessoa faz vibe coding no blog Pessoal e no sistema de pagamentos. Em blog: ok. Em pagamentos: desastre.

Diferencie: vibe coding aceitável onde custo de bug é baixo. Custo alto → precisa rigor.

### 🔵 Seniores

**1. Não usam IA por orgulho.**

Seniores que recusam IA completamente também erram. Ferramenta bem usada é vantagem. Recusar IA = recusar Google. Ambas são ferramentas. Decisão consciente ≠ medo.

---

## Boas práticas

### Como combater vibe coding

- **Leia cada linha do output da IA**. Se não entende linha, pergunte à IA o que ela faz. Então entienda.
- **Comente decisões**: "aqui usou X porque Y" — você é responsabilidade.
- **Teste com dados dobraveis**: casos normais E edge cases.
- **Refatore outputs**: raramente código IA está no seu estilo. Ajuste.
- **Atribua**: commits incluem "co-authored with Claude/Cursor ...". Transparência é profissional.

### Como escalar

- Equipes: defina políticas. Códigos gerados por IA passam por review normal.
- Use checklists: "esse código foi testado? possui edge cases? Olhei TODAS as linhas?"
- Use IA para geração inicial e para review, mas **decisões humanas**.

### Como documentar

Em ADRs:
```
# ADR 005: Auth no SaaS
Decisão: Supabase Auth.
Como foi escrito: prompt gerado em Cursor para primeiro rascunho. Revisado por humano. Ajustado para 5 arquivos. Testado em 2 cenários.
```

Isso é honestidade técnica.

---

## Mundo Real

### Onde vibe coding falha

- Sistemas financeiros (erros custam reais)
- Healthcare (erros custam vidas)
- Sistemas com compliance (LGPD, audit)
- Software longo prazo (5+ anos de maintenance)

### Quando vibe coding é aceitável

- Protótipos descartáveis
- Sua própria landing page
- Provas de conceito (não para produção)
- Hackathon (até certo ponto)

Nesses casos, vibe e siga. Mas etiquete: "não é production-ready".

---

## Conexão com a UGP

- **Engenharia de Prompt** — extraia valor sem tirar responsabilidade
- **Boas Práticas com IA** — workflow de uso responsável
- **GitHub** — seus commits transparentes sobre uso de IA
- **TDD** — testes são a barreira entre vibe e engenharia

> IA é acelerador. Viene coding é atalho com dívida. Velocidade é vantagem. Dívida qualquer um produz. A diferença é: você assume responsabilidade técnica ou não?