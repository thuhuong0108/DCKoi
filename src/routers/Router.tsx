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
  CustomerDesign,
  CustomerDesignDetail,
  CustomerProjectDesign,
  ProjectsPage,
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
import ContractPage from "@/pages/ContractPage";

const Routers = () => {
  const location = useLocation();
  const element = useRoutes([
    { path: "/", element: <MainLayout Pages={Home} /> },
    { path: "/contact", element: <MainLayout Pages={Contact} /> },
    { path: "/login", element: <RootLayout Pages={Login} /> },
    { path: "/register", element: <Register /> },
    // customer
    {
      path: "/space-management/consultations",
      element: <LayoutCustomer Page={ConsultingPage} />,
    },
    {
      path: "/space-management/consultations/:id/detail-consulting",
      element: <LayoutCustomer Page={DetailConsulting} />,
    },
    {
      path: "/space-management/projects",
      element: <LayoutCustomer Page={ProjectsPage} />,
    },

    {
      path: "/design",
      element: <LayoutCustomer Page={CustomerProjectDesign} />,
    },

    {
      path: "/design/:id",
      element: <LayoutCustomer Page={CustomerDesign} />,
    },
    {
      path: "/design/:id/detail",
      element: <LayoutCustomer Page={CustomerDesignDetail} />,
    },
    {
      path: "/space-management/contract",
      element: <LayoutCustomer Page={ContractPage} />,
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
      element: <RootLayout Pages={DetailConsultation} />,
    },
    {
      path: "/admin/consultation/:id/contract/:quotationId",
      element: <RootLayout Pages={AdminContract} />,
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
