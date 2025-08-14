import { useMemo, useState } from "react";
import { MessageCircle, MapPin, Calendar, SlidersHorizontal, Clock, ThumbsUp, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// 타입 정의
 type User = {
  id: number;
  name: string;
  age: number;
  country: string;
  countryName: string;
  region: string;
  languages: string[];
  profileImage: string | null;
  status: "온라인" | "오프라인";
  availability: Array<"오전" | "오후" | "저녁" | "심야">;
  recommendCount: number;
};

const timeSlots = ["오전", "오후", "저녁", "심야"] as const;

type AgeGroup = "20대" | "30대" | "40대" | "50대";
const ageGroupsOptions = ["20대", "30대", "40대", "50대"] as const;

const ageToGroup = (age: number): AgeGroup | null => {
  if (age >= 20 && age < 30) return "20대";
  if (age >= 30 && age < 40) return "30대";
  if (age >= 40 && age < 50) return "40대";
  if (age >= 50 && age < 60) return "50대";
  return null;
};

const users: User[] = [
  { id: 1, name: "사라 (Sarah)", age: 28, country: "🇺🇸", countryName: "미국", region: "서울 강남구", languages: ["영어", "한국어"], profileImage: null, status: "온라인", availability: ["오전", "저녁"], recommendCount: 15 },
  { id: 2, name: "리나 (Lina)", age: 25, country: "🇻🇳", countryName: "베트남", region: "부산 해운대구", languages: ["베트남어", "한국어"], profileImage: null, status: "오프라인", availability: ["오후", "저녁"], recommendCount: 8 },
  { id: 3, name: "마리아 (Maria)", age: 32, country: "🇵🇭", countryName: "필리핀", region: "인천 연수구", languages: ["영어", "타갈로그어", "한국어"], profileImage: null, status: "온라인", availability: ["오전", "심야"], recommendCount: 22 },
  { id: 4, name: "메이 (Mei)", age: 22, country: "🇨🇳", countryName: "중국", region: "서울 서대문구", languages: ["중국어", "한국어"], profileImage: null, status: "온라인", availability: ["오후"], recommendCount: 12 },
  { id: 5, name: "유키 (Yuki)", age: 35, country: "🇯🇵", countryName: "일본", region: "경기 성남시", languages: ["일본어", "한국어"], profileImage: null, status: "오프라인", availability: ["저녁"], recommendCount: 18 },
  { id: 6, name: "나린 (Narin)", age: 41, country: "🇹🇭", countryName: "태국", region: "대구 달서구", languages: ["태국어", "한국어"], profileImage: null, status: "온라인", availability: ["오전", "오후"], recommendCount: 6 },
  { id: 7, name: "아마라 (Amara)", age: 29, country: "🇲🇳", countryName: "몽골", region: "인천 미추홀구", languages: ["몽골어", "한국어"], profileImage: null, status: "온라인", availability: ["심야"], recommendCount: 9 },
  { id: 8, name: "나탈리아 (Natalia)", age: 34, country: "🇷🇺", countryName: "러시아", region: "서울 마포구", languages: ["러시아어", "영어", "한국어"], profileImage: null, status: "오프라인", availability: ["오전", "저녁"], recommendCount: 31 },
  { id: 9, name: "라일라 (Layla)", age: 27, country: "🇺🇿", countryName: "우즈베키스탄", region: "경기 부천시", languages: ["우즈베크어", "러시아어", "한국어"], profileImage: null, status: "온라인", availability: ["오후"], recommendCount: 14 },
  { id: 10, name: "사라야 (Saraya)", age: 31, country: "🇳🇵", countryName: "네팔", region: "서울 구로구", languages: ["네팔어", "영어", "한국어"], profileImage: null, status: "오프라인", availability: ["저녁", "심야"], recommendCount: 7 },
  { id: 11, name: "안다니아 (Andania)", age: 24, country: "🇮🇩", countryName: "인도네시아", region: "인천 남동구", languages: ["인도네시아어", "영어", "한국어"], profileImage: null, status: "온라인", availability: ["오전"], recommendCount: 11 },
  { id: 12, name: "소피아 (Sophia)", age: 45, country: "🇰🇭", countryName: "캄보디아", region: "서울 관악구", languages: ["크메르어", "한국어"], profileImage: null, status: "오프라인", availability: ["오후", "저녁"], recommendCount: 5 },
  { id: 13, name: "마야 (Maya)", age: 39, country: "🇲🇲", countryName: "미얀마", region: "대전 유성구", languages: ["버마어", "영어", "한국어"], profileImage: null, status: "온라인", availability: ["오전", "오후"], recommendCount: 16 },
  { id: 14, name: "안나 (Anna)", age: 26, country: "🇮🇳", countryName: "인도", region: "서울 동대문구", languages: ["힌디어", "영어", "한국어"], profileImage: null, status: "온라인", availability: ["저녁"], recommendCount: 19 },
  { id: 15, name: "아이샤 (Aisha)", age: 33, country: "🇵🇰", countryName: "파키스탄", region: "부산 남구", languages: ["우르두어", "영어", "한국어"], profileImage: null, status: "오프라인", availability: ["오전", "심야"], recommendCount: 13 },
  { id: 16, name: "아일라 (Aila)", age: 52, country: "🇰🇬", countryName: "키르기스스탄", region: "서울 성북구", languages: ["키르기스어", "러시아어", "한국어"], profileImage: null, status: "온라인", availability: ["오전"], recommendCount: 3 },
  { id: 17, name: "알리나 (Alina)", age: 48, country: "🇰🇿", countryName: "카자흐스탄", region: "인천 계양구", languages: ["카자흐어", "러시아어", "한국어"], profileImage: null, status: "오프라인", availability: ["오후"], recommendCount: 4 },
  { id: 18, name: "지에 (Gia)", age: 23, country: "🇱🇦", countryName: "라오스", region: "광주 북구", languages: ["라오어", "태국어", "한국어"], profileImage: null, status: "온라인", availability: ["심야"], recommendCount: 10 },
  { id: 19, name: "니샤 (Nisha)", age: 37, country: "🇱🇰", countryName: "스리랑카", region: "서울 은평구", languages: ["싱할라어", "영어", "한국어"], profileImage: null, status: "온라인", availability: ["오전", "저녁"], recommendCount: 25 },
  { id: 20, name: "하나 (Hana)", age: 55, country: "🇲🇾", countryName: "말레이시아", region: "경기 고양시", languages: ["말레이어", "영어", "한국어"], profileImage: null, status: "오프라인", availability: ["오후", "저녁"], recommendCount: 2 },
];

export const UserMatching = () => {
  const [countryFilter, setCountryFilter] = useState<string>("전체");
  const [timeFilter, setTimeFilter] = useState<string>("전체");
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string>("전체");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const uniqueCountries = useMemo(
    () => Array.from(new Set(users.map((u) => u.countryName))),
    []
  );

  const uniqueLanguages = useMemo(
    () => Array.from(new Set(users.flatMap((u) => u.languages))),
    []
  );

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchCountry = countryFilter === "전체" || u.countryName === countryFilter;
      const matchTime = timeFilter === "전체" || u.availability.includes(timeFilter as any);
      const group = ageToGroup(u.age);
      const matchAge = ageGroups.length === 0 || (group !== null && ageGroups.includes(group));
      const matchLanguage = languageFilter === "전체" || u.languages.includes(languageFilter);
      return matchCountry && matchTime && matchAge && matchLanguage;
    });
  }, [countryFilter, timeFilter, ageGroups, languageFilter]);

  const resetFilters = () => {
    setCountryFilter("전체");
    setTimeFilter("전체");
    setAgeGroups([]);
    setLanguageFilter("전체");
  };

  const handleStartChat = (userId: number, userName: string) => {
    console.log(`Starting chat with user ${userId}: ${userName}`);
  };

  const handleRecommend = (userId: number, userName: string) => {
    console.log(`Recommending user ${userId}: ${userName}`);
    // TODO: 추천 로직 구현
  };

  const handleReport = (userId: number, userName: string) => {
    console.log(`Reporting user ${userId}: ${userName}`);
    // TODO: 신고 로직 구현
  };

  const openDetail = (user: User) => {
    setSelectedUser(user);
    setDetailOpen(true);
  };

  return (
    <section aria-label="친구 찾기" className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">우링 친구 찾기</h2>
      </div>

      {/* 필터 카드 */}
      <Card className="p-4 border-0 shadow-card bg-gradient-card">
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <span>필터를 설정해보세요</span>
          <span className="ml-auto text-xs">결과: {filteredUsers.length}명</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* 국적 */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">국적</label>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="국적 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                {uniqueCountries.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 이용 시간대 */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">시간대</label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="시간대" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                {timeSlots.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 교환언어 */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">언어</label>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="언어" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                {uniqueLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 연령대 */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1">연령대</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {ageGroups.length === 0 ? "전체" : ageGroups.join(",")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 z-50 bg-popover">
                <DropdownMenuLabel>연령대 선택</DropdownMenuLabel>
                {ageGroupsOptions.map((g) => (
                  <DropdownMenuCheckboxItem
                    key={g}
                    checked={ageGroups.includes(g)}
                    onCheckedChange={(checked) => {
                      if (checked) setAgeGroups([...ageGroups, g]);
                      else setAgeGroups(ageGroups.filter((v) => v !== g));
                    }}
                  >
                    {g}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 초기화 버튼 */}
          <div>
            <label className="block text-xs text-transparent mb-1">.</label>
            <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
              초기화
            </Button>
          </div>
        </div>
      </Card>

      {/* 결과 그리드 */}
      <div className="grid grid-cols-3 gap-3">
        {filteredUsers.map((user) => (
          <Card
            role="button"
            aria-label={`${user.name} 프로필 열기`}
            key={user.id}
            onClick={() => openDetail(user)}
            className="p-2 border-0 shadow-card hover:shadow-floating transition-spring bg-gradient-card cursor-pointer"
          >
            <div className="flex flex-col items-center text-center gap-1">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profileImage || ""} />
                  <AvatarFallback className="bg-gradient-primary text-white text-xs font-semibold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    user.status === "온라인" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="text-center">
                <div className="font-semibold text-xs text-foreground">
                  {user.name.split(' (')[0]}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {user.name.includes('(') ? user.name.match(/\(([^)]+)\)/)?.[1] : ''}
                </div>
              </div>
              <Badge variant="secondary" className="text-[9px] px-1 py-0">
                {user.country}
              </Badge>
              <div className="flex flex-wrap gap-0.5 justify-center">
                {user.languages.slice(0, 1).map((lang, i) => (
                  <Badge key={i} variant="outline" className="text-[9px] px-1 py-0">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 상세 다이얼로그 */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          {selectedUser && (
            <div>
              <DialogHeader>
                <DialogTitle>{selectedUser.name}</DialogTitle>
                <DialogDescription>
                  프로필 상세 정보와 채팅을 시작해보세요.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-start gap-4 mt-2">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedUser.profileImage || ""} />
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                      {selectedUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      selectedUser.status === "온라인" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {selectedUser.country} {selectedUser.countryName}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {selectedUser.age}세
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {selectedUser.region}
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">내가 가르쳐줄 수 있는 언어:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedUser.languages.slice(0, 1).map((lang, i) => (
                          <Badge key={i} variant="default" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">내가 배우고 싶은 언어:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedUser.languages.slice(1).map((lang, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {selectedUser.availability.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>추천받은 횟수: {selectedUser.recommendCount}회</span>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleRecommend(selectedUser.id, selectedUser.name)}
                  className="flex-1"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" /> 추천
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleReport(selectedUser.id, selectedUser.name)}
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" /> 신고
                </Button>
                <Button
                  onClick={() => handleStartChat(selectedUser.id, selectedUser.name)}
                  className="flex-1 bg-gradient-primary hover:opacity-90 text-white border-0 shadow-soft transition-spring"
                >
                  <MessageCircle className="h-4 w-4 mr-2" /> 채팅
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
