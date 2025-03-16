import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Contact from "./Contact/Contact";
import ProjectsPage from "./Projects/ProjectsPage";
import ConsultingPage from "./Consulting";
import DetailConsulting from "./DetailConsulting";
import CustomerProjectDesign from "./CustomerProjectDesign";
import CustomerDesign from "./CustomerDesign";
import CustomerDesignDetail from "./CustomerDesignDetail";
import AuthorizePage from "./ErrorPage";
import PaymentStatus from "./Payment";
import DesignCustomer from "./Design";
import DesignDetailCustomer from "./DesignDetail";
import DesignRequiment from "./DesignRequirement";
import TestUi from "./TestUi";
import ProjectDetail from "./ProjectDetail";
import Transaction from "./Transaction";

export {
  // customer
  Home,
  Login,
  Register,
  DesignRequiment,
  DesignCustomer,
  Contact,
  ConsultingPage,
  DetailConsulting,
  CustomerProjectDesign,
  CustomerDesign,
  CustomerDesignDetail,
  ProjectsPage,
  PaymentStatus,
  DesignDetailCustomer,
  ProjectDetail,
  Transaction,

  //error
  AuthorizePage,

  //test
  TestUi,
};

export * from "./AdminPage";
export * from "./ManagerPages";
export * from "./DesignerPages";
export * from "./ConsultantPage";
export * from "./ConstructorPage";
