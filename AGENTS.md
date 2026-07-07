# AGENTS.md — Comandos de verificação

Antes de finalizar mudanças neste projeto, rode:

```bash
npm run type-check   # tsc --noEmit
npm run lint         # next lint
npm run build        # produção (opcional)
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha os valores do Supabase
(Settings → API no dashboard). Sem isso, `next dev` falha ao instanciar os clientes.

## Banco

Execute `supabase/migrations/001_initial.sql` no SQL Editor do Supabase
(ou `supabase db push` se usar CLI). Opcionalmente rode `supabase/seed.sql`
para criar um usuário admin de teste (`admin@ugp.dev` / `admin123`).

Após a 1ª migration, rode também `supabase/migrations/002_quiz.sql` —
cria a tabela `quiz_attempts` (idempotente) usada pela seção
"Teste seus conhecimentos" de cada módulo.

## Camada Editorial (módulos da UGP)

Cada módulo da UGP (`/content/:slug`) é renderizado como uma documentação
premium (estilo Vercel/Linear/Stripe). Componentes vivem sob:

- `src/components/module/` — Hero, ReadingProgress, TableOfContents,
  SummaryCards, LearningChecklist, NextModule
- `src/components/editorial/` — Callout, CodeBlock (Shiki),
  MermaidDiagram, MarkdownEditorial (renderer com callouts, headings
  com âncora, code com syntax highlight e mermaid)
- `src/components/quiz/` — QuizEngine + variantes (Multiple Choice,
  True/False, Assoc, Order, Scenario, Engineering) + Result.

Metadados editoriais (subtitle, nível, tempo de leitura, sumário,
checklist, exercícios, próximos passos) ficam em
`src/content/module-meta.ts`. Banco de perguntas por módulo em
`src/content/quizzes.ts` (~8 questões por módulo, misturando tipos).

**Regras**:

- Não alterar o conteúdo pedagógico dos arquivos `.md` em `src/content/`.
  Novos callouts casuais via sintaxe GitHub `> [!NOTE]` / `[!TIP]` /
  `[!WARNING]` / `[!IMPORTANT]` / `[!CAUTION]` funcionam com o
  renderer sem tocar markdown.
- Diagramas: use ``` ```mermaid ``` na própria seção do módulo — o
  renderer converte automaticamente.
- Code blocks (``` ```ts ``` etc.) recebem syntax highlight (Shiki),
  botão copiar e label da linguagem.
- Categorias de pergunta do quiz: `conceito` | `interpretacao` |
  `decisao` | `raciocinio` | `aplicacao` | `contexto` | `seguranca`.
  Dificuldades: `basic` | `intermediate` | `advanced`.