"use client";

import { PlusCircle, Tag, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDailyLogs } from "@/hooks/useDailyLogs";

// 태그 목록 (API에서 가져오거나 동적으로 생성할 수도 있음)
const allTags = [
  "react",
  "typescript",
  "next.js",
  "tailwind",
  "css",
  "javascript",
  "api",
  "performance",
  "design",
  "testing",
  "node.js",
  "database",
];

/**
 * Displays and manages daily log entries with tag-based filtering and entry creation.
 *
 * Provides an interface to view, filter, and add daily log entries. Users can filter logs by tags, add new entries with associated tags, and view recent entries. The component maintains its own state for logs, tag selections, and filters.
 */
export function DailyLogView() {
  const router = useRouter();

  // useDailyLogs 커스텀 훅 사용
  const {
    logs,
    isLoading,
    error,
    hasMore,
    activeFilters,
    toggleFilter,
    clearFilters,
    loadMore,
  } = useDailyLogs();

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Button asChild>
          <a href="/daily-log/new">
            <PlusCircle className="mr-2 h-4 w-4" />새 로그 작성
          </a>
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg h-9 font-medium">Filter by Tags</h3>
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              초기화
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={activeFilters.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleFilter(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">최근 일일 로그</h3>

        {isLoading && logs.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 text-center text-red-500">
              {error}
            </CardContent>
          </Card>
        ) : logs.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              {activeFilters.length > 0
                ? "선택한 필터에 맞는 로그가 없습니다."
                : "아직 작성된 일일 로그가 없습니다. 새 로그를 작성해보세요!"}
            </CardContent>
          </Card>
        ) : (
          <>
            {logs.map((log) => (
              <Card key={log.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base flex items-center gap-2">
                      {new Date(log.created_at || "").toLocaleDateString(
                        "ko-KR",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">{log.title}</h3>
                  <p>{log.content}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {log.tags &&
                      log.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                  </div>
                  {log.autoLinkedGoals && log.autoLinkedGoals.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">
                        연결된 목표:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {log.autoLinkedGoals.map((goalId) => (
                          <Badge key={goalId} variant="outline">
                            {goalId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {hasMore && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      로딩 중...
                    </>
                  ) : (
                    "더 보기"
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
