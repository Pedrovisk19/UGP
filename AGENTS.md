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