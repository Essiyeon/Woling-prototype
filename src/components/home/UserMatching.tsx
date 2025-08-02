import { MessageCircle, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  {
    id: 1,
    name: "사라 (Sarah)",
    age: 28,
    country: "🇺🇸",
    countryName: "미국",
    region: "서울 강남구",
    languages: ["영어", "한국어"],
    profileImage: null,
    status: "온라인"
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
    status: "오프라인"
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
    status: "온라인"
  }
];

export const UserMatching = () => {
  const handleStartChat = (userId: number, userName: string) => {
    console.log(`Starting chat with user ${userId}: ${userName}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">언어교환 친구 찾기</h2>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="p-4 border-0 shadow-card hover:shadow-floating transition-spring bg-gradient-card">
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.profileImage || ""} />
                  <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  user.status === "온라인" ? "bg-green-500" : "bg-gray-400"
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{user.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {user.country} {user.countryName}
                  </Badge>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{user.age}세</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{user.region}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {user.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <Button 
                  onClick={() => handleStartChat(user.id, user.name)}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white border-0 shadow-soft transition-spring"
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  채팅 시작하기
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};