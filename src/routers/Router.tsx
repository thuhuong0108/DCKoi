import { useLocation, useRoutes } from "react-router-dom";
import {
  ConsultationPage,
  Contact,
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
  ManagementPackage,
  EquipmentPage,
  ServicePage,
  StaffPage,
} from "@/pages/AdminPage";
import RootLayout from "@/layouts/RootLayout";

const Routers = () => {
  const location = useLocation();
  const element = useRoutes([
    { path: "/", element: <MainLayout Pages={Home} /> },
    { path: "/contact", element: <MainLayout Pages={Contact} /> },
    { path: "/login", element: <RootLayout Pages={Login} /> },
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
      path: "/admin/equipments",
      element: <LayoutAdmin Page={EquipmentPage} />,
    },
    {
      path: "/admin/services",
      element: <LayoutAdmin Page={ServicePage} />,
    },
    {
      path: "/admin/staffs",
      element: <LayoutAdmin Page={StaffPage} />,
    },
    {
      path: "/admin/management-packages",
      element: <LayoutAdmin Page={ManagementPackage} />,
    },
    {
      path: "/admin/management-packages/packages",
      element: <LayoutAdmin Page={PackagePage} />,
    },
    {
      path: "/admin/management-packages/package-items",
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
