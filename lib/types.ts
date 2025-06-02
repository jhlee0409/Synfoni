// Basic type definitions
export type GoalStatus = "not-started" | "in-progress" | "completed" | "abandoned"
export type GoalCategory = "learning" | "project" | "career" | "skill" | "community" | "certification"

// Daily Log
export interface DailyLog {
  id: string
  title: string
  content: string
  tags: string[]
  created_at?: string
  updated_at?: string
  user_id?: string
  // Fields for automatic connection
  autoLinkedGoals?: string[] // Goal IDs automatically linked based on tags
}

// Weekly Goal
export interface WeeklyGoal {
  id: string
  title: string
  category: GoalCategory
  weekStartDate: string
  weekEndDate: string
  completed: boolean
  progress: number
  // Fields for automatic connection
  tags: string[] // For automatic connection based on tags
  relatedMilestoneId?: string // Connected milestone
}

// Milestone
export interface Milestone {
  id: string
  title: string
  description: string
  date: string
  type: string
  tags: string[]
  status: GoalStatus
  progress: number
  // Fields for automatic connection
  longTermGoalId?: string // Connected long-term goal
}

// Long-term Goal
export interface LongTermGoal {
  id: string
  title: string
  description: string
  category: GoalCategory
  targetDate?: string
  tags: string[]
  status: GoalStatus
  progress: number
  // Fields for automatic connection
  milestoneIds: string[] // Milestones belonging to this goal
}

// Daily Log Goal Connection (Junction Table)
export interface DailyLogGoal {
  id?: string
  daily_log_id: string
  goal_id: string
  created_at?: string
}

// API Request/Response Types
export interface CreateDailyLogRequest {
  title: string
  content: string
  tags: string[]
  linkedGoalIds: string[]
}

export interface CreateDailyLogResponse {
  dailyLog: DailyLog
  linkedGoals: DailyLogGoal[]
}
