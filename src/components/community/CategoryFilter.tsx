import { PostCategory } from "@/types/community";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  activeCategory: PostCategory | "전체";
  onCategoryChange: (category: PostCategory | "전체") => void;
  categories?: Array<PostCategory | "전체">;
}

const defaultCategories: Array<PostCategory | "전체"> = [
  "전체",
  "오늘의 주제", 
  "육아", 
  "한국어", 
  "문화", 
  "자유"
];

export const CategoryFilter = ({ activeCategory, onCategoryChange, categories = defaultCategories }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={`text-xs transition-smooth ${
            activeCategory === category
              ? "bg-gradient-primary text-white border-0 shadow-soft"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};