# Engenharia de Prompt

## Introdução

"Engenharia de Prompt" virou termo de merchandising. Mas o conceito é real e útil: **a qualidade da resposta da IA depende da qualidade da sua pergunta**.

Diferença entre "faça um botão" e "Crie um botão React 19 com TypeScript, usando Tailwind no estilo shadcn/ui, sem side effects, com loading state, e explique os trade-offs de usar useState vs useReducer" é a diferença entre código genérico e código que se encaixa no seu projeto.

Este módulo te ensina a estruturar prompts que produzem respostas úteis. Sem misticismo. Com prática.

---

## Contexto Histórico

### Antes (2020-2022)

Poucos prompts eram tentativa-e-erro. "Faça X". IA respondia algo. Às vezes bom, às vezes pobre. Não havia método.

### Pós-ChatGPT (2023)

Apareceram padrões. "Few-shot", "Chain-of-thought", "Role prompt". Pesquisadores começaram a formalizar o que funciona.

### Hoje (2024-presente)

Engenharia de prompt é commodity. Claude, GPT-4 respondem bem mesmo com prompt vago. Mas para casos críticos, técnica de prompt ainda diferencia.

---

## Explicação Intuitiva

Imagine delegar uma tarefa a um estagiário inteligente.

**Vago**: "Faça um blog."
**Melhor**: "Crie um blog com Next.js 15 App Router usando Server Components por padrão. Posts em MDX em `content/`. Liste posts na home. Cada post em /posts/[slug]. Header com nome do site no canto esquerdo."
**Excelente**: acima + "Explique por que você escolheu SSG vs SSR. Identifique trade-offs."

IA é estagiário inteligente sem contexto do seu projeto. Você dá contexto → resultado melhora.

---

## Funcionamento Técnico

### Anatomia de um prompt excelente

1. **Papel**: "Você é um engenheiro de software sênior especializado em Next.js."
2. **Contexto**: "Estou construindo um SaaS multi-tenant em Next.js 15 + Supabase. Tenho tabelas `notes` e `users`. RLS está ativo."
3. **Tarefa**: "Escreva uma Server Action que crie uma nota privada para o usuário autenticado."
4. **Restrições**: "Use TypeScript estrito. Não use ORMs. Direto com supabase-js. Trate erros."
5. **Formato**: "Responda com código em bloco único. Em seguida, 1 parágrafo explicando."
6. **Trade-off**: "Liste 2 alternativas e por que não escolheu elas."

### Técnicas

#### Few-shot

Mostre exemplos:

> **Input**: `olá` → **Output**: `Olá! Como posso ajudar?`
> **Input**: `tchau` → **Output**: `Até breve!`
> **Input**: `como vai` → **Output**: ?

IA generaliza o padrão.

#### Chain-of-thought

Peça para IA pensar antes de concluir:

> "Antes de responder, liste passo-a-passo seu raciocínio."

 Útil para problemas de lógica. IA mostra cadeia. Você valida. Detecta premissas erradas.

#### Iteração

Pergunte X. Resposta R1. "Agora considere Y. Re-escreva considerando Y". IA refina.

Raramente o primeiro output é o final. Excelência vem em 2-3 iterações.

### Prompt para código

Template real:

```
Contexto: Estou construindo [projeto]. Stack [X, Y, Z].
Tarefa: Implemente [feature] em [arquivo].
Restrições:
- TypeScript estrito
- Sem dependências extras
- Lidando com estes errors: [lista]
- Devolver testaíl  e fdpxprodução

Formato:
- Código em bloco único
- Após o código, explique 3 decisões que tomou
- Após explicações, liste 2 alternativas que você considerou e porque não escolheu

Pense passo-a-passo antes de responder.
```

### Prompt para debugging

```
Estou com erro: 
[stack trace completo]

Código do arquivo:
[código]

Tentativas que já fiz:
- X
- Y

Hipóteses que tenho:
- A
- B

Análise: liste as possíveis causas prováveis, da mais provável para a menos provável. Para cada uma, explique como verificar.
```

---

## Erros comuns

### 🟢 Iniciantes

**1. Não dão contexto.**

"Como faço um app?" IA responde com clichê. Sem contexto, IA não sabe o nível.

**2. Admitem código sem ler.**

Colam diretamente. Funcionar uma vez = funcionar sempre? Não. Lei de causa-efeito: IA não garanti u nada. Você garante ao validar.

### 🟡 Intermediários

**1. Pedem tudo num prompt gigante.**

1000 tokens de pedido. IA esquece do início. Quebre em partes. Primeiro design. Depois code. Depois testes.

**2. Não pedem críticas.**

Sempre que IA gera algo, pergunte: "O que você faria diferente se fosse um code review rigoroso?" IA encontra problemas em seu próprio output.

---

## Boas práticas

- **Role prompt** ajuda em especialidades ("atue como especialista X")
- **Context stack** mar em mensagens, não em um prompt gigante
- **Peça alternativas**: "mostre 2 formas de fazer isso com prós/contras"
- **Salva templates**: prompts excelentes que funcionaram — recicle
- **Reaproveita conversa**: history de chat é mantido na sessão; referencie mensagens passadas

---

## Mundo Real

### Onde aparece

Vercel v0 (prompts viram componentes), Cursor agent (prompts viram edit + commit), Replit AI, Cursor Composer — todos operam por prompts estruturados.

### Quando prompt é crítico

- Descrição técnica de comportamento de API
- Doc de contrato entre serviços
- Decision records (ADRs)
- Debugging complexo (forneça todo o contexto)

---

## Conexão com a UGP

- **Boas Práticas com IA** — workflow
- **Como NÃO Fazer Vibe Coding** — o que evitar
- **Projetos IA 1 e 2** — pratique
- **TDD** — para gerar testes com IA

> O prompt é seu código. Pobre prompt, pobre resultado. Excelente prompt transformal velocidade mas não substitui validação humana.