import type {
  Trail,
  Level,
  NavGroup,
  Project,
  ContentArticle,
} from '@/types/ugp.types'

// Conteúdo markdown carregado via Webpack `asset/source`
import manifestoMd from '@/content/manifesto.md'
import arquiteturaMd from '@/content/arquitetura.md'
import niveisMd from '@/content/niveis.md'
import matrizMd from '@/content/matriz.md'
import githubMd from '@/content/github.md'
import docsAsCodeMd from '@/content/docs-as-code.md'
import arquiteturaSoftwareMd from '@/content/arquitetura-software.md'
import tddMd from '@/content/tdd.md'
import fullstackMd from '@/content/fullstack.md'
import portfolioMd from '@/content/portfolio.md'
import primeiraVagaMd from '@/content/primeira-vaga.md'
import livrosMd from '@/content/livros.md'
import uxMd from '@/content/ux.md'
import iaAplicadaMd from '@/content/ia-aplicada.md'
import engenhariaPromptMd from '@/content/engenharia-prompt.md'
import vibeCodingMd from '@/content/como-nao-fazer-vibe-coding.md'
import boasPraticasIaMd from '@/content/boas-praticas-ia.md'
import projetoIa1Md from '@/content/projeto-ia-1.md'
import projetoIa2Md from '@/content/projeto-ia-2.md'

// ── TRILHAS ──────────────────────────────────────────────────
export const TRAILS: Trail[] = [
  {
    id: 'Dev Iniciante',
    name: 'Estou começando do zero',
    tagline: 'Para quem nunca programou ou está nos primeiros meses. Começa pelo essencial e constrói os 10 projetos da trilha.',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    glow: '0 0 60px -15px rgba(99,102,241,0.5)',
    border: 'rgba(99,102,241,0.4)',
  },
  // {
  //   id: 'pleno',
  //   name: 'Já sei o básico, quero evoluir',
  //   tagline: 'Para quem já constrói coisas simples e quer solidificar fundamentos de engenharia de software.',
  //   gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  //   glow: '0 0 60px -15px rgba(139,92,246,0.5)',
  //   border: 'rgba(139,92,246,0.4)',
  // },
  // {
  //   id: 'senior',
  //   name: 'Sou dev e quero ir a fundo',
  //   tagline: 'Para devs experientes que querem dominar arquitetura, TDD, docs-as-code e engenharia de elite.',
  //   gradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
  //   glow: '0 0 60px -15px rgba(16,185,129,0.5)',
  //   border: 'rgba(16,185,129,0.4)',
  // },
]

