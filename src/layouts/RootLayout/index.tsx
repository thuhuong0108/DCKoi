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

  const LayoutComponent = roleLayoutMap[role];
  if (!LayoutComponent) {
    return <MainLayout Pages={Pages} />;
  }
  return <LayoutComponent Page={Pages} />;
};

export default RootLayout;
