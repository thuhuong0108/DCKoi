import { Sidebar, Menu, MenuItem, Logo } from "@/components/Sidebar";
import { selectCurrentUser, selectRole } from "@/redux/slices/auth/authSlices";
import { useAppSelector } from "@/redux/store/hook";
import {
  AttachMoneySharp,
  BuildSharp,
  CardGiftcardSharp,
  DashboardSharp,
  FolderSharp,
  PeopleSharp,
  PersonSharp,
  SupportAgentSharp,
} from "@mui/icons-material";

import { ReactElement } from "react";

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

const LayoutAdmin: React.FC<IndexProps> = ({ Page }) => {
  const homeMenu: MenuItemProps[] = [
    {
      link: "/admin",
      children: "Dashboard",
      icon: <DashboardSharp />,
      end: true,
    },
    {
      link: "/admin/consultation",
      children: "Consultation",
      icon: <SupportAgentSharp />,
    },
    {
      link: "/admin/transactions",
      children: "Transactions",
      icon: <AttachMoneySharp />,
    },
    { link: "/admin/projects", children: "Projects", icon: <FolderSharp /> },
    { link: "/admin/staff", children: "Staff", icon: <PeopleSharp /> },
    { link: "/admin/users", children: "Users", icon: <PersonSharp /> },
    {
      link: "/admin/management-packages",
      children: "Packages",
      icon: <CardGiftcardSharp />,
    },
    { link: "/admin/services", children: "Services", icon: <BuildSharp /> },
  ];

  const currentUser = useAppSelector(selectCurrentUser);
  const roleUser = useAppSelector(selectRole);

  return (
    <div className="flex">
      <Sidebar
        width={"270px"}
        userName={currentUser.fullName}
        userimg={currentUser.avatar}
        designation={roleUser}
      >
        <Logo ref={null}>
          {" "}
          <img src="/logo.png" alt="logo" />
        </Logo>
        <Menu subHeading="Home">
          {homeMenu.map((item, index) => (
            <MenuItem
              key={index}
              link={item.link}
              children={item.children}
              icon={item.icon}
              end={item.end}
            />
          ))}
        </Menu>
      </Sidebar>
      <Page />
    </div>
  );
};

export default LayoutAdmin;
