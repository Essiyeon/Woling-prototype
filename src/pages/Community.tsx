import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Heart, MessageCircle, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
    isLiked: false
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
    isLiked: true
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
    isLiked: false
  }
];

const mockVerifiedPosts: Post[] = [
  {
    id: 4,
    title: "🔒 2024년 다문화가족지원센터 정책 안내",
    content: "올해 새롭게 변경된 다문화가족지원센터의 주요 정책들을 안내드립니다. 한국어교육, 취업지원, 자녀양육 지원 등 다양한 프로그램이 확대되었습니다...",
    author: "관리자",
    authorCountry: "🇰🇷",
    timestamp: "3일 전",
    likes: 45,
    comments: 12,
    isLiked: false
  },
  {
    id: 5,
    title: "🔒 결혼이민자 취업 지원 프로그램 모집",
    content: "고용노동부에서 진행하는 결혼이민자 대상 취업 지원 프로그램이 시작됩니다. 한국어 실력 향상부터 직업 교육까지 체계적으로 지원해드립니다...",
    author: "다문화센터",
    authorCountry: "🇰🇷",
    timestamp: "1주일 전",
    likes: 38,
    comments: 8,
    isLiked: false
  }
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [verifiedPosts, setVerifiedPosts] = useState<Post[]>(mockVerifiedPosts);
  const [activeTab, setActiveTab] = useState("community");

  const handleLike = (postId: number, isVerified: boolean = false) => {
    if (isVerified) {
      setVerifiedPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      ));
    } else {
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      ));
    }
  };

  const renderPostCard = (post: Post, isVerified: boolean = false) => (
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
            {isVerified && (
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                검증됨
              </Badge>
            )}
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

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-border">
        <button
          onClick={() => handleLike(post.id, isVerified)}
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="community">일반 커뮤니티</TabsTrigger>
            <TabsTrigger value="verified">정책 & 소식</TabsTrigger>
          </TabsList>
          
          <TabsContent value="community" className="space-y-4 mt-6">
            {posts.map((post) => renderPostCard(post, false))}
            
            {posts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">게시글이 없습니다.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="verified" className="space-y-4 mt-6">
            {verifiedPosts.map((post) => renderPostCard(post, true))}
            
            {verifiedPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">정책 및 소식이 없습니다.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Community;