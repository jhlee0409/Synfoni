import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createDailyLog } from "@/lib/api/daily-logs"
import type { CreateDailyLogRequest } from "@/lib/types"

type UseCreateDailyLogOptions = {
  redirectPath?: string
  onSuccess?: () => void
  onError?: (error: Error) => void
}

/**
 * 일일 로그 생성을 위한 커스텀 훅
 * 
 * @param options 리디렉션 경로, 성공/실패 콜백 등의 옵션
 * @returns 로그 생성 함수, 로딩 상태, 에러 상태
 */
export function useCreateDailyLog(options: UseCreateDailyLogOptions = {}) {
  const { 
    redirectPath = "/daily-log", 
    onSuccess, 
    onError 
  } = options
  
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  /**
   * 일일 로그 생성 함수
   */
  const createLog = useCallback(async (data: CreateDailyLogRequest) => {
    try {
      setIsSubmitting(true)
      setError(null)
      
      await createDailyLog(data)
      
      toast.success("일일 로그가 성공적으로 저장되었습니다.")
      
      if (onSuccess) {
        onSuccess()
      }
      
      if (redirectPath) {
        router.push(redirectPath)
      }
      
      return true
    } catch (err) {
      const error = err instanceof Error ? err : new Error("일일 로그 저장 중 오류가 발생했습니다.")
      
      console.error("일일 로그 저장 오류:", error)
      setError(error)
      toast.error(error.message)
      
      if (onError) {
        onError(error)
      }
      
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [onError, onSuccess, redirectPath, router])
  
  return {
    createLog,
    isSubmitting,
    error
  }
}
