import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { User, Edit, LogOut, Trash2, Globe, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("한국어");

  // Mock user data
  const user = {
    name: "김지영",
    email: "jiyoung@example.com",
    age: 29,
    country: "🇰🇷",
    countryName: "한국",
    region: "서울 강남구",
    languages: ["한국어", "영어"],
    joinDate: "2024년 1월"
  };

  const menuItems = [
    {
      icon: Edit,
      label: "프로필 수정",
      action: () => console.log("프로필 수정"),
      showChevron: true
    },
    {
      icon: Globe,
      label: "언어 설정",
      action: () => console.log("언어 설정"),
      value: currentLanguage,
      showChevron: true
    },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log("로그아웃");
  };

  const handleDeleteAccount = () => {
    console.log("회원 탈퇴");
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="text-center py-12">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-foreground mb-2">로그인이 필요합니다</h2>
          <p className="text-muted-foreground mb-6">
            우링(Woling) 서비스를 이용하려면 로그인해주세요.
          </p>
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-primary hover:opacity-90 text-white border-0 shadow-soft"
              onClick={() => setIsLoggedIn(true)}
            >
              로그인
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => console.log("회원가입")}
            >
              회원가입
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="p-6 border-0 shadow-card bg-gradient-card">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-primary text-white text-xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <Badge variant="secondary">
                  {user.country} {user.countryName}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{user.age}세</span>
                <span>•</span>
                <span>{user.region}</span>
                <span>•</span>
                <span>{user.joinDate} 가입</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {user.languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Card 
              key={index}
              className="p-4 border-0 shadow-card hover:shadow-floating transition-spring cursor-pointer bg-gradient-card"
              onClick={item.action}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <item.icon className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value && (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  )}
                  {item.showChevron && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Card className="p-4 border-0 shadow-card bg-card">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 h-auto p-0"
            >
              <div className="p-2 bg-orange-100 rounded-lg">
                <LogOut className="h-5 w-5 text-orange-600" />
              </div>
              <span className="font-medium">로그아웃</span>
            </Button>
          </Card>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Card className="p-4 border-0 shadow-card bg-card">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-auto p-0 text-red-600 hover:bg-transparent"
                >
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="font-medium">회원 탈퇴</span>
                </Button>
              </Card>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>회원 탈퇴</AlertDialogTitle>
                <AlertDialogDescription>
                  정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며, 
                  모든 데이터가 삭제됩니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700"
                >
                  탈퇴하기
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* App Info */}
        <Card className="p-4 border-0 shadow-card bg-card">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-1">우링(Woling) v1.0</p>
            <p>결혼 이주 여성을 위한 우링 서비스</p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;