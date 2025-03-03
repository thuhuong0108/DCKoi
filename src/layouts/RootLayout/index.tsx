import { RoleUser } from "@/models/enums/roleUser";
import { useAppSelector } from "@/redux/store/hook";
import React, { ReactElement } from "react";
import LayoutAdmin from "../layoutAdmin";
import MainLayout from "../mainLayout/MainLayout";
import LayoutConsultant from "../layoutConsultant";

interface LayoutProps {
  Pages: () => ReactElement;
}
const RootLayout = ({ Pages }: LayoutProps) => {
  const role = useAppSelector((state) => state.auth.role);

  const pageName = Pages.name;
  if (pageName === "Login" || pageName === "Register") {
    return <Pages />;
  }

  switch (role) {
    case RoleUser.ADMINISTRATOR:
      return <LayoutAdmin Page={Pages} />;
    case RoleUser.CONSULTANT:
      return <LayoutConsultant Page={Pages} />;
    default:
      return <MainLayout Pages={Pages} />;
  }
};

export default RootLayout;
