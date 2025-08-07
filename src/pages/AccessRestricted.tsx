import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn } from "lucide-react";

const AccessRestricted = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-elegant text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">로그인이 필요합니다</CardTitle>
            <CardDescription className="text-muted-foreground">
              이 기능을 사용하려면 로그인이 필요합니다.
              <br />
              계정으로 로그인해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleLoginClick} className="w-full" size="lg">
              <LogIn className="mr-2 h-4 w-4" />
              로그인하기
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full"
            >
              홈으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessRestricted;