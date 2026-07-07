import type { Question } from '@/types/ugp.types'

/** Helper conciso para construir múltipla-escolha com explicação e porquês. */
function mc(p: {
  id: string
  difficulty: Question['difficulty']
  category: Question['category']
  question: string
  options: string[]
  correct: number
  explanation: string
  why: string[]
  reviewAnchor: string
}): Question {
  return { type: 'multiple-choice', ...p }
}
function tf(p: {
  id: string
  difficulty: Question['difficulty']
  category: Question['category']
  question: string
  correct: boolean
  explanation: string
  why?: string[]
  reviewAnchor: string
}): Question {
  return { type: 'true-false', ...p }
}
function sc(p: {
  id: string
  difficulty: Question['difficulty']
  category: Question['category']
  scenario: string
  question: string
  options: string[]
  correct: number
  explanation: string
  why: string[]
  reviewAnchor: string
}): Question {
  return { type: 'scenario', ...p }
}
function eg(p: {
  id: string
  difficulty: Question['difficulty']
  category: Question['category']
  question: string
  options: string[]
  correct: number
  explanation: string
  why: string[]
  reviewAnchor: string
}): Question {
  return { type: 'engineering', ...p }
}
function ord(p: {
  id: string
  difficulty: Question['difficulty']
  category: Question['category']
  question: string
  steps: string[]
  reviewAnchor: string
}): Question {
  return { type: 'order', ...p }
}
function aso(p: {
  id: string
  difficulty: Question['difficulty']
  category: Question['category']
  question: string
  pairs: { left: string; right: string }[]
  reviewAnchor: string
}): Question {
  return { type: 'assoc', ...p }
}

// Anchors comuns usados em todos os módulos (correspondem aos ## Seção das .md)
const A = {
  intro: 'introducao',
  hist: 'contexto-historico',
  intuit: 'explicacao-intuitiva',
  tec: 'funcionamento-tecnico',
  ex: 'exemplos',
  err: 'erros-comuns',
  good: 'boas-praticas',
  world: 'mundo-real',
  conn: 'conexao-com-a-ugp',
} as const

