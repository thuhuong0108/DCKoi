import { useLocation, useRoutes } from "react-router-dom";
import {
  ConsultationPage,
  Contact,
  Home,
  Login,
  Register,
  TestUi,
  PackageCreate,
  PackageDetail,
} from "@/pages";
import { LayoutAdmin, MainLayout } from "@/layouts";
import {
  ManagementTransaction,
  ManagementUser,
  DetailConsultation,
  PackagePage,
  PackageItem,
  ManagementPackage,
} from "@/pages/AdminPage";
import RootLayout from "@/layouts/RootLayout";
import PrivateRouterAdmin from "./PrivateRouterAdmin";

const Routers = () => {
  const location = useLocation();
  const element = useRoutes([
    { path: "/", element: <MainLayout Pages={Home} /> },
    { path: "/contact", element: <MainLayout Pages={Contact} /> },
    { path: "/login", element: <RootLayout Pages={Login} /> },
    { path: "/register", element: <Register /> },
    { path: "/admin", element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={ConsultationPage} />} /> },
    {
      path: "/admin/detail-consultation",
      element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={DetailConsultation} />} />,
    },
    {
      path: "/admin/consultation",
      element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={ConsultationPage} />} />,
    },
    {
      path: "/admin/management-packages",
      element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={ManagementPackage} />} />,
    },
    {
      path: "/admin/management-packages/packages",
      element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={PackagePage} />} />,
    },
    {
      path: "/admin/management-packages/packages/:id",
      element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={PackageDetail} />} />,
    },
    {
      path: "/admin/management-packages/packages/create",
      element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={PackageCreate} />} />,
    },
    {
      path: "/admin/management-packages/package-items",
      element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={PackageItem} />} />,
    },
    {
      path: "/admin/transactions",
      element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={ManagementTransaction} />} />,
    },
    {
      path: "/admin/users",
      element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={ManagementUser} />} />,
    },
    { path: "/admin/test", element: <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={TestUi} />} /> },
  ]);
  console.log("Current Route:", location.pathname);
  return <div>{element}</div>;
};

export default Routers;
