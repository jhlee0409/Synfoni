export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      daily_logs: {
        Row: {
          content: string
          created_at: string | null
          id: string
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      daily_logs_goals: {
        Row: {
          created_at: string | null
          daily_log_id: string | null
          goal_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          daily_log_id?: string | null
          goal_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          daily_log_id?: string | null
          goal_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_logs_goals_daily_log_id_fkey"
            columns: ["daily_log_id"]
            isOneToOne: false
            referencedRelation: "daily_logs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Supabase 타입 헬퍼
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
