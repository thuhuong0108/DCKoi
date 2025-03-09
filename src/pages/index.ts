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
import DesignCustomer from "./Design";
import DesignDetailCustomer from "./DesignDetail";
import DesignRequiment from "./DesignRequirement";
import TestUi from "./TestUi";

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
  DesignDetailCustomer,

  //error
  AuthorizePage,

  //test
  TestUi,
};

export * from "./AdminPage";
export * from "./ManagerPages";
export * from "./DesignerPages";
export * from "./ConsultantPage";
