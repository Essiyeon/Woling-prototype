import { useMemo, useState } from "react";
import { MessageCircle, MapPin, Calendar, SlidersHorizontal, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
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
};

const timeSlots = ["오전", "오후", "저녁", "심야"] as const;

const users: User[] = [
  {
    id: 1,
    name: "사라 (Sarah)",
    age: 28,
    country: "🇺🇸",
    countryName: "미국",
    region: "서울 강남구",
    languages: ["영어", "한국어"],
    profileImage: null,
    status: "온라인",
    availability: ["오전", "저녁"],
  },
  {
    id: 2,
    name: "리나 (Lina)",
    age: 25,
    country: "🇻🇳",
    countryName: "베트남",
    region: "부산 해운대구",
    languages: ["베트남어", "한국어"],
    profileImage: null,
    status: "오프라인",
    availability: ["오후", "저녁"],
  },
  {
    id: 3,
    name: "마리아 (Maria)",
    age: 32,
    country: "🇵🇭",
    countryName: "필리핀",
    region: "인천 연수구",
    languages: ["영어", "타갈로그어", "한국어"],
    profileImage: null,
    status: "온라인",
    availability: ["오전", "심야"],
  },
];

export const UserMatching = () => {
  const [countryFilter, setCountryFilter] = useState<string>("전체");
  const [timeFilter, setTimeFilter] = useState<string>("전체");
  const [ageRange, setAgeRange] = useState<number[]>([18, 60]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const uniqueCountries = useMemo(
    () => Array.from(new Set(users.map((u) => u.countryName))),
    []
  );

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchCountry = countryFilter === "전체" || u.countryName === countryFilter;
      const matchTime =
        timeFilter === "전체" || u.availability.includes(timeFilter as any);
      const matchAge = u.age >= ageRange[0] && u.age <= ageRange[1];
      return matchCountry && matchTime && matchAge;
    });
  }, [countryFilter, timeFilter, ageRange]);

  const resetFilters = () => {
    setCountryFilter("전체");
    setTimeFilter("전체");
    setAgeRange([18, 60]);
  };

  const handleStartChat = (userId: number, userName: string) => {
    console.log(`Starting chat with user ${userId}: ${userName}`);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
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
            <label className="block text-xs text-muted-foreground mb-1">이용 시간대</label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="시간대 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                {timeSlots.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 연령대 */}
          <div className="md:col-span-2">
            <label className="block text-xs text-muted-foreground mb-2">연령대: {ageRange[0]} - {ageRange[1]}세</label>
            <Slider
              min={18}
              max={60}
              step={1}
              value={ageRange}
              onValueChange={(v) => setAgeRange(v as number[])}
            />
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button variant="outline" size="sm" onClick={resetFilters}>초기화</Button>
        </div>
      </Card>

      {/* 결과 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {filteredUsers.map((user) => (
          <Card
            role="button"
            aria-label={`${user.name} 프로필 열기`}
            key={user.id}
            onClick={() => openDetail(user)}
            className="p-3 border-0 shadow-card hover:shadow-floating transition-spring bg-gradient-card cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.profileImage || ""} />
                  <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    user.status === "온라인" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="font-semibold text-sm text-foreground truncate max-w-[120px]">
                    {user.name}
                  </h3>
                  <Badge variant="secondary" className="text-[10px]">
                    {user.country} {user.countryName}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />{user.age}세
                  </span>
                  <span className="flex items-center gap-1 truncate max-w-[140px]">
                    <MapPin className="h-3 w-3" />{user.region}
                  </span>
                </div>
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
                  <div className="flex flex-wrap gap-1">
                    {selectedUser.languages.map((lang, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {selectedUser.availability.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  onClick={() => handleStartChat(selectedUser.id, selectedUser.name)}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white border-0 shadow-soft transition-spring"
                >
                  <MessageCircle className="h-4 w-4 mr-2" /> 채팅 시작하기
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
