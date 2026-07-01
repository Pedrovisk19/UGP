# Matriz de Progressão

## Introdução

Você está olhando para o mapa completo da sua jornada.

A Matriz é só a visualização interativa dos 8 níveis que definem seu caminho na UGP. Cada nível é um botão neste app — clique e verá conhecimentos, limitações, métrica de saída e checklist de avanço.

Este módulo é curto porque o conteúdo real está em **Níveis**. Aqui falamos só de **como usar** a matriz.

---

## Explicação Intuitiva

Imagine uma escada com 8 degraus. Você não os sobe de uma vez — sobe um de cada vez. A matriz te mostra:

- Em qual degrau você está
- Quais degraus já passou
- O que cada degrau exige de você
- O próximo degrau

---

## Funcionamento Técnico

A matriz lê do seu `current_level` (no banco `profiles`) e destaca o card correspondente. Os 8 cards são clicáveis; cada um abre um Dialog com:

- **Nome do nível + XP mínimo**
- **Conhecimentos** que você tem nesse nível
- **Limitações comuns** que você ainda enfrenta
- **Métrica de saída** — quando você dominou, está pronto
- **Checklist de avanço** — itens concretos para ir ao próximo

---

## Como usar

### Passo 1: Identifique onde está

O card com borda âmbar e badge "você" é seu nível atual. Se nunca avançou nenhum projeto, você está em "Extremo Iniciante" (0 XP).

### Passo 2: Clique no próximo nível

Veja o checklist. Esses itens são o que falta para você subir. Tente fazer cada um sem consultar.

### Passo 3: Construa projetos

Cada projeto da UGP, ao ser concluído, te dá XP. Acumulando XP, você sobe de nível automaticamente. O nível não é declarado — é **conquistado**.

### Passo 4: Re-avalie regularmente

A cada projeto, volte na matriz. Você deve ver itens do próximo checklist que agora são triviais. Isso é progresso.

---

## Erros comuns

### 🟢 Iniciante

**Achar que pode pular.** Os níveis são sequenciados por uma razão. Pular Júnior 2 (sem dominar JS intermediário) e ir para Pleno 1 (backend) = sofrimento.

### 🟡 Intermediário

**Subestimar níveis altos.** "Sênior é só mais anos." Não. Sênior é comunicar, defender trade-offs, mentorear. Você pode estar em Júnior 3 e ter 10 anos.

### 🔵 Sênior

**Achar que matriz é para júniores.** Todos precisam de clareza. Mesmo sênior tem áreas fora de domínio.

---

## Conexão com a UGP

- **Níveis** — conteúdo completo de cada um dos 8 níveis
- **Projetos** — onde você aplica conhecimento e ganha XP
- **Roadmap** — plano de 28 semanas para avançar entre níveis

> A matriz não é um teste. É uma bússola. Use-a quando estiver em dúvida sobre o que estudar a seguir.