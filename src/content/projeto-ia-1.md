# Projeto IA 1 — SaaS de Flashcards com Generator

## Introdução

Você já compreendeu — em módulos anteriores — que IA bem usada é ferramenta, não mestre. Este é seu primeiro projeto IA-applied: construir uma app útil com LLM como componente crítico.

**Problema real**: estudantes precisam de flashcards para reter conhecimento manualmente. Mas criar flashcards é trabalho manual repetitivo. E se IA gerasse cards a partir de notas?

**Sua missão**: construir um SaaS de flashcards que recebe markdown do usuário e gera flashcards via LLM. Multi-user. Com auth. Persistência. UI clara.

---

## Contexto do Projeto

### Nível alvo: Pleno 2

Por quê Pleno 2? Você acabou com módulos de IA e quer algo prático. Mas este projeto envolve:
- Auth (você domina de Projeto 07)
- LLM integration (OpenAI/Anthropic API)
- Streaming (resposta LLM flui enquanto gera)
- Tests para prompt stable behavior
- RLS para não vazer cards de outros usuários

Isso é Pleno 2 de complexidade. Tudo que você aprendeu até aqui, neste projeto.

### Stack

- **Next.js 15 + TypeScript**: fullstack
- **Supabase**: auth + Postgres + RLS
- **OpenAI or Anthropic API**: geração de flashcards
- **Tailwind + shadcn/ui**: UI limpa
- **Vitest / Playwright**: tests
- **Vercel**: deploy

### Quanto tempo esperar

~2-4 semanas trabalhando 1-2h/dia. Não apresse — qualidade do projeto > velocidade.

---

## Explicação Intuitiva

Imagine Anki (o app famoso de flashcards). Mas com IA que lê suas notas e cria cards automaticamente. Você importa um capítulo de livro, IA divide em 10 perguntas. Você estuda.

Simples na head do usuário. Em código: integração cuidadosa.

---

## Funcionamento Técnico

### Schema

```sql
-- schemas.sql
CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  source_markdown TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID REFERENCES decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  ease FLOAT NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 1,
  due_date DATE NOT NULL DEFAULT CURRENT_DATE
);

ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_decks" ON decks
  FOR ALL USING (auth.uid() = created_by_id);

ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_flashcards" ON flashcards
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM decks
      WHERE id = flashcards.deck_id
      AND created_by_id = auth.uid()
    )
  );
```

### Fluxo

1. Usuário coloca markdown num textarea
2. Clica "Gerar Flashcards"
3. Backend (Server Action) chama LLM
4. LLM retorna array de { front, back }
5. Backbed salva no Postgres
6. UI mostra cards editáveis
7. Modo "Study" mostra cards due_date <= today

### Prompt LLM (Engenharia de Prompt aplicada)

```
Você é um assistente que gera flashcards didáticos.

Recebi o usuário com markdown. Gere 10 flashcards no formato:
{ "front": "pergunta", "back": "resposta curta" }

Regras:
- Front: pergunta clara, auto-contida
- Back: resposta de 1-3 frases, sem jargão
- Card pode ser entendido isolado
- Não inclua números nas perguntas (cards serão embaralhados)

Contexto markdown:
---
{markdown aqui}
---

Responda como JSON array. Sem preâmbulo.
```

### Server Action

```ts
// actions/generate-cards.action.ts
'use server'
import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'

export async function generateFlashcards(deckId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  const { data: deck } = await supabase
    .from('decks')
    .select('source_markdown')
    .eq('id', deckId)
    .eq('created_by_id', user.id)
    .single()

  if (!deck) throw new Error('Deck não encontrado')

  const anthropic = new Anthropic()
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: buildPrompt(deck.source_markdown)
    }]
  })

  const cards = JSON.parse(response.content[0].text)
  await supabase.from('flashcards').insert(
    cards.map((c: any) => ({ deck_id: deckId, front: c.front, back: c.back }))
  )
  
  return cards
}
```

### Teste do prompt

```ts
// tests/prompt.test.ts
test('prompt gera JSON válido para markdown simples', async () => {
  const markdown = '# Photosynthesis\n\n Plants convertem luz...'
  const response = await callGenerateFlashcards(markdown)
  
  expect(Array.isArray(response)).toBe(true)
  expect(response.length).toBeGreaterThan(0)
  response.forEach(card => {
    expect(card).toHaveProperty('front')
    expect(card).toHaveProperty('back')
    expect(typeof card.front).toBe('string')
  })
})
```

---

## Erros comuns

- Aceitar resposta LLM como JSON válido sem parse-checking (`try/catch JSON.parse`)
- Resposta LLM incluir preâmbulo ("Aqui estão os cards...") — adicionar `"Responda apenas JSON"`
- Alucinação: front contém "1." — lembrar de pedir sem números
- Rate limit LLM — implementar retry com backoff
- Custos: cada geração = some cents. Limits diários para usuários.

---

## Boas práticas

- Logs de prompts em dev only. Em prod, ZIP apenas.
- Cache: ID do deck + hash markdown → resposta cached. Reduce custo.
- Lexical/análise: se markdown < 200 chars, pedir 5 cards max. Se > 5000, chunking.
- Error handling: API LLM cai, fallback "tente mais tarde".

---

## Mundo Real

Apps como Anki, Quizlet,Brainscape. Market flashcards é amplo. Muitos start elke.

Em open source: Mochi, RemNote. Cada um aplica IA com filosofia diferente.

### Quando você realmente usa

Toda vez que você precisa de cards de estudo. É a integração que renderiza aprende mais valioso: IA como geradora, você como reviewer e user.

---

## Conexão com a UGP

- **Engenharia de Prompt** — aplique template
- **Boas Práticas com IA** — workflow 7 passos
- **Como NÃO Fazer Vibe Coding** — NÃO push UI sem testar prompts
- **Projeto 07 (SaaS de Notas)** — base técnica similar
- **TDD** — teste prompt, não UI só

> Esse projeto testa: integração IA + auth + multi-tenant UX + persistência com RLS + custo real. Você sai com um app que pode usar e mostrar — e com workflow defensável em entrevistas.