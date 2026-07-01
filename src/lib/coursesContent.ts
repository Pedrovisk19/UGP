export interface Course {
  name: string
  instructor: string
  channel: string
  url: string
  duration: string
  level: string
  learn: string
  why: string
  ugProjects: number[]
  next: string
}

export interface CourseCategory {
  id: string
  name: string
  courses: Course[]
}

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    id: 'html-css',
    name: 'HTML & CSS',
    courses: [
      {
        name: 'HTML & CSS Completo',
        instructor: 'Guanabara',
        channel: 'Curso em Vídeo',
        url: 'https://www.youtube.com/playlist?list=PLHz_AreHm4dkZ2-atQBjZ2uPCelP6wPAB',
        duration: '20h',
        level: 'Iniciante',
        learn: 'Tags semânticas, posicionamento, responsividade',
        why: 'Fundação visual de qualquer interface',
        ugProjects: [1, 2],
        next: 'JavaScript',
      },
    ],
  },
  {
    id: 'js',
    name: 'JavaScript',
    courses: [
      {
        name: 'JavaScript Ninja',
        instructor: 'Fernando Daciuk',
        channel: 'YouTube',
        url: '#',
        duration: '40h',
        level: 'Iniciante/Intermediário',
        learn: 'Arrays, funções, assíncrono, fetch',
        why: 'JS é a linguagem da web',
        ugProjects: [1, 2, 3],
        next: 'React',
      },
    ],
  },
  {
    id: 'git',
    name: 'Git',
    courses: [
      {
        name: 'Git & GitHub na Prática',
        instructor: 'Mario Souto',
        channel: 'YouTube',
        url: '#',
        duration: '4h',
        level: 'Iniciante',
        learn: 'Commits, branches, PRs, rebase',
        why: 'Colaboração e portfólio',
        ugProjects: [1, 2, 3],
        next: 'React',
      },
    ],
  },
  {
    id: 'react',
    name: 'React',
    courses: [
      {
        name: 'React Official Docs',
        instructor: 'React Team',
        channel: 'react.dev',
        url: 'https://react.dev/learn',
        duration: '20h',
        level: 'Intermediário',
        learn: 'Hooks, componentização, patterns',
        why: 'Framework dominante no mercado',
        ugProjects: [3, 4, 5, 6],
        next: 'Next.js',
      },
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    courses: [
      {
        name: 'Next.js Learn',
        instructor: 'Vercel',
        channel: 'nextjs.org/learn',
        url: 'https://nextjs.org/learn',
        duration: '10h',
        level: 'Intermediário',
        learn: 'App Router, Server Components, deploy',
        why: 'Padrão de produção em React',
        ugProjects: [5, 6],
        next: 'TypeScript',
      },
    ],
  },
  {
    id: 'ts',
    name: 'TypeScript',
    courses: [
      {
        name: 'TypeScript Handbook',
        instructor: 'Microsoft',
        channel: 'typescriptlang.org',
        url: 'https://www.typescriptlang.org/docs/handbook/',
        duration: '12h',
        level: 'Intermediário',
        learn: 'Tipos, generics, utility types',
        why: 'TS é padrão em projetos sérios',
        ugProjects: [5, 6, 7],
        next: 'Node',
      },
    ],
  },
  {
    id: 'node',
    name: 'Node.js',
    courses: [
      {
        name: 'Node.js Crash Course',
        instructor: 'Traversy Media',
        channel: 'YouTube',
        url: '#',
        duration: '10h',
        level: 'Intermediário',
        learn: 'Express, middlewares, REST',
        why: 'Backend abre o stack completo',
        ugProjects: [7, 8],
        next: 'PostgreSQL',
      },
    ],
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    courses: [
      {
        name: 'PostgreSQL Tutorial',
        instructor: 'Amigos da Code',
        channel: 'YouTube',
        url: '#',
        duration: '8h',
        level: 'Intermediário',
        learn: 'SQL, joins, índices, RLS',
        why: 'Banco relacional é universal',
        ugProjects: [7, 8],
        next: 'DevOps',
      },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps',
    courses: [
      {
        name: 'GitHub Actions',
        instructor: 'GitHub',
        channel: 'docs.github.com',
        url: 'https://docs.github.com/actions',
        duration: '6h',
        level: 'Intermediário',
        learn: 'Workflows, secrets, runners',
        why: 'CI/CD reduz medo de deploy',
        ugProjects: [9],
        next: 'Testes',
      },
    ],
  },
  {
    id: 'testes',
    name: 'Testes',
    courses: [
      {
        name: 'Vitest Docs',
        instructor: 'Vitest Team',
        channel: 'vitest.dev',
        url: 'https://vitest.dev',
        duration: '8h',
        level: 'Avançado',
        learn: 'Unit, component, mocks',
        why: 'Testes são a base do TDD',
        ugProjects: [9, 10],
        next: 'Arquitetura',
      },
    ],
  },
  {
    id: 'arquitetura',
    name: 'Arquitetura',
    courses: [
      {
        name: 'Designing Data-Intensive Applications',
        instructor: 'Martin Kleppmann',
        channel: 'Livro',
        url: '#',
        duration: '40h',
        level: 'Sênior',
        learn: 'Sistemas distribuídos, consistência, escalabilidade',
        why: 'Leitura que separa júnior de sênior',
        ugProjects: [10],
        next: 'Carreira',
      },
    ],
  },
]

export const STUDY_PLAN_WEEKS = [
  { week: '1-3', focus: 'HTML/CSS', milestone: 'Landing page no ar' },
  { week: '4-9', focus: 'JavaScript', milestone: 'CRUD em JS puro' },
  { week: '10-12', focus: 'Git', milestone: 'Todos projetos no GitHub' },
  { week: '13-18', focus: 'React', milestone: 'Projeto 04 (Kanban)' },
  { week: '19-22', focus: 'Next.js', milestone: 'Projeto 05 (Blog)' },
  { week: '23-25', focus: 'TypeScript', milestone: 'Projeto 07 (SaaS)' },
  { week: '26-28', focus: 'Backend + Testes', milestone: 'Projeto 09 (LMS)' },
]