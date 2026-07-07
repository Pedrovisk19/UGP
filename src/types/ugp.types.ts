export interface Profile {
  id: string
  full_name: string | null
  email: string | null
  role: 'admin' | 'user'
  selected_trail: 'junior' | 'pleno' | 'senior' | null
  current_level: string | null
  xp_points: number
  created_at: string
  updated_at: string
}

export interface ModuleProgress {
  id: string
  created_at: string
  updated_at: string
  created_by_id: string
  module_id: string
  completed: boolean
  completed_at: string | null
}

export interface ProjectChecklistProgress {
  id: string
  created_at: string
  updated_at: string
  created_by_id: string
  project_id: number
  item_key: string
  is_checked: boolean
}

export interface ProjectSubmission {
  id: string
  created_at: string
  updated_at: string
  created_by_id: string
  project_id: number
  github_url: string
  production_url: string | null
  status: 'pending' | 'approved' | 'rejected'
  submitted_at: string | null
}

export interface Level {
  key: string
  name: string
  xp: number
  knowledge: string
  limitation: string
  metric: string
  checklist: string[]
}

export interface Trail {
  id: string
  name: string
  tagline: string
  gradient: string
  glow: string
  border: string
}

export interface ProjectRequirement {
  key: string
  text: string
}

export interface Project {
  id: number
  name: string
  level: string
  xp: number
  problem: string
  context: string
  tags: string[]
  functional: ProjectRequirement[]
  nonFunctional: ProjectRequirement[]
  acceptance: ProjectRequirement[]
  architecture: string
  shareMessage: string
}

export interface NavItem {
  slug: string
  label: string
  isMatrix?: boolean
  isSpecial?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export interface ContentArticle {
  title: string
  subtitle?: string
  body: string
}

export type ModuleLevel = 'Iniciante' | 'Intermediário' | 'Avançado'

export interface CalloutRef {
  /** ID da seção (âncora) dentro do módulo onde o conceito foi explicado */
  anchor: string
  label: string
}

export interface SummaryCard {
  icon: string
  title: string
  description: string
}

export interface ExerciseItem {
  /** contexto do problema */
  scenario: string
  /** o que se pede */
  prompt: string
  /** dica curta opcional */
  hint?: string
}

export interface NextStepRef {
  type: 'module' | 'project' | 'tech'
  label: string
  /** slug do módulo / id do projeto / nome da tech */
  ref: string
}

export interface ModuleMeta {
  slug: string
  title: string
  subtitle: string
  description: string
  level: ModuleLevel
  /** tempo médio de leitura em minutos */
  readingTime: number
  /** tecnologias relacionadas */
  technologies: string[]
  /** categorias/etiquetas curtas que aparecem no Hero */
  tags?: string[]
  /** resumo visual ao final, em cards */
  summary: SummaryCard[]
  /** checklist de-fixação */
  checklist: string[]
  /** exercícios práticos */
  exercises: ExerciseItem[]
  /** referências para onde ir depois */
  nextSteps: NextStepRef[]
}

// ── Quiz ─────────────────────────────────────────────────────
export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'assoc'
  | 'order'
  | 'scenario'
  | 'engineering'

export type Difficulty = 'basic' | 'intermediate' | 'advanced'

export type QuestionCategory =
  | 'conceito'
  | 'interpretacao'
  | 'decisao'
  | 'raciocinio'
  | 'aplicacao'
  | 'contexto'
  | 'seguranca'

export interface MultipleChoiceQuestion {
  id: string
  type: 'multiple-choice'
  difficulty: Difficulty
  category: QuestionCategory
  question: string
  options: string[]
  correct: number
  explanation: string
  /** por que cada alternativa errada está errada */
  why: string[]
  /** âncora p/ revisão */
  reviewAnchor: string
}

export interface TrueFalseQuestion {
  id: string
  type: 'true-false'
  difficulty: Difficulty
  category: QuestionCategory
  question: string
  correct: boolean
  explanation: string
  why?: string[]
  reviewAnchor: string
}

export interface AssocQuestion {
  id: string
  type: 'assoc'
  difficulty: Difficulty
  category: QuestionCategory
  question: string
  /** pares corretos (esquerda -> direita). As opções exibidas são embaralhadas. */
  pairs: { left: string; right: string }[]
  reviewAnchor: string
}

export interface OrderQuestion {
  id: string
  type: 'order'
  difficulty: Difficulty
  category: QuestionCategory
  question: string
  /** etapas na ordem correta. O card embaralha para o aluno reordenar. */
  steps: string[]
  reviewAnchor: string
}

export interface ScenarioQuestion {
  id: string
  type: 'scenario'
  difficulty: Difficulty
  category: QuestionCategory
  scenario: string
  question: string
  options: string[]
  correct: number
  explanation: string
  why: string[]
  reviewAnchor: string
}

export interface EngineeringQuestion {
  id: string
  type: 'engineering'
  difficulty: Difficulty
  category: QuestionCategory
  question: string
  options: string[]
  correct: number
  explanation: string
  why: string[]
  reviewAnchor: string
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | AssocQuestion
  | OrderQuestion
  | ScenarioQuestion
  | EngineeringQuestion

export interface QuizModule {
  slug: string
  questions: Question[]
}