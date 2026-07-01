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