// ── NÍVEIS (8) ────────────────────────────────────────────────
export const LEVELS: Level[] = [
  {
    key: 'extremo-iniciante',
    name: 'Extremo Iniciante',
    xp: 0,
    knowledge: 'Sabe ligar o computador e navegar na internet. Curioso sobre programação.',
    limitation: 'Nunca escreveu uma linha de código. Python é apenas uma cobra.',
    metric: 'Instala o Node e roda `node -v` sem travar.',
    checklist: [
      'Instalar Node.js e Git',
      'Criar conta no GitHub',
      'Clonar um repositório e abrir no VS Code',
    ],
  },
  {
    key: 'junior-1',
    name: 'Júnior 1',
    xp: 100,
    knowledge: 'HTML, CSS básico e JavaScript inicial. Sintaxe de variáveis, funções, loops.',
    limitation: 'Trava em bugs simples e não sabe depurar.',
    metric: 'Constrói uma página estática com formulário funcional.',
    checklist: [
      'Entender box model e flexbox',
      'Manipular DOM com JS puro',
      'Fazer fetch de uma API pública',
    ],
  },
  {
    key: 'junior-2',
    name: 'Júnior 2',
    xp: 300,
    knowledge: 'JS intermediário, ES6+, async/await, consumo de APIs REST.',
    limitation: 'Código procedural, sem separação de responsabilidades.',
    metric: 'Constrói um CRUD completo em React.',
    checklist: [
      'Dominar array methods (map, filter, reduce)',
      'Entender promises e async/await',
      'Usar localStorage e sessionStorage',
    ],
  },
  {
    key: 'junior-3',
    name: 'Júnior 3',
    xp: 600,
    knowledge: 'React completo, componentização, hooks, rotas, estado global leve.',
    limitation: 'Não testa o código e escreve CSS bagunçado.',
    metric: 'Constrói um dashboard com gráficos e dados dinâmicos.',
    checklist: [
      'Dominar hooks (useState, useEffect, useMemo, useReducer)',
      'Integrar bibliotecas (recharts, framer-motion)',
      'Implementar responsividade real',
    ],
  },
  {
    key: 'pleno-1',
    name: 'Pleno 1',
    xp: 1000,
    knowledge: 'Arquitetura de software, padrões, separação de camadas, backend com Node.',
    limitation: 'Ainda não escreve testes automatizados consistentemente.',
    metric: 'Constrói um app fullstack com auth e banco de dados.',
    checklist: [
      'Criar API REST com Express ou Next API routes',
      'Modelar tabelas no PostgreSQL',
      'Implementar autenticação JWT ou Supabase Auth',
    ],
  },
  {
    key: 'pleno-2',
    name: 'Pleno 2',
    xp: 1600,
    knowledge: 'TDD, testes E2E, CI/CD, docs-as-code, observabilidade básica.',
    limitation: 'Ainda trata deploy como evento traumático.',
    metric: 'Faz deploy automatizado com pipeline de testes passando.',
    checklist: [
      'Escrever testes unitários com Vitest/Jest',
      'Configurar pipeline no GitHub Actions',
      'Escrever documentação técnica clara',
    ],
  },
  {
    key: 'pleno-3',
    name: 'Pleno 3',
    xp: 2400,
    knowledge: 'Microsserviços, mensageria, design de sistema em escala.',
    limitation: 'Sistemas distribuídos ainda são território parcialmente desconhecido.',
    metric: 'Desenha a arquitetura de um sistema em escala.',
    checklist: [
      'Entender filas e workers (Redis, RabbitMQ)',
      'Modelar para multi-tenancy',
      'Aplicar patterns de resiliência',
    ],
  },
  {
    key: 'senior',
    name: 'Sênior',
    xp: 3500,
    knowledge: 'Engenharia de elite: arquitetura, decisões técnicas defensáveis, mentoria.',
    limitation: 'Limites são narrativos — dependem do contexto e do domínio.',
    metric: 'Lidera tecnicamente um produto do zero ao escalável.',
    checklist: [
      'Defender decisões técnicas com trade-offs claros',
      'Mentorar devs mais juniores',
      'Desenhar e revisar arquiteturas end-to-end',
    ],
  },
]

// ── NAV_TREE (grupos de navegação) ───────────────────────────
export const NAV_TREE: NavGroup[] = [
  {
    label: 'Fundamentos',
    items: [
      { slug: 'manifesto', label: 'Manifesto' },
      { slug: 'arquitetura', label: 'Arquitetura da UGP' },
      { slug: 'niveis', label: 'Níveis' },
      { slug: 'matriz', label: 'Matriz', isMatrix: true },
    ],
  },
  {
    label: 'Engenharia',
    items: [
      { slug: 'github', label: 'GitHub' },
      { slug: 'docs-as-code', label: 'Docs as Code' },
      { slug: 'arquitetura-software', label: 'Arquitetura de Software' },
      { slug: 'tdd', label: 'TDD' },
      { slug: 'fullstack', label: 'Fullstack' },
    ],
  },
  {
    label: 'Carreira',
    items: [
      { slug: 'portfolio', label: 'Portfólio' },
      { slug: 'primeira-vaga', label: 'Primeira Vaga' },
      { slug: 'livros', label: 'Livros' },
      { slug: 'ux', label: 'UX' },
    ],
  },
  {
    label: 'Extras',
    items: [
      { slug: 'roadmap', label: 'Roadmap de Estudos', isSpecial: true },
      { slug: 'cursos-gratuitos', label: 'Cursos Gratuitos', isSpecial: true },
    ],
  },
  {
    label: 'IA Aplicada',
    items: [
      { slug: 'ia-aplicada', label: 'IA Aplicada' },
      { slug: 'engenharia-prompt', label: 'Engenharia de Prompt' },
      { slug: 'como-nao-fazer-vibe-coding', label: 'Como NÃO Fazer Vibe Coding' },
      { slug: 'boas-praticas-ia', label: 'Boas Práticas com IA' },
      { slug: 'projeto-ia-1', label: 'Projeto IA 1' },
      { slug: 'projeto-ia-2', label: 'Projeto IA 2' },
    ],
  },
]

