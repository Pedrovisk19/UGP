import type { ModuleMeta } from '@/types/ugp.types'

// Metadados editoriais de cada módulo da UGP.
// O conteúdo pedagógico permanece nos arquivos .md — este arquivo só orquestra a apresentação visual.

const common = {
  readingTimeFallback: 10,
} as const

const M: Record<string, ModuleMeta> = {
  // ── Fundamentos ──────────────────────────────────────────
  manifesto: {
    slug: 'manifesto',
    title: 'Manifesto da UGP',
    subtitle: 'Cursos ensinam sintaxe. Projetos ensinam engenharia.',
    description:
      'Entenda por que a UGP existe: o problema silencioso da educação de software que ensina o "como" sem ensinar o "porquê", e a proposta de aprendizado por projetos corporativos reais.',
    level: 'Iniciante',
    readingTime: 12,
    technologies: [],
    tags: ['Fundamentos', 'Tese central'],
    competencies: ['Pensamento crítico', 'Decisão técnica', 'Autonomia'],
    mission: [
      'Explicar a tese central da UGP (sintaxe vs. engenharia)',
      'Situar o aprendiz nas eras do ensino de software',
      'Apresentar os 3 pilares (conteúdo denso, projetos reais, níveis)',
      'Estabelecer o manifesto como referência para reler',
    ],
    prerequisites: [],
    connections: [
      { type: 'module', label: 'Arquitetura da UGP', ref: 'arquitetura' },
      { type: 'module', label: 'Níveis', ref: 'niveis' },
      { type: 'module', label: 'Matriz', ref: 'matriz' },
    ],
    summary: [
      { icon: '🎯', title: 'Sintaxe vs. Engenharia', description: 'A diferença entre programador e engenheiro está em decidir, prever e assumir trade-offs — não em saber mais linguagens.' },
      { icon: '📚', title: 'Profundidade com acesso', description: 'A UGP combina a profundidade dos primórdios com o acesso gratuito da era dos cursos e a estrutura dos bootcamps.' },
      { icon: '🏗️', title: '3 pilares', description: 'Conteúdo denso, projetos corporativos reais e progressão por níveis. Cada decisão suporta o aprendizado.' },
      { icon: '🔁', title: 'Reler, não decorar', description: 'O manifesto é para voltar quando estiver perdido — não para memorizar. É o ponto de referência da jornada.' },
    ],
    checklist: [
      'Consigo explicar a diferença entre aprender sintaxe e aprender engenharia.',
      'Sei identificar se um curso/tutorial está me ensinando "o que" ou "o porquê".',
      'Entendo os 3 pilares da UGP e por que cada um existe.',
      'Sei quando reler este manifesto (perdido/motivação baixa).',
      'Concordo que projetos ensinam mais que tutoriais — e estou disposto a construir.',
    ],
    exercises: [
      { scenario: 'Você acabou de assistir a um tutorial de 10 min que montou um login em Next.js.', prompt: 'Liste 3 perguntas "por quê" que o tutorial não respondeu.', hint: 'Por que o HTTP é stateless? Por que tokens? Por que o cookie httpOnly?' },
      { scenario: 'Um amigo pergunta por que você está fazendo a UGP em vez de outro bootcamp.', prompt: 'Explique em 3 frases a tese central — sem usar a palavra "project".', },
      { scenario: 'Você lê um módulo e acha "isso é teoria, quero código".', prompt: 'Decida: reler com atenção ou pular para o código? Argumente com base no manifesto.' },
    ],
    nextSteps: [
      { type: 'module',  label: 'Arquitetura da UGP', ref: 'arquitetura' },
      { type: 'module',  label: 'Níveis',            ref: 'niveis' },
      { type: 'module',  label: 'Matriz',            ref: 'matriz' },
    ],
  },

  arquitetura: {
    slug: 'arquitetura',
    title: 'Arquitetura da UGP',
    subtitle: 'Como a plataforma que você está usando foi construída — e por quê.',
    description:
      'A UGP é um caso concreto de arquitetura moderna: Next.js 15 + Supabase + Markdown. Entender cada peça te prepara para entender qualquer SaaS moderno e para construir os projetos da própria UGP.',
    level: 'Intermediário',
    readingTime: 11,
    technologies: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind', 'React Server Components'],
    tags: ['Arquitetura', 'Stack moderno'],
    competencies: ['Arquitetura', 'Engenharia', 'Organização', 'Backend'],
    mission: [
      'Entender como a UGP foi construída peça por peça',
      'Justificar trade-offs de cada decisão (Next.js, Supabase, Markdown, Tailwind, Vercel)',
      'Ler uma Server Action e identificar por que ela é segura',
      'Explicar o papel da RLS defendendo no banco, não no frontend',
      'Reconhecer erros comuns por nível (iniciante, intermediário, sênior)',
    ],
    prerequisites: [
      { type: 'module', label: 'Manifesto UGP', ref: 'manifesto' },
    ],
    connections: [
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'module', label: 'Fullstack Moderno', ref: 'fullstack' },
      { type: 'module', label: 'GitHub', ref: 'github' },
      { type: 'module', label: 'Níveis', ref: 'niveis' },
    ],
    summary: [
      { icon: '🧱', title: 'Frontend Next.js', description: 'App Router + Server Components + Server Actions: mesma base usada em startups como Vercel, Cal.com, Resend.' },
      { icon: '🗄️', title: 'BaaS Supabase', description: 'Auth, Postgres + RLS, Realtime e Storage prontos — trade-off é acoplamento ao provedor.' },
      { icon: '📄', title: 'Conteúdo estático', description: 'Markdown carregado via Webpack como asset/source: zero latência, versionado no Git, sem CMS desnecessário.' },
      { icon: '🔐', title: 'RLS defende no banco', description: 'A segurança não fica no frontend — o Postgres recusa devolver dados de outro usuário mesmo se o app for hackeado.' },
    ],
    checklist: [
      'Sei dizer por que a UGP usa Next.js e não Vite ou Remix.',
      'Sei explicar por que Supabase e não backend próprio, incluindo o trade-off.',
      'Entendo por que o conteúdo é markdown estático e quando isso DEIXA de fazer sentido.',
      'Sei explicar o que é uma Server Action e por que ela é segura.',
      'Consigo justificar a decisão de usar o banco (não localStorage) para o progresso do usuário.',
    ],
    exercises: [
      { scenario: 'Você precisa guardar "módulo concluído" do usuário.', prompt: 'Justifique localstorage vs. tabela Postgres com 3 critérios.', hint: 'Multi-device, XP global, analytics.' },
      { scenario: 'Time quer adicionar Redis + Kafka num app de 100 usuários.', prompt: 'Argumente contra (ou a favor) com base em YAGNI e custo de complexidade.' },
      { scenario: 'Você herdou a UGP e precisa converter o conteúdo markdown para um CMS dinâmico.', prompt: 'Que critério objetivo tecería decidir a migrate?', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Níveis',                ref: 'niveis' },
      { type: 'module',  label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'project', label: 'Projeto 05 — Blog Pessoal', ref: '5' },
      { type: 'project', label: 'Projeto 07 — SaaS de Notas', ref: '7' },
    ],
  },

  niveis: {
    slug: 'niveis',
    title: 'Níveis de Progressão',
    subtitle: 'Saber onde você está é metade do caminho de onde quer chegar.',
    description:
      'A UGP propõe 8 níveis — do Extremo Iniciante ao Sênior — definidos por competências observáveis, não por tempo de carreira. Cada nível traz conhecimento, limitação, métrica de saída e checklist de avanço.',
    level: 'Iniciante',
    readingTime: 11,
    technologies: [],
    tags: ['Progressão', 'Carreira'],
    competencies: ['Autoavaliação', 'Metacognição', 'Mentoria'],
    mission: [
      'Definir nível por competência observável, não por tempo',
      'Detalhar os 8 níveis (conhecimento, limitação, métrica, checklist)',
      'Mostrar que nível é assimétrico entre áreas',
      'Conectar níveis a projetos da UGP e a trilhas de mercado',
    ],
    prerequisites: [
      { type: 'module', label: 'Manifesto', ref: 'manifesto' },
    ],
    connections: [
      { type: 'module', label: 'Matriz', ref: 'matriz' },
      { type: 'module', label: 'Manifesto', ref: 'manifesto' },
      { type: 'module', label: 'GitHub', ref: 'github' },
    ],
    summary: [
      { icon: '📏', title: 'Competência > anos', description: 'Empresas de elite definem nível pelo que você demonstra, não pelo tempo. A UGP faz o mesmo.' },
      { icon: '8️⃣', title: '8 níveis granulares', description: 'Extremo Iniciante → Junior 1/2/3 → Pleno 1/2/3 → Sênior. Faixas finas = clareza.' },
      { icon: '✅', title: 'Métrica de saída', description: 'Cada nível tem um critério objetivo: "se você consegue X, é nível N".' },
      { icon: '🤝', title: 'Mentoria é nível 7+', description: 'Defender decisões, mentorear e desenhar arquiteturas end-to-end pertencem ao Sênior.' },
    ],
    checklist: [
      'Sei em qual dos 8 níveis estou atualmente.',
      'Sei qual é minha métrica de saída para o próximo nível.',
      'Sei listar 3 itens do checklist do meu próximo nível.',
      'Entendo que nível é assimétrico (posso ser Júnior 2 em backend e Júnior 0 em ML).',
      'Sei explicar meu nível em entrevista sem dizer "tenho X anos".',
    ],
    exercises: [
      { scenario: 'Maria saiu de bootcamp; sabe React, fez 3 projetos, sem Postgres e sem testes.', prompt: 'Em qual nível ela está? O que falta para Júnior 3?', },
      { scenario: 'Você está avaliando Ana (8 anos Java, dominia arquitetura, noção nula de React).', prompt: 'Ela é plena? Em quê?', },
      { scenario: 'Você quer definir o checklist do seu próximo nível.', prompt: 'Escreva 4 itens verificáveis para o seu nível-alvo (ex: Pleno 1).', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Matriz',   ref: 'matriz' },
      { type: 'module',  label: 'Manifesto', ref: 'manifesto' },
      { type: 'module',  label: 'GitHub',    ref: 'github' },
    ],
  },

  matriz: {
    slug: 'matriz',
    title: 'Matriz de Progressão',
    subtitle: 'Visualize os 8 níveis e onde você está.',
    description:
      'A matriz é a visualização interativa dos níveis. Clique em cada nível para ver detalhes. Módulo visual — sem quiz.',
    level: 'Iniciante',
    readingTime: 3,
    technologies: [],
    tags: ['Visual', 'Progressão'],
    summary: [],
    checklist: [],
    exercises: [],
    nextSteps: [
      { type: 'module', label: 'GitHub',                ref: 'github' },
      { type: 'module', label: 'Arquitetura da UGP',    ref: 'arquitetura' },
    ],
  },

  // ── Engenharia ────────────────────────────────────────────
  github: {
    slug: 'github',
    title: 'GitHub para Engenheiros',
    subtitle: 'A ferramenta mais usada e a menos compreendida.',
    description:
      'Git é distribuído, não centralizado como o SVN. Branches são ponteiros baratos, commits formam uma cadeia. Entender isso transforma merge conflict em conversa e branch abandonada em arqueologia.',
    level: 'Iniciante',
    readingTime: 11,
    technologies: ['Git', 'GitHub', 'Conventional Commits', 'GitHub Actions'],
    tags: ['Versionamento', 'Colaboração'],
    competencies: ['Versionamento', 'Colaboração', 'Engenharia', 'Disciplina'],
    mission: [
      'Entender o que o Git realmente é (distribuído, commits em cadeia, branches como ponteiros)',
      'Dominar os 3 estados (working, staging, repository) e o que cada comando move entre eles',
      'Escrever mensagens em Conventional Commits',
      'Resolver merge conflicts sem apagar a pasta e clonar de novo',
      'Aplicar GitHub Flow em qualquer projeto',
    ],
    prerequisites: [],
    connections: [
      { type: 'module', label: 'Docs as Code', ref: 'docs-as-code' },
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'module', label: 'Portfólio que Vende', ref: 'portfolio' },
    ],
    summary: [
      { icon: '🌳', title: 'Distribuído', description: 'Cada clone é um repositório completo. Servidor caiu? Você continua commitando offline.' },
      { icon: '📸', title: 'Commit = foto', description: 'Guarda apenas o diff desde a última foto. Cada commit tem hash, autor, timestamp e parent.' },
      { icon: '🌿', title: 'Branch é ponteiro', description: 'Em Git, branch não copia arquivos — é um label que aponta para um commit. Por isso é barato.' },
      { icon: '🤝', title: 'GitHub Flow', description: 'Branch → PR → review → merge. Padrão do Stripe, Nubank e de toda startup moderna de produto.' },
    ],
    checklist: [
      'Sei os 3 estados do Git (working, staging, repository) e o que cada comando move entre eles.',
      'Escrevo mensagens em Conventional Commits (feat, fix, docs, refactor, test, chore).',
      'Sei resolver um merge conflict sem apagar a pasta e clonar de novo.',
      'Sei desfazer o último commit sem perder as mudanças (`git reset --soft HEAD~1`).',
      'Nunca commito segredos (.env, chaves) e mantenho `.gitignore` completo.',
    ],
    exercises: [
      { scenario: 'Você commitou na `main` direto, ainda não pushou.', prompt: 'Como mover esse commit para uma branch `feat/x` e limpar a main?', hint: 'git checkout -b + git reset --hard.' },
      { scenario: 'Você abre um arquivo e vê marcadores <<<<<<< ======= >>>>>>>.', prompt: 'Resolva o conflito explicando cada passo.', },
      { scenario: 'Time de 20 devs escolhe entre GitHub Flow e Trunk-based.', prompt: 'Defenda uma opção com 2 trade-offs.', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Docs as Code',          ref: 'docs-as-code' },
      { type: 'module',  label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'project', label: 'Projeto 01 — Todo List', ref: '1' },
    ],
  },

  'docs-as-code': {
    slug: 'docs-as-code',
    title: 'Docs as Code',
    subtitle: 'Documentação morre quando vive fora do Git. Vive quando vive nele.',
    description:
      'Tratar documentação como código: mesma revisão, mesmo versionamento, mesma revisão em PR. Não é ferramenta — é postura. ADRs são a ferramenta mais importante que isso introduz.',
    level: 'Intermediário',
    readingTime: 10,
    technologies: ['Markdown', 'ADRs', 'docusaurus', 'mkdocs', 'nextra'],
    tags: ['Documentação', 'Engenharia'],
    competencies: ['Documentação', 'Engenharia', 'Comunicação', 'Organização'],
    mission: [
      'Entender por que documentação morre fora do Git e vive dentro dele',
      'Escrever um ADR (Contexto, Decisão, Consequências, Status)',
      'Reconhecer quando markdown estático ou CMS é a escolha certa',
      'Exigir que PRs que mexem em código mexam também em doc',
      'Distinguir "decisão" (ADR) de "memória de reunião"',
    ],
    prerequisites: [],
    connections: [
      { type: 'module', label: 'GitHub', ref: 'github' },
      { type: 'module', label: 'TDD', ref: 'tdd' },
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
    ],
    summary: [
      { icon: '📖', title: 'Markdown vence Word',      description: 'Leitura sem ferramenta, diff limpo, portável, sem lock-in proprietário.' },
      { icon: '🏛️', title: 'ADR = memória da decisão', description: 'Architecture Decision Record: contexto, decisão, consequências, status. 1 página, versionada.' },
      { icon: '🔗', title: 'Doc-code juntos',           description: 'PR que muda código sem atualizar a doc é bug. Reviewer bloqueia.' },
      { icon: '🩺', title: 'Runbook para incidentes',   description: 'Documentos vivos, testados em simulação — não atas de reunião.' },
    ],
    checklist: [
      'Consigo escrever um ADR (Contexto, Decisão, Consequências, Status).',
      'Sei quando markdown estático faz sentido e quando um CMS é necessário.',
      'Reconheço "doc desatualizada é pior que nenhuma" — e ajo em consequência.',
      'Exijo link para ADR quando um PR muda arquitetura.',
      'Sei distinguir "decisão" de "memória de reunião".',
    ],
    exercises: [
      { scenario: 'Você escolheu Postgres em vez de Mongo há 2 anos.', prompt: 'Escreva o ADR resgatando por quê — supondo que você não documentou na época.', },
      { scenario: 'Time pede para mover todos os READMEs para o Notion.', prompt: 'Argumente a favor ou contra com 3 critérios通货.', },
      { scenario: 'PR altera a forma de login mas não mexe em docs/api/auth.md.', prompt: 'Como revisor, qual sua resposta?', },
    ],
    nextSteps: [
      { type: 'module',  label: 'TDD',                  ref: 'tdd' },
      { type: 'module',  label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'project', label: 'Projeto 05 — Blog',     ref: '5' },
      { type: 'project', label: 'Projeto 09 — LMS',      ref: '9' },
    ],
  },

  'arquitetura-software': {
    slug: 'arquitetura-software',
    title: 'Arquitetura de Software',
    subtitle: 'Antes de escrever código, alguém precisa tomar decisões.',
    description:
      'Arquitetura não é framework, não é biblioteca e não é pasta. É um conjunto de decisões sobre como o sistema será organizado, como as partes se comunicam e onde cada responsabilidade mora — para que o software continue evoluindo sem virar caos.',
    level: 'Iniciante',
    readingTime: 9,
    technologies: ['Camadas', 'Monólito Modular', 'Separação de Responsabilidades', 'ADR'],
    tags: ['Arquitetura', 'Trade-offs'],
    competencies: ['Organização', 'Arquitetura', 'Escalabilidade', 'Engenharia'],
    mission: [
      'Entender o que é Arquitetura de Software e por que ela existe',
      'Explicar a diferença entre um sistema com e sem arquitetura',
      'Identificar responsabilidades e camadas em qualquer sistema',
      'Reconhecer os erros arquiteturais mais comuns de iniciantes',
      'Olhar para sistemas reais (Nubank, Spotify, Netflix) e enxergar decisões',
    ],
    prerequisites: [
      { type: 'module', label: 'Manifesto UGP', ref: 'manifesto' },
    ],
    connections: [
      { type: 'module', label: 'Arquitetura da UGP', ref: 'arquitetura' },
      { type: 'module', label: 'Fullstack Moderno', ref: 'fullstack' },
      { type: 'module', label: 'TDD', ref: 'tdd' },
      { type: 'module', label: 'Níveis', ref: 'niveis' },
    ],
    summary: [
      { icon: '🧱', title: 'Decisão antes do código', description: 'Arquitetura é o conjunto de decisões que define como o sistema será organizado antes da implementação.' },
      { icon: '🎯', title: 'Responsabilidade única', description: 'Cada camada e cada arquivo faz uma coisa. Mudança fica previsível e contida.' },
      { icon: '📈', title: 'Crescer sem caos', description: 'Sem arquitetura, crescimento vira bagunça. Com arquitetura, o sistema evolui com qualidade.' },
      { icon: '🧭', title: 'Pensar como engenheiro', description: 'A pergunta certa não é "como faço funcionar?", mas "como faço continuar funcionando em 5 anos?".' },
    ],
    checklist: [
      'Consigo definir Arquitetura de Software sem citar frameworks.',
      'Sei explicar a diferença entre um sistema com e sem arquitetura.',
      'Identifico ao menos três responsabilidades em um sistema que uso todo dia.',
      'Reconheço os quatro erros arquiteturais mais comuns de iniciantes.',
      'Olho para um sistema real e consigo formular perguntas arquiteturais sobre ele.',
    ],
    exercises: [
      { scenario: 'Você herda um sistema onde o controller acessa o banco, envia e-mail e gera PDF tudo junto.', prompt: 'Descreva em 3 linhas como reorganizaria em camadas.', },
      { scenario: 'Um colega diz: "vou usar Kafka e Kubernetes para escalar meu MVP de 5 usuários."', prompt: 'Quais 2 argumentos contra você daria?', hint: 'YAGNI e custo de operação distribuída.' },
      { scenario: 'Escolha um app que você usa hoje (Spotify, iFood, Nubank, GitHub).', prompt: 'Liste 3 componentes arquiteturais distintos e a responsabilidade de cada um.', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Arquitetura da UGP',  ref: 'arquitetura' },
      { type: 'module',  label: 'Fullstack Moderno',   ref: 'fullstack' },
      { type: 'project', label: 'Projeto 07 — SaaS', ref: '7' },
    ],
  },

  tdd: {
    slug: 'tdd',
    title: 'Test-Driven Development',
    subtitle: 'Red → Green → Refactor. Não é religião; é disciplina.',
    description:
      'TDD descreve o comportamento desejado antes da implementação. O teste falha (Red), você implementa o mínimo (Green), refatora com segurança. Resulta em design testável, refatoração segura e confiança.',
    level: 'Avançado',
    readingTime: 12,
    technologies: ['Vitest', 'Jest', 'Playwright', 'Testing Library'],
    tags: ['Qualidade', 'Disciplina'],
    competencies: ['Testes', 'Disciplina', 'Refatoração', 'Design testável'],
    mission: [
      'Escrever um teste que falha antes do código existir',
      'Implementar o mínimo para o teste passar e parar (YAGNI)',
      'Refatorar com segurança mantendo o comportamento',
      'Decidir quando aplicar e quando não aplicar TDD',
    ],
    prerequisites: [
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'module', label: 'GitHub', ref: 'github' },
    ],
    connections: [
      { type: 'module', label: 'Boas práticas com IA', ref: 'boas-praticas-ia' },
      { type: 'module', label: 'Fullstack Moderno', ref: 'fullstack' },
    ],
    summary: [
      { icon: '🔴', title: 'Red: o teste falha',     description: 'Confirma que o teste roda e está testando a coisa certa. Falha esperada é bom sinal.' },
      { icon: '🟢', title: 'Green: o mínimo',        description: 'Implemente só o suficiente para passar. YAGNI — não antecipe features.' },
      { icon: '♻️', title: 'Refactor: muda comp, n behavior', description: 'Com testes no lugar, melhorar o código é seguro. Comportamento não muda.' },
      { icon: '🔺', title: 'Pirâmide de testes',     description: '70% unit / 20% integration / 10% E2E. Inverter = caro e frágil.' },
    ],
    checklist: [
      'Sei escrever um teste antes da implementação e rodá-lo vermelho.',
      'Diferencio testar comportamento de testar detalhes de implementação.',
      'Uso AAA (Arrange/Act/Assert) e um conceito por teste.',
      'Sei explicar quando TDD é perda de tempo (spikes, UI experimental, APIs instáveis).',
      'Entendo mock vs stub e quando mockar dependências (DB, email, API externa).',
    ],
    exercises: [
      { scenario: 'Você vai implementar `aplicarDesconto(preco, pct)`.', prompt: 'Escreva 4 testes TDD antes do código (incluindo o caso de cupom inválido).', },
      { scenario: 'Cobertura do projeto chegou a 100% mas bugs continuam em produção.', prompt: 'Por que cobertura não garante qualidade?', },
      { scenario: 'Você muda a ordem do `SELECT` na implementação e 5 testes quebram.', prompt: 'O que isso revela sobre seus testes? Como corrigir?', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Docs as Code',        ref: 'docs-as-code' },
      { type: 'module',  label: 'Fullstack Moderno',   ref: 'fullstack' },
      { type: 'project', label: 'Projeto 09 — LMS',     ref: '9' },
    ],
  },

  fullstack: {
    slug: 'fullstack',
    title: 'Fullstack Moderno',
    subtitle: 'Não é saber tudo. É ter fluência para decidir em qualquer camada.',
    description:
      'Hoje "fullstack" significa construir end-to-end com meta-frameworks: Server Components, Server Actions, Route Handlers, BaaS e Postgres com RLS. A pergunta nunca é "qual stack" — é "qual stack para esta etapa do produto".',
    level: 'Intermediário',
    readingTime: 10,
    technologies: ['Next.js', 'React 19', 'Supabase', 'PostgreSQL', 'Tailwind', 'Vercel'],
    tags: ['Stack', 'Web moderno'],
    competencies: ['Fullstack', 'Decisão de stack', 'Frontend', 'Backend', 'Infraestrutura'],
    mission: [
      'Diferenciar as eras do stack e entender qual problema cada uma resolveu',
      'Identificar as camadas de um stack moderno e como elas conversam',
      'Saber responder "isso roda no servidor ou no client?"',
      'Escolher stack por etapa do projeto (protótipo/MVP/crescimento/escala)',
    ],
    prerequisites: [
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'module', label: 'GitHub', ref: 'github' },
      { type: 'module', label: 'Docs as Code', ref: 'docs-as-code' },
    ],
    connections: [
      { type: 'module', label: 'Test-Driven Development', ref: 'tdd' },
      { type: 'module', label: 'UX para Devs', ref: 'ux' },
      { type: 'module', label: 'Portfólio', ref: 'portfolio' },
    ],
    summary: [
      { icon: '🧩', title: 'Camadas clássicas',    description: 'Frontend → Backend → Database. Backend moderno usa Server Components/Actions/Route Handlers.' },
      { icon: '⚡', title: 'RSC + Server Actions', description: 'Menos JS no client, mutações no servidor seguras, SEO pronto.同一代码库 roda em ambos.' },
      { icon: '🗄️', title: 'Postgres vence hoje',  description: 'ACID, RLS, JSONB, open-source. Multi-tenant sem mudar a app.' },
      { icon: '🚀', title: 'Deploy por etapa',     description: 'Protótipo (Vite) → MVP (Next+Supabase) → Crescimento (módulos+CI) → Escala (extrair microsserviços quando necessário).' },
    ],
    checklist: [
      'Sei a diferença entre Server Component, Server Action e Route Handler — e quando usar cada.',
      'Entendo que no Supabase com RLS o DB pode defender regras sem o app.',
      'Reconheço que adicionar Redis/Kafka só faz sentido quando há medida que justifica.',
      'Sei diferenciar variáveis de ambiente server (`process.env`) de client (`NEXT_PUBLIC_*`).',
      'Modelo multi-tenant com `tenant_id` mesmo no MVP — refatorar depois é caro.',
    ],
    exercises: [
      { scenario: 'Você herda um stack novato com 100 usuários que tem Redis + Kafka.', prompt: 'Quais 3 perguntas faz para decidir o que cortar?', },
      { scenario: 'Stackpedido: Vite + localStorage para um Todo List corporativo.', prompt: 'Quando isso vira dívida? Quais features obrigam backend?', },
      { scenario: 'Você instalou uma lib de DOM dentro de um Server Component e quebrou.', prompt: 'Diagnóstico:', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Portfólio que Vende', ref: 'portfolio' },
      { type: 'project', label: 'Projeto 05 — Blog',     ref: '5' },
      { type: 'project', label: 'Projeto 07 — SaaS',    ref: '7' },
    ],
  },

  // ── Carreira ─────────────────────────────────────────────
  portfolio: {
    slug: 'portfolio',
    title: 'Portfólio que Vende',
    subtitle: 'CV mente. LinkedIn exagera. Portfólio não mente.',
    description:
      'GitHub é a prova social da sua capacidade. O módulo define o que colocar (3-5 projetos, cada um com produção URL ativa, README de 80-150 linhas) e o que NÃO colocar (tutorial clones, projetos sem manutenção).',
    level: 'Iniciante',
    readingTime: 6,
    technologies: ['GitHub', 'Vercel', 'Next.js'],
    tags: ['Carreira', 'Prova social'],
    competencies: ['Comunicação técnica', 'Documentação', 'Apresentação', 'Decisão técnica', 'Carreira'],
    mission: [
      'Montar portfólio com 3-5 projetos selecionados, cada um com link de produção ativo',
      'Escrever README premium (80-150 linhas) em pelo menos um projeto',
      'Atualizar LinkedIn com featured projects e bio com link do portfólio',
    ],
    prerequisites: [
      { type: 'module', label: 'GitHub', ref: 'github' },
      { type: 'module', label: 'Docs as Code', ref: 'docs-as-code' },
    ],
    connections: [
      { type: 'module', label: 'Primeira Vaga', ref: 'primeira-vaga' },
      { type: 'module', label: 'GitHub', ref: 'github' },
      { type: 'module', label: 'Docs as Code', ref: 'docs-as-code' },
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
    ],
    summary: [
      { icon: '🧾', title: 'Repositório de tutorial', description: 'Clone do YouTube = indica que você segue instruções. Distinguir pela autoria de decisões.' },
      { icon: '🔗', title: 'Produção URL sempre',     description: '"Roda com npm run dev" = ninguém roda. Vercel é grátis.' },
      { icon: '📄', title: 'README do portfólio',     description: 'Problema, stack, decisões, prints, deploy, aprendizados, próximos passos. 80-150 linhas.' },
      { icon: '📉', title: '3-5 > 10 medianos',       description: 'Recrutador vê os 3 primeiros e decide. Refatore 5 excelentes, abandone clones.' },
    ],
    checklist: [
      'Tenho entre 3 e 5 projetos destacados (não 20).',
      'Cada projeto tem URL de produção ativa (Vercel, etc.).',
      'Cada README explica problema, stack, decisões e aprendizados — não só "como rodar".',
      'Meu último commit nos principais projetos é < 6 meses atrás.',
      'Não tenho clones de tutorial como peça central do portfólio.',
    ],
    exercises: [
      { scenario: 'Seu melhor projeto é o Clone do Instagram de um tutorial de YouTube.', prompt: 'Como transformar isso em uma peça que não é "tutorial clone"?', },
      { scenario: 'Você tem 20 repositórios medianos. Precisa reduzir a 5.', prompt: 'Quais critérios para selecionar e quais arquivar?', },
      { scenario: 'Recrutador tem 30s para avaliar seu portfólio.', prompt: 'Quais 3 elementos acima da dobra devem aparecer?', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Primeira Vaga',          ref: 'primeira-vaga' },
      { type: 'project', label: 'Projeto 05 — Blog Pessoal', ref: '5' },
      { type: 'project', label: 'Projeto 07 — SaaS de Notas', ref: '7' },
    ],
  },

  'primeira-vaga': {
    slug: 'primeira-vaga',
    title: 'Primeira Vaga',
    subtitle: 'Skill é necessário, não suficiente. Vaga é problema de mercado.',
    description:
      'Conseguir a 1ª vaga é posicionamento. Aplicações diretas têm ~1% conversão; referrals têm 10-20%. O módulo detalha as 5 alavancas — aplicações, networking, LinkedIn, projetos e entrevistas — e timelines realistas (6-18 meses).',
    level: 'Iniciante',
    readingTime: 8,
    technologies: ['LinkedIn', 'GitHub'],
    tags: ['Carreira', 'Mercado'],
    competencies: ['Posicionamento de mercado', 'Networking', 'Entrevista técnica', 'Comunicação', 'Estratégia'],
    mission: [
      'Definir 10 empresas alvo específicas e identificar referrals para cada uma',
      'Estabelecer ritmo de 5 aplicações semanais com CV personalizado por empresa',
      'Agendar entrevista simulada com amigo dev e gravar para autocrítica',
    ],
    prerequisites: [
      { type: 'module', label: 'Portfólio que Vende', ref: 'portfolio' },
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
    ],
    connections: [
      { type: 'module', label: 'Portfólio que Vende', ref: 'portfolio' },
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'module', label: 'TDD', ref: 'tdd' },
      { type: 'module', label: 'Fullstack', ref: 'fullstack' },
    ],
    summary: [
      { icon: '📨', title: '5-10 apps/semana',     description: 'Qualidade > quantidade. CV único por empresa explicando "por que essa empresa".' },
      { icon: '🤝', title: 'Networking é silencioso', description: 'Não é pedir vaga. É construir conexões — eventos, OSS, Discord — que resultam em vaga.' },
      { icon: '🔍', title: 'LinkedIn = indexável',  description: 'Recrutador busca por skills + região. Sem headline e featured, você não existe.' },
      { icon: '🎯', title: 'Entrevista é calma',     description: 'Live coding = prática diária 30min. Take-home com testes, README, ADR, deploy = diferencial.' },
    ],
    checklist: [
      'Tenho caderno de aplicações (empresa, data, contato, próximo passo).',
      'Aplico 5-10 vagas/semana, não 50 numa maratona isol.',
      'Meu LinkedIn tem headline técnica, "Sobre" em 3 parágrafos e projetos em destaque.',
      'Contribuo em open source ou participo de comunidades das empresas-alvo.',
      'Simulei entrevista com amigo dev pelo menos 1 vez.',
    ],
    exercises: [
      { scenario: 'Você recebeu um "não" após entrevista técnica.', prompt: '3 ações concretas para extrair valor do feedback.', },
      { scenario: 'Sem vaga há 6 meses.', prompt: 'Quais 4 variáveisauditar (CV, LinkedIn, portfólio, entrevista)?', },
      { scenario: 'Vaga júnior com 500 candidatos. Oportunidade de referral?', prompt: 'Como conseguir um referral sem pedir employmentologicamente?', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Portfólio que Vende',      ref: 'portfolio' },
      { type: 'module',  label: 'Arquitetura de Software',   ref: 'arquitetura-software' },
      { type: 'module',  label: 'TDD',                        ref: 'tdd' },
    ],
  },

  livros: {
    slug: 'livros',
    title: 'Livros para Engenheiros de Software',
    subtitle: 'Tutoriais ajudam a fazer. Livros ajudam a pensar.',
    description:
      '5 livros essenciais: Clean Code (nomenclatura, funções pequenas), Pragmatic Programmer (mentalidade, DRY, Law of Demeter), Refactoring (code smells e refactorings nomeados), DDIA (trade-offs de armazenamento em escala) e DDD (ubiquitous language e bounded contexts).',
    level: 'Intermediário',
    readingTime: 8,
    technologies: [],
    tags: ['Carreira', 'Leitura', 'Fundamentos'],
    competencies: ['Leitura ativa', 'Aplicação prática', 'Trade-offs'],
    mission: [
      'Definir o lugar do livro vs. tutorial na formação de engenheiro',
      'Apresentar os 5 livros essenciais com nível ideal de leitura',
      'Ensinar um método de leitura ativa (aplicar 1 padrão por livro)',
      'Conectar cada livro a um projeto da UGP',
    ],
    prerequisites: [
      { type: 'module', label: 'Manifesto', ref: 'manifesto' },
      { type: 'module', label: 'Níveis', ref: 'niveis' },
    ],
    connections: [
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'module', label: 'TDD', ref: 'tdd' },
      { type: 'project', label: 'Projeto 09 — LMS', ref: '9' },
    ],
    summary: [
      { icon: '📘', title: 'Clean Code',       description: 'Junior 2-3. Código é lido 10x mais que escrito. Função = uma coisa. Comentários são falhas.' },
      { icon: '🧠', title: 'Pragmatic Programmer', description: 'Júnior 3/Pleno 1. DRY é sobre conhecimento, não código. Rubber ducking. Tracer bullets.' },
      { icon: '♻️', title: 'Refactoring',      description: 'Pleno 1. Refactor é sistemático: code smells → refactorings nomeados → passos pequenos.' },
      { icon: '💾', title: 'DDIA',             description: 'Pleno 2-3. SQL vs NoSQL, ACID vs eventual, replicação vs sharding. Trade-offs, não "certo".' },
      { icon: '🏛️', title: 'DDD',             description: 'Pleno 2-3/Sênior. Bounded Contexts, Aggregates, Repositories. Domínio primeiro.' },
    ],
    checklist: [
      'Tenho um hábito de leitura ativa (sublinho, anoto, discuto).',
      'Identifiquei um padrão no meu código que um livro contradiz.',
      'Apliquei pelo menos 1 conceito de um livro em um projeto real.',
      'Sei a faixa de nível adequada de cada livro (não pular DDD sem Clean Code).',
      'Escrevi um resumo de 1 página de um livro que terminei.',
    ],
    exercises: [
      { scenario: 'Você terminou Clean Code.', prompt: 'Liste 3 conceitos, 1 caso onde aplicaria e 1 onde NÃO aplicaria.', },
      { scenario: 'Colega diz "já é antigo, React 19 mudou tudo".', prompt: 'Argumente por que Clean Code ainda vale.', },
      { scenario: 'Você começa DDD sem ter lido Clean Code.', prompt: 'Que risco cor erra? Decisão:', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'module',  label: 'TDD',                      ref: 'tdd' },
      { type: 'project', label: 'Projeto 09 — LMS',        ref: '9' },
    ],
  },

  ux: {
    slug: 'ux',
    title: 'UX para Devs',
    subtitle: 'UX não é arte. É disciplina.',
    description:
      '5 princípios: affordance, feedback, hierarquia visual, consistência e visibilidade do estado do sistema. Toda UI deve ter 9 estados (default, hover, focus, active, disabled, loading, empty, error, success). Dev que não implementa loading/empty erra usuário.',
    level: 'Intermediário',
    readingTime: 9,
    technologies: ['Tailwind', 'shadcn/ui', 'Design Tokens'],
    tags: ['UX', 'Frontend'],
    competencies: ['UX', 'Empatia com usuário', 'Design system', 'Acessibilidade', 'Frontend'],
    mission: [
      'Aplicar os 5 princípios de UX (affordance, feedback, hierarquia, consistência, visibilidade)',
      'Implementar todos os 9 estados de cada componente de UI',
      'Escrever mensagens de erro com causa + ação',
      'Construir empty states com call-to-action',
      'Garantir contraste WCAG AA mínimo (4.5:1)',
    ],
    prerequisites: [
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'module', label: 'Fullstack Moderno', ref: 'fullstack' },
    ],
    connections: [
      { type: 'module', label: 'Fullstack Moderno', ref: 'fullstack' },
      { type: 'module', label: 'Portfólio', ref: 'portfolio' },
    ],
    summary: [
      { icon: '👆', title: 'Affordance',       description: 'Botão apertável, link clicável. Se não parece o que é, ninguém usa.' },
      { icon: '⚡', title: 'Feedback imediato', description: 'Toda ação tem resposta. Loading em > 300ms com skeleton, não "carregando…".' },
      { icon: '🎯', title: 'Estados vazios',    description: 'Lista sem itens? "Você ainda não criou projetos. [Criar]". Nunca branco.' },
      { icon: '🎨', title: 'Contraste WCAG',   description: 'Texto/cor com mínimo AA 4.5:1. Não é gosto — é acessibilidade.' },
    ],
    checklist: [
      'Todo botão da minha UI tem state loading + disabled.',
      'Toda lista tem empty state com call-to-action.',
      'Erros são específicos (causa + alternativa), não "algo deu errado".',
      'Meus componentes seguem um design system — consistência em bordas, cores, espaçamentos.',
      'Skeletons aparecem para cargas > 300ms, não spinners genéricos.',
    ],
    exercises: [
      { scenario: 'Form de cadastro: 3 campos + botão "Cadastrar".', prompt: 'Reescreva o UX bom: labels, validação inline, estado do botão.', },
      { scenario: 'Usuário clica "Salvar" e não vê resposta por 800ms.', prompt: 'Diagnóstico + solução em 1 frase.', },
      { scenario: 'Lista "Suas notas" está vazia.', prompt: 'Escreva o empty state e o por quê do branco ser ainda pior.', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Fullstack Moderno',   ref: 'fullstack' },
      { type: 'project', label: 'Projeto 01 — Todo',     ref: '1' },
      { type: 'project', label: 'Projeto 07 — SaaS',    ref: '7' },
    ],
  },

  // ── IA Aplicada ──────────────────────────────────────────
  'ia-aplicada': {
    slug: 'ia-aplicada',
    title: 'IA Aplicada para Devs',
    subtitle: 'IA é ferramenta. Não mestre. Não atalho.',
    description:
      'IA não é mágica — prediz texto (LLM), reconhece padrões (ML clássico) e gera código/imagem. Para dev, é uma camada extra: útil em tarefas fuzzy (resumir, traduzir, sugerir), perigosa em tarefas estruturadas (validar CPF, calcular preço).',
    level: 'Intermediário',
    readingTime: 6,
    technologies: ['LLMs', 'OpenAI', 'Anthropic', 'Copilot', 'Cursor'],
    tags: ['IA', 'Contexto'],
    competencies: ['Classificar tarefas (fuzzy vs. estruturada)', 'Avaliar quando NÃO usar IA', 'Identificar as 5 categorias de IA aplicada', 'Manter responsabilidade técnica ao delegar geração'],
    mission: [
      'Diferenciar IA aplicada de IA como buzzword em qualquer tarefa que encontrar',
    ],
    prerequisites: [
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
    ],
    connections: [
      { type: 'module', label: 'Engenharia de Prompt', ref: 'engenharia-prompt' },
      { type: 'module', label: 'Como NÃO Fazer Vibe Coding', ref: 'como-nao-fazer-vibe-coding' },
      { type: 'module', label: 'Boas Práticas com IA', ref: 'boas-praticas-ia' },
    ],
    summary: [
      { icon: '🤖', title: 'IA clássica vs ML vs LLM', description: 'Regras explícitas → aprendizado supervisionado → modelos de bilhões de parâmetros que alucinam.' },
      { icon: '✍️', title: 'Tipos de uso para dev',     description: 'Code completion, chat assistente, geração de testes/docs, RAG e agentes.' },
      { icon: '⚠️', title: 'Quando NÃO usar IA',       description: 'Cripto, regras fiscais, performance crítica — não aceite "otimizado". Use libs verificadas.' },
      { icon: '🧾', title: 'Contexto = 80% do prompt',  description: 'Pergunta vaga → IA adivinha. Especifique dados, schema, restrições — IA responde melhor.' },
    ],
    checklist: [
      'Diferencio IA clássica, ML clássico e LLM — e sei quando cada um serve.',
      'Sei listar 3 casos onde NÃO usar IA e justifico com argumento técnico.',
      'Não confio cegamente: leio output, valido fatos e código.',
      'Cito IA em commits quando ela autorou — transparência = senioridade.',
      'Peço trade-offs em vez de aceitar a primeira resposta ["forneça 2 alternativas"].',
    ],
    exercises: [
      { scenario: 'Você recebeu uma tarefa: validar CPF, calcular frete e mostrar endereço.', prompt: 'Qual parte IA ajuda? Qual não?', },
      { scenario: 'IA gerou código "que funciona" para um sistema de pagamento.', prompt: 'Quais 4 validações antes de commit?', },
      { scenario: 'Pedido "faça uma função para calcular frete" entrega implementação errada.', prompt: 'Reescreva o prompt com contexto suficiente.', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Engenharia de Prompt',     ref: 'engenharia-prompt' },
      { type: 'module',  label: 'Como NÃO Fazer Vibe Coding', ref: 'como-nao-fazer-vibe-coding' },
      { type: 'module',  label: 'Boas Práticas com IA',     ref: 'boas-praticas-ia' },
    ],
  },

  'engenharia-prompt': {
    slug: 'engenharia-prompt',
    title: 'Engenharia de Prompt',
    subtitle: 'A qualidade da resposta depende da qualidade da pergunta.',
    description:
      'Estruturar prompts com papel, contexto, tarefa, restrições, formato e trade-offs produz respostas úteis. Técnicas: few-shot, chain-of-thought, iteração. Primeiro output raramente é o final.',
    level: 'Intermediário',
    readingTime: 7,
    technologies: ['LLMs', 'Few-shot', 'Chain-of-thought'],
    tags: ['IA', 'Técnica'],
    competencies: ['Estruturar prompts com as 6 partes', 'Aplicar few-shot e chain-of-thought quando exigido', 'Iterar 2-3 rodadas em vez de aceitar o 1º output', 'Solicitar e avaliar trade-offs e alternativas'],
    mission: [
      'Operar a IA com prompts estruturados em vez de apenas "usá-la"',
    ],
    prerequisites: [
      { type: 'module', label: 'IA Aplicada para Devs', ref: 'ia-aplicada' },
    ],
    connections: [
      { type: 'module', label: 'Boas Práticas com IA', ref: 'boas-praticas-ia' },
      { type: 'module', label: 'Como NÃO Fazer Vibe Coding', ref: 'como-nao-fazer-vibe-coding' },
      { type: 'module', label: 'TDD', ref: 'tdd' },
    ],
    summary: [
      { icon: '🎭', title: 'Papel + contexto',   description: '"Você é sênior em X. Estou construindo Y com Z" — dá referência e escopo.' },
      { icon: '📐', title: '6 partes do prompt', description: 'Papel, contexto, tarefa, restrições, formato, pedido de trade-offs.' },
      { icon: '🧪', title: 'Few-shot',           description: 'Mostre exemplos input→output; IA generaliza o padrão.' },
      { icon: '🔁', title: 'Iteração',           description: 'Pedir, receber, refinar em 2-3 rodadas. Raramente o 1º output é final.' },
    ],
    checklist: [
      'Estruturo prompts com papel, contexto, tarefa, restrições e formato.',
      'Uso few-shot ou chain-of-thought quando o problema exige.',
      'Peço 2 alternativas com prós/contras — não aceito a primeira resposta.',
      'Quebro tarefas grandes em prompts sequenciais (design → code → test).',
      'Salvo templates excelentes que funcionaram para reutilizar.',
    ],
    exercises: [
      { scenario: 'Você pediu "faça um botão" e recebeu algo genérico.', prompt: 'Reescreva o prompt no formato de 6 partes.', },
      { scenario: 'Você vai pedir debug de um stack trace.', prompt: 'Escreva o template (contexto + tentativas + hipóteses + formato).', },
      { scenario: 'IA gerou solução e você quer saber se é a melhor.', prompt: 'Que pergunta você faz para a IA criticar a própria resposta?', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Como NÃO Fazer Vibe Coding', ref: 'como-nao-fazer-vibe-coding' },
      { type: 'module',  label: 'Boas Práticas com IA',      ref: 'boas-praticas-ia' },
      { type: 'module',  label: 'TDD',                         ref: 'tdd' },
    ],
  },

  'como-nao-fazer-vibe-coding': {
    slug: 'como-nao-fazer-vibe-coding',
    title: 'Como NÃO Fazer Vibe Coding',
    subtitle: 'Programar sentindo, sem entender. Isto é vibe coding.',
    description:
      'Vibe coding = IA gera, você cola sem ler, "parece que funciona", segue. Os 5 antipadrões: colar-e-push, não entender o que colou, pedir sistema inteiro de uma vez, confundir "funciona" com "certo" e assumir que IA conhece seu sistema.',
    level: 'Iniciante',
    readingTime: 6,
    technologies: ['IA', 'Cursor', 'Copilot'],
    tags: ['IA', 'Antipadrões'],
    competencies: ['Engenharia com IA', 'Revisão de código', 'Debug', 'Documentação', 'Decisão técnica'],
    mission: [
      'Identificar os 5 antipadrões do vibe coding no próprio fluxo de trabalho',
      'Adotar checklist de leitura obrigatória antes de commitar código gerado por IA',
      'Documentar decisões geradas com IA em ADRs transparentes',
    ],
    prerequisites: [
      { type: 'module', label: 'Engenharia de Prompt', ref: 'engenharia-prompt' },
      { type: 'module', label: 'Boas Práticas com IA', ref: 'boas-praticas-ia' },
    ],
    connections: [
      { type: 'module', label: 'Boas Práticas com IA', ref: 'boas-praticas-ia' },
      { type: 'module', label: 'Engenharia de Prompt', ref: 'engenharia-prompt' },
      { type: 'module', label: 'TDD', ref: 'tdd' },
      { type: 'module', label: 'GitHub', ref: 'github' },
      { type: 'module', label: 'Docs as Code', ref: 'docs-as-code' },
    ],
    summary: [
      { icon: '👁️', title: 'Leia cada linha',  description: 'Se não explica uma linha, pergunte à IA o que ela faz. Então entenda.' },
      { icon: '🧱', title: 'Build incremental', description: 'Peça uma peça. Teste. A próxima. IA cospe 5 arquivos sem saber sua estrutura.' },
      { icon: '🧪', title: 'Funciona ≠ certo',  description: 'useEffect em infinite loop funciona em dev, crasha em prod. Meça.' },
      { icon: '🚧', title: 'Aceitável? Sim, com etiqueta', description: 'Protótipo, hackathon, landing pessoal. NUNCA produção crítica (financeiro, saúde).' },
    ],
    checklist: [
      'Nunca commito código que não consigo explicar linha por linha.',
      'Peço features em passos incrementais, não "sistema inteiro de uma vez".',
      'Testo edge cases em todo output de IA — não aceito "funciona".',
      'Refatorei outputs de IA para o padrão do meu projeto.',
      'Comito com co-author transparente quando IA autorou.',
    ],
    exercises: [
      { scenario: 'Você pediu "sistema de notas completo com auth" e IA cuspeu 5 arquivos de 200 linhas.', prompt: 'Quais 3 passos corretos antes de colar em produção?', },
      { scenario: 'useEffect que roda a cada render está "funcionando" visualmente.', prompt: 'Por que isso é bug escondido? O que medir?', },
      { scenario: 'Você tem 3 meses de vibe coding e a IA caiu offline.', prompt: 'Que gaps ficam evidentes? Como diagnosticar?', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Boas Práticas com IA',    ref: 'boas-praticas-ia' },
      { type: 'module',  label: 'Engenharia de Prompt',     ref: 'engenharia-prompt' },
      { type: 'module',  label: 'TDD',                       ref: 'tdd' },
    ],
  },

  'boas-praticas-ia': {
    slug: 'boas-praticas-ia',
    title: 'Boas Práticas com IA',
    subtitle: 'IA como júnior inteligente. Você como revisor sênior.',
    description:
      'Workflow de 7 passos: definir problema (sem IA), esboçar solução (sem IA), prompt inicial, ler linha por linha, testar você mesmo, refatorar com estilo, comitar com transparência. "Geração" ≠ "qualidade" — só validação garante.',
    level: 'Intermediário',
    readingTime: 7,
    technologies: ['IA', 'Cursor', 'Copilot', 'CODEAuthors'],
    tags: ['IA', 'Workflow'],
    competencies: ['Aplicar o workflow de 7 passos', 'Validar output de IA linha a linha', 'Documentar autoria com co-author tags', 'Escalar boas práticas em time com templates e guidelines'],
    mission: [
      'Construir um workflow replicável e defensável em entrevista para uso de IA em produção',
    ],
    prerequisites: [
      { type: 'module', label: 'Engenharia de Prompt', ref: 'engenharia-prompt' },
      { type: 'module', label: 'Como NÃO Fazer Vibe Coding', ref: 'como-nao-fazer-vibe-coding' },
    ],
    connections: [
      { type: 'module', label: 'Engenharia de Prompt', ref: 'engenharia-prompt' },
      { type: 'module', label: 'Como NÃO Fazer Vibe Coding', ref: 'como-nao-fazer-vibe-coding' },
      { type: 'module', label: 'TDD', ref: 'tdd' },
      { type: 'module', label: 'Portfólio', ref: 'portfolio' },
    ],
    summary: [
      { icon: '🧭', title: 'Defina antes de abrir IA', description: 'Escreva problema, constraints e sucesso em markdown — clareia mentalmente.' },
      { icon: '📐', title: 'Esboce solução sem IA',    description: 'Rabisco em papel ou ASCII. A arquitetura é sua, IA é execução.' },
      { icon: '👁️', title: 'Leia linha por linha',     description: 'Explicar cada linha para si mesmo. Se não sabe, pergunte IA o que faz.' },
      { icon: '✨', title: 'Refatorar = assumir autoria', description: 'Renomeie, decomponha, ajuste JSDoc. Aqui IA 一些 turnos yours.' },
    ],
    checklist: [
      'Defino o problema em markdown antes de abrir a IA.',
      'Esboço arquitetura (rabisco/ASCII) sem IA antes do prompt.',
      'Leio cada linha do output; pergunto à IA o que não entendo.',
      'Escrevo os testes EU MESMO (IA pode ajudar, mas execução é minha).',
      'Comito com co-author transparente e adiciono contexto no PR.',
    ],
    exercises: [
      { scenario: 'Você quer adicionar uma feature no Projeto 07 (SaaS de Notas).', prompt: 'Aplique os 7 passos — liste-os para esse caso.', },
      { scenario: 'IA sugere criptografia caseira para senhas.', prompt: 'Qual passo do workflow detecta o erro? Decisão certa:', },
      { scenario: 'Você gerou 80% do código por IA e está em dúvida se commitar como seu.', prompt: 'Como documentar honestamente no PR?', },
    ],
    nextSteps: [
      { type: 'module',  label: 'TDD',                          ref: 'tdd' },
      { type: 'module',  label: 'Engenharia de Prompt',         ref: 'engenharia-prompt' },
      { type: 'project', label: 'Projeto IA 1 — Flashcards',    ref: 'projeto-ia-1' },
    ],
  },

  'projeto-ia-1': {
    slug: 'projeto-ia-1',
    title: 'Projeto IA 1 — SaaS de Flashcards com LLM',
    subtitle: 'Seu primeiro projeto IA-applied: integrar LLM com auth, RLS e custo real.',
    description:
      'Construa um SaaS multi-tenant que recebe markdown do usuário, chama uma LLM (OpenAI/Anthropic) e gera flashcards editáveis. Nível Pleno 2. Stack: Next.js 15 + Supabase + LLM API + Vitest/Playwright.',
    level: 'Avançado',
    readingTime: 9,
    technologies: ['Next.js', 'Supabase', 'LLM API', 'RLS', 'Streaming', 'Vitest'],
    tags: ['Projeto', 'IA'],
    competencies: ['Integração de LLM', 'RLS multi-tenant', 'Parse defensivo de JSON', 'Teste de prompt'],
    mission: [
      'Construir um SaaS de flashcards com geração via LLM',
      'Integrar auth do Supabase com RLS multi-usuário',
      'Estruturar prompt estável e testável',
      'Publicar app na Vercel',
    ],
    prerequisites: [
      { type: 'module', label: 'Engenharia de Prompt', ref: 'engenharia-prompt' },
      { type: 'module', label: 'Boas Práticas com IA', ref: 'boas-praticas-ia' },
      { type: 'module', label: 'Como NÃO Fazer Vibe Coding', ref: 'como-nao-fazer-vibe-coding' },
      { type: 'module', label: 'TDD', ref: 'tdd' },
      { type: 'project', label: 'Projeto 07 — SaaS de Notas', ref: '7' },
    ],
    connections: [
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'module', label: 'Fullstack', ref: 'fullstack' },
      { type: 'project', label: 'Projeto 09 — LMS', ref: '9' },
    ],
    summary: [
      { icon: '📚', title: 'Multi-tenant + RLS',  description: 'Cada usuário vê só seus decks. RLS garante no banco. Auth via Supabase.' },
      { icon: '🤖', title: 'Prompt estruturado',   description: 'Pedir JSON sem preâmbulo, sem números. Parse com try/catch — não confie em formato.' },
      { icon: '💸', title: 'Custo é real',         description: 'Cache por hash do markdown. Limite diário por usuário. Retry com backoff.' },
      { icon: '🧪', title: 'Testa o prompt',       description: 'Behavioural test: o output é JSON válido? cards têm front e back? Não basta testar UI.' },
    ],
    checklist: [
      'Sei proteger dados entre usuários com RLS em decks e flashcards.',
      'Faço parse defensivo da resposta LLM (JSON.parse try/catch + validação).',
      'Implemento cache por hash do deck para evitar custo redundante.',
      'Trato rate-limit e falhas da LLM API com retry + fallback.',
      'Escrevo pelo menos 1 teste behavioral do prompt (não só de UI).',
    ],
    exercises: [
      { scenario: 'LLM responde com "Aqui estão seus cards:" antes do JSON.', prompt: 'Como corrigir prompt e validar defensivamente?', },
      { scenario: 'Usuário free泰山 gerou 200 cards hoje, custo extrapolou.', prompt: 'Política de limites e cache?', },
      { scenario: 'Prompt gera cards com "Pergunta 1:", "Pergunta 2:".', prompt: 'Por que isso atrapalha o estudo? Como consertar no prompt?', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Projeto IA 2 — Code Reviewer', ref: 'projeto-ia-2' },
      { type: 'module',  label: 'Engenharia de Prompt',          ref: 'engenharia-prompt' },
      { type: 'project', label: 'Projeto 07 — SaaS de Notas',    ref: '7' },
    ],
  },

  'projeto-ia-2': {
    slug: 'projeto-ia-2',
    title: 'Projeto IA 2 — Code Reviewer com RAG',
    subtitle: 'IA com retrieval, custo controlado, infraestrutura. Difícil para 95% da comunidade.',
    description:
      'Construa uma ferramenta de code review que conecta repositórios GitHub, indexa o código via embeddings (pgvector) e gera review específica ao seu codebase. Nível Pleno 3 / Sênior. Stack: Next.js + Supabase + pgvector + Anthropic/OpenAI.',
    level: 'Avançado',
    readingTime: 11,
    technologies: ['pgvector', 'Supabase', 'Anthropic', 'Embeddings', 'GitHub OAuth', 'Playwright'],
    tags: ['Projeto', 'IA', 'RAG'],
    competencies: ['RAG pipeline', 'pgvector', 'Controle de custo de IA', 'Integração GitHub OAuth + webhooks'],
    mission: [
      'Construir um code reviewer com RAG baseado no próprio codebase',
      'Implementar indexação com embeddings em pgvector',
      'Recuperar chunks similares via busca semântica',
      'Gerar review contextual com LLM e postar no GitHub',
      'Controlar custo e auditar gerações',
    ],
    prerequisites: [
      { type: 'module', label: 'Projeto IA 1 — Flashcards', ref: 'projeto-ia-1' },
      { type: 'module', label: 'Engenharia de Prompt', ref: 'engenharia-prompt' },
      { type: 'module', label: 'Boas Práticas com IA', ref: 'boas-praticas-ia' },
      { type: 'module', label: 'Arquitetura de Software', ref: 'arquitetura-software' },
      { type: 'module', label: 'TDD', ref: 'tdd' },
    ],
    connections: [
      { type: 'project', label: 'Projeto 09 — LMS', ref: '9' },
      { type: 'project', label: 'Projeto 10 — Clone do Supabase', ref: '10' },
    ],
    summary: [
      { icon: '🗂️', title: 'Indexação com embeddings',  description: 'Chunk por arquivo (50-100 linhas), embedding via API, pgvector armazena. ivfflat para nearest neighbors.' },
      { icon: '🔍', title: 'RAG query',                 description: 'Embed do diff → busca top-5 similares → prompt com diff + contexto real do codebase.' },
      { icon: '💸', title: 'Custo controlado',          description: 'Re-embed só de diffs, cache por hash, rate-limit (free tier 5/dia).' },
      { icon: '🛡️', title: 'UX + segurança',            description: 'Streaming SSE para review ao vivo, webhook GitHub com HMAC validado, logs para auditoria.' },
    ],
    checklist: [
      'Sei configurar pgvector + índice ivfflat e fazer match por cosine similarity.',
      'Reindexo só diffs, não re-embeddo código inalterado.',
      'Valido a assinatura HMAC do webhook do GitHub antes de processar.',
      'Torno o file_path explícito no output esperado para evitar alucinação.',
      'Implemento streaming SSE para UX do review ao vivo.',
    ],
    exercises: [
      { scenario: 'Review cita arquivo que não existe no repo.', prompt: 'Causa provável e como fixar no prompt/pipeline?', },
      { scenario: 'A cada push você re-embeda 10000 chunks.', prompt: 'Que estratégia corta 90% do custo?', },
      { scenario: 'Um codebase pequeno (< 5000 LOC) quer usar seu reviewer.', prompt: 'Valeria a pena? Por quê?', },
    ],
    nextSteps: [
      { type: 'module',  label: 'Arquitetura de Software',      ref: 'arquitetura-software' },
      { type: 'module',  label: 'Boas Práticas com IA',         ref: 'boas-praticas-ia' },
      { type: 'project', label: 'Projeto 09 — LMS',             ref: '9' },
      { type: 'project', label: 'Projeto 10 — Clone do Supabase', ref: '10' },
    ],
  },
}

export const MODULE_META: Record<string, ModuleMeta> = M

export function getModuleMeta(slug: string): ModuleMeta | undefined {
  return M[slug]
}

// 所有读取并用到 common 占位符，让 exports 不报未使用警告 — 可在下方需要时使用
void common