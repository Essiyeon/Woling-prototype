import { Gift, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

const bannerItems = [
  {
    id: 1,
    title: "🎉 신규 회원 환영 혜택",
    description: "첫 언어교환 시작하고 무료 카페 쿠폰 받기!",
    type: "benefit",
    bgColor: "bg-gradient-primary"
  },
  {
    id: 2,
    title: "📚 한국어 학습 자료 공유",
    description: "무료 한국어 교재와 학습 앱 추천",
    type: "news",
    bgColor: "bg-accent"
  },
  {
    id: 3,
    title: "🤝 이번 주 언어교환 이벤트",
    description: "온라인 그룹 스터디 참여하기",
    type: "event",
    bgColor: "bg-secondary"
  }
];

export const Banner = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">소식 & 혜택</h2>
      </div>
      
      <div className="space-y-3">
        {bannerItems.map((item) => (
          <Card 
            key={item.id} 
            className="p-4 border-0 shadow-card hover:shadow-floating transition-spring cursor-pointer bg-gradient-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};