// ── PROJETOS (10) ─────────────────────────────────────────────
function rf(n: number, text: string) {
  return { key: `RF${String(n).padStart(3, '0')}`, text }
}
function rn(n: number, text: string) {
  return { key: `RN${String(n).padStart(3, '0')}`, text }
}
function ac(n: number, text: string) {
  return { key: `AC${String(n).padStart(3, '0')}`, text }
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Todo List Corporativo',
    level: 'Júnior 1',
    xp: 400,
    problem: 'Times precisam de uma lista de tarefas compartilhada com priorização.',
    context: 'Primeiro projeto real. Foco em CRUD, estados e persistência.',
    tags: ['CRUD', 'Dashboard'],
    functional: [
      rf(1, 'O usuário pode criar uma tarefa com título e descrição.'),
      rf(2, 'O usuário pode marcar uma tarefa como concluída.'),
      rf(3, 'O usuário pode editar uma tarefa existente.'),
      rf(4, 'O usuário pode deletar uma tarefa.'),
      rf(5, 'O usuário pode filtrar por status (pendente, concluída).'),
    ],
    nonFunctional: [
      rn(1, 'A lista deve persistir ao recarregar a página.'),
      rn(2, 'A interface deve ser responsiva em mobile.'),
      rn(3, 'Operações devem ter feedback visual imediato.'),
    ],
    acceptance: [
      ac(1, 'Dado que crio uma tarefa, então ela aparece no topo da lista.'),
      ac(2, 'Dado que marco como concluída, então o texto fica riscado.'),
      ac(3, 'Dado que recarrego a página, então a lista está igual a antes.'),
    ],
    architecture:
      'frontend/ (React + Tailwind)\n' +
      '  components/ TaskList, TaskItem, TaskForm\n' +
      '  hooks/ useTasks (localStorage)\n' +
      '  lib/ storage.ts',
    shareMessage: 'Concluí o Projeto 01 da UGP — Todo List Corporativo 🎯',
  },
  {
    id: 2,
    name: 'Carrinho de Compras',
    level: 'Júnior 1',
    xp: 450,
    problem: 'E-commerce precisa de um carrinho com cálculo de totais e descontos.',
    context: 'Foco em estado global, listas, cálculos derivados.',
    tags: ['CRUD', 'Dashboard'],
    functional: [
      rf(1, 'O usuário pode adicionar produtos ao carrinho.'),
      rf(2, 'O usuário pode alterar a quantidade de cada item.'),
      rf(3, 'O sistema calcula o subtotal automaticamente.'),
      rf(4, 'O sistema aplica cupom de desconto válido.'),
      rf(5, 'O usuário pode remover itens do carrinho.'),
    ],
    nonFunctional: [
      rn(1, 'O total deve atualizar em tempo real.'),
      rn(2, 'O carrinho deve persistir entre sessões.'),
      rn(3, 'Cupom inválido mostra mensagem de erro.'),
    ],
    acceptance: [
      ac(1, 'Dado que adiciono 2 produtos, então o subtotal é a soma deles.'),
      ac(2, 'Dado que aplico cupom UGP10, então 10% é descontado.'),
      ac(3, 'Dado que removo um item, então o total recalcula.'),
    ],
    architecture:
      'frontend/\n' +
      '  components/ ProductCard, CartItem, CartSummary, CouponInput\n' +
      '  hooks/ useCart (Context + reducer)\n' +
      '  lib/ pricing.ts',
    shareMessage: 'Concluí o Projeto 02 da UGP — Carrinho de Compras 🛒',
  },
  {
    id: 3,
    name: 'Dashboard de Vendas',
    level: 'Júnior 2',
    xp: 600,
    problem: 'Comercial precisa visualizar métricas de vendas em tempo real.',
    context: 'Introduz gráficos, dados dinâmicos e layout de dashboard.',
    tags: ['Dashboard', 'Gráficos', 'Analytics'],
    functional: [
      rf(1, 'O dashboard exibe KPIs: receita, ticket médio, conversão.'),
      rf(2, 'O usuário vê um gráfico de linhas de vendas por mês.'),
      rf(3, 'O usuário vê um gráfico de barras por categoria.'),
      rf(4, 'O usuário pode filtrar por período (7d, 30d, 90d).'),
      rf(5, 'O usuário pode exportar dados em CSV.'),
    ],
    nonFunctional: [
      rn(1, 'Os gráficos devem carregar em menos de 1 segundo.'),
      rn(2, 'A interface deve seguir o design system da UGP.'),
      rn(3, 'Dados mockados devem ser realistas.'),
    ],
    acceptance: [
      ac(1, 'Dado que abro o dashboard, então vejo 4 KPIs atualizados.'),
      ac(2, 'Dado que troco o período, então os gráficos re-renderizam.'),
      ac(3, 'Dado que clico em exportar, então um CSV é baixado.'),
    ],
    architecture:
      'frontend/\n' +
      '  components/ KpiCard, SalesChart, CategoryChart, PeriodFilter, ExportButton\n' +
      '  hooks/ useSalesData\n' +
      '  lib/ csv.ts, mock-data.ts',
    shareMessage: 'Concluí o Projeto 03 da UGP — Dashboard de Vendas 📊',
  },
  {
    id: 4,
    name: 'Kanban de Projetos',
    level: 'Júnior 2',
    xp: 650,
    problem: 'Time precisa de um quadro Kanban com drag & drop para organizar tarefas.',
    context: 'Introduz drag & drop, persistência e múltiplas colunas.',
    tags: ['Drag & Drop', 'Dashboard'],
    functional: [
      rf(1, 'O usuário pode criar cards em qualquer coluna.'),
      rf(2, 'O usuário pode arrastar cards entre colunas.'),
      rf(3, 'O usuário pode reordenar cards dentro de uma coluna.'),
      rf(4, 'O usuário pode editar e excluir cards.'),
      rf(5, 'O quadro persiste entre sessões.'),
    ],
    nonFunctional: [
      rn(1, 'O drag deve ser fluido (60 FPS).'),
      rn(2, 'A interface deve funcionar em touch.'),
      rn(3, 'O estado deve ser otimista.'),
    ],
    acceptance: [
      ac(1, 'Dado que arrasto um card, então ele move de coluna.'),
      ac(2, 'Dado que solto, então a ordem persiste.'),
      ac(3, 'Dado que recarrego, então o quadro está igual.'),
    ],
    architecture:
      'frontend/\n' +
      '  components/ Board, Column, Card\n' +
      '  hooks/ useBoard (@hello-pangea/dnd)\n' +
      '  lib/ board-storage.ts',
    shareMessage: 'Concluí o Projeto 04 da UGP — Kanban de Projetos 🎯',
  },
  {
    id: 5,
    name: 'Blog Pessoal com MDX',
    level: 'Júnior 3',
    xp: 700,
    problem: 'Devs precisam de um portfólio/blog próprio para visibilidade.',
    context: 'Markdown rendering, dinamismo de rotas, SEO.',
    tags: ['Auth', 'Dashboard'],
    functional: [
      rf(1, 'O blog lista posts a partir de arquivos markdown.'),
      rf(2, 'O usuário pode navegar para cada post por slug.'),
      rf(3, 'O blog tem página "sobre" configurável.'),
      rf(4, 'Os posts têm frontmatter (data, tags, resumo).'),
      rf(5, 'O blog tem modo claro/escuro.'),
    ],
    nonFunctional: [
      rn(1, 'Lighthouse > 90 em performance.'),
      rn(2, 'Posts devem ser SSR/SSG.'),
      rn(3, 'Fontes devem ser otimizadas.'),
    ],
    acceptance: [
      ac(1, 'Dado que adiciono um .mdx, então aparece na listagem.'),
      ac(2, 'Dado que abro um post, então vejo conteúdo renderizado.'),
      ac(3, 'Dado que ativo dark mode, então persiste.'),
    ],
    architecture:
      'frontend/ (Next.js)\n' +
      '  app/page.tsx, app/posts/[slug]/page.tsx, app/about/page.tsx\n' +
      '  content/*.mdx\n' +
      '  lib/posts.ts',
    shareMessage: 'Concluí o Projeto 05 da UGP — Blog Pessoal 📝',
  },
  {
    id: 6,
    name: 'App de Treinos (Mobile-first)',
    level: 'Júnior 3',
    xp: 750,
    problem: 'Pessoas precisam de um app de treinos personalizável, mobile-first.',
    context: 'Responsividade real, PWA, estado complexo.',
    tags: ['Mobile', 'CRUD'],
    functional: [
      rf(1, 'O usuário pode criar treinos com exercícios.'),
      rf(2, 'O usuário pode marcar exercícios como feitos.'),
      rf(3, 'O sistema mostra progresso semanal.'),
      rf(4, 'O usuário pode copiar treinos entre dias.'),
      rf(5, 'O app funciona offline (PWA).'),
    ],
    nonFunctional: [
      rn(1, 'Deve ser instalável como app.'),
      rn(2, 'Offline first com IndexedDB.'),
      rn(3, 'UX otimizada para polegar.'),
    ],
    acceptance: [
      ac(1, 'Dado que valido treino, então o progresso incrementa.'),
      ac(2, 'Dado que estou offline, então posso registrar treinos.'),
      ac(3, 'Dado que instalo, então abre como app.'),
    ],
    architecture:
      'frontend/ (Next PWA)\n' +
      '  components/ WorkoutList, ExerciseItem, ProgressRing\n' +
      '  hooks/ useWorkouts (IndexedDB via idb)\n' +
      '  service-worker',
    shareMessage: 'Concluí o Projeto 06 da UGP — App de Treinos 💪',
  },
  {
    id: 7,
    name: 'SaaS de Notas com Auth',
    level: 'Pleno 1',
    xp: 900,
    problem: 'Pequenos times precisam de um SaaS de notas privadas com autenticação real.',
    context: 'Introduz auth, banco, RLS, multi-usuário.',
    tags: ['Auth', 'CRUD', 'Dashboard'],
    functional: [
      rf(1, 'O usuário pode se registrar e logar.'),
      rf(2, 'O usuário pode criar notas privadas.'),
      rf(3, 'Cada usuário vê apenas suas notas.'),
      rf(4, 'O usuário pode compartilhar uma nota via link público.'),
      rf(5, 'O usuário pode exportar todas as notas em JSON.'),
    ],
    nonFunctional: [
      rn(1, 'RLS para isolar dados entre usuários.'),
      rn(2, 'Sessão persiste entre reloads.'),
      rn(3, 'Rotas protegidas no middleware.'),
    ],
    acceptance: [
      ac(1, 'Dado que crio nota, então só eu a vejo na listagem.'),
      ac(2, 'Dado que compartilho link, então visitante vê a nota.'),
      ac(3, 'Dado que outro usuário loga, então vê só as dele.'),
    ],
    architecture:
      'frontend/ (Next + Supabase)\n' +
      '  app/(auth)/, app/(app)/notes\n' +
      '  lib/supabase/client, server\n' +
      '  middleware.ts\n' +
      'supabase/ migrations/ notes.sql (RLS)',
    shareMessage: 'Concluí o Projeto 07 da UGP — SaaS de Notas com Auth 🔐',
  },
  {
    id: 8,
    name: 'Admin de Conteúdo (CMS)',
    level: 'Pleno 1',
    xp: 850,
    problem: 'Publishers precisam de um CMS leve para gerenciar posts.',
    context: 'CRUD completo, permissões, preview, estados de publicação.',
    tags: ['CRUD', 'Dashboard', 'Auth'],
    functional: [
      rf(1, 'O admin pode criar, editar e excluir posts.'),
      rf(2, 'Os posts têm estados: draft, review, published.'),
      rf(3, 'O editor pode visualizar preview antes de publicar.'),
      rf(4, 'O admin pode gerenciar usuários e papéis.'),
      rf(5, 'O sistema mantém histórico de revisões.'),
    ],
    nonFunctional: [
      rn(1, 'Operações otimistas com sincronização.'),
      rn(2, 'Permissões via roles.'),
      rn(3, 'Logs de auditoria.'),
    ],
    acceptance: [
      ac(1, 'Dado que salvo draft, então fica em rascunho.'),
      ac(2, 'Dado que publico, então aparece no front público.'),
      ac(3, 'Dado que sou editor, então não vejo gerenciamento de usuários.'),
    ],
    architecture:
      'frontend/ admin app + public app\n' +
      '  lib/supabase (auth, rls, roles)\n' +
      'supabase/ posts, revisions, user_roles',
    shareMessage: 'Concluí o Projeto 08 da UGP — CMS Admin 🗂️',
  },
  {
    id: 9,
    name: 'Plataforma de Cursos (LMS)',
    level: 'Pleno 2',
    xp: 1000,
    problem: 'Criadores de conteúdo precisam de uma plataforma de cursos com progressão.',
    context: 'Sistema completo com TDD, CI/CD, deploy automatizado.',
    tags: ['Auth', 'Dashboard', 'Analytics'],
    functional: [
      rf(1, 'Estudantes podem se matricular em cursos.'),
      rf(2, 'O sistema rastreia progresso por aula.'),
      rf(3, 'Certificados são emitidos ao concluir.'),
      rf(4, 'Instrutores podem criar cursos e aulas.'),
      rf(5, 'Há dashboard de analytics para instrutores.'),
    ],
    nonFunctional: [
      rn(1, 'Testes unitários e E2E ≥ 80% cobertura.'),
      rn(2, 'CI no GitHub Actions.'),
      rn(3, 'Deploy automatizado na Vercel.'),
    ],
    acceptance: [
      ac(1, 'Dado que concluo todas as aulas, então recebo certificado.'),
      ac(2, 'Dado que abro o dashboard, então vejo meus cursos.'),
      ac(3, 'Dado que sou instrutor, então vejo analytics dos alunos.'),
    ],
    architecture:
      'frontend/ (Next.js app router)\n' +
      '  app/(student), app/(instructor), app/admin\n' +
      'supabase/ enrollments, lessons, progress, certificates\n' +
      '.github/workflows/ci.yml',
    shareMessage: 'Concluí o Projeto 09 da UGP — LMS 🎓',
  },
  {
    id: 10,
    name: 'Clone do Supabase (BaaS Minimal)',
    level: 'Pleno 2',
    xp: 1200,
    problem: 'Entender BaaS por dentro construindo um minimal: auth + db realtime.',
    context: 'Projeto final. Engenharia de elite.',
    tags: ['Auth', 'Dashboard', 'Analytics'],
    functional: [
      rf(1, 'O BaaS provê autenticação via email/senha e OAuth Google.'),
      rf(2, 'O BaaS provê SDK consumível por apps clientes.'),
      rf(3, 'O BaaS suporta realtime via websockets.'),
      rf(4, 'O BaaS impõe RLS baseada em policies declarativas.'),
      rf(5, 'Há dashboard admin para visualizar tabelas.'),
    ],
    nonFunctional: [
      rn(1, 'Latência < 100ms em operações CRUD.'),
      rn(2, 'Suporta 1000 conexões concorrentes.'),
      rn(3, 'Arquitetura documentada e justificada.'),
    ],
    acceptance: [
      ac(1, 'Dado que registrei app cliente, então posso chamar a SDK.'),
      ac(2, 'Dado que aplico RLS, então usuários só veem seus dados.'),
      ac(3, 'Dado que subscrevo uma tabela, então recebo updates em realtime.'),
    ],
    architecture:
      'baas/\n' +
      '  services/ auth, db, realtime, storage\n' +
      '  sdk/ @ugp/baas-js\n' +
      '  admin/ dashboard\n' +
      'infra/ docker-compose, postgres, redis, node',
    shareMessage: 'Concluí o Projeto 10 da UGP — Clone do Supabase 🚀',
  },
]

