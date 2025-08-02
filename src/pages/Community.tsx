import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Heart, MessageCircle, Plus, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorCountry: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: "한국어 발음 연습 팁 공유해요!",
    content: "안녕하세요! 한국에 온 지 6개월 된 베트남 출신 리나예요. 한국어 발음이 정말 어려워서 고민이었는데, 최근에 좋은 방법을 찾았어서 공유드려요. 매일 한국 드라마를 보면서 따라 말하기를 해보니까...",
    author: "리나",
    authorCountry: "🇻🇳",
    timestamp: "2시간 전",
    likes: 24,
    comments: 8,
    isLiked: false,
    tags: ["한국어학습", "발음", "팁"]
  },
  {
    id: 2,
    title: "한국 전통 음식 만들기 도전!",
    content: "어제 처음으로 김치찌개를 만들어봤어요! 처음엔 너무 매웠지만 정말 맛있었답니다. 다음엔 불고기도 도전해보고 싶어요. 혹시 한국 요리 레시피 아시는 분 계시나요?",
    author: "마리아",
    authorCountry: "🇵🇭",
    timestamp: "5시간 전",
    likes: 18,
    comments: 12,
    isLiked: true,
    tags: ["요리", "한국문화", "김치찌개"]
  },
  {
    id: 3,
    title: "서울 근처 언어교환 모임 있나요?",
    content: "안녕하세요! 서울 강남구에 살고 있는데, 오프라인으로 만나서 언어교환 할 수 있는 모임이 있는지 궁금해요. 영어와 한국어 교환하고 싶습니다.",
    author: "사라",
    authorCountry: "🇺🇸",
    timestamp: "1일 전",
    likes: 15,
    comments: 6,
    isLiked: false,
    tags: ["모임", "오프라인", "강남구"]
  }
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">커뮤니티</h1>
          <Button className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-soft">
            <Plus className="h-4 w-4 mr-2" />
            글쓰기
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시글 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="p-4 border-0 shadow-card hover:shadow-floating transition-spring bg-gradient-card">
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
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-3">
                <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <button
                  onClick={() => handleLike(post.id)}
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
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Community;