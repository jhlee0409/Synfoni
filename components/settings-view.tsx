"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  Bell,
  ChevronRight,
  Cloud,
  CreditCard,
  Download,
  Github,
  Globe,
  HelpCircle,
  Key,
  LayoutGrid,
  Lock,
  Mail,
  Moon,
  Settings2,
  Sun,
  Trash2,
  Upload,
  UserCog,
} from "lucide-react"

import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

/****
 * Renders a comprehensive, multi-tabbed user settings interface for managing account, appearance, notifications, privacy, preferences, integrations, and data management options.
 *
 * The component organizes settings into categorized tabs, each containing grouped controls such as toggles, selectors, and action buttons for user preferences. All UI text is localized in Korean.
 */
export function SettingsView() {
  const { theme, setTheme } = useTheme()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [mentionNotifications, setMentionNotifications] = useState(true)
  const [commentNotifications, setCommentNotifications] = useState(true)
  const [achievementNotifications, setAchievementNotifications] = useState(true)
  const [publicProfile, setPublicProfile] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [defaultPrivacy, setDefaultPrivacy] = useState("private")
  const [defaultView, setDefaultView] = useState("daily")
  const [streakMode, setStreakMode] = useState("strict")
  const [accentColor, setAccentColor] = useState("blue")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">설정</h1>
        <p className="text-muted-foreground">계정 설정 및 앱 환경설정을 관리하세요.</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7">
          <TabsTrigger value="account">계정</TabsTrigger>
          <TabsTrigger value="appearance">외관</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="privacy">개인정보 및 공유</TabsTrigger>
          <TabsTrigger value="preferences">환경설정</TabsTrigger>
          <TabsTrigger value="integrations">연동</TabsTrigger>
          <TabsTrigger value="data">데이터 관리</TabsTrigger>
        </TabsList>

        {/* 계정 설정 */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>프로필 정보</CardTitle>
              <CardDescription>개인 프로필 정보를 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-3 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="@username" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    프로필 사진 변경
                  </Button>
                  <Button variant="outline" size="sm">
                    사진 삭제
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" placeholder="이름을 입력하세요" defaultValue="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">사용자명</Label>
                  <Input id="username" placeholder="사용자명을 입력하세요" defaultValue="johndoe" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="이메일을 입력하세요" defaultValue="john.doe@example.com" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title">직함</Label>
                <Input id="title" placeholder="직함을 입력하세요" defaultValue="Full Stack Developer" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">소개</Label>
                <Textarea
                  id="bio"
                  placeholder="자기소개를 입력하세요"
                  defaultValue="React, TypeScript, Node.js를 사용하는 개발자입니다. 새로운 기술을 배우고 성장하는 과정을 기록합니다."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">취소</Button>
              <Button>저장</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>계정 보안</CardTitle>
              <CardDescription>계정 보안 설정을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <Label>비밀번호</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">마지막 변경: 3개월 전</p>
                </div>
                <Button variant="outline">비밀번호 변경</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <Label>2단계 인증</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">계정 보안을 강화하세요.</p>
                </div>
                <Button variant="outline">설정</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <UserCog className="h-4 w-4 text-muted-foreground" />
                    <Label>로그인 활동</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">최근 로그인 기록을 확인하세요.</p>
                </div>
                <Button variant="outline">보기</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>계정 관리</CardTitle>
              <CardDescription>계정 상태 및 구독을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <Label>구독 상태</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">무료 플랜</Badge>
                    <span className="text-sm text-muted-foreground">월 50개 로그 제한</span>
                  </div>
                </div>
                <Button>업그레이드</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <Label className="text-destructive">계정 삭제</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">모든 데이터가 영구적으로 삭제됩니다.</p>
                </div>
                <Button variant="destructive">계정 삭제</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 외관 설정 */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>테마 설정</CardTitle>
              <CardDescription>앱의 외관을 사용자 지정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>테마 모드</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    라이트
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    다크
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setTheme("system")}
                  >
                    <Settings2 className="mr-2 h-4 w-4" />
                    시스템
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>강조 색상</Label>
                <RadioGroup value={accentColor} onValueChange={setAccentColor} className="grid grid-cols-3 gap-2">
                  <div>
                    <RadioGroupItem value="blue" id="blue" className="sr-only" />
                    <Label
                      htmlFor="blue"
                      className={`flex cursor-pointer items-center justify-center rounded-md border-2 p-4 ${
                        accentColor === "blue" ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <div className="h-6 w-6 rounded-full bg-blue-600" />
                      <span className="ml-2">블루</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="green" id="green" className="sr-only" />
                    <Label
                      htmlFor="green"
                      className={`flex cursor-pointer items-center justify-center rounded-md border-2 p-4 ${
                        accentColor === "green" ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <div className="h-6 w-6 rounded-full bg-green-600" />
                      <span className="ml-2">그린</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="purple" id="purple" className="sr-only" />
                    <Label
                      htmlFor="purple"
                      className={`flex cursor-pointer items-center justify-center rounded-md border-2 p-4 ${
                        accentColor === "purple" ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <div className="h-6 w-6 rounded-full bg-purple-600" />
                      <span className="ml-2">퍼플</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>폰트 크기</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="폰트 크기 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">작게</SelectItem>
                    <SelectItem value="medium">중간</SelectItem>
                    <SelectItem value="large">크게</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-view">컴팩트 뷰</Label>
                  <p className="text-sm text-muted-foreground">UI 요소 간격을 줄여 더 많은 콘텐츠를 표시합니다.</p>
                </div>
                <Switch id="compact-view" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">애니메이션</Label>
                  <p className="text-sm text-muted-foreground">UI 애니메이션을 활성화합니다.</p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">기본값으로 재설정</Button>
              <Button>저장</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>대시보드 레이아웃</CardTitle>
              <CardDescription>대시보드 레이아웃을 사용자 지정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>대시보드 위젯 배열</Label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  <Button variant="outline" className="justify-start">
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    위젯 관리
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sidebar-collapsed">사이드바 기본 상태</Label>
                  <p className="text-sm text-muted-foreground">사이드바의 기본 표시 상태를 설정합니다.</p>
                </div>
                <Select defaultValue="expanded">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="사이드바 상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expanded">확장됨</SelectItem>
                    <SelectItem value="collapsed">축소됨</SelectItem>
                    <SelectItem value="remember">마지막 상태 기억</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">기본값으로 재설정</Button>
              <Button>저장</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 알림 설정 */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>알림 환경설정</CardTitle>
              <CardDescription>알림 수신 방법을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email-notifications">이메일 알림</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">중요 알림을 이메일로 받습니다.</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="push-notifications">푸시 알림</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">브라우저 푸시 알림을 받습니다.</p>
                </div>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="weekly-digest">주간 요약</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">주간 활동 요약을 이메일로 받습니다.</p>
                </div>
                <Switch id="weekly-digest" checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>알림 유형</CardTitle>
              <CardDescription>수신할 알림 유형을 선택하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mention-notifications">멘션</Label>
                  <p className="text-sm text-muted-foreground">다른 사용자가 나를 멘션할 때 알림을 받습니다.</p>
                </div>
                <Switch
                  id="mention-notifications"
                  checked={mentionNotifications}
                  onCheckedChange={setMentionNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="comment-notifications">댓글</Label>
                  <p className="text-sm text-muted-foreground">내 로그에 댓글이 달릴 때 알림을 받습니다.</p>
                </div>
                <Switch
                  id="comment-notifications"
                  checked={commentNotifications}
                  onCheckedChange={setCommentNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="achievement-notifications">업적</Label>
                  <p className="text-sm text-muted-foreground">새로운 업적을 달성했을 때 알림을 받습니다.</p>
                </div>
                <Switch
                  id="achievement-notifications"
                  checked={achievementNotifications}
                  onCheckedChange={setAchievementNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="goal-reminders">목표 알림</Label>
                  <p className="text-sm text-muted-foreground">목표 마감일이 다가올 때 알림을 받습니다.</p>
                </div>
                <Switch id="goal-reminders" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">모두 끄기</Button>
              <Button>저장</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 개인정보 및 공유 설정 */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>공개 프로필</CardTitle>
              <CardDescription>공개 프로필 설정을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-profile">공개 프로필 활성화</Label>
                  <p className="text-sm text-muted-foreground">프로필을 다른 개발자에게 공개합니다.</p>
                </div>
                <Switch id="public-profile" checked={publicProfile} onCheckedChange={setPublicProfile} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>공유 수준</Label>
                <RadioGroup value={defaultPrivacy} onValueChange={setDefaultPrivacy}>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="public" className="font-medium">
                        모든 로그 공개
                      </Label>
                      <p className="text-sm text-muted-foreground">모든 개발 로그를 공개적으로 볼 수 있게 합니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="selective" id="selective" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="selective" className="font-medium">
                        선택적 공유
                      </Label>
                      <p className="text-sm text-muted-foreground">개별적으로 표시한 로그만 공개합니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="private" className="font-medium">
                        비공개 모드
                      </Label>
                      <p className="text-sm text-muted-foreground">프로필만 공개하고 로그는 공개하지 않습니다.</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>공개 프로필 URL</Label>
                <div className="flex items-center gap-2">
                  <Input defaultValue="Synfoni.com/u/johndoe" readOnly />
                  <Button variant="outline" size="sm">
                    복사
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  이 URL을 통해 다른 사람들이 귀하의 공개 프로필에 접근할 수 있습니다.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/public-logs">
                  공개 설정 관리
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>데이터 공유</CardTitle>
              <CardDescription>데이터 공유 설정을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activity-sharing">활동 통계 공유</Label>
                  <p className="text-sm text-muted-foreground">활동 통계를 공개 프로필에 표시합니다.</p>
                </div>
                <Switch id="activity-sharing" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="streak-sharing">연속 기록 공유</Label>
                  <p className="text-sm text-muted-foreground">연속 기록 정보를 공개 프로필에 표시합니다.</p>
                </div>
                <Switch id="streak-sharing" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-comments">댓글 허용</Label>
                  <p className="text-sm text-muted-foreground">다른 사용자가 공개 로그에 댓글을 달 수 있게 합니다.</p>
                </div>
                <Switch id="allow-comments" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 환경설정 */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>일반 환경설정</CardTitle>
              <CardDescription>앱 사용 환경을 사용자 지정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>기본 시작 화면</Label>
                <Select value={defaultView} onValueChange={setDefaultView}>
                  <SelectTrigger>
                    <SelectValue placeholder="기본 화면 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">대시보드</SelectItem>
                    <SelectItem value="daily">일일 로그</SelectItem>
                    <SelectItem value="weekly">주간 리뷰</SelectItem>
                    <SelectItem value="timeline">타임라인</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">자동 저장</Label>
                  <p className="text-sm text-muted-foreground">로그 작성 중 자동으로 저장합니다.</p>
                </div>
                <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>연속 기록 모드</Label>
                <Select value={streakMode} onValueChange={setStreakMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="연속 기록 모드 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strict">엄격 (매일 로그 필요)</SelectItem>
                    <SelectItem value="flexible">유연 (주 5일 로그)</SelectItem>
                    <SelectItem value="relaxed">여유 (주 3일 로그)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">연속 기록을 유지하기 위한 조건을 설정합니다.</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>날짜 형식</Label>
                <Select defaultValue="ymd">
                  <SelectTrigger>
                    <SelectValue placeholder="날짜 형식 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>시간 형식</Label>
                <Select defaultValue="24h">
                  <SelectTrigger>
                    <SelectValue placeholder="시간 형식 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12시간 (AM/PM)</SelectItem>
                    <SelectItem value="24h">24시간</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>언어</Label>
                <Select defaultValue="ko">
                  <SelectTrigger>
                    <SelectValue placeholder="언어 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">기본값으로 재설정</Button>
              <Button>저장</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>로그 작성 환경설정</CardTitle>
              <CardDescription>로그 작성 환경을 사용자 지정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="markdown-editor">마크다운 에디터</Label>
                  <p className="text-sm text-muted-foreground">마크다운 형식으로 로그를 작성합니다.</p>
                </div>
                <Switch id="markdown-editor" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="code-highlighting">코드 하이라이팅</Label>
                  <p className="text-sm text-muted-foreground">코드 블록에 구문 강조를 적용합니다.</p>
                </div>
                <Switch id="code-highlighting" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="spell-check">맞춤법 검사</Label>
                  <p className="text-sm text-muted-foreground">로그 작성 시 맞춤법을 검사합니다.</p>
                </div>
                <Switch id="spell-check" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>기본 태그</Label>
                <Input placeholder="쉼표로 구분된 태그 (예: react, typescript, learning)" />
                <p className="text-xs text-muted-foreground">새 로그 작성 시 자동으로 추가될 태그입니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 연동 설정 */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>서비스 연동</CardTitle>
              <CardDescription>외부 서비스와 연동하여 기능을 확장하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">GitHub 활동을 자동으로 로그에 추가합니다.</p>
                  </div>
                </div>
                <Button variant="outline">연결</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">블로그 연동</p>
                    <p className="text-sm text-muted-foreground">블로그 포스트를 자동으로 로그에 추가합니다.</p>
                  </div>
                </div>
                <Button variant="outline">연결</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                    <Cloud className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">클라우드 저장소</p>
                    <p className="text-sm text-muted-foreground">Google Drive, Dropbox 등과 연동합니다.</p>
                  </div>
                </div>
                <Button variant="outline">연결</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API 액세스</CardTitle>
              <CardDescription>API 키를 관리하고 외부 도구와 연동하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API 키</Label>
                <div className="flex items-center gap-2">
                  <Input type="password" value="••••••••••••••••" readOnly />
                  <Button variant="outline" size="sm">
                    보기
                  </Button>
                  <Button variant="outline" size="sm">
                    재생성
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  이 키를 사용하여 외부 도구에서 API에 접근할 수 있습니다.
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-access">API 액세스 활성화</Label>
                  <p className="text-sm text-muted-foreground">
                    외부 도구에서 API를 통해 데이터에 접근할 수 있게 합니다.
                  </p>
                </div>
                <Switch id="api-access" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                API 문서 보기
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 데이터 관리 */}
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>데이터 내보내기/가져오기</CardTitle>
              <CardDescription>데이터를 백업하거나 복원하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>데이터 내보내기</Label>
                <p className="text-sm text-muted-foreground">모든 로그와 설정을 JSON 또는 CSV 형식으로 내보냅니다.</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    JSON으로 내보내기
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    CSV로 내보내기
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>데이터 가져오기</Label>
                <p className="text-sm text-muted-foreground">이전에 내보낸 데이터를 가져옵니다.</p>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  파일에서 가져오기
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>데이터 관리</CardTitle>
              <CardDescription>데이터 저장 및 삭제 설정을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">자동 백업</Label>
                  <p className="text-sm text-muted-foreground">데이터를 주기적으로 자동 백업합니다.</p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>백업 주기</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue placeholder="백업 주기 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">매일</SelectItem>
                    <SelectItem value="weekly">매주</SelectItem>
                    <SelectItem value="monthly">매월</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <Label>데이터 삭제</Label>
                </div>
                <p className="text-sm text-muted-foreground">계정은 유지하면서 특정 데이터만 삭제합니다.</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="text-destructive">
                    모든 로그 삭제
                  </Button>
                  <Button variant="outline" className="text-destructive">
                    모든 설정 초기화
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>개인정보 처리방침</CardTitle>
              <CardDescription>개인정보 처리 관련 설정을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">분석 데이터 수집</Label>
                  <p className="text-sm text-muted-foreground">서비스 개선을 위한 익명 사용 데이터를 수집합니다.</p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cookies">쿠키 사용</Label>
                  <p className="text-sm text-muted-foreground">사용자 경험 개선을 위한 쿠키를 사용합니다.</p>
                </div>
                <Switch id="cookies" defaultChecked />
              </div>

              <Separator />

              <Button variant="link" className="h-auto p-0">
                개인정보 처리방침 보기
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
          <span>도움이 필요하신가요?</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">문서 보기</Button>
          <Button>지원 요청</Button>
        </div>
      </div>
    </div>
  )
}
