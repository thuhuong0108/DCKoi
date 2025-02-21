import { RoleUser } from "@/models/enums/roleUser";
import { useAppSelector } from "@/redux/store/hook";
import React, { ReactElement } from "react";
import LayoutAdmin from "../layoutAdmin";
import MainLayout from "../mainLayout/MainLayout";

interface LayoutProps {
  Pages: () => ReactElement;
}
const RootLayout = ({ Pages }: LayoutProps) => {
  // const role = useAppSelector((state) => state.auth.role);

  // switch (role) {
  //   case RoleUser.ADMINISTRATOR:
  //     return <LayoutAdmin Page={Pages} />;

  //   default:
  //     return <MainLayout Pages={Pages} />;
  // }

  return <MainLayout Pages={Pages} />;
};

export default RootLayout;
