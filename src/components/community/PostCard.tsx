import { Heart, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Post } from "@/types/community";

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  isHot?: boolean;
}

export const PostCard = ({ post, onLike, isHot = false }: PostCardProps) => {
  // 미리보기 텍스트를 한 줄로 제한
  const previewContent = post.content.length > 80 
    ? post.content.substring(0, 80) + "..." 
    : post.content;

  return (
    <Card className={`p-4 border-0 shadow-card hover:shadow-floating transition-spring bg-gradient-card ${
      isHot ? "border-l-4 border-l-red-500" : ""
    }`}>
      {/* Hot Badge */}
      {isHot && (
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
            🔥 HOT
          </Badge>
        </div>
      )}

      {/* Post Header */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-gradient-primary text-white text-sm">
            {post.author.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">{post.author}</span>
            <span className="text-lg">{post.authorCountry}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{post.timestamp}</span>
            {post.isVerified && (
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                검증됨
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {post.category}
          </Badge>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-3">
        <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {previewContent}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-border">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-1 text-sm transition-smooth ${
            post.isLiked 
              ? "text-red-500" 
              : "text-muted-foreground hover:text-red-500"
          }`}
        >
          <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth">
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments}</span>
        </button>
      </div>
    </Card>
  );
};