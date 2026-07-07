export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
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
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          role?: 'admin' | 'user'
          selected_trail?: 'junior' | 'pleno' | 'senior' | null
          current_level?: string | null
          xp_points?: number
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      module_progress: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          created_by_id: string
          module_id: string
          completed: boolean
          completed_at: string | null
        }
        Insert: {
          id?: string
          created_by_id: string
          module_id: string
          completed?: boolean
          completed_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['module_progress']['Insert']>
      }
      project_checklist_progress: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          created_by_id: string
          project_id: number
          item_key: string
          is_checked: boolean
        }
        Insert: {
          id?: string
          created_by_id: string
          project_id: number
          item_key: string
          is_checked?: boolean
        }
        Update: Partial<Database['public']['Tables']['project_checklist_progress']['Insert']>
      }
      project_submissions: {
        Row: {
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
        Insert: {
          id?: string
          created_by_id: string
          project_id: number
          github_url: string
          production_url?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          submitted_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['project_submissions']['Insert']>
      }
      quiz_attempts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          created_by_id: string
          module_id: string
          score: number
          total: number
          percentage: number
          correct_ids: string[]
          incorrect_ids: string[]
          duration_ms: number
          xp_gain: number
        }
        Insert: {
          id?: string
          created_by_id: string
          module_id: string
          score?: number
          total?: number
          percentage?: number
          correct_ids?: string[]
          incorrect_ids?: string[]
          duration_ms?: number
          xp_gain?: number
        }
        Update: Partial<Database['public']['Tables']['quiz_attempts']['Insert']>
      }
    }
    Views: {
      quiz_best_per_module: {
        Row: {
          created_by_id: string
          module_id: string
          best_percentage: number
          best_score: number
          attempts: number
          comfortable_score: number | null
        }
      }
      user_progress_summary: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          selected_trail: 'junior' | 'pleno' | 'senior' | null
          current_level: string | null
          xp_points: number
          modules_completed: number
          projects_with_progress: number
          projects_approved: number
        }
      }
    }
  }
}