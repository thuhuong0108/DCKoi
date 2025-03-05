import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Contact from "./Contact/Contact";
// import ProjectsPage from "./Projects";
import ConsultingPage from "./Projects";
import DetailConsulting from "./DetailConsulting";
import CustomerConstruction from "./CustomerConstruction";
import CustomerConstructionDetail from "./CustomerConstructionDetail";

import {
  ConsultationPage,
  DetailConsultation,
  ManagementTransaction,
  ManagementUser,
  PackagePage,
  PackageItem,
  ManagementPackage,
  ServicePage,
  EquipmentPage,
  StaffPage,
  PackageCreate,
  PackageDetail,
  ConstructionTemplate,
  ConstructionTemplateConfig,
} from "./AdminPage";

import {
  ConsultationStaffPage,
  DetailConsultingStaff,
  CreateQuotation,
} from "./ConsultantPage";

import AuthorizePage from "./ErrorPage";

import TestUi from "./TestUi";

export {
  // customer
  Home,
  Login,
  Register,
  Contact,
  ConsultingPage,
  DetailConsulting,
  CustomerConstruction,
  CustomerConstructionDetail,
  // ProjectsPage,

  //admin
  ConsultationPage,
  DetailConsultation,
  ManagementTransaction,
  ManagementUser,
  PackagePage,
  PackageItem,
  ManagementPackage,
  ServicePage,
  EquipmentPage,
  StaffPage,
  PackageCreate,
  PackageDetail,
  ConstructionTemplate,
  ConstructionTemplateConfig,

  //consultant
  ConsultationStaffPage,
  DetailConsultingStaff,
  CreateQuotation,

  //error
  AuthorizePage,

  //test
  TestUi,
};

export * from "./AdminPage";
export * from "./ManagerPages";
export * from "./DesignerPages";