export const QUIZZES: Record<string, Question[]> = {
  // ── manifesto ────────────────────────────────────────────
  manifesto: [
    mc({
      id:'man-1',difficulty:'basic',category:'conceito',
      question:'Qual é a tese central do manifesto da UGP?',
      options:[
        'Aprender sintaxe é o suficiente para ser empregável',
        'Cursos ensinam sintaxe; projetos ensinam engenharia',
        'Frameworks são mais importantes que fundamentos',
        'Bootcamps produzem engenheiros completos em 6 meses',
      ],correct:1,
      explanation:'A UGP nasce da observação de que cursos/bootcamps ensinam "como usar" (sintaxe) sem o "porquê". Projetos corporativos ensinam engenharia (decisões, trade-offs).',
      why:['Isto inverte a tese central — sintaxe é só o alfabeto','Os outros contradizem o manifesto, que defende profundidade com projetos.'],
      reviewAnchor:A.intro,
    }),
    mc({
      id:'man-2',difficulty:'intermediate',category:'interpretacao',
      question:'O manifesto descreve 4 eras de ensino de software. Em qual delas o conteúdo se tornou "raso, descartável"?',
      options:['Autodidata (1970-1990)','Cursos (1990-2010)','Bootcamps (2010-2020)','Conteúdo rápido (2020-presente)'],
      correct:3,
      explanation:'A era do vídeo de 10 min e do thread de Twitter é eficiente para descobrir, mas péssima para domínio, que exige profundidade e tempo.',
      why:['A era autodidata ensinou profundidade — lento mas profundo.','Cursos democratizaram o acesso.','Bootcamps aceleraram, mas o problema era "mínimo viável" para entrevistas.'],
      reviewAnchor:A.hist,
    }),
    ord({
      id:'man-3',difficulty:'intermediate',category:'contexto',
      question:'Ordene as eras de ensino de software conforme apresentadas no manifesto.',
      steps:[
        'Era do autodidata (1970-1990)',
        'Era dos cursos (1990-2010)',
        'Era dos bootcamps (2010-2020)',
        'Era do conteúdo rápido (2020-presente)',
      ],
      reviewAnchor:A.hist,
    }),
    tf({
      id:'man-4',difficulty:'basic',category:'conceito',
      question:'Seguir um tutorial e refazer sem olhar é a mesma coisa que seguir o tutorial.',
      correct:false,
      explanation:'Seguir é reconhecer; aprender é reproduzir sem o tutorial. O módulo cita isso como erro de iniciante.',
      reviewAnchor:A.err,
    }),
    sc({
      id:'man-5',difficulty:'intermediate',category:'aplicacao',
      scenario:'Você seguiu um tutorial de React e fez um app. Quer saber quanto realmente aprendeu.',
      question:'Qual teste é mais honesto segundo o manifesto?',
      options:[
        'Refazer o app sem olhar o tutorial',
        'Comentar o tutorial ("já entendi")',
        'Trocar o framework e refazer o mesmo tipo de app',
        'Ler o tutorial de novo em voz alta',
      ],correct:0,
      explanation:'Aprender é reproduzir sem o tutorial. Se você conseguir refazer, dominou; se travar, viu a extensão real do seu aprendizado.',
      why:['Comentar confunde reconhecimento com domínio.','Trocar framework testa outra coisa, não o que aprendeu.','Ler de novo é reforço de superfície.'],
      reviewAnchor:A.ex,
    }),
    mc({
      id:'man-6',difficulty:'advanced',category:'decisao',
      question:'Um sênior que registra decisões em ADRs está evitando qual erro descrito no módulo?',
      options:[
        'Não decidir sem documentar o porquê',
        'Confiar apenas em "funciona"',
        'Pular teste de hipóteses',
        'Todas as acima',
      ],correct:3,
      explanation:'Sêniores não decidem sem documentar; não confiam só em "funciona"; e não pulam o teste de hipóteses antes de reescrever um sistema. ADR = memória da decisão.',
      why:['A afirmação 1 está correta e contemplada.','A 2 e 3 também são evitadas por seniores.'],
      reviewAnchor:A.err,
    }),
    mc({
      id:'man-7',difficulty:'basic',category:'conceito',
      question:'Por que o módulo recomenda "devagar é mais rápido"?',
      options:[
        'Porque a UGP desvaloriza velocidade',
        'Porque conteúdo lido rápido é esquecido rápido — releitura economiza no longo prazo',
        'Porque iniciantes não conseguem ler depressa',
        'Porque é impossível entender técn sem 1h por parágrafo',
      ],correct:1,
      explanation:'Devagar custa mais no momento e nada no futuro. Rápido custa nada agora e muito em revisão meses depois.',
      why:['A UGP não é contra velocidade — é contra leitura vazia.','Não é sobre capacidade do iniciante.','Não exagera assim.'],
      reviewAnchor:A.good,
    }),
    eg({
      id:'man-8',difficulty:'advanced',category:'aplicacao',
      question:'Você está construindo um botão de portfólio pessoal. É aceitável pular os princípios da UGP?',
      options:[
        'Sim — portfólio não exige engenharia, vale atalho',
        'Não — todo software segue as mesmas regras',
        'Depende — botão de portfólio é estético, sem engenharia',
        'Parcialmente — em software de baixo custo de bug, pular é aceitável; em sistema crítico, é existencial',
      ],correct:3,
      explanation:'O manifesto distingue software de baixo custo de bug (você pode pular) de software crítico (todo princípio é existencial).',
      why:['Afirmar "vale atalho" ignore o trade-of real.','"Sempre segue as regras" é absoluto não(linker).','Botão pode exigir UX/engineering mesmo sendo estético.'],
      reviewAnchor:A.world,
    }),
  ],

  // ── arquitetura ──────────────────────────────────────────
  arquitetura: [
    mc({
      id:'arq-1',difficulty:'basic',category:'conceito',
      question:'Por que a UGP usa Next.js em vez de Vite ou Remix?',
      options:['Por ser novo','Porque App Router, Server Components, Server Actions, SSR/SSG e next/image resolvem o problema','Porque todos os devs já usam','Porque Vite é depreciado'],
      correct:1,
      explanation:'A escolha vem dos recursos do stack (rotas por pastas, menos JS no client, SEO pronto, imagens otimizadas). O trade-off é mais complexidade.',
      why:['"Novo" não justifica arquitetura.','Dev base é incerto; Next é #1 em produção, mas não por popularidade.','Vite não está depreciado.'],
      reviewAnchor:'por-que-next-js-e-nao-vite-ou-remix',
    }),
    mc({
      id:'arq-2',difficulty:'intermediate',category:'decisao',
      question:'Qual é o trade-off principal ao usar Supabase em vez de backend próprio?',
      options:['Maior controle','Acoplamento ao provedor (se cair, você cai)','Maior custo','Redução de features'],
      correct:1,
      explanation:'Auth, RLS, Realtime e Studio prontos economizam tempo, mas você acopla à plataforma — se o Supabase sair do ar, seu app também sai.',
      why:['Você ganha controle-builder com backend próprio, não perde.','Supabase é grátis no tier inicial.','Features aumentam, não diminuem.'],
      reviewAnchor:'por-que-supabase-e-nao-um-backend-proprio',
    }),
    tf({
      id:'arq-3',difficulty:'basic',category:'conceito',
      question:'RLS significa "Render Layer Server" no Supabase.',
      correct:false,
      explanation:'RLS = Row Level Security. É o Postgres que decide, em nível de linha, qual usuário pode ler ou modificar — independente do frontend.',
      why:[],
      reviewAnchor:'por-que-supabase-e-nao-um-backend-proprio',
    }),
    sc({
      id:'arq-4',difficulty:'intermediate',category:'decisao',
      scenario:'Você armazena "módulo concluído" em localStorage. O usuário troca de notebook.',
      question:'O que acontece?',
      options:[
        'A sincronização é automática — Supabase cuida',
        'O progresso é perdido e XP global fica inconsistente',
        'Vai funcionar, mas só após log in novamente',
        'Vai funcionar em 2 dias úteis',
      ],correct:1,
      explanation:'localStorage é por navegador/dispositivo. Troca = perda. Por isso a UGP escolheu tabela Postgres (decisão 1 do módulo).',
      why:['A sincronização não é automática em localStorage.','Re-login não resolve persistência por dispositivo.','Não há corrente mágica.'],
      reviewAnchor:'decisao-1-onde-guardar-este-modulo-foi-concluido',
    }),
    mc({
      id:'arq-5',difficulty:'advanced',category:'aplicacao',
      question:'Por que o conteúdo da UGP é markdown estático e não um CMS?',
      options:[
        'Porque CMS é caro',
        'Porque conteúdo muda pouco, é versionável, sem latência e sem dependência de DB',
        'Porque devs não usam CMS',
        'Porque Supabase não suporta conteúdo',
      ],correct:1,
      explanation:'Para conteúdo que muda pouco, CMS é overkill. Markdown é diff limpo, portável e funciona mesmo com Supabase cair.',
      why:['CMS pode ser grátis (Strapi self-host).','"Devs não usam CMS" é falso.','Supabase suporta JSONB/TEXT.'],
      reviewAnchor:'por-que-conteudo-estatico',
    }),
    aso({
      id:'arq-6',difficulty:'intermediate',category:'conceito',
      question:'Relacione cada peça do stack UGP ao seu papel na analogia da cozinha.',
      pairs:[
        { left:'Supabase', right:'Cozinha' },
        { left:'Next.js + Tailwind', right:'Salão' },
        { left:'Markdown', right:'Cardápio' },
        { left:'Server Actions', right:'Garçom' },
      ],
      reviewAnchor:A.intuit,
    }),
    mc({
      id:'arq-7',difficulty:'advanced',category:'raciocinio',
      question:'Um intermediário adiciona Redis, Kafka e microserviços num app de 100 usuários. Qual erro?',
      options:['YAGNI / over-architecting','Não documentar trade-offs','Confundir frontend com tudo','Confiar cegamente no BaaS'],
      correct:0,
      explanation:'Adicionar complexidade sem medida que justifique é over-architecting. Cada peça nova é superfície de bug.',
      why:['Não doc trade-offs é um outro erro descrito.','"Confundir frontend" é erro de iniciante.','Confiar cegamente no BaaS é um outro erro de sênior.'],
      reviewAnchor:A.err,
    }),
    ord({
      id:'arq-8',difficulty:'intermediate',category:'aplicacao',
      question:'Ordene os passos do fluxo conforme a analogia da cozinha.',
      steps:[
        'Cliente (frontend) vê o cardápio (markdown)',
        'Garçom (Server Action) leva pedido à cozinha',
        'Cozinha (Supabase) processa com segurança (RLS)',
        'Pedido pronto voltapara o cliente',
      ],reviewAnchor:A.intuit,
    }),
  ],

  // ── niveis ────────────────────────────────────────────────
  niveis: [
    mc({
      id:'niv-1',difficulty:'basic',category:'conceito',
      question:'Quantos níveis tem a UGP e qual o critério base para definir nível?',
      options:['5 — Júnior/Pleno/Sênior + 3 extras','8 — competências observáveis, não anos','4 — por tipo de stack','3 — por tempo de carreira'],
      correct:1,
      explanation:'A UGP divide em 8 níveis (Extremo Iniciante até Sênior), definidos por competências observáveis — não por tempo, modelo adotado por Stripe/Thoughtworks/Spotify.',
      why:['São 8, não 5.','Sem ligação com tipo de stack.','Tempo não é proxy confiável.'],
      reviewAnchor:A.intro,
    }),
    sc({
      id:'niv-2',difficulty:'intermediate',category:'aplicacao',
      scenario:'Maria, 22, recém-saída de bootcamp. Sabe React, fez 3 projetos, sem Postgres, sem testes, nunca deployou sozinha.',
      question:'Em qual nível da UGP ela está?',
      options:['Júnior 1','Júnior 2','Júnior 3','Pleno 1'],
      correct:1,
      explanation:'Constrói em React (Júnior 2), mas travou em arquitetura, backend e testes. Falta responsividade mobile-first + libs para Júnior 3, e backend para Pleno 1.',
      why:['Júnior 1 requer HTML/CSS/JS inicial — ela já passou disso.','Júnior 3 exige hooks/rotas/estado avançado; ela ainda não dominou testes.','Pleno 1 exige backend/auth/DB que ela não tem.'],
      reviewAnchor:'exemplos',
    }),
    tf({
      id:'niv-3',difficulty:'basic',category:'conceito',
      question:'Você pode ser Sênior em frontend e Júnior em ML ao mesmo tempo.',
      correct:true,
      explanation:'Conhecimento é assimétrico. Sênior não é destino — é base em uma área. Honestidade sobre forças/fragilidades é maturidade.',
      why:[],reviewAnchor:A.err,
    }),
    mc({
      id:'niv-4',difficulty:'intermediate',category:'decisao',
      question:'Qual erro de intermediário o módulo descreve?',
      options:[
        'Subestimar Pleno 1 — só saber fazer CRUD não é pleno',
        'Achar que nível é sobre velocidade',
        'Pular níveis (sem Pleno 1, microsserviços viram bagunça)',
        'Não parar de aprender',
      ],correct:0,
      explanation:'Subestimar Pleno 1 — ser pleno é saber por que o CRUD é estruturado assim e os trade-offs, não só fazer. (A 2 é erro de iniciante; a 3 também; a 4 é virtude sênior.)',
      why:['Velocidade → erro de iniciante.','Pular níveis → erro de iniciante.','"Não parar..." é de sênior, mas virtude, não erro.'],
      reviewAnchor:A.err,
    }),
    mc({
      id:'niv-5',difficulty:'basic',category:'conceito',
      question:'Cada nível da UGP define 4 coisas. Qual NÃO está entre elas?',
      options:['O que você conhece (conhecimento atual)','O que ainda te limita (limitação honesta)','Como saber que dominou (métrica de saída)','Salário médio do mercado'],
      correct:3,
      explanation:'Os 4 elementos são: conhecimento, limitação, métrica de saída e checklist de avanço. Salário não é critério de nível UGP.',
      why:['Conhecimento atual é item 1.','Limitação é item 2.','Métrica é item 3.'],
      reviewAnchor:A.tec,
    }),
    aso({
      id:'niv-6',difficulty:'intermediate',category:'conceito',
      question:'Relacione níveis da UGP com níveis equivalentes do Google mencionados.',
      pairs:[
        { left:'L3 (entry)', right:'Júnior 1-2' },
        { left:'L4 (mid)', right:'Júnior 3 / Pleno 1' },
        { left:'L5 (senior)', right:'Pleno 2-3' },
        { left:'L6 (staff)', right:'Sênior' },
      ],
      reviewAnchor:'mundo-real',
    }),
    eg({
      id:'niv-7',difficulty:'advanced',category:'aplicacao',
      question:'Você domina Júnior 2 mas quer pular direto para microsserviços (Pleno 3). Por que isso é arriscado?',
      options:[
        'Porque Pleno 3 exige certificações',
        'Porque sem Pleno 1 (separação de camadas), microsserviços viram bagunça distribuída',
        'Porque você precisa de salário maior antes',
        'Porque microsserviços demandam outro idioma',
      ],correct:1,
      explanation:'Pular arquitetura de camadas direto para microsserviços distribui o spaghetti. Você precisa de fundamentos (Pleno 1) antes de particionar.',
      why:['Pleno 3 não exige certificações.','Salário não define nível.','Microsserviços podem ser em qualquer linguagem.'],
      reviewAnchor:A.err,
    }),
    ord({
      id:'niv-8',difficulty:'basic',category:'contexto',
      question:'Ordene os níveis do mais baixo ao mais alto.',
      steps:['Extremo Iniciante','Júnior 1','Júnior 2','Júnior 3','Pleno 1','Pleno 2','Pleno 3','Sênior'],
      reviewAnchor:A.tec,
    }),
  ],

  // ── github ───────────────────────────────────────────────
  github: [
    mc({
      id:'git-1',difficulty:'basic',category:'conceito',
      question:'O que faz do Git um sistema "distribuído" diferente de SVN/CVS?',
      options:[
        'Ter uma interface gráfica',
        'Cada clone é um repositório completo; servidor cair não trava trabalho',
        'Permitir mais de um autor',
        'Ser mais rápido por ser moderno',
      ],correct:1,
      explanation:'Em SVN/CVS centralizados, servidor cair = ninguém trabalha. Em Git, todo clone tem histórico completo e você commita offline.',
      why:['Não é sobre UI.','Autores sempre foram possíveis.','Velocidade é consequência, não definidora.'],
      reviewAnchor:'antes-do-git-ate-2005',
    }),
    mc({
      id:'git-2',difficulty:'intermediate',category:'conceito',
      question:'O que é um "branch" em Git?',
      options:[
        'Uma cópia física de todos os arquivos',
        'Um ponteiro para um commit',
        'Um commit especial no trunk',
        'Um servidor remoto separado',
      ],correct:1,
      explanation:'Branch é um label apontando para um commit. Criar branch é barato porque não copia arquivos — apenas marca nova posição na cadeia.',
      why:['Em SVN branches copiam arquivos; em Git não.','Erro descrito no módulo.','Não é commit.','Não é servidor remoto.'],
      reviewAnchor:'o-que-e-um-branch',
    }),
    ord({
      id:'git-3',difficulty:'intermediate',category:'aplicacao',
      question:'Ordene os 3 estados do Git (do "modificado" ao "salvo no histórico").',
      steps:['Working Directory (modified)','Staging Area (staged)','Repository (committed)'],
      reviewAnchor:'os-3-estados-do-git',
    }),
    sc({
      id:'git-4',difficulty:'intermediate',category:'aplicacao',
      scenario:'Você commitou na `main` direto, sem branch, e ainda NÃO pushou.',
      question:'Como mover o commit para uma branch feat/x e limpar a main?',
      options:[
        'git push --force na main',
        'git checkout -b feat/x; git checkout main; git reset --hard HEAD~1; git checkout feat/x',
        'git rm -rf .git e clonar de novo',
        'Fazer commit novamente na feat/x copiando o código',
      ],correct:1,
      explanation:'Criar branch a partir daqui preserva o commit; reset --hard na main volta 1 commit (não pushado, então ainda é seguro); voltar para feat/x.',
      why:['--force sobrescreve remoto, não resolve problema local.','Apagar .git perde histórico inteiro.','Duplica o commit e suja histórico.'],
      reviewAnchor:'cenario-voce-commitou-no-lugar-errado',
    }),
    tf({
      id:'git-5',difficulty:'basic',category:'conceito',
      question:'"wip" é uma boa mensagem de commit porque sinaliza trabalho em andamento.',
      correct:false,
      explanation:'"wip" não explica o que mudou. Use Conventional Commits: feat, fix, docs, refactor, test, chore.',
      why:[],reviewAnchor:'1-commitam-wip',
    }),
    mc({
      id:'git-6',difficulty:'advanced',category:'seguranca',
      question:'Você commitou .env com API_KEY=x. O que fazer?',
      options:[
        'Apagar o commit no histórico resolve',
        'Histórico Git é permanente — deve rotacionar a chave imediatamente e adicionar .env ao .gitignore',
        'Só esconder no próximo push',
        'Mandar mensagem no Discord pedindo desculpas',
      ],correct:1,
      explanation:'Mesmo que você apague, histórico Git é permanente. Chave vazou → girar chave. Adicionar .gitignore evita futuro incidente.',
      why:['Apagar não remove do histórico.','Esconder só adia.','Discord não resolve incidente de segurança.'],
      reviewAnchor:'1-nao-commitam-segredos',
    }),
    mc({
      id:'git-7',difficulty:'intermediate',category:'decisao',
      question:'Por que branches devem ser curtos (1-3 dias)?',
      options:[
        'Para praticar git checkout',
        'Branches longos acumulam muitos conflitos; curtos são fáceis de integrar',
        'Porque o GitHub cobra por branch',
        'Para evitar fazer muitos commits',
      ],correct:1,
      explanation:'Quanto mais tempo um branch divergir, mais divergência com a main. Curto = poucos conflitos = integração fluida.',
      why:['Não é prática didática.','Não há custo por branch.','Commits não são o problema.'],
      reviewAnchor:'por-que-branches-pequenos',
    }),
    eg({
      id:'git-8',difficulty:'advanced',category:'decisao',
      question:'Você tem um branch já pushado compartilhado com Ana. Quer "limpar commits" com rebase. O que é seguro?',
      options:[
        'Rebase + git push --force no branch compartilhado',
        'Rebase apenas no seu próprio branch não merged (resgraçado, force --force-with-lease)',
        'Não rebasar nunca sob nenhuma circunstância',
        'Rebase localmente sem fazer push após',
      ],correct:1,
      explanation:'Rebase no próprio branch não merged com --force-with-lease (que falha se alguém mexeu) é seguro. Em branch compartilhado, rebase sobrescreve trabalho de Ana.',
      why:['--force no compartilhado apaga trabalho dos outros.','"Nunca rebasar" é fanatismo; rebase em branch próprio é OK.','Rebase sem push mantém diferença com remoto — você perde a integração.'],
      reviewAnchor:'1-rebase-sem-entiender',
    }),
  ],

  // ── docs-as-code ─────────────────────────────────────────
  'docs-as-code': [
    mc({
      id:'doc-1',difficulty:'basic',category:'conceito',
      question:'O que é "Docs as Code"?',
      options:['Uma ferramenta de doc','Uma postura: tratar doc como código (versionada, revisada em PR)','Um sistema de tickets','Um padrão de API'],
      correct:1,
      explanation:'Não é ferramenta — é postura. ADRs, RFCs e READMEs vivem em markdown, no Git, com revisão e diff rastreável.',
      why:['Não é ferramenta.','Não é ticket.','Não é padrão de API.'],
      reviewAnchor:A.intro,
    }),
    mc({
      id:'doc-2',difficulty:'intermediate',category:'contexto',
      question:'Por que Markdown vence Word e HTML para docs técnicas?',
      options:[
        'Por ter mais recursos que HTML',
        'Leitura sem ferramenta, diff limpo, portátil, sem lock-in proprietário',
        'Porque é mais curto que Word',
        'Porque o Word foi descontinuado',
      ],correct:1,
      explanation:'Markdown é texto puro com convenções mínimas: abre em notepad, diff é legível, portátil entre GitHub/Notion/VS Code, sem dependência de software proprietário.',
      why:['Markdown tem MENOS recursos que HTML, mas é mais leve.','Não é sobre tamanho.','Word não foi descontinuado.'],
      reviewAnchor:A.tec,
    }),
    sc({
      id:'doc-3',difficulty:'intermediate',category:'aplicacao',
      scenario:'Um PR alterou a forma de login mas não atualizou docs/api/auth.md.',
      question:'Como revisor, o que você faz?',
      options:[
        'Aprovar — código está OK',
        'Bloquear — mudar código sem atualizar doc é bug',
        'Comentar "obrigado"',
        'Atualizar você mesmo num commit paralelo',
      ],correct:1,
      explanation:'Regra de ouro do Docs as Code: mudar código sem atualizar doc é bug. Doc desatualizada é pior que nenhuma.',
      why:['Aprovar viola regra.','Agradecer não resolve.','Edit paralelo não atualiza a PR — foge da revisão.'],
      reviewAnchor:'mudancas-doc-and-code-juntas',
    }),
    ord({
      id:'doc-4',difficulty:'basic',category:'aplicacao',
      question:'Ordene as seções de um ADR bem formado.',
      steps:['Contexto','Decisão','Consequências','Status'],
      reviewAnchor:'adr-architecture-decision-record',
    }),
    tf({
      id:'doc-5',difficulty:'intermediate',category:'interpretacao',
      question:'Notas de reunião em docs.md são ADRs válidos porque documentam discussões.',
      correct:false,
      explanation:'ADRs são decisões TOMADAS, não discussões. Notas de reunião viram lixo porque não têm estrutura de decisão/consequências.',
      why:[],reviewAnchor:'2-confundem-documentacao-com-memoria-de-reuniao',
    }),
    mc({
      id:'doc-6',difficulty:'advanced',category:'aplicacao',
      question:'Quando markdown estático (no Git) deixa de fazer sentido?',
      options:[
        'Quando o conteúdo é gerado por usuários (preços, estoque, user-generated)',
        'Quando há mais de 50 páginas de doc',
        'Quando o time crescer além de 5 devs',
        'Nunca — Git resolve tudo',
      ],correct:0,
      explanation:'Para conteúdo dinâmico (preços, feed de Instagram, conteúdo user-generated), markdown estático não serve — precisa do banco/CMS.',
      why:['Tamanho do doc não define decisão.','Tamanho do time não é critério.','Dogma "Git resolve tudo" é erro.'],
      reviewAnchor:A.tec,
    }),
    aso({
      id:'doc-7',difficulty:'intermediate',category:'conceito',
      question:'Relacione cada doc ao seu propósito.',
      pairs:[
        { left:'README.md', right:'Primeira porta de entrada' },
        { left:'ADR', right:'Memória de decisão arquitetural' },
        { left:'Runbook', right:'Playbook de incidente' },
        { left:'CONTRIBUTING.md', right:'Workflow de PR' },
      ],reviewAnchor:'onde-cada-tipo-de-doc-vive',
    }),
    eg({
      id:'doc-8',difficulty:'advanced',category:'decisao',
      question:'Por que exigir ADR em PRs cedo demais pode ser um erro?',
      options:['ADRs são sempre opcionais','A cobrança retardada gera backlog enorme de migração','Porque ADR é burocracia','Porque novos devs não devem ler ADRs'],
      correct:1,
      explanation:'Exigir doc/ADR só quando o time já está grande cria dívida. Comece exigindo pequeno e cresça — ADRs devem vir organicamente.',
      why:['A optionally negligencia valor.','"Burocracia" descarta o uso sem critério.','Novos devs PRECISAM de ADRs para contexto.'],
      reviewAnchor:'1-nao-exigem-doc-em-prs-cego-demais',
    }),
  ],

  // ── arquitetura-software ─────────────────────────────────
  'arquitetura-software': [
    mc({
      id:'as-1',difficulty:'basic',category:'conceito',
      question:'O que é arquitetura de software, em essência?',
      options:['Escolher frameworks modernos','Decidir o que não fazer — todo decisão é trade-off','Definir tipo de banco','Reduzir o número de commits'],
      correct:1,
      explanation:'Arquitetura não é sobre stacks — é sobre decidir com trade-offs explícitos. Não há "melhor"; há "melhor para seu problema com custo aceitável".',
      why:['Frameworks são ferramenta, não arquitetura.','Tipo de banco é decisão arquitetural, não a definição.','Commits não são arquitetura.'],
      reviewAnchor:A.intro,
    }),
    mc({
      id:'as-2',difficulty:'intermediate',category:'decisao',
      question:'Quando você NÃO deveria usar microsserviços?',
      options:[
        'Quando há times grandes pisando uns nos outros',
        'Quando o app tem 100 usuários sem requisito de escala radical por serviço',
        'Quando se precisa escalar serviços independentemente',
        'Quando há domínios críticos distintos',
      ],correct:1,
      explanation:'Microsserviço traz custo de infra, observabilidade e rede. Para 100 usuários, monólito modular resolve — over-architecting é o erro.',
      why:['Afirmar o contrário é o critério PARA usar.','Idem.','Idem.'],
      reviewAnchor:'4-microsservicos',
    }),
    aso({
      id:'as-3',difficulty:'intermediate',category:'conceito',
      question:'Relacione padrão arquitetural a sua ideia-chave.',
      pairs:[
        { left:'Monólito Modular', right:'Um deploy, módulos bem separados' },
        { left:'Hexagonal', right:'Domínio isolado por Ports & Adapters' },
        { left:'Microsserviços', right:'Deploy/banco independentes p/ serviço' },
        { left:'Event-Driven', right:'Serviços pub/sub, consistência eventual' },
      ],
      reviewAnchor:A.tec,
    }),
    sc({
      id:'as-4',difficulty:'advanced',category:'aplicacao',
      scenario:'Helpdesk SaaS, 400 empresas, 1-50 usuários cada, 5 devs.',
      question:'Qual arquitetura é mais defensável?',
      options:[
        'Poliglota microsserviços + Kafka + Kubernetes',
        'Monólito modular em Next.js + Prisma + Postgres single',
        'Servidorless com 12 funções isoladas',
        'Monódicos "big ball of mud" por enquanto',
      ],correct:1,
      explanation:'Time pequeno, escala moderada — monólito modular resolve com custo baixo, deploy fácil e clareza modular. Microsserviços = over-engineering.',
      why:['Kafka/K8s seria over-architecting para 5 devs.','Serverless com 12 funções infla complexidade.','"Big ball of mud" é anti-arquitetura.'],
      reviewAnchor:'sistema-1-helpdesk-saas-pequeno',
    }),
    mc({
      id:'as-5',difficulty:'basic',category:'conceito',
      question:'Qual NÃO é um dos 5 princípios universais citados?',
      options:['Separação de Responsabilidades','YAGNI','Coesão alta, acoplamento baixo','Microservices obrigatórios'],
      correct:3,
      explanation:'Os 5 são SoC, coesão/acoplamento, YAGNI, KISS e trade-offs explícitos. Microservices NÃO é obrigatório — é uma opção para contextos específicos.',
      why:['SoC é princípio 1.','Coesão/acoplamento é 2.','YAGNI é 3.'],
      reviewAnchor:'principios-universais',
    }),
    tf({
      id:'as-6',difficulty:'intermediate',category:'interpretacao',
      question:'"Eu uso React, então minha arquitetura é React" é uma afirmação correta.',
      correct:false,
      explanation:'Erro de iniciante: framework é ferramenta. Arquitetura é COMO você organiza, não o quê você usa.',
      why:[],reviewAnchor:'1-confundem-arquitetura-com-framework',
    }),
    eg({
      id:'as-7',difficulty:'advanced',category:'decisao',
      question:'Você herdou um monólito modular com 100 usuários e quer extrair microsserviços. Qual é a melhor ordem de decisão?',
      options:[
        'Extrair tudo de uma vez por domínio',
        'Medir necessidade de deploy independente por módulo e extrair um por vez quando justificar',
        'Migrar tudo para Kafka primeiro',
        'Adotar service mesh primeiro, depois pensar em extração',
      ],correct:1,
      explanation:'A descida modular: quando módulos pedem deploy independente, extrair um por vez, com cuidado. Migrar tudo de uma vez = risco alto.',
      why:['Tudo de uma vez = caos.','Kafka vem depois, se justificar.','Service mesh antes da extração é inverter a ordem.'],
      reviewAnchor:'como-escalar',
    }),
    ord({
      id:'as-8',difficulty:'intermediate',category:'aplicacao',
      question:'Ordene as camadas clássicas (Presentation → ...)',
      steps:['Presentation (UI)','Application (use cases)','Domain (regras)','Infrastructure (DB, APIs)'],
      reviewAnchor:'2-camadas-layered-architecture',
    }),
  ],

  // ── tdd ──────────────────────────────────────────────────
  tdd: [
    mc({
      id:'tdd-1',difficulty:'basic',category:'conceito',
      question:'Qual é a sequência clássica do ciclo TDD?',
      options:['Green → Red → Refactor','Red → Green → Refactor','Refactor → Red → Green','Red → Refactor → Green'],
      correct:1,
      explanation:'Red (teste falha), Green (implementa o mínimo), Refactor (melhora sem mudar comportamento).',
      why:['Outras estão fora de ordem definida pelo módulo.'],
      reviewAnchor:A.intro,
    }),
    tf({
      id:'tdd-2',difficulty:'basic',category:'conceito',
      question:'Em TDD,寓 Green você implementa o máximo possível de features para economizar iterações.',
      correct:false,
      explanation:'No Green, você implementa o MÍNIMO necessário para passar. YAGNI — não antecipe features.',
      why:[],reviewAnchor:'2-green-implementar-o-minimo',
    }),
    mc({
      id:'tdd-3',difficulty:'intermediate',category:'decisao',
      question:'Qual é a pirâmide de testes ideal segundo o módulo?',
      options:[
        '70% E2E / 20% integration / 10% unit',
        '70% unit / 20% integration / 10% E2E',
        '50% cada',
        '100% unit — E2E é desperdício',
      ],correct:1,
      explanation:'Unit é rápido e específico (muitos), integration no meio, E2E poucos no topo (lentos e frágeis).',
      why:['Inverter é caro e frágil.','50% não reflete pirâmide.','E2E valida integração que unit não cobre.'],
      reviewAnchor:'piramide',
    }),
    sc({
      id:'tdd-4',difficulty:'intermediate',category:'aplicacao',
      scenario:'Você vai implementar `aplicarDesconto(preco, pct)`. Cupom inválido deve lançar erro.',
      question:'Antes do código, qual teste você escreve TDD?',
      options:[
        'test("desconto funciona") e deixa a estrutura interna pronta',
        'test("cupom UGP10 aplica 10%") e test("cupom inválido lança erro")',
        'Apenas um teste happy path',
        'Apenas um teste de erro',
      ],correct:1,
      explanation:'TDD descreve comportamento: happy path + edge case (cupom inválido). Cada teste valida UMA coisa.',
      why:['Implementar "estrutura interna" anti-TDD — testa impl, não behavior.','Só happy path abandona edge case.','Só erro abandona caminho certo.'],
      reviewAnchor:'exemplo-1-implementar-carrinho-com-tdd',
    }),
    mc({
      id:'tdd-5',difficulty:'advanced',category:'aplicacao',
      question:'Quando TDD é perda de tempo e o módulo admite isso?',
      options:[
        'Em todo bugfix',
        'Em UI experimental (você ainda não sabe o comportamento exato) e em spikes descartáveis',
        'Em refactors grandes',
        'Em toda feature nova',
      ],correct:1,
      explanation:'Limites do TDD: UI experimental (não sabe o que quer), spikes descartáveis, exploração de API externa instável.',
      why:['Bugfix = primeiro teste que reproduz, depois fix.','Refactors grandes usam testes para preservar behavior.','Feature nova é onde TDD mais brilha.'],
      reviewAnchor:'limites-do-tdd',
    }),
    aso({
      id:'tdd-6',difficulty:'intermediate',category:'conceito',
      question:'Relacione técnica ao seu mecanismo.',
      pairs:[
        { left:'Mock', right:'Substitui função por retorno fixo' },
        { left:'Stub', right:'Mock + asserção de chamada' },
        { left:'AAA', right:'Arrange/Act/Assert' },
        { left:'Snapshot', right:'Comparar saída com baseline (cuidado)' },
      ],
      reviewAnchor:'mock-e-stub',
    }),
    eg({
      id:'tdd-7',difficulty:'advanced',category:'raciocinio',
      question:'Por que 100% cobertura não garante qualidade?',
      options:[
        'Porque cobertura mede linhas executadas, não comportamentos testados — getters triviais sobem a métrica',
        'Porque não existe métrica melhor',
        'Porque cobertura gera bugs',
        'Porque só E2E deve contar',
      ],correct:0,
      explanation:'A métrica de cobertura mede linhas executadas. 100% com testes vazios tem valor zero. 80% com testes significativos é preferível.',
      why:['Existem: behavioral coverage, mutation testing.','Cobertura não "gera" bugs — ela apenas não os previene.','E2E é só topo da pirâmide.'],
      reviewAnchor:'1-buscam-100-cobertura-a-custa-de-qualidade',
    }),
    ord({
      id:'tdd-8',difficulty:'basic',category:'aplicacao',
      question:'Ordene o ciclo TDD a partir de "escrever comportamento desejado".',
      steps:[
        'Escrever teste que descreve o comportamento esperado',
        'Rodar teste — falha (Red)',
        'Implementar o mínimo para passar (Green)',
        'Refatorar sem mudar comportamento (Refactor)',
      ],reviewAnchor:'os-3-estagios-do-ciclo-tdd',
    }),
  ],

  // ── fullstack ────────────────────────────────────────────
  fullstack: [
    mc({
      id:'fs-1',difficulty:'basic',category:'conceito',
      question:'O que "fullstack moderno" significa?',
      options:[
        'Saber tudo em profundidade',
        'Ter fluência suficiente em cada camada para tomar decisões',
        'Dominar 50 tecnologias',
        'Apenas frontend + BaaS',
      ],correct:1,
      explanation:'Fullstack não é "tudo". É "o suficiente de tudo para ler qualquer parte, identificar problemas e decidir com consciência.',
      why:['Tudo é impossível.','50 tecnologias = superficial.','Apenas frontend não cobre decisões backend.'],
      reviewAnchor:A.intro,
    }),
    aso({
      id:'fs-2',difficulty:'intermediate',category:'conceito',
      question:'Relacione a peça do stack ao seu papel.',
      pairs:[
        { left:'Frontend', right:'React + Tailwind (UI)' },
        { left:'Backend (Next)', right:'Server Components + Server Actions' },
        { left:'Database', right:'Postgres com RLS' },
        { left:'Deploy', right:'Vercel (push → CDN)' },
      ],
      reviewAnchor:A.tec,
    }),
    sc({
      id:'fs-3',difficulty:'intermediate',category:'aplicacao',
      scenario:'Você instalou uma lib de DOM dentro de um Server Component e o build quebra.',
      question:'Qual é o diagnóstico provável?',
      options:[
        'A lib é incompatível com React 19',
        'Você importou código client-only em um servidor — deve marcar `use client` ou mover para um componente client',
        'O Supabase está offline',
        'Falta de cache no Postgres',
      ],correct:1,
      explanation:'Regra: sem `use client`, roda no servidor. Instalar libs de DOM no servidor quebra — ou mover para client, ou isolar.',
      why:['Lib não é incompatível por default.','Supabase offline não quebra build.','Cache é irrelevante aqui.'],
      reviewAnchor:'2-nao-entendem-onde-codigo-roda',
    }),
    tf({
      id:'fs-4',difficulty:'basic',category:'conceito',
      question:'No Supabase com RLS ativo, o DB pode defender regras de acesso sem o frontend saber.',
      correct:true,
      explanation:'RLS valida no Postgres — mesmo se hackear o frontend, o banco não entrega dados de outro usuário.',
      why:[],reviewAnchor:A.tec,
    }),
    mc({
      id:'fs-5',difficulty:'intermediate',category:'decisao',
      question:'Você modela schema sem tenant_id no MVP monousuário. Depois SaaS cresce. O que acontece?',
      options:[
        'Refatorar é trivial',
        'Refatorar é caro — modelo com tenant_id desde o início mesmo com 1 tenant,Como boa prática',
        'Não importa — SaaS monousuário não cresce',
        'Basta adicionar um migration simples',
      ],correct:1,
      explanation:'Adicionar tenant_id depois permeia todas as tabelas e queries. Modelar desde custo zero e evita dívida cara.',
      why:['Refatorar é caro.','Negar crescimento é apostar no pior.','Migration simples não cobre queries existentes.'],
      reviewAnchor:'1-nao-pensam-em-multi-tenant-desde-inicio',
    }),
    ord({
      id:'fs-6',difficulty:'intermediate',category:'aplicacao',
      question:'Ordene a escolha de stack por etapa do produto.',
      steps:[
        'Protótipo: Vite + localStorage',
        'MVP: Next.js + Supabase (Auth + DB)',
        'Crescimento: módulos claros + CI',
        'Escala: extrair microsserviços quando necessário',
      ],
      reviewAnchor:'padrao-escolher-por-etapa',
    }),
    eg({
      id:'fs-7',difficulty:'advanced',category:'decisao',
      question:'Você herda um stack novato (100 usuários) com Redis + Kafka. O que corta primeiro?',
      options:['Postgres','Redis (se nada mede necessidade)','Next.js','Tailwind'],
      correct:1,
      explanation:'Redis sem medida que justifique = YAGNI. Postgres tem cache de queries — Redis provavelmente nunca foi hit. Manter apenas infra medida.',
      why:['Postgres é o núcleo.','Cortar Next/Tailwind é destruir o app.'],
      reviewAnchor:'1-adicionam-redis-kafka-etc-sem-necessitar',
    }),
    mc({
      id:'fs-8',difficulty:'basic',category:'conceito',
      question:'Qual a diferença entre variável server e NEXT_PUBLIC_* ?',
      options:[
        'Server var é visível no client; NEXT_PUBLIC_* não',
        'Server var só no servidor; NEXT_PUBLIC_* exposta ao client também',
        'Não há diferença — ambas server-only',
        'NEXT_PUBLIC_* é o novo padrão; server var é legacy',
      ],correct:1,
      explanation:'Sem prefixo, variável só é visível no servidor. NEXT_PUBLIC_* é bundlada e enviada ao client — nunca exponha secrets.',
      why:['Inverte.','Há diferença fundamental.','Não há novidade/legado aqui.'],
      reviewAnchor:'como-fazer',
    }),
  ],

  // ── portfolio ───────────────────────────────────────────
  portfolio: [
    mc({
      id:'por-1',difficulty:'basic',category:'conceito',
      question:'Por que o portfólio é mais honesto que CV ou LinkedIn?',
      options:['Porque pode ser mais bonito ','Porque código é evidência — está lá, julgável','Porque não há mentira possível','Porque ninguém vê'],
      correct:1,
      explanation:'CV mente, LinkedIn exagera (auto-declarativo). Portfólio não mente: README, commits, issues e PRs estão acessíveis e julgáveis.',
      why:['Beleza não é critério de honestidade.','Mentira é sempre possível — mas portfólio é checável.','Ninguém vê = ninguém te contrata.'],
      reviewAnchor:A.intro,
    }),
    sc({
      id:'por-2',difficulty:'intermediate',category:'aplicacao',
      scenario:'Você tem 20 repositórios medianos em clone de tutorial.',
      question:'Quais 5 destacar no portfólio?',
      options:[
        'Os 5 mais difíceis tecnicamente',
        '3-5 com produção URL ativa, README com decisões + aprendizados, commits recentes e diferenciação do tutorial',
        'Os 5 primeiro cronologicamente',
        'Todos os 20 — quantidade mostra produtividade',
      ],correct:1,
      explanation:'3-5 > 10 medianos. Critérios: produção ativa, README com decisões, último commit < 6 meses, USART diferenciação do tutorial.',
      why:['Dificuldade técnica não basta — precisa contexto.','Primeiros cronologicamente são geralmente mais fracos.','Quantidade ofuscará qualidade.'],
      reviewAnchor:'quantoe-projetos',
    }),
    tf({
      id:'por-3',difficulty:'basic',category:'conceito',
      question:'README do portfólio sem prints e sem "o que aprendi" é aceitável.',
      correct:false,
      explanation:'README de código diz só "como rodar". README de portfólio precisa: objetivo, stack, prints, decisões, desafios, aprendizados.',
      why:[],reviewAnchor:'2-readme-rodando-npm-install-npm-run-dev',
    }),
    mc({
      id:'por-4',difficulty:'intermediate',category:'decisao',
      question:'Bootcamp acabou, projeto final bonito, abandonado há 2 anos. O que fazer?',
      options:[
        'Manter como destaque — já está pronto',
        'Marcar "arquivado" no GitHub e atualizar pelo menos 2 projetos ativos',
        'Apagar — histórico não vale',
        'Renomear para parecer novo',
      ],correct:1,
      explanation:'Projeto outdateado em React 16/19 quebra build. Mantenha 2 atualizados. Marcacomo arquivado preserva histórico sem iludir',
      why:['Manter engana recrutador.','Apagar perde histórico.','Renomear é desonesto.'],
      reviewAnchor:'2-projeto-final-sem-manutencao',
    }),
    ord({
      id:'por-5',difficulty:'basic',category:'aplicacao',
      question:'Ordene as 4 peças essenciais do portfólio.',
      steps:['GitHub com código limpo','Site próprio com 3-5 projetos','LinkedIn atualizado','Story de cada projeto'],
      reviewAnchor:'4-pecas-essenciais',
    }),
    mc({
      id:'por-6',difficulty:'advanced',category:'raciocinio',
      question:'Sênior sem portfólio porque "código é da empresa". O que recomendar?',
      options:['Tudo bem — senioridade dispensa portfólio','Construir side projects que showcase skills; senior sem portfólio parece júnior mitado','Pedir release de código','Esconder senioridade no LinkedIn'],
      correct:1,
      explanation:'Sênior sem portfólio é "mitado". Side projects com ADR + diagrama C4 provam senioridade. ADRs прозрачно sobre ORange.',
      why:['"Dispensa" é desculpa.','Release de código da empresa é ético risco.','Esconder no LinkedIn reforça o problema.'],
      reviewAnchor:'1-escondem-trabalho',
    }),
    sc({
      id:'por-7',difficulty:'intermediate',category:'aplicacao',
      scenario:'Recrutador tem 30 segundos para avaliar seu portfólio.',
      question:'O que dever aparecer acima da dobra?',
      options:['Todos os projetos','','3 projetos com thumbnail, link produção e 1 linha do problema'],
      correct:2,
      explanation:'Recrutador vê os 3 primeiros e decide. Thumbnail + produção URL + 1 linha por projeto > lista exaustiva.',
      why:['Listar todos dilui atenção.','Vazio não é resposta.','2 projetos pode parecer pouco.'],
      reviewAnchor:'quantoe-projetos',
    }),
    mc({
      id:'por-8',difficulty:'basic',category:'conceito',
      question:'Quais são as 3 peças obrigatórias em cada projeto do portfólio (além do código)?',
      options:['Open-source badge, license, codeowners','Nome específico, URL produção, README com problema/stack/decisões/aprendizados','Só LICENSE e .gitignore','Vídeo demo, GIF e PDF'],
      correct:1,
      explanation:'Nome específico + produção URL + README completo (problema, stack, decisões, prints, aprendizados) é o tripé crítico.',
      why:['Badges/codeowners são metadados, não apresentação.','LICENSE/.gitignore são necessários mas não vendem.','Vídeo/PDF são complementos, não essenciais.'],
      reviewAnchor:'o-que-destacar-em-cada-projeto',
    }),
  ],

  // ── primeira-vaga ───────────────────────────────────────
  'primeira-vaga': [
    mc({
      id:'pv-1',difficulty:'basic',category:'conceito',
      question:'Conseguir a 1ª vaga é principalmente…',
      options:['Um problema de skill só','Um problema de mercado — skill é necessário mas não suficiente','Sobre sorte','Sobre ter diploma'],
      correct:1,
      explanation:'Skill é necessário, mas o que diferencia é posicionamento. Tem gente com skill média contratada em 3 meses e skill forte sem vaga por anos.',
      why:['Só skill é insuficiente — e o módulo enfatiza.','Sorte existe mas não é o motor.','Diploma não é mais pré-requisito geral.'],
      reviewAnchor:A.intro,
    }),
    mc({
      id:'pv-2',difficulty:'intermediate',category:'aplicacao',
      question:'Aplicações diretas têm ~1% conversão; referrals têm...',
      options:['~0.1%','~10-20%','~50%','~100%'],
      correct:1,
      explanation:'Referrals superam aplicações massivas. Por isso o módulo recomenda 80% das aplicações via referrals, 20% reaching.',
      why:['Inferior a aplicações não faria sentido.','Não é garantido.','"100%" não existe.'],
      reviewAnchor:'1-aplicacoes-volume-qualidade',
    }),
    sc({
      id:'pv-3',difficulty:'intermediate',category:'aplicacao',
      scenario:'Você recebeu um "não" após entrevista técnica e ninguém dá feedback.',
      question:'O que fazer?',
      options:['Aplicar mais 50 vagas','Solicitar feedback (80% não respondem, 20% respondem útil), anotar e continuar','Desistir da área','Aplicar só com mesmo CV à mesma empresa'],
      correct:1,
      explanation:'Tratar "não" como informação. Solicitar feedback; 20% útil justifica esforço. Ajustar para a próxima entrevista.',
      why:['Spam de 50 vagas não é estratégedy.','Desistir é exagero.','Mesmo CV mostra sem reflexão.'],
      reviewAnchor:'3-nao-tratar-o-nao-como-informacao',
    }),
    ord({
      id:'pv-4',difficulty:'intermediate',category:'aplicacao',
      question:'Ordene as etapas de uma entrevista técnica comum.',
      steps:['Initial recruiter call','Technical screen (live coding)','Take-home','Culture fit (no tech)','Tech deep (sênior)'],
      reviewAnchor:'5-entrevistas',
    }),
    tf({
      id:'pv-5',difficulty:'basic',category:'conceito',
      question:'Aplicar a 100 vagas com o mesmo CV é mais eficaz que 5-10 bem personalizadas por semana.',
      correct:false,
      explanation:'CV único = spam de recruiter. Personalize pelo menos cidade + stack. 5-10 bem feitas vencem 100 anônimas.',
      why:[],reviewAnchor:'1-aplicar-a-100-vagas-com-mesmo-cv',
    }),
    mc({
      id:'pv-6',difficulty:'advanced',category:'decisao',
      question:'Você está há 6 meses sem vaga. Qual variável provavelmente é o problema não-estrutural mais provável?',
      options:['Sua idade','Falta de sort that placements lack','CV / LinkedIn / portfólio / entrevistas — alguma dessas 4 auditáveis está fraca','Mercado fechou para todos'],
      correct:2,
      explanation:'6+ meses sem vaga com boa atividade = problema estrutural em uma das 4 variáveis auditáveis. Refatore todas.',
      why:['Idade não é variável decisiva.','Sorte existe, mas não é isso.','Mercado não está totalmente fechado para juniors.'],
      reviewAnchor:'como-escalar',
    }),
    aso({
      id:'pv-7',difficulty:'intermediate',category:'aplicacao',
      question:'Relacione cada entrevista ao seu foco.',
      pairs:[
        { left:'Initial recruiter', right:'Básicos, salário, inglês' },
        { left:'Technical screen', right:'Live coding, calm sob pressão' },
        { left:'Take-home', right:'Projeto com testes/README/ADR/deploy' },
        { left:'Culture fit', right:'Comportamental, situações' },
      ],reviewAnchor:'5-entrevistas',
    }),
    eg({
      id:'pv-8',difficulty:'advanced',category:'aplicacao',
      question:'Recrutador pergunta "Por que usou Supabase?". O que falta na sua resposta?',
      options:[
        'Citar o nome do tutorial que recomendou',
        'Apresentar 3 trade-offs (prós/contras) com contexto do seu projeto',
        'Dizer "porque é o melhor"',
        'Citar salário do Supabase',
      ],correct:1,
      explanation:'Defender decisões técnicas = senioridade. 3 trade-offs explícitos (acoplamento, facilidade de auth, custo) são sinais de engenheiro.',
      why:['Tutorial não justifica.','"Melhor" sem contexto é vazio.','Salário é irrelevante.'],
      reviewAnchor:'5-tech-deep',
    }),
  ],

  // ── livros ───────────────────────────────────────────────
  livros: [
    mc({
      id:'liv-1',difficulty:'basic',category:'conceito',
      question:'Por que livros ainda importam em software, segundo o módulo?',
      options:['Porque frameworks mudam rápido o torna o livro antigo','Porque tutoriais ajudam a FAZER; livros ajudam a PENSAR','Porque livros são mais baratos','Porque todos os devs têm biblioteca'],
      correct:1,
      explanation:'Frameworks mudam (React nasceu 2013). Conhecimento que PERMANECE é como pensar, decidir e julgar trade-offs — só em livros.',
      why:['Ser antigo não justifica.','Custo não é critério.','Nem todos têm biblioteca.'],
      reviewAnchor:A.intro,
    }),
    aso({
      id:'liv-2',difficulty:'intermediate',category:'conceito',
      question:'Relacione cada livro ao seu nível recomendado.',
      pairs:[
        { left:'Clean Code', right:'Júnior 2-3' },
        { left:'Pragmatic Programmer', right:'Júnior 3 / Pleno 1' },
        { left:'Refactoring', right:'Pleno 1' },
        { left:'DDIA', right:'Pleno 2-3' },
        { left:'DDD', right:'Pleno 2/3, Sênior' },
      ],reviewAnchor:A.tec,
    }),
    sc({
      id:'liv-3',difficulty:'intermediate',category:'aplicacao',
      scenario:'Você lê Clean Code e descobre uma função sua de 80 linhas que faz três coisas.',
      question:'Como aplicar o livro (passo-a-passo do módulo)?',
      options:[
        'Jogar fora e reescrever do zero',
        'Identificar 1 padrão contraditório, refatorar 1 função com o livro ao lado, aplicar se gostou, documentar se não gostou',
        'Copiar os exemplos do livro literalmente',
        'Marcar capítulo para depois — vagamente',
      ],correct:1,
      explanation:'Aplicar padrões do livro de forma incremental. Se não gostar, explique POR QUÊ em ADR/README — não pode ser "não gosto" sem argumento.',
      why:['Jogar fora ignora incrementalismo.','Copiar é receita, não aplicação.','Marcar vague é procrastinar.'],
      reviewAnchor:'como-aplicar-um-livro-passo-a-passo',
    }),
    tf({
      id:'liv-4',difficulty:'basic',category:'conceito',
      question:'"Li" é prova suficiente de aprendizado em livro técnico.',
      correct:false,
      explanation:'"Li" é nível raso. "Apliquei" é prova. Para cada livro: liste 3 conceitos, 1 caso onde aplica, 1 onde NÃO.',
      why:[],reviewAnchor:'como-testar',
    }),
    mc({
      id:'liv-5',difficulty:'intermediate',category:'decisao',
      question:'Quem pula para DDD sem ler Clean Code primeiro erra como?',
      options:['Por ordem cronológica de publicação','Por base — DDD pressupõe clareza de código que Clean Code fornece','Por preço','Por DDD ser traduzido para PT depois'],
      correct:1,
      explanation:'"Base primeiro" — DDD é difícil e pressupõe noções de clareza e refatoração. Pular gera "entiende nada".',
      why:['Cronologia não é crítica.','Preço não é critério.','Tradução não é critério.'],
      reviewAnchor:'1-pulam-para-avancado-sem-base',
    }),
    ord({
      id:'liv-6',difficulty:'basic',category:'contexto',
      question:'Ordene os 5 livros essenciais por nível recomendado (do mais baixo ao mais alto).',
      steps:['Clean Code','Pragmatic Programmer','Refactoring','DDIA','DDD'],
      reviewAnchor:A.tec,
    }),
    eg({
      id:'liv-7',difficulty:'advanced',category:'aplicacao',
      question:'Você "cita SOLID" mas seu próprio código não é SOLID. O que o módulo chama disso?',
      options:['Concordância seletiva','Citar mas não viver — livros são espelhos','É apenas gosto pessoal','Vício contraproducente'],
      correct:1,
      explanation:'Erro de sênior: citar mas não viver. Livros são espelhos — se você ensina SOLID, deve praticá-lo.',
      why:['Concordância seletiva é conceito OK mas não o do módulo.','Não é gosto.','Vício não é a categoria certa.'],
      reviewAnchor:'1-citam-mas-nao-vivem',
    }),
    mc({
      id:'liv-8',difficulty:'basic',category:'conceito',
      question:'Cronograma realista para ler livros técnicos?',
      options:['1 livro/mês','1 livro/3 meses a 30min/dia — 8 livros em 2 anos','3 livros por mês','1 livro por ano'],
      correct:1,
      explanation:'Cadência sustentável: 1 livro a cada 3 meses. Em 2 anos, cobre essenciais. Leitura ativa é lenta por natureza.',
      why:['1/mês é insustentável com leitura ativa.','3/mês é superficial.','1/ano é lento demais.'],
      reviewAnchor:'cronograma-realista',
    }),
  ],

  // ── ux ───────────────────────────────────────────────────
  ux: [
    mc({
      id:'ux-1',difficulty:'basic',category:'conceito',
      question:'O que é "affordance" em UX?',
      options:['É o custo de implementar UX','É o que o objeto sugere fazer (botão apertável, link clicável)','É a paleta de cores','É a velocidade da UI'],
      correct:1,
      explanation:'Affordance = dica de uso. Botão parece apertável, link parece clicável. Se não parece o que é, ninguém usa certo.',
      why:['Custo é irrelevante.','Cor é hierarchy, não affordance.','Velocidade é performance.'],
      reviewAnchor:'1-affordance',
    }),
    mc({
      id:'ux-2',difficulty:'intermediate',category:'aplicacao',
      question:'Quanto tempo de loading justifica skeleton (em vez de "Carregando…")?',
      options:['> 5s','> 300ms','> 50ms','Qualquer carregamento'],
      correct:1,
      explanation:'Carregamentos > 300ms devem ter skeleton — não spinner vago. Skeleton com tamanho similar ao resultado real reduz ansiedade.',
      why:['5s é tarde demais, usuário abandona.','50ms é instantâneo, nada de loading.','Carregamento instantâneo não precisa.'],
      reviewAnchor:'2-feedback',
    }),
    aso({
      id:'ux-3',difficulty:'intermediate',category:'conceito',
      question:'Relacione cada estado de UI ao seu significado.',
      pairs:[
        { left:'Empty', right:'Sem dados — sempre com CTA' },
        { left:'Loading', right:'Skeleton/spinner (>300ms)' },
        { left:'Error', right:'Causa + alternativa, não genérico' },
        { left:'Success', right:'Confirmação visual silenciosa' },
      ],reviewAnchor:A.tec,
    }),
    sc({
      id:'ux-4',difficulty:'intermediate',category:'aplicacao',
      scenario:'Lista "Suas notas" retorna sem itens.',
      question:'O que mostrar como empty state?',
      options:['Espaço em branco','"Você ainda não criou notas. [Criar primeira nota]" com call-to-action','Carregando eterno','Erro 404'],
      correct:1,
      explanation:'Silent empty state = usuário perdido. Empty state bom tem texto claro + CTA para ação primária.',
      why:['Branco é o erro #3 de iniciante.','Eterno loading engana.','404 é para página não encontrada.'],
      reviewAnchor:'3-sem-estado-vazio',
    }),
    tf({
      id:'ux-5',difficulty:'basic',category:'conceito',
      question:'"Algo deu errado" é mensagem de erro aceitável em produção.',
      correct:false,
      explanation:'Erro genérico esconde informação. Mostre: o que falhou (login? salvar?) + próxima ação (Tentar novamente / Reentrar).',
      why:[],reviewAnchor:'1-erro-generico-algo-deu-errado',
    }),
    ord({
      id:'ux-6',difficulty:'basic',category:'conceito',
      question:'Ordene os 5 princípios de UX do módulo.',
      steps:['Affordance','Feedback','Hierarquia visual','Consistência','Visibilidade do estado do sistema'],
      reviewAnchor:A.tec,
    }),
    mc({
      id:'ux-7',difficulty:'advanced',category:'decisao',
      question:'Texto cinza claro no fundo cinza escuro com contraste 3:1. O que diz o módulo?',
      options:['Ok, é gosto do designer','WCAG mínimo AA é 4.5:1 — não passa, é erro','Ok se for só em ícone','Ok em dark mode'],
      correct:1,
      explanation:'Contraste AA = 4.5:1 para texto. Abaixo disso, leitores com baixa visão não enxergam. Litigação real existe (checker.webaim.org).',
      why:['Gosto não supera acessibilidade.','Ícone tem requisições também.','Dark mode não isenta.'],
      reviewAnchor:'2-escolhe-cores-sem-contraste',
    }),
    eg({
      id:'ux-8',difficulty:'advanced',category:'raciocinio',
      question:'Você adiciona tooltips em tudo "para o usuário entender". O que isso indica?',
      options:['Boa UX — explica detalhes','Que o design falta clareza — tooltips são máscara para redesign necessário','Prevenção de erro','UX avançada'],
      correct:1,
      explanation:'Tooltips em tudo = falta de clareza visível. O certo é reescrever labels/UI; tooltip deve ser exceção, não solução.',
      why:['Boa UX não precisa explicar tudo.','Não previne erro diretamente.','Avançada é hierarquia clara, não tooltip.'],
      reviewAnchor:'2-juntellers-com-senso-prove-user-know',
    }),
  ],

  // ── ia-aplicada ──────────────────────────────────────────
  'ia-aplicada': [
    mc({
      id:'iaapp-1',difficulty:'basic',category:'conceito',
      question:'O que IA é, no nível prático para devs?',
      options:['Mágica nova','Uma camada extra no stack — prediz, reconhece padrões e gera','A substituição do dev','Um framework de frontend'],
      correct:1,
      explanation:'IA é uma nova camada: LLMs predizem texto, ML clássico reconhece padrões, modelos generativos geram código/imagem. Ferramenta, não mestre.',
      why:['Não é mágica.','Não substitui dev — você mantém a responsabilidade.','Não é frontend.'],
      reviewAnchor:A.intro,
    }),
    aso({
      id:'iaapp-2',difficulty:'intermediate',category:'conceito',
      question:'Relacione cada geração de IA ao seu mecanismo.',
      pairs:[
        { left:'IA clássica', right:'Regras explícitas (se X então Y)' },
        { left:'ML clássico', right:'Algoritmos aprendem com dados' },
        { left:'Deep Learning', right:'Redes profundas, transformers' },
        { left:'LLM', right:'Prediz próximo token, alucina' },
      ],reviewAnchor:A.hist,
    }),
    sc({
      id:'iaapp-3',difficulty:'intermediate',category:'aplicacao',
      scenario:'Tarefa: validar CPF, calcular frete, mostrar endereço.',
      question:'Qual parte IA ajuda?',
      options:['Todas','Calcular frete (fuzzy, depende de CEP/peso/dimensões)','Validar CPF','Mostrar endereço'],
      correct:1,
      explanation:'Tarefas estruturadas (validar CPF, mostrar endereço) → código. Tarefas fuzzy (calcular frete com muitas entradas) IA pode ajudar.',
      why:['Todas é exagero.','Validar CPF é determinístico — código.','Mostrar endereço é lookup.'],
      reviewAnchor:A.intuit,
    }),
    tf({
      id:'iaapp-4',difficulty:'basic',category:'seguranca',
      question:'Para criptografia, você deve gerar com IA e usar em produção.',
      correct:false,
      explanation:'Para cripto, use libs verificadas. IA não conhece regs específicas e pode gerar implementações inseguras silenciosamente.',
      why:[],reviewAnchor:'quando-nao-usar-ia',
    }),
    mc({
      id:'iaapp-5',difficulty:'intermediate',category:'decisao',
      question:'Você pediu "faça uma função para calcular frete" e recebeu implementação errada. Erro seu foi?',
      options:['Confiar cegamente','Não explicou contexto (CEP, peso, dimensões, schema) — contexto é 80% do prompt útil','Usar IA','Pedir em PT'],
      correct:1,
      explanation:'Perguntas vagas levam IA a adivinhar. Especifique dados, schema, restrições e trade-offs — é onde a resposta fica útil.',
      why:['Confiar cegamente é sintoma, não causa.','Usar IA não é erro.','Idioma é irrelevante.'],
      reviewAnchor:'2-nao-explicam-o-contexto',
    }),
    ord({
      id:'iaapp-6',difficulty:'intermediate',category:'contexto',
      question:'Ordene as gerações de IA da mais antiga à mais recente.',
      steps:['IA clássica','ML clássico','Deep Learning','LLM'],
      reviewAnchor:A.hist,
    }),
    eg({
      id:'iaapp-7',difficulty:'advanced',category:'decisao',
      question:'IA gera código "que funciona" para um sistema de pagamento. O que fazer ANTES de commit?',
      options:[
        'Commitar — funcionou',
        'Validar fatos, ler linha por linha, validar regras fiscais com doc oficial, testar edge cases, commitar com co-author transparente',
        'Pedir para IA testar e commitar',
        'Commitar e esperar logs em produção',
      ],correct:1,
      explanation:'Boas práticas: valide tudo. Cripto/fiscal/performance não aceitam "otimizado". Teste você mesmo, commita com transparência.',
      why:['Funcionou ≠ certo em cripto/pagamentos.','IA como sua única QA é erro.','Esperar logs em prod é reativo.'],
      reviewAnchor:'boas-praticas',
    }),
    mc({
      id:'iaapp-8',difficulty:'basic',category:'conceito',
      question:'Qual destes NÃO é um dos tipos de IA aplicada listados no módulo?',
      options:['Completion de código','RAG','Compilador de C','Agentes'],
      correct:2,
      explanation:'Os 5 são: completion de código, chat assistente, geração de testes/docs, RAG e agentes. Compilador de C não é IA.',
      why:['Completion é o 1.','RAG é o 4.','Agentes é o 5.'],
      reviewAnchor:A.tec,
    }),
  ],

  // ── engenharia-prompt ────────────────────────────────────
  'engenharia-prompt': [
    mc({
      id:'ep-1',difficulty:'basic',category:'conceito',
      question:'O que "engenharia de prompt" realmente é?',
      options:['Termo de merchandising sem valor','A qualidade da resposta depende da qualidade da pergunta — estruturar prompts para respostas úteis','Ensinar IA do zero','Decoração de texto'],
      correct:1,
      explanation:'Não é misticismo. Estruturar papel, contexto, tarefa, restrições, formato e trade-offs gera respostas úteis. Aura=Aura.',
      why:['Tem valor real.','Não ensina IA do zero.','Não é decoração.'],
      reviewAnchor:A.intro,
    }),
    ord({
      id:'ep-2',difficulty:'intermediate',category:'aplicacao',
      question:'Ordene a anatomia de um prompt excelente.',
      steps:['Papel','Contexto','Tarefa','Restrições','Formato','Pedido de trade-offs'],
      reviewAnchor:A.tec,
    }),
    sc({
      id:'ep-3',difficulty:'intermediate',category:'aplicacao',
      scenario:'Você pediu "faça um botão" e recebeu algo genérico.',
      question:'Reescreva o prompt com a anatomia correta — qual parte é crucial?',
      options:['Papel + contexto (React 19, Tailwind, shadcn, restrições)','Só "favor"','Só explicar o problema','Maiúsculas'],
      correct:0,
      explanation:'Papel (sênior em Next.js) + contexto (React 19, TS, Tailwind, shadcn) + tarefa + restrições + formato + pedido de 2 alternativas.',
      why:['Só "favor" não é prompt eficaz.','Só problema é vago.','Maiúsculas não melhora resultado.'],
      reviewAnchor:'explicacao-intuitiva',
    }),
    tf({
      id:'ep-4',difficulty:'basic',category:'conceito',
      question:'Few-shot é técnica onde você mostra exemplos input/output para IA generalizar.',
      correct:true,
      explanation:'Mostrar exemplos do padrão — IA generaliza e segue. Útil quando você já tem o formato esperado.',
      why:[],reviewAnchor:'few-shot',
    }),
    mc({
      id:'ep-5',difficulty:'intermediate',category:'conceito',
      question:'O que é "chain-of-thought" em prompts?',
      options:['Encadear prompts sequenciais','Pedir à IA para listar raciocínio passo-a-passo antes de concluir','Encadear APIs','Tipo de linking'],
      correct:1,
      explanation:'"Antes de responder, liste passo-a-passo seu raciocínio." Em lógica, IA mostra cadeia — você valida e detecta premissas erradas.',
      why:['Encadear prompts é iteração.','Encadear APIs é integration.','Linking é semiestrutura visual, não técnica.'],
      reviewAnchor:'chain-of-thought',
    }),
    eg({
      id:'ep-6',difficulty:'advanced',category:'aplicacao',
      question:'Você quer debugar stack trace. Qual template é mais eficaz?',
      options:[
        '"Me ajude, erro"',
        'Stack trace completo + código do arquivo + tentativas já fiz + hipóteses que tenho + "liste causas prováveis e como verificar"',
        'Só stack trace',
        'Pedir genérico: "qual o motivo?"',
      ],correct:1,
      explanation:'Contexto total + tentativas + hipóteses + formato pedido = IA não adivinha. Listar causas em ordem é diretamente útil.',
      why:['"Me ajude" é genérico.','Só stack trace não dá contexto.','"Qual o motivo?" não dá histórico.'],
      reviewAnchor:'prompt-para-debugging',
    }),
    mc({
      id:'ep-7',difficulty:'intermediate',category:'aplicacao',
      question:'IA gerou solução e você quer criticá-la. O que perguntar?',
      options:['"Ficou bom?"','"O que você faria diferente se fosse um code review rigoroso?"','Tchutchuca','"Tem bug?"'],
      correct:1,
      explanation:'Pedir crítica como reviewer rigoroso. IA encontra problemas no próprio output — alternativas, edge cases, segurança.',
      why:['Genérico.','Tchutchuca é coloquial irrelevante.','Ela só dirá "não" sem contexto.'],
      reviewAnchor:'2-nao-pedem-criticas',
    }),
    tf({
      id:'ep-8',difficulty:'advanced',category:'interpretacao',
      question:'"Reaproveite a conversa" significa que IA historicamente mantém a sessão e referencie mensagens passadas.',
      correct:true,
      explanation:'Context stack > 1 prompt gigante. IA esquece início de prompt 1000 tokens. Mande por partes, referencie mensagens anteriores.',
      why:[],reviewAnchor:'boas-praticas',
    }),
  ],

  // ── como-nao-fazer-vibe-coding ───────────────────────────
  'como-nao-fazer-vibe-coding': [
    mc({
      id:'vc-1',difficulty:'basic',category:'conceito',
      question:'O que é "vibe coding"?',
      options:['Programar com música','Programar sentindo, sem entender — IA gera e você cola sem ler','Programar com IA assistente','Programar frontend'],
      correct:1,
      explanation:'Vibe coding = IA gera, você cola, "parece que funciona", segue. Substituiu entendimento por fé. Diferente de copy-paste antigo: nem exige leitura.',
      why:['Música é irrelevante.','IA assistente é boas práticas, não vibe coding.','Frontend é stack.'],
      reviewAnchor:A.intro,
    }),
    aso({
      id:'vc-2',difficulty:'intermediate',category:'conceito',
      question:'Relacione antipadrão ao seu nome.',
      pairs:[
        { left:'Colar e push', right:'Enviou código não validado' },
        { left:'Não entender', right:'Você não saberá debugar' },
        { left:'Pedir sistema inteiro', right:'IA não conhece sua estrutura' },
        { left:'Funciona ≠ certo', right:'useEffect em infinite loop crasha em prod' },
      ],reviewAnchor:A.tec,
    }),
    sc({
      id:'vc-3',difficulty:'intermediate',category:'aplicacao',
      scenario:'IA gera código, você cola, commit, push. Sem leitura.',
      question:'Risco imediato?',
      options:['IA sempre acerta','Você enviou código não validado — em edge cases do software bugs custam caro','Vai funcionar se você confia','Dá pra corrigir depois'],
      correct:1,
      explanation:'"Parece correto" em software não basta. Tem que ser correto sob edge cases. Vibe coding = fé cega.',
      why:['IA não "sempre acerta".','Confiança não substitui validação.','"Depois" vira dívida geradora de incidentes.'],
      reviewAnchor:'1-colar-e-pusência',
    }),
    tf({
      id:'vc-4',difficulty:'basic',category:'conceito',
      question:'Linearmente usar IA é problema, então você deve recusar IA por orgulho.',
      correct:false,
      explanation:'Seniores que recusam IA completamente também erram. Ferramenta bem usada é vantagem. Decisão consciente ≠ medo.',
      why:[],reviewAnchor:'1-nao-usam-ia-por-orgulho',
    }),
    ord({
      id:'vc-5',difficulty:'intermediate',category:'aplicacao',
      question:'Ordene a sequência correta de usar IA (build incremental).',
      steps:['Definir problema','Pedir UMA peça','Testar essa peça','Pedir a próxima peça'],
      reviewAnchor:'3-pedir-sistema-inteiro-de-uma-vez',
    }),
    mc({
      id:'vc-6',difficulty:'intermediate',category:'decisao',
      question:'Em quais contextos vibe coding é aceitável (segundo o módulo)?',
      options:[
        'Sempre — é eficiente',
        'Em protótipos descartáveis, landing pessoal, POC, hackathon',
        'Em produção crítica se você confia na IA',
        'Em sistemas de pagamento se você testar localmente',
      ],correct:1,
      explanation:'Onde custo de bug é baixo (protótipo, POC, hackathon, landing pessoal), vibe coding é aceitável. Etiquete: "não é production-ready".',
      why:['Sempre ignoring.toFixed.','Produção crítica exige rigor — vibe coding não.','Sistema de pagamento é o caso clássico de NÃO aceite.'],
      reviewAnchor:'quando-vibe-coding-e-aceitavel',
    }),
    eg({
      id:'vc-7',difficulty:'advanced',category:'aplicacao',
      question:'Você tem 3 meses de vibe coding e a IA caiu offline. O que fica evidente?',
      options:['Que você precisa de IA melhor','Os gaps — você não consegue debugar próprio código, não explica decisões, não prevê consequências','Que o cache resolve','Que você precisa trocar de IA'],
      correct:1,
      explanation:'Vibe coding deixa você na mão quando IA indispo: não sabe explicar o que gerou, não debuga sem IA, não prevê consequências.',
      why:['IA melhor é consolo.','Cache resolve latência, não entendimento.','Trocar de IA é trocar sintoma.'],
      reviewAnchor:A.intro,
    }),
    mc({
      id:'vc-8',difficulty:'basic',category:'conceito',
      question:'Qual regra resume a diferença copy-paste antigo vs vibe coding?',
      options:['Vibe coding é mais rápido','Copy-paste antigo exigia leitura (você sele tube), vibe coding permite não ler','São idênticos','Vibe coding é新版 do copy-paste'],
      correct:1,
      explanation:'Copy-paste antigo pelo menos te OBRIGAVA a ler o código antes de adaptar. Vibe coding permite NÃO ler — substitui entendimento por fé.',
      why:['Velocidade não é critério de aprendizado.','Idêntico equivale vibrato.','',''],
      reviewAnchor:A.hist,
    }),
  ],

  // ── boas-praticas-ia ─────────────────────────────────────
  'boas-praticas-ia': [
    mc({
      id:'bpia-1',difficulty:'basic',category:'conceito',
      question:'Qual é a relação metafórica entre você e a IA, segundo o módulo?',
      options:['IA é mestre; você aprende','IA é júnior inteligente; você é revisor sênior','IA é só framework; você usa','IA substitui; você supervisiona'],
      correct:1,
      explanation:'IA é o júnior que rascunha. Você é o sênior que revisa, refatora para seu padrão e assume autoria. Programa é o produto.',
      why:['IA mestre é oposto do módulo.','IA é ferramenta, não framework.','"Substitui" é vibe coding.'],
      reviewAnchor:A.intuit,
    }),
    ord({
      id:'bpia-2',difficulty:'intermediate',category:'aplicacao',
      question:'Ordene o workflow de 7 passos (boas práticas).',
      steps:[
        'Definir o problema (sem IA)',
        'Esboçar a solução (sem IA)',
        'Prompt inicial estruturado',
        'Ler o output linha por linha',
        'Testar você mesmo',
        'Refatorar com seu estilo',
        'Comitar com transparência',
      ],reviewAnchor:A.tec,
    }),
    sc({
      id:'bpia-3',difficulty:'intermediate',category:'aplicacao',
      scenario:'Você adiciona uma feature no Projeto 07 (SaaS de Notas) usando IA.',
      question:'Antes de abrir a IA, o que você deve fazer (passo 1)?',
      options:['Pedir para IA o melhor caminho','Escrever em markdown: problema, constraints (tipos/schema/performance) e critério de sucesso','Procurar no YouTube','Perguntar no Discord'],
      correct:1,
      explanation:'Definir problema sem IA clareia mentalmente. Constraint: tipos, schema, performance. Sucesso: "funciona em X casos".',
      why:['Pedir IA primeiro inverte o sistema.','YouTube é tutorial — não resolve o seu problema.','Discord é anedótico.'],
      reviewAnchor:'passo-1-defina-o-problema-sem-ia',
    }),
    tf({
      id:'bpia-4',difficulty:'basic',category:'conceito',
      question:'"Geração" garante qualidade; "validação" é opcional.',
      correct:false,
      explanation:'A frase de fundo do módulo: somente validação garante qualidade. Geração é só rascunho.',
      why:[],reviewAnchor:A.intro,
    }),
    mc({
      id:'bpia-5',difficulty:'advanced',category:'aplicacao',
      question:'IA sugere uma função de criptografia caseira para senhas. O que fazer?',
      options:['Aceitar — é prática aceitável','Recusar, usar libs verificadas de cripto que audita comunidade','Pedir IA uma cripto melhor','Testar com suas senhas'],
      correct:1,
      explanation:'Cripto é explicitamente uma área NÃO para IA. Use libs verificadas (Argon2, bcrypt) — regs específicas, auditadas.',
      why:['Aceitar é erro crítico.','Pedir "cripto melhor" mantém o problema.','Testar com suas senhas é pra lá de anti-padrão.'],
      reviewAnchor:'quando-ia-nao-e-a-ferramenta',
    }),
    aso({
      id:'bpia-6',difficulty:'intermediate',category:'aplicacao',
      question:'Relacione o passo à sua motivação.',
      pairs:[
        { left:'Definir problema (sem IA)', right:'Clareia mentalmente' },
        { left:'Esboçar solução (sem IA)', right:'A arquitetura é sua' },
        { left:'Ler linha por linha', right:'Validar e entender' },
        { left:'Refatorar com estilo', right:'Assumir autoria' },
      ],reviewAnchor:A.tec,
    }),
    eg({
      id:'bpia-7',difficulty:'advanced',category:'decisao',
      question:'Você gerou 80% do código por IA. Como commitar honestamente?',
      options:['Como se fosse tudo seu','Com co-author transparente ("co-authored with Cursor") + contexto no PR sobre o que revisou e o que ajustou','Sem mensagem','Esconder no commit grande'],
      correct:1,
      explanation:'Transparência é profissional. "Co-authored with [IA]" + PR com: "inicialmente IA, revisado linhas X-Y, refatorado para nosso padrão. Teste Z cobre."',
      why:['Atribuir sozinho é falso.','Silenciar é antiético.','Esconder em commit grande é desonestidade.'],
      reviewAnchor:'passo-7-comita-com-transparencia',
    }),
    tf({
      id:'bpia-8',difficulty:'intermediate',category:'aplicacao',
      question:'Mesmo imagem ou design gerado por IA genérico mediano é problema se for UX de produção.',
      correct:true,
      explanation:'IA não conhece seu usuário. UX de IA é "média genérica". Use para explorar opções, mas a decisão é sua.',
      why:[],reviewAnchor:'1-usam-ia-para-designs',
    }),
  ],

  // ── projeto-ia-1 ─────────────────────────────────────────
  'projeto-ia-1': [
    mc({
      id:'pi1-1',difficulty:'basic',category:'conceito',
      question:'Qual é o objetivo do Projeto IA 1?',
      options:[
        'Construir um sistema LMS completo',
        'Construir um SaaS de flashcards multi-tenant que gera cards de markdown via LLM',
        'Fazer code reviewer com RAG',
        'Construir clone do Supabase',
      ],correct:1,
      explanation:'SaaS de Flashcards: usuário cola markdown, LLM gera cards, persiste em Postgres com RLS, streaming de resposta.',
      why:['LMS é Projeto 09.','Code reviewer é Projeto IA 2.','Clone do Supabase é Projeto 10.'],
      reviewAnchor:A.intro,
    }),
    mc({
      id:'pi1-2',difficulty:'intermediate',category:'conceito',
      question:'Por que nível Pleno 2 para este projeto?',
      options:['Porque é fácil','Porque envolve auth, LLM integration, streaming, testes de prompt e RLS','Porque é curto','Porque é só frontend'],
      correct:1,
      explanation:'Combina tudo que você aprendeu (Projeto 07: auth+RLS) + LLM streaming + behavioral test de prompts. Pleno 2 de complexidade.',
      why:['"Fácil" anda com over-simplificação.','Longo? 2-4 semanas.','Só frontend seria incompatível com auth+RLS+LLM backend.'],
      reviewAnchor:'nivel-alvo-pleno-2',
    }),
    sc({
      id:'pi1-3',difficulty:'intermediate',category:'aplicacao',
      scenario:'LLM respondeu "Aqui estão seus cards: [...]" — JSON válido depois do preâmbulo.',
      question:'Duas correções: no prompt e no parse.?',
      options:[
        'Aceitar e fazer parser com regex do miolo',
        'Prompt pedindo "Responda apenas JSON, sem preâmbulo" e parse com try/catch + validação de schema',
        'Pedir IA para explicar o preâmbulo',
        'Adicionar wait antes do parse',
      ],correct:1,
      explanation:'"Responda apenas JSON" remove texto extra. Parse defensivo com try/catch + validação (Array.isArray, hasOwnProperty front/back).',
      why:['Regex é bandeira vermelha.','Explicar preâmbulo não o resolve.','Wait não muda o conteúdo.'],
      reviewAnchor:'erros-comuns',
    }),
    ord({
      id:'pi1-4',difficulty:'intermediate',category:'aplicacao',
      question:'Ordene o fluxo da geração de flashcards.',
      steps:[
        'Usuário cola markdown no textarea',
        'Clica "Gerar Flashcards"',
        'Server Action chama LLM com prompt',
        'LLM retorna array { front, back }',
        'Backend salva no Postgres',
        'UI mostra cards editáveis',
      ],reviewAnchor:'fluxo',
    }),
    tf({
      id:'pi1-5',difficulty:'intermediate',category:'seguranca',
      question:'Como RLS deve proteger flashcards no Projeto IA 1.',
      correct:true,
      explanation:'flashcards herdado de decks via deck. RLS no flashcards faz SELECT condicional em join com deck (created_by_id = auth.uid()).',
      why:[],reviewAnchor:A.tec,
    }),
    mc({
      id:'pi1-6',difficulty:'intermediate',category:'aplicacao',
      question:'Você não implementou cache. Custo LLM explodiu em 1 semana. Por que cache resolve?',
      options:[
        'Porque cache remove o LLM',
        'Cache por hash do deck markdown: mesmo input → mesma resposta, evita regeneração redundante',
        'Porque todo usuário usa o mesmo cache',
        'Porque cache acelera o frontend',
      ],correct:1,
      explanation:'Hash do markdown como chave de cache: se input não mudou, não regenera. Reduz custo sem perder UX.',
      why:['Cache não remove LLM.','Compartilhar entre usuários viola isolamento.','Frontend cache é outra camada.'],
      reviewAnchor:'boas-praticas',
    }),
    aso({
      id:'pi1-7',difficulty:'intermediate',category:'conceito',
      question:'Relacione erro comum à correção.',
      pairs:[
        { left:'LLM com preâmbulo', right:'Prompt pede "apenas JSON, sem preâmbulo"' },
        { left:'Card com "Pergunta 1:"', right:'Pedir "sem números nas perguntas"' },
        { left:'Rate limit LLM', right:'Implementar retry com backoff' },
        { left:'Custo alto', right:'Limite diário por usuário + cache' },
      ],reviewAnchor:'erros-comuns',
    }),
    eg({
      id:'pi1-8',difficulty:'advanced',category:'aplicacao',
      question:'Por que testar só a UI não é suficiente neste projeto?',
      options:[
        'Porque UI é instável',
        'Porque o comportamento crítico é o prompt → JSON válido com front/back. Deve haver teste behavioral do prompt',
        'Porque não há UI',
        'Porque testes UI são muito rápidos',
      ],correct:1,
      explanation:'UI é superficial. O coração é "prompt responde JSON válido, cards auto-contidos, sem números". Teste isso diretamente.',
      why:['UI é estável neste projeto.','Há UI, só não é o foco.','Velocidade de teste não é o argumento.'],
      reviewAnchor:'teste-do-prompt',
    }),
  ],

  // ── projeto-ia-2 ─────────────────────────────────────────
  'projeto-ia-2': [
    mc({
      id:'pi2-1',difficulty:'basic',category:'conceito',
      question:'O que é RAG (Retrieval-Augmented Generation)?',
      options:[
        'Treinar um modelo do zero',
        'Combinar LLM com base de conhecimento (embeddings) e recuperar trechos similares antes de responder',
        'Substituir banco de dados',
        'Tipo de criptografia',
      ],correct:1,
      explanation:'RAG = recuperar (Retrieval) trechos similares via embeddings (embeddings) e fornecê-los como contexto (Augmented) ao LLM que então responde.',
      why:['Não treina do zero.','Não substitui banco.','Cripto é irrelevante.'],
      reviewAnchor:A.intro,
    }),
    mc({
      id:'pi2-2',difficulty:'intermediate',category:'conceito',
      question:'Por que pgvector é adequado para este projeto?',
      options:['Guarda usuários','É extensão Postgres que armazena embeddings e busca nearest neighbors (cosine) diretamente no banco','Porque é mais rápido que Redis','Porque é open source puro'],
      correct:1,
      explanation:'pgvector armazena vetores em Postgres, suporta índices ivfflat e busca nearest neighbor por cosine similarity — tudo dentro do seu stack.',
      why:['"Guarda usuários" é função genérica.','Redis é key-value, não é comparativo.','OSS puro não é critério.'],
      reviewAnchor:A.tec,
    }),
    sc({
      id:'pi2-3',difficulty:'advanced',category:'aplicacao',
      scenario:'Review cita arquivo que não existe no repo.',
      question:'Causa provável e correção?',
      options:[
        'LLM pré-treinado bugado',
        'Alucinação — adicionar file_path explícito no output esperado e validar contra lista de arquivos do repo',
        'pgvector mal configurado',
        'Webhook GitHub errado',
      ],correct:1,
      explanation:'LLM alucina file_paths. Forçar output com file_path válido (validar contra lista real) previne revisões irreais.',
      why:['"Pré-treinado bugado" é vazio.','pgvector não afeta file_path.','Webhook é irrelevante aqui.'],
      reviewAnchor:'erros-comuns',
    }),
    ord({
      id:'pi2-4',difficulty:'advanced',category:'aplicacao',
      question:'Ordene o pipeline do Code Reviewer com RAG.',
      steps:[
        'OAuth GitHub → listar repos',
        'Indexar: ler repo, chunkar por arquivo',
        'Embed cada chunk, salvar em pgvector',
        'PR webhook → pegar diff',
        'Buscar similares em pgvector',
        'LLM gera review com diff + contexto',
      ],reviewAnchor:'pipeline',
    }),
    tf({
      id:'pi2-5',difficulty:'intermediate',category:'seguranca',
      question:'No Projeto IA 2, webhook do GitHub deve ser validado por assinatura HMAC.',
      correct:true,
      explanation:'GitHub assina webhooks com HMAC. Validar a assinatura previne que atacantes disparem reviews sem represa',
      why:[],
      reviewAnchor:'erros-comuns',
    }),
    mc({
      id:'pi2-6',difficulty:'intermediate',category:'aplicacao',
      question:'Re-indexar todo o repo a cada push → custo explodiu. Estratégia que corta 90%?',
      options:['Ignorar push','Re-embed só os diffs, cache por hash para arquivos inalterados','Mudar de linguagem','Usar SQLite'],
      correct:1,
      explanation:'Re-embed só o que mudou (diffs). Para arquivos inalterados, hash cache → não re-embed. Reduz custo massiva.',
      why:['Ignorar é inaceitável.','Linguagem não é o fator.','SQLite não tem pgvector.'],
      reviewAnchor:'erros-comuns',
    }),
    aso({
      id:'pi2-7',difficulty:'advanced',category:'conceito',
      question:'Relacione cada decisão à sua motivação.',
      pairs:[
        { left:'Chunking 50-100 linhas', right:'Embedding significativo, nem médio nem gigante' },
        { left:'ivfflat no pgvector', right:'Índice p/ nearest neighbor eficiente' },
        { left:'Streaming SSE', right:'UX: review aparece ao vivo' },
        { left:'Webhook HMAC', right:'Garantir que veio do GitHub' },
      ],reviewAnchor:A.tec,
    }),
    eg({
      id:'pi2-8',difficulty:'advanced',category:'decisao',
      question:'Codebase pequeno (< 5000 LOC) quer usar seu Code Reviewer. Cabe? Por quê?',
      options:['Sim — toda codebase precisa','Não — não justifica a infra de RAG para poucocorrEC','Sim — desde que seja Python','Não — só se for TypeScript'],
      correct:1,
      explanation:'Limites do RAG: codebases pequenos não têm diversidade suficiente para retrieval útil. 5000+ LOC justifica.',
      why:['Toda codebase não é útil.','Linguagem não é critério.','TypeScript não resolve isso.'],
      reviewAnchor:'quando-limita',
    }),
  ],
}

export function getQuiz(slug: string): Question[] {
  return QUIZZES[slug] ?? []
}