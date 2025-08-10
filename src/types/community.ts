export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorCountry: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  category: PostCategory;
  isVerified?: boolean;
}

export type PostCategory = "오늘의 주제" | "육아" | "한국어" | "문화" | "자유";

export interface TodaysTopic {
  id: number;
  question: string;
  date: string;
  category: string;
}

export interface CommunityState {
  activeTab: "community" | "verified";
  activeCategory: PostCategory | "전체";
  posts: Post[];
  verifiedPosts: Post[];
}