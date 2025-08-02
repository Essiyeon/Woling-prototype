import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <main className="container max-w-md mx-auto px-4 py-6 pb-24">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};