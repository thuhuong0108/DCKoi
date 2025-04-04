import { RoleUser } from "@/models/enums/roleUser";
import { useAppSelector } from "@/redux/store/hook";
import React, { ReactElement } from "react";
import LayoutAdmin from "../layoutAdmin";
import MainLayout from "../mainLayout/MainLayout";
import LayoutConsultant from "../layoutConsultant";
import LayoutManager from "../layoutManager";
import LayoutDesigner from "../layoutDesigner";
import LayoutCustomer from "../layoutCustomer";
import LayoutConstructor from "../layoutConstructor";
import { AuthorizePage } from "@/pages";

interface IndexProps {
  Page: () => ReactElement;
}
interface MenuItemProps {
  link?: string;
  badge?: boolean;
  target?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  end?: boolean;
}
const RootLayout = ({ Pages }) => {
  const role = useAppSelector((state) => state.auth.role);
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const pageName = Pages.name;
  if (pageName === "Login" || pageName === "Register") {
    return <Pages />;
  }
  if (!isAuth) {
    return <MainLayout Pages={AuthorizePage} />;
  }

  switch (role) {
    case RoleUser.ADMINISTRATOR:
      return <LayoutAdmin Page={Pages} />;
    case RoleUser.CONSULTANT:
      return <LayoutConsultant Page={Pages} />;
    case RoleUser.MANAGER:
      return <LayoutManager Page={Pages} />;
    case RoleUser.DESIGNER:
      return <LayoutDesigner Page={Pages} />;
    case RoleUser.CUSTOMER:
      return <LayoutCustomer Page={Pages} />;
    case RoleUser.CONSTRUCTOR:
      return <LayoutConstructor Page={Pages} />;
    default:
      return <MainLayout Pages={Pages} />;
  }
};

export default RootLayout;
