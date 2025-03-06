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
  ManagerProject,
  ManagerDesign,
  DesignDashboard,
  ConsultationStaffPage,
  DetailConsultingStaff,
  CreateQuotation,
  DesignProjectDetail,
  DesignProject,
  RewriteQuotation,
} from "@/pages";
import { LayoutAdmin, LayoutCustomer, MainLayout } from "@/layouts";
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
  Design,
  ManagementProjects,
  AdminContract,
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
    // customer
    {
      path: "/space-management",
      element: <LayoutCustomer Page={ConsultingPage} />,
    },
    {
      path: "/space-management/detail-consulting/:id",
      element: <LayoutCustomer Page={DetailConsulting} />,
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
      path: "/admin/consultation",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={ConsultationPage} />}
        />
      ),
    },
    {
      path: "/admin/consultation/:id",
      element: (
        <PrivateRouterAdmin
          Pages={() => <LayoutAdmin Page={DetailConsultation} />}
        />
      ),
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
    {
      path: "/admin/design",
      element: <RootLayout Pages={Design} />,
    },
    {
      path: "/admin/projects",
      element: <RootLayout Pages={ManagementProjects} />,
    },
    {
      path: "/admin/consultation/:id/contract",
      element: <RootLayout Page={AdminContract} />,
    },

    // consultant
    {
      path: "/consultant",
      element: <RootLayout Pages={ConsultationStaffPage} />,
    },
    {
      path: "/consultant/:id",
      element: <RootLayout Pages={DetailConsultingStaff} />,
    },
    {
      path: "/consultant/:id/new-quotation",
      element: <RootLayout Pages={CreateQuotation} />,
    },
    {
      path: "/consultant/:id/rewrite-quotation",
      element: <RootLayout Pages={RewriteQuotation} />,
    },

    // manager
    {
      path: "/manager",
      element: <RootLayout Pages={ManagerProject} />,
    },
    {
      path: "/manager/design",
      element: <RootLayout Pages={ManagerDesign} />,
    },

    // designer
    {
      path: "/designer",
      element: <RootLayout Pages={DesignDashboard} />,
    },
    {
      path: "/designer/:id",
      element: <RootLayout Pages={DesignProjectDetail} />,
    },
    {
      path: "/designer/:id/design",
      element: <RootLayout Pages={DesignProject} />,
    },

    { path: "*", element: <div>404</div> },
  ]);
  return <div>{element}</div>;
};

export default Routers;
