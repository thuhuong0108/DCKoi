import { Header } from "@/components";
import { Contact, Home } from "@/pages";
import { useRoutes } from "react-router-dom";

const HomeLayout = () => {
  const elements = useRoutes([
    { path: "", element: <Home /> },
    { path: "/contact", element: <Contact /> },
  ]);

  return (
    <div>
      <Header />
      {elements}
    </div>
  );
};

export default HomeLayout;
