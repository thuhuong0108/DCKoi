import { useRoutes } from "react-router-dom";
import { ConsultationPage, Contact, DesignerPage, Home, Login, Register, TestUi } from "@/pages";
import { LayoutAdmin, LayoutDesigner, MainLayout } from "@/layouts";

const Routers = () => {
  const element = useRoutes([
    { path: "/", element: <MainLayout Pages={Home} /> },
    { path: "/contact", element: <MainLayout Pages={Contact} /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin", element: <LayoutAdmin Page={ConsultationPage} /> },
    { path: "/admin/consultation", element: <LayoutAdmin Page={ConsultationPage} /> },
    { path: "/admin/consultation/sss", element: <LayoutAdmin Page={ConsultationPage} /> },
    { path: "/admin/test", element: <LayoutAdmin Page={TestUi} /> },
    { path: "/designer/design", element: <LayoutDesigner Page={DesignerPage} /> },
  ]);
  return <div>{element}</div>;
};

export default Routers;
