import { useRoutes } from "react-router-dom";
import { ConsultationPage, Contact, Home, Login, Register } from "@/pages";
import { LayoutAdmin, MainLayout } from "@/layouts";

const Routers = () => {
  const element = useRoutes([
    { path: "/", element: <MainLayout Pages={Home} /> },
    { path: "/contact", element: <MainLayout Pages={Contact} /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin", element: <LayoutAdmin Page={ConsultationPage} /> },
  ]);
  return <div>{element}</div>;
};

export default Routers;
