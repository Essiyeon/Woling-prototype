import { Gift, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const bannerItems = [
  {
    id: 1,
    title: "신규 회원 환영 혜택",
    description: "첫 우링 시작하고 무료 카페 쿠폰 받기!",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
    type: "benefit"
  },
  {
    id: 2,
    title: "한국어 학습 자료 공유",
    description: "무료 한국어 교재와 학습 앱 추천",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    type: "news"
  },
  {
    id: 3,
    title: "우링 이벤트",
    description: "온라인 그룹 스터디 참여하기",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    type: "event"
  },
  {
    id: 4,
    title: "다문화 커뮤니티",
    description: "전국 다문화가족 지원센터 안내",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
    type: "community"
  }
];

export const Banner = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">소식 & 혜택</h2>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {bannerItems.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-4/5">
              <Card className="border-0 shadow-card hover:shadow-floating transition-spring cursor-pointer bg-gradient-card overflow-hidden">
                <div className="relative h-32 w-full">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-semibold text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs opacity-90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <ExternalLink className="absolute top-3 right-3 h-4 w-4 text-white opacity-80" />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};