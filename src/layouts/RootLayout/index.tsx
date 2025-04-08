import { RoleUser } from "@/models/enums/roleUser";
import { useAppSelector } from "@/redux/store/hook";
import React, { ReactElement, useMemo } from "react";
import LayoutAdmin from "../layoutAdmin";
import MainLayout from "../mainLayout/MainLayout";
import LayoutConsultant from "../layoutConsultant";
import LayoutManager from "../layoutManager";
import LayoutDesigner from "../layoutDesigner";
import LayoutCustomer from "../layoutCustomer";
import LayoutConstructor from "../layoutConstructor";
import { AuthorizePage } from "@/pages";

const roleLayoutMap: Record<
  RoleUser,
  React.ComponentType<{ Page: () => ReactElement }>
> = {
  [RoleUser.ADMINISTRATOR]: LayoutAdmin,
  [RoleUser.CONSULTANT]: LayoutConsultant,
  [RoleUser.MANAGER]: LayoutManager,
  [RoleUser.DESIGNER]: LayoutDesigner,
  [RoleUser.CUSTOMER]: LayoutCustomer,
  [RoleUser.CONSTRUCTOR]: LayoutConstructor,
};

const UNAUTHENTICATED_PAGES = ["Login", "Register"];
const RootLayout = ({ Pages }) => {
  const role = useAppSelector((state) => state.auth.role);
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const currentPath = window.location.pathname;

  const routeRoleRequirement = useMemo(() => {
    if (currentPath.includes("/admin")) return RoleUser.ADMINISTRATOR;
    if (currentPath.includes("/consultant")) return RoleUser.CONSULTANT;
    if (currentPath.includes("/manager")) return RoleUser.MANAGER;
    if (currentPath.includes("/designer")) return RoleUser.DESIGNER;
    if (currentPath.includes("/space-management")) return RoleUser.CUSTOMER;
    return null;
  }, [currentPath]);

  const hasRoutePermission =
    !routeRoleRequirement || role === routeRoleRequirement;

  if (!hasRoutePermission) {
    return <MainLayout Pages={AuthorizePage} />;
  }
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
