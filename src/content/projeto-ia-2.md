# Projeto IA 2 — Code Reviewer com RAG

## Introdução

Segundo projeto IA. Mais avançado. Você constrói uma ferramenta que faz **code review com IA** — mas **baseada em seu próprio código** usando RAG (Retrieval-Augmented Generation).

Por que este projeto? Porque é o tipo de ferramenta que empresas estão construindo hoje. CodeRabbit, Cursor Composer, GitHub Copilot Workspace — todos usam alguma combinação de RAG + LLM para analisar código.

Você vai construir uma versão minimal, mas real. Quando você termina, entende IA aplicada em escala — não só "chamar API".

---

## Contexto do Projeto

### Nível alvo: Pleno 3 / Sênior

Projeto grande. O primeiro projeto IA foi user-facing. Este é dev-facing. Você como usuário também.

### Stack

- **Next.js 15** + TypeScript
- **Supabase** + Postgres (RLS)
- **pgvector** (extensão Postgres para embeddings vetoriais)
- **OpenAI or Anthropic API** (LLM + embeddings)
- **Tailwind** + shadcn/ui
- **Playwright** (E2E)
- **Vercel**

### Quanto tempo esperar

~4-8 semanas. Difícil mas doável. Comece com versão 1: upload de repo, review manual triggered.

---

## Explicação Intuitiva

Você conecta seu repo GitHub. AI revista novos PRs automaticamente.

Mas AI normal não conhece seu padrões específicos. Resultado: review genérico.

Com RAG: você przeszuka seu código histórico, encontra similares ao novo PR, feeda eles como contexto: "Aqui estão 5 exemplos de como esse team implementa similar. Revise este PR considerando esses padrões."

Resulta em review útil, específico ao seu codebase.

---

## Funcionamento Técnico

### Pipeline

```
1. Conexão GitHub (OAuth) → listar repos
2. Indexação: ler repo, chunk por arquivo
   └→ embed cada chunk com OpenAI/Anthropic API
   └→ pgvector armazena embeddings
3. PR webhook (ou manual trigger):
   └→ Pegar diff do PR
   └→ Buscar similares em pgvector
   └→ Contexto = diff + similares
   └→ LLM gera review
4. Review posted no GitHub PR
```

### Schema

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id TEXT NOT NULL,         -- "user/repo"
  file_path TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON chunks USING ivfflat (embedding vector_cosine_ops);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pr_url TEXT NOT NULL,
  review_body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Indexação

```ts
// scripts/index-repo.ts
import Anthropic from '@anthropic-ai/sdk'

async function indexRepo(repoUrl: string, pat: string) {
  const files = await listRepoFiles(repoUrl, pat)
  
  for (const file of files) {
    const text = await readFileFromGithub(file)
    const chunks = chunkByLines(text, maxLines=50)
    
    for (const chunk of chunks) {
      const embedding = await anthropic.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk
      })
      
      await supabase.from('chunks').insert({
        repo_id: repoUrl,
        file_path: file,
        content: chunk,
        embedding: embedding.data[0].embedding
      })
    }
  }
}
```

### RAG Query

```ts
async function reviewPR(diff: string, repoUrl: string) {
  // Embed diff
  const diffEmbedding = await anthropic.embeddings.create({
    model: 'text-embedding-3-small',
    input: diff
  })

  // Search similar chunks (cosine similarity via pgvector)
  const { data: similarChunks } = await supabase.rpc('match_chunks', {
    query_embedding: diffEmbedding.data[0].embedding,
    repo_url: repoUrl,
    match_count: 5
  })

  // Build prompt with retrieved context
  const prompt = `
Você é um code reviewer sênior para o repo ${repoUrl}.

PR diff:
${diff}

5 trechos similares encontrados na codebase:
${similarChunks.map(c => `// ${c.file_path}\n${c.content}`).join('\n---\n')}

Forneça review construtivo considerando o padrão da codebase.
Identifica:
- Inconsistência com padrão
- Bugs potenciais
- Sugestões específicas (evidence: referencie chunk)
`

  // LLM review
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }]
  })

  await supabase.from('reviews').insert({
    pr_url: diff.prUrl,
    review_body: response.content[0].text
  })

  return response.content[0].text
}
```

### Match function (pgvector)

```sql
CREATE OR REPLACE FUNCTION match_chunks(
  query_embedding VECTOR(1536),
  repo_url TEXT,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  file_path TEXT,
  content TEXT,
  similarity FLOAT
)
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT
    id,
    file_path,
    content,
    1 - (embedding <=> query_embedding) AS similarity
  FROM chunks
  WHERE repo_id = repo_url
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
```

---

## Erros comuns

- **Re-indexação frequente**: cada push → re-embed de tudo. Caro. Indexe só diffs.
- **Chunking ruim**: chunks de 1000 lines — embedding fica médio. 50-100 lines é sweet spot para código.
- **Alucinação de LLM**: review cita arquivo que não existe. SEMPRE inclua file_path explícito no output esperado.
- **Custo**: embedding cada arquivo é caro. Cache com hash para skips re-embeds.
- **Webhook**: GitHub IP ranges. Validar assinatura com HMAC.

---

## Boas Práticas

- **Streaming response** (~SSE) para mostrar review sendo gerado. UX melhor.
- **UI admin**: monitore custo de API. Cada geração deve estar visível em Dashboard.
- **Testes**: snapshot review em PR de teste, comparar divergência.
- **Logs**: registre queries input/output em Postgres para audit.
- **Rate limiting**: free tier = 5 reviews/dia. Paid = unlimited.

---

## Mundo Real

CodeRabbit ($10M+ ARR), CodeGuru (Amazon). Cursor Composer integra RAG na IDE. GitHub Copilot Workspace.

Essa categoria de produto é ativa em 2024+. Você constrói versão minimal, entende o stack inteiro.

### Quando usar

- Intra-empresa: aider desenvolvedores com revisão pesada (codebase grande + muitos PRs).
- Open source projects: revisor automático em PRs newcomer.
- Plas solo: review "mental" check em seu próprio código (sem outro dev).

### Quando Limita

- Codebases pequenos (< 5000 LOC) não justificam infra de RAG.
- Linguagens obscuras (Haskell, Erlang): embedding pobre.
- Compliance pesada:Precisa human approval de qualquer forma.

---

## Conexão com a UGP

- **Engenharia de Prompt** — exija contexto estruturado + retrieve
- **Boas Práticas com IA** — workflow 7 passos
- **Projeto 09 (LMS)** — multi-tenant + tests
- **Projeto 10 (Clone do Supabase)** — server-side vector embutido:
- **TDD** — behavioral test de prompts + reviews

> Projeto IA 1 teaches você a usar LLM básico. Projeto IA 2教会 você a fazer que é **difícil para 95% da comunidade dev**: IA com retrieval, custo controlado, infraestrutura. Cidade você termina — você é pleno-em-IA-ready.

Construa versão 1 simples. Itere. Mostre o mundo. Esse projeto é ócurrículo.