export function getProject(id: number | string) {
  return PROJECTS.find((p) => p.id === Number(id))
}

export function getProjectTotalItems(project: Project) {
  return (
    project.functional.length +
    project.nonFunctional.length +
    project.acceptance.length
  )
}

// ── TAG STYLES ────────────────────────────────────────────────
export const TAG_STYLES: Record<string, string> = {
  CRUD: 'ugp-tag ugp-badge-blue',
  Dashboard: 'ugp-tag ugp-badge-purple',
  Auth: 'ugp-tag ugp-badge-indigo',
  Mobile: 'ugp-tag ugp-badge-green',
  'Gráficos': 'ugp-tag ugp-badge-amber',
  Analytics: 'ugp-tag ugp-badge-purple',
  'Drag & Drop': 'ugp-tag ugp-badge-green',
}

export function tagClass(tag: string) {
  return TAG_STYLES[tag] ?? 'ugp-tag ugp-badge-neutral'
}

// Módulos navegáveis (sem matrix e sem especiais) — usados para navegação sequencial
export const SEQUENCABLE_MODULES = NAV_TREE.flatMap((g) =>
  g.items.filter((i) => !i.isMatrix && !i.isSpecial)
)

// ── CONTEÚDO (carregado de arquivos markdown em src/content/) ──
export const CONTENT: Record<string, ContentArticle> = {
  manifesto: { title: 'Manifesto', body: manifestoMd },
  arquitetura: { title: 'Arquitetura da UGP', body: arquiteturaMd },
  niveis: { title: 'Níveis', body: niveisMd },
  matriz: { title: 'Matriz', body: matrizMd },
  github: { title: 'GitHub', body: githubMd },
  'docs-as-code': { title: 'Docs as Code', body: docsAsCodeMd },
  'arquitetura-software': { title: 'Arquitetura de Software', body: arquiteturaSoftwareMd },
  tdd: { title: 'TDD', body: tddMd },
  fullstack: { title: 'Fullstack Moderno', body: fullstackMd },
  portfolio: { title: 'Portfólio que Vende', body: portfolioMd },
  'primeira-vaga': { title: 'Primeira Vaga', body: primeiraVagaMd },
  livros: { title: 'Livros para Engenheiros', body: livrosMd },
  ux: { title: 'UX para Devs', body: uxMd },
  'ia-aplicada': { title: 'IA Aplicada para Devs', body: iaAplicadaMd },
  'engenharia-prompt': { title: 'Engenharia de Prompt', body: engenhariaPromptMd },
  'como-nao-fazer-vibe-coding': { title: 'Como NÃO Fazer Vibe Coding', body: vibeCodingMd },
  'boas-praticas-ia': { title: 'Boas Práticas com IA', body: boasPraticasIaMd },
  'projeto-ia-1': { title: 'Projeto IA 1 — SaaS de Flashcards com LLM', body: projetoIa1Md },
  'projeto-ia-2': { title: 'Projeto IA 2 — Code Reviewer com RAG', body: projetoIa2Md },
}

// ── LANDING OPTIONS ──────────────────────────────────────────
export const LANDING_OPTIONS = [
  {
    id: 'ugp',
    label: 'Entrar na UGP',
    href: '/login',
    isInternal: true,
    accent: '#0ea5e9',
    highlights: [
      '10 projetos corporativos reais',
      '8 níveis de evolução',
      'Portfólio profissional',
    ],
  },
  {
    id: 'software',
    label: 'Criar Software',
    href: 'https://wa.me/5531999810260?text=Quero%20criar%20um%20software',
    isInternal: false,
    accent: '#6366f1',
    highlights: ['Consultoria customizada', 'Do MVP ao produto'],
  },
  {
    id: 'sites',
    label: 'Criar Sites',
    href: 'https://wa.me/5531999810260?text=Quero%20criar%20um%20site',
    isInternal: false,
    accent: '#10b981',
    highlights: ['Landing pages', 'Sites institucionais'],
  },
]