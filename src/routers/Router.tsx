import { LayoutAdmin, LayoutCustomer, MainLayout } from "@/layouts";
import RootLayout from "@/layouts/RootLayout";
import {
  ConsultationPage,
  ConsultationStaffPage,
  // ProjectsPage,
  ConsultingPage,
  Contact,
  CreateQuotation,
  CustomerDesign,
  DesignCustomer,
  DesignDashboard,
  DesignDetailCustomer,
  DesignProject,
  DesignProjectDetail,
  DesignRequiment,
  ManagerProjectDetail,
  ProjectDetail,
  DetailConsulting,
  DetailConsultingStaff,
  Home,
  Login,
  ManagerDesign,
  ManagerProject,
  PackageCreate,
  PackageDetail,
  ProjectsPage,
  PaymentStatus,
  Register,
  RewriteQuotation,
  TestUi,
} from "@/pages";
import {
  AdminContract,
  ConstructionTemplate,
  ConstructionTemplateConfig,
  Design,
  DetailConsultation,
  EquipmentPage,
  ManagementPackage,
  ManagementProjects,
  ManagementTransaction,
  ManagementUser,
  PackageItem,
  PackagePage,
  ServicePage,
  StaffPage,
} from "@/pages/AdminPage";
import ContractPage from "@/pages/ContractPage";
import DesignDetailManager from "@/pages/ManagerPages/DesignDetail";
import { useLocation, useRoutes } from "react-router-dom";
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
      path: "/space-management/projects/:id",
      element: <LayoutCustomer Page={ProjectDetail} />,
    },

    // {
    //   path: "/design",
    //   element: <LayoutCustomer Page={CustomerProjectDesign} />,
    // },
    {
      path: "/space-management/designs",
      element: <RootLayout Pages={DesignCustomer} />,
    },

    {
      path: "/space-management/designs/:id",
      element: <RootLayout Pages={DesignRequiment} />,
    },

    {
      path: "/space-management/designs/:id/design",
      element: <RootLayout Pages={DesignDetailCustomer} />,
    },

    {
      path: "/space-management/projects/:id/design",
      element: <LayoutCustomer Page={CustomerDesign} />,
    },
    // {
    //   path: "/design/:id/detail",
    //   element: <LayoutCustomer Page={CustomerDesignDetail} />,
    // },
    {
      path: "/space-management/projects/:id/contract",
      element: <LayoutCustomer Page={ContractPage} />,
    },
    {
      path: "/payment/response",
      element: <LayoutCustomer Page={PaymentStatus} />,
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
      path: "/manager/:id",
      element: <RootLayout Pages={ManagerProjectDetail} />,
    },
    {
      path: "/manager/design",
      element: <RootLayout Pages={ManagerDesign} />,
    },

    {
      path: "/manager/design/:id",
      element: <RootLayout Pages={DesignRequiment} />,
    },
    {
      path: "/manager/design/:id/design",
      element: <RootLayout Pages={DesignDetailManager} />,
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
