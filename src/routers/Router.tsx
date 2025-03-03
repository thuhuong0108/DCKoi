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
  // ProjectsPage,
  ConsultingPage,
  DetailConsulting,
  AuthorizePage,
  ConsultationStaffPage,
  DetailConsultingStaff,
} from "@/pages";
import {
  LayoutAdmin,
  LayoutConsultant,
  LayoutCustomer,
  MainLayout,
} from "@/layouts";
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
  ConstructionTemplate,
  ConstructionTemplateConfig,
} from "@/pages/AdminPage";
import RootLayout from "@/layouts/RootLayout";
import PrivateRouterAdmin from "./PrivateRouterAdmin";
import PrivateRouterCustomer from "./PrivateRouterCustomer";
import PrivateRouterConsultant from "./PrivateRouterConsultant";

const Routers = () => {
  const location = useLocation();
  const element = useRoutes([
    { path: "/", element: <MainLayout Pages={Home} /> },
    { path: "/contact", element: <MainLayout Pages={Contact} /> },
    { path: "/login", element: <RootLayout Pages={Login} /> },
    { path: "/register", element: <Register /> },
    // customer
    {
      path: "/space-management",
      element: (
        <PrivateRouterCustomer
          Pages={() => <LayoutCustomer Page={ConsultingPage} />}
        />
      ),
    },
    {
      path: "/space-management/detail-consulting/:id",
      element: (
        <PrivateRouterCustomer
          Pages={() => <LayoutCustomer Page={DetailConsulting} />}
        />
      ),
    },
    // admin
    {
      path: "/admin",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={ConsultationPage} />}
        />
      ),
    },
    {
      path: "/admin/detail-consultation",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={DetailConsultation} />}
        />
      ),
    },
    {
      path: "/admin/consultation",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={ConsultationPage} />}
        />
      ),
    },
    {
      path: "/admin/equipments",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={EquipmentPage} />}
        />
      ),
    },
    {
      path: "/admin/services",
      element: (
        <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={ServicePage} />} />
      ),
    },
    {
      path: "/admin/staffs",
      element: (
        <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={StaffPage} />} />
      ),
    },
    {
      path: "/admin/management-packages",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={ManagementPackage} />}
        />
      ),
    },
    {
      path: "/admin/management-packages/packages",
      element: (
        <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={PackagePage} />} />
      ),
    },
    {
      path: "/admin/management-packages/packages/:id",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={PackageDetail} />}
        />
      ),
    },
    {
      path: "/admin/management-packages/packages/create",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={PackageCreate} />}
        />
      ),
    },
    {
      path: "/admin/management-packages/package-items",
      element: (
        <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={PackageItem} />} />
      ),
    },
    {
      path: "/admin/transactions",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={ManagementTransaction} />}
        />
      ),
    },
    {
      path: "/admin/users",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={ManagementUser} />}
        />
      ),
    },
    {
      path: "/admin/test",
      element: (
        <PrivateRouterAdmin Pages={() => <LayoutAdmin Page={TestUi} />} />
      ),
    },
    {
      path: "/admin/template-construction",
      element: <RootLayout Pages={ConstructionTemplate} />,
    },
    {
      path: "/admin/template-construction/:id",
      element: <RootLayout Pages={ConstructionTemplateConfig} />,
    },

    // consultant
    {
      path: "/consultant",
      element: (
        <PrivateRouterConsultant
          Pages={() => <LayoutConsultant Page={ConsultationStaffPage} />}
        />
      ),
    },
    {
      path: "/consultant/detail/:id",
      element: (
        <PrivateRouterConsultant
          Pages={() => <LayoutConsultant Page={DetailConsultingStaff} />}
        />
      ),
    },

    { path: "/error-authorized", element: <AuthorizePage /> },
  ]);
  console.log("Current Route:", location.pathname);

  // const authorizeUser = (role: string) => {
  //   switch (role)
  //   case
  // }
  return <div>{element}</div>;
};

export default Routers;
