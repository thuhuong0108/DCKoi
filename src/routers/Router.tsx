import { useLocation, useRoutes } from "react-router-dom";
import {
  BookService,
  ConsultationPage,
  Contact,
  CreatePondService,
  Home,
  Login,
  Register,
  TestUi,
} from "@/pages";
import { LayoutAdmin, MainLayout } from "@/layouts";
import {
  ManagementTransaction,
  ManagementUser,
  DetailConsultation,
  PackagePage,
  PackageItem,
} from "@/pages/AdminPage";

const Routers = () => {
  const location = useLocation();
  const element = useRoutes([
    { path: "/", element: <MainLayout Pages={Home} /> },
    { path: "/contact", element: <MainLayout Pages={Contact} /> },
    { path: "/bookService", element: <MainLayout Pages={BookService} /> },
    { path: "/bookService/create", element: <MainLayout Pages={CreatePondService} /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin", element: <LayoutAdmin Page={ConsultationPage} /> },
    {
      path: "/admin/detail-consultation",
      element: <LayoutAdmin Page={DetailConsultation} />,
    },
    {
      path: "/admin/consultation",
      element: <LayoutAdmin Page={ConsultationPage} />,
    },
    {
      path: "/admin/packages",
      element: <LayoutAdmin Page={PackagePage} />,
    },
    {
      path: "/admin/packages/package-items",
      element: <LayoutAdmin Page={PackageItem} />,
    },
    {
      path: "/admin/transactions",
      element: <LayoutAdmin Page={ManagementTransaction} />,
    },
    {
      path: "/admin/users",
      element: <LayoutAdmin Page={ManagementUser} />,
    },
    { path: "/admin/test", element: <LayoutAdmin Page={TestUi} /> },
  ]);
  console.log("Current Route:", location.pathname);
  return <div>{element}</div>;
};

export default Routers;
