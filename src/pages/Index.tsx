import { Layout } from "@/components/layout/Layout";
import { Banner } from "@/components/home/Banner";
import { UserMatching } from "@/components/home/UserMatching";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <Banner />
        <UserMatching />
      </div>
    </Layout>
  );
};

export default Index;
