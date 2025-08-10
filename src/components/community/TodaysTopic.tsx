import { Calendar, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TodaysTopicProps {
  question: string;
  date: string;
  responseCount?: number;
}

export const TodaysTopic = ({ question, date, responseCount = 0 }: TodaysTopicProps) => {
  return (
    <Card className="p-4 border-2 border-primary/20 shadow-card bg-gradient-to-r from-primary/5 to-primary/10 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
              오늘의 주제
            </Badge>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <h3 className="font-semibold text-foreground mb-2">{question}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span>{responseCount}개의 답변</span>
          </div>
        </div>
      </div>
    </Card>
  );
};