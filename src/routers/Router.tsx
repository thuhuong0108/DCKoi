import { useRoutes } from "react-router-dom";
import { ConsultationPage, Contact, Home, Login, Register, BookService, TestUi, CreatePondService } from "@/pages";
import { LayoutAdmin, MainLayout } from "@/layouts";

const Routers = () => {
  const element = useRoutes([
    { path: "/", element: <MainLayout Pages={Home} /> },
    { path: "/contact", element: <MainLayout Pages={Contact} /> },
    { path: "/bookService", element: <MainLayout Pages={BookService} /> },
    { path: "/bookService/create", element: <MainLayout Pages={CreatePondService} /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin", element: <LayoutAdmin Page={ConsultationPage} /> },
    { path: "/admin/consultation", element: <LayoutAdmin Page={ConsultationPage} /> },
    { path: "/admin/consultation/sss", element: <LayoutAdmin Page={ConsultationPage} /> },
    { path: "/admin/test", element: <LayoutAdmin Page={TestUi} /> },
  ]);
  return <div>{element}</div>;
};

export default Routers;
