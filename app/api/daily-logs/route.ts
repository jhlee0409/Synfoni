import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CreateDailyLogRequest, CreateDailyLogResponse } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // 사용자 인증 확인
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }
    
    // 요청 데이터 파싱
    const { title, content, tags, linkedGoalIds }: CreateDailyLogRequest = await request.json();
    
    // 필수 필드 검증
    if (!title || !content) {
      return NextResponse.json(
        { error: "제목과 내용은 필수 입력 항목입니다." },
        { status: 400 }
      );
    }

    // 트랜잭션 시작
    const { data: dailyLog, error: logError } = await supabase
      .from("daily_logs")
      .insert({
        title,
        content,
        tags,
        user_id: user.id
      })
      .select()
      .single();
    
    if (logError) {
      console.error("일일 로그 저장 오류:", logError);
      return NextResponse.json(
        { error: "일일 로그를 저장하는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }
    
    // 연결된 목표 저장
    const linkedGoals = [];
    
    if (linkedGoalIds && linkedGoalIds.length > 0) {
      const goalInserts = linkedGoalIds.map((goalId) => ({
        daily_log_id: dailyLog.id,
        goal_id: goalId
      }));
      
      const { data: goals, error: goalsError } = await supabase
        .from("daily_logs_goals")
        .insert(goalInserts)
        .select();
      
      if (goalsError) {
        console.error("목표 연결 오류:", goalsError);
        // 목표 연결 실패해도 로그는 저장되었으므로 계속 진행
      } else if (goals) {
        linkedGoals.push(...goals);
      }
    }
    
    // 응답 반환
    const response: CreateDailyLogResponse = {
      dailyLog,
      linkedGoals
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // 사용자 인증 확인
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }
    
    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;
    
    // 태그 필터링 파라미터 추출
    const tagsParam = searchParams.get("tags");
    const tagFilters = tagsParam ? tagsParam.split(",").filter(Boolean) : [];
    
    // 일일 로그 조회 쿼리 구성
    let query = supabase
      .from("daily_logs")
      .select("*, daily_logs_goals(goal_id)", { count: "exact" })
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    
    // 태그 필터가 있는 경우 필터링 조건 추가
    if (tagFilters.length > 0) {
      // 배열에 특정 값이 포함되어 있는지 확인하는 쿼리
      // 각 태그가 logs.tags 배열에 포함되어 있는지 확인
      query = query.contains("tags", tagFilters);
    }
    
    // 페이지네이션 적용
    query = query.range(offset, offset + limit - 1);
    
    // 쿼리 실행
    const { data: logs, error, count } = await query;
    
    if (error) {
      console.error("일일 로그 조회 오류:", error);
      return NextResponse.json(
        { error: "일일 로그를 조회하는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }
    
    // 응답 데이터 가공
    const formattedLogs = logs.map(log => {
      const { daily_logs_goals, ...logData } = log;
      return {
        ...logData,
        autoLinkedGoals: daily_logs_goals.map((g: any) => g.goal_id)
      };
    });
    
    return NextResponse.json({
      logs: formattedLogs,
      total: count || 0,
      page,
      limit
    });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
