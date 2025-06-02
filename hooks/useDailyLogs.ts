import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { fetchDailyLogs } from "@/lib/api/daily-logs";
import type { DailyLog } from "@/lib/types";

type UseDailyLogsOptions = {
  initialFilters?: string[];
  initialPage?: number;
  limit?: number;
};

/**
 * 일일 로그 데이터를 가져오고 관리하는 커스텀 훅
 *
 * @param options 초기 필터, 페이지, 한 페이지당 항목 수 등의 옵션
 * @returns 로그 데이터, 로딩 상태, 에러, 페이지네이션 및 필터링 관련 함수들
 */
export function useDailyLogs(options: UseDailyLogsOptions = {}) {
  const { initialFilters = [], initialPage = 1, limit = 10 } = options;

  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [totalLogs, setTotalLogs] = useState(0);

  /**
   * 로그 데이터를 가져오는 함수
   */
  const fetchData = useCallback(
    async (pageNum = 1, filters: string[] = []) => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchDailyLogs({
          page: pageNum,
          limit,
          tags: filters,
        });

        if (pageNum === 1) {
          setLogs(data.logs);
        } else {
          setLogs((prev) => [...prev, ...data.logs]);
        }

        setTotalLogs(data.total);
        setHasMore(data.logs.length === limit);
        setPage(pageNum);
      } catch (error) {
        console.error("일일 로그 조회 오류:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "일일 로그를 가져오는 중 오류가 발생했습니다.";

        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [limit]
  );

  /**
   * 필터 변경 시 로그 다시 가져오기
   */
  useEffect(() => {
    fetchData(1, activeFilters);
  }, [activeFilters, fetchData]);

  /**
   * 태그 필터 토글 함수
   */
  const toggleFilter = useCallback((tag: string) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  /**
   * 필터 초기화 함수
   */
  const clearFilters = useCallback(() => {
    setActiveFilters([]);
  }, []);

  /**
   * 더 많은 로그 가져오기 (무한 스크롤/페이지네이션)
   */
  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      fetchData(page + 1, activeFilters);
    }
  }, [activeFilters, fetchData, hasMore, isLoading, page]);

  /**
   * 데이터 새로고침 함수
   */
  const refresh = useCallback(() => {
    fetchData(1, activeFilters);
  }, [activeFilters, fetchData]);

  return {
    logs,
    isLoading,
    error,
    page,
    totalLogs,
    hasMore,
    activeFilters,
    toggleFilter,
    clearFilters,
    loadMore,
    refresh,
  };
}
