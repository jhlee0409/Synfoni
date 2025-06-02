import { supabase } from "@/utils/supabase/client"
import type { Database } from "@/lib/supabase-types"
import type { CreateDailyLogRequest, DailyLog, DailyLogGoal } from "@/lib/types"

type DailyLogsResponse = {
  logs: DailyLog[]
  total: number
  page: number
  limit: number
}

type DailyLogsQueryParams = {
  page?: number
  limit?: number
  tags?: string[]
}

/**
 * 일일 로그 목록을 가져오는 API 함수
 * @param params 페이지네이션 및 필터링 파라미터
 */
export const fetchDailyLogs = async (params: DailyLogsQueryParams = {}): Promise<DailyLogsResponse> => {
  const { page = 1, limit = 10, tags = [] } = params
  
  // API 쿼리 파라미터 구성
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })
  
  // 태그 필터가 있는 경우 추가
  if (tags.length > 0) {
    queryParams.append("tags", tags.join(","))
  }
  
  const response = await fetch(`/api/daily-logs?${queryParams.toString()}`)
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "일일 로그를 가져오는 중 오류가 발생했습니다.")
  }
  
  return response.json()
}

/**
 * 일일 로그를 생성하는 API 함수
 * @param data 생성할 로그 데이터
 */
export const createDailyLog = async (data: CreateDailyLogRequest) => {
  const response = await fetch("/api/daily-logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "일일 로그 저장에 실패했습니다.")
  }
  
  return response.json()
}

/**
 * Supabase 클라이언트를 직접 사용하여 일일 로그를 가져오는 함수
 * 서버 컴포넌트나 API 라우트에서 사용 가능
 */
export const getDailyLogsFromSupabase = async (userId: string, options: { 
  page?: number
  limit?: number
  tags?: string[]
} = {}) => {
  const { page = 1, limit = 10, tags = [] } = options
  const offset = (page - 1) * limit
  
  let query = supabase
    .from("daily_logs")
    .select("*, daily_logs_goals(goal_id)", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)
  
  // 태그 필터링 적용
  if (tags.length > 0) {
    // 배열에 특정 값이 포함되어 있는지 확인하는 쿼리
    // 'tags' 배열이 'tags' 파라미터의 모든 값을 포함하는지 확인
    query = query.contains("tags", tags)
  }
  
  const { data, error, count } = await query
  
  if (error) {
    throw error
  }
  
  // 응답 데이터 가공
  const formattedLogs = data?.map(log => {
    const { daily_logs_goals, ...logData } = log
    return {
      ...logData,
      autoLinkedGoals: daily_logs_goals?.map((g: any) => g.goal_id) || []
    }
  }) || []
  
  return {
    logs: formattedLogs as DailyLog[],
    total: count || 0,
    page,
    limit
  }
}

/**
 * Supabase 클라이언트를 직접 사용하여 일일 로그를 생성하는 함수
 * 서버 컴포넌트나 API 라우트에서 사용 가능
 */
export const createDailyLogWithSupabase = async (
  userId: string, 
  data: Omit<CreateDailyLogRequest, "userId">
) => {
  const { title, content, tags, linkedGoalIds } = data
  
  // 트랜잭션 시작 (Supabase는 실제 트랜잭션을 지원하지 않지만 논리적으로 그룹화)
  const { data: dailyLog, error: logError } = await supabase
    .from("daily_logs")
    .insert({
      title,
      content,
      tags,
      user_id: userId
    })
    .select()
    .single()
  
  if (logError) {
    throw logError
  }
  
  // 연결된 목표 저장
  const linkedGoals: DailyLogGoal[] = []
  
  if (linkedGoalIds && linkedGoalIds.length > 0 && dailyLog) {
    const goalInserts = linkedGoalIds.map((goalId) => ({
      daily_log_id: dailyLog.id,
      goal_id: goalId
    }))
    
    const { data: goals, error: goalsError } = await supabase
      .from("daily_logs_goals")
      .insert(goalInserts)
      .select()
    
    if (goalsError) {
      console.error("목표 연결 오류:", goalsError)
      // 목표 연결 실패해도 로그는 저장되었으므로 계속 진행
    } else if (goals) {
      linkedGoals.push(...goals as DailyLogGoal[])
    }
  }
  
  return {
    dailyLog,
    linkedGoals
  }
}
