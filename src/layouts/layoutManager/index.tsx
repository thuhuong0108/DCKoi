import { ReactElement } from "react";
import { Sidebar, Menu, MenuItem, Logo } from "@/components/Sidebar";
import { selectCurrentUser, selectRole } from "@/redux/slices/auth/authSlices";
import { useAppSelector } from "@/redux/store/hook";
import {
  AttachMoneySharp,
  BuildSharp,
  CardGiftcardSharp,
  Construction,
  DashboardSharp,
  FolderSharp,
  PeopleSharp,
  PersonSharp,
  SupportAgentSharp,
} from "@mui/icons-material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { RoleUser } from "@/models/enums/RoleUser";
import MainLayout from "../mainLayout/MainLayout";
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
const LayoutManager: React.FC<IndexProps> = ({ Page }) => {
  const homeMenu: MenuItemProps[] = [
    {
      link: "/manager",
      children: "Dự án",
      icon: <DashboardSharp />,
      end: true,
    },
    {
      link: "/manager/design",
      children: "Thiết kế",
      icon: <SupportAgentSharp />,
    },
  ];

  const currentUser = useAppSelector(selectCurrentUser);
  const roleUser = useAppSelector(selectRole);

  if (roleUser !== RoleUser.MANAGER) {
    return <MainLayout Pages={AuthorizePage} />;
  }

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

export default LayoutManager;
