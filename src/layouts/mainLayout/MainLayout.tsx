import { Footer, Header } from "@/components";
import { ReactElement } from "react";

interface LayoutProps {
  Pages: () => ReactElement;
}

const MainLayout = ({ Pages }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Pages />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
