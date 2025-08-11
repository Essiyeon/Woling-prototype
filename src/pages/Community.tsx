import { Layout } from "@/components/layout/Layout";
import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CategoryFilter } from "@/components/community/CategoryFilter";
import { PostCard } from "@/components/community/PostCard";
import { TodaysTopic } from "@/components/community/TodaysTopic";
import { Post, PostCategory } from "@/types/community";

// 오늘의 주제 데이터
const todaysTopic = {
  question: "한국어를 배울 때 가장 어려운 점은 무엇인가요? 팁이 있다면 공유해주세요!",
  date: "2024년 1월 10일",
  responseCount: 12
};

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
    category: "한국어"
  },
  {
    id: 2,
    title: "한국 전통 음식 만들기 도전!",
    content: "어제 처음으로 김치찌개를 만들어봤어요! 처음엔 너무 매웠지만 정말 맛있었답니다. 다음엔 불고기도 도전해보고 싶어요. 혹시 한국 요리 레시피 아시는 분 계시나요?",
    author: "마리아",
    authorCountry: "🇵🇭",
    timestamp: "5시간 전",
    likes: 35,
    comments: 12,
    isLiked: true,
    category: "문화"
  },
  {
    id: 3,
    title: "서울 근처 우링 모임 있나요?",
    content: "안녕하세요! 서울 강남구에 살고 있는데, 오프라인으로 만나서 우링 할 수 있는 모임이 있는지 궁금해요. 영어와 한국어 교환하고 싶습니다.",
    author: "사라",
    authorCountry: "🇺🇸",
    timestamp: "1일 전",
    likes: 42,
    comments: 6,
    isLiked: false,
    category: "자유"
  },
  {
    id: 4,
    title: "아이 한국 학교 적응 도움 필요해요",
    content: "7살 아이가 한국 초등학교에 다니기 시작했는데 언어 장벽 때문에 힘들어해요. 비슷한 경험 있으신 분들의 조언 부탁드려요.",
    author: "나린",
    authorCountry: "🇹🇭",
    timestamp: "3시간 전",
    likes: 18,
    comments: 15,
    isLiked: false,
    category: "육아"
  },
  {
    id: 5,
    title: "한국어 문법이 너무 어려워요",
    content: "오늘의 주제에 답변드려요! 저는 조사가 가장 어려워요. 은/는, 이/가 언제 쓰는지 아직도 헷갈려요. 연습 방법 있을까요?",
    author: "메이",
    authorCountry: "🇨🇳",
    timestamp: "30분 전",
    likes: 8,
    comments: 3,
    isLiked: false,
    category: "오늘의 주제"
  },
  {
    id: 6,
    title: "한국의 명절 문화 궁금해요",
    content: "곧 설날이라고 하는데, 한국의 전통 명절 문화가 궁금해요. 어떤 음식을 먹고 어떤 활동을 하나요?",
    author: "유키",
    authorCountry: "🇯🇵",
    timestamp: "6시간 전",
    likes: 22,
    comments: 9,
    isLiked: true,
    category: "문화"
  }
];

const mockVerifiedPosts: Post[] = [
  {
    id: 7,
    title: "🔒 2024년 다문화가족지원센터 정책 안내",
    content: "올해 새롭게 변경된 다문화가족지원센터의 주요 정책들을 안내드립니다. 한국어교육, 취업지원, 자녀양육 지원 등 다양한 프로그램이 확대되었습니다...",
    author: "관리자",
    authorCountry: "🇰🇷",
    timestamp: "3일 전",
    likes: 45,
    comments: 12,
    isLiked: false,
    category: "자유",
    isVerified: true
  },
  {
    id: 8,
    title: "🔒 결혼이민자 취업 지원 프로그램 모집",
    content: "고용노동부에서 진행하는 결혼이민자 대상 취업 지원 프로그램이 시작됩니다. 한국어 실력 향상부터 직업 교육까지 체계적으로 지원해드립니다...",
    author: "다문화센터",
    authorCountry: "🇰🇷",
    timestamp: "1주일 전",
    likes: 38,
    comments: 8,
    isLiked: false,
    category: "자유",
    isVerified: true
  }
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [verifiedPosts, setVerifiedPosts] = useState<Post[]>(mockVerifiedPosts);
  const [activeTab, setActiveTab] = useState("community");
  const [activeCategory, setActiveCategory] = useState<PostCategory | "전체">("오늘의 주제");
  const [verifiedCategory, setVerifiedCategory] = useState<PostCategory | "전체">("전체");

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

  // 필터링된 포스트들
  const filteredPosts = useMemo(() => {
    if (activeCategory === "전체") return posts;
    return posts.filter(post => post.category === activeCategory);
  }, [posts, activeCategory]);

  // 정책 소식 필터링된 포스트들
  const filteredVerifiedPosts = useMemo(() => {
    if (verifiedCategory === "전체") return verifiedPosts;
    return verifiedPosts.filter(post => post.category === verifiedCategory);
  }, [verifiedPosts, verifiedCategory]);

  // HOT 게시글 (좋아요 많은 순 3개) + 나머지 최신순
  const sortedPosts = useMemo(() => {
    const hotPosts = [...filteredPosts]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3);
    
    const recentPosts = filteredPosts
      .filter(post => !hotPosts.includes(post))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return { hotPosts, recentPosts };
  }, [filteredPosts]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">커뮤니티</h1>
          {activeTab === "community" && (
            <Button className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-soft">
              <Plus className="h-4 w-4 mr-2" />
              글쓰기
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="community">일반 커뮤니티</TabsTrigger>
            <TabsTrigger value="verified">정책 & 소식</TabsTrigger>
          </TabsList>
          
          <TabsContent value="community" className="space-y-6 mt-6">
            {/* 오늘의 주제 카드 */}
            {activeCategory === "오늘의 주제" && (
              <TodaysTopic
                question={todaysTopic.question}
                date={todaysTopic.date}
                responseCount={todaysTopic.responseCount}
              />
            )}

            {/* 카테고리 필터 */}
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* HOT 게시글 */}
            {sortedPosts.hotPosts.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">🔥 HOT 게시글</h2>
                {sortedPosts.hotPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={(id) => handleLike(id, false)}
                    isHot={true}
                  />
                ))}
              </div>
            )}

            {/* 최신 게시글 */}
            {sortedPosts.recentPosts.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">최신 게시글</h2>
                {sortedPosts.recentPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={(id) => handleLike(id, false)}
                  />
                ))}
              </div>
            )}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">해당 카테고리에 게시글이 없습니다.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="verified" className="space-y-6 mt-6">
            {/* 정책소식 카테고리 필터 */}
            <CategoryFilter
              activeCategory={verifiedCategory}
              onCategoryChange={setVerifiedCategory}
              categories={["전체", "육아", "한국어", "문화", "자유"]}
            />

            {filteredVerifiedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={(id) => handleLike(id, true)}
              />
            ))}
            
            {filteredVerifiedPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">해당 카테고리에 정책 및 소식이 없습니다.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Community;