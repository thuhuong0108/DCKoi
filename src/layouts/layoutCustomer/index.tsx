import { Sidebar, Menu, MenuItem, Logo } from "@/components/Sidebar";
import { selectCurrentUser, selectRole } from "@/redux/slices/auth/authSlices";
import { useAppSelector } from "@/redux/store/hook";
import {
  BuildSharp,
  SupportAgentSharp,
  FolderSharp,
  DesignServices,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaidIcon from "@mui/icons-material/Paid";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import FolderIcon from "@mui/icons-material/Folder";

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

const LayoutCustomer: React.FC<IndexProps> = ({ Page }) => {
  const homeMenu: MenuItemProps[] = [
    {
      link: "/space-management",
      children: "Trang chủ",
      icon: <HomeIcon />,
      end: true,
    },
    {
      link: "/space-management/consultations",
      children: "Tư vấn ",
      icon: <SupportAgentSharp />,
      badge: true,
    },
    {
      link: "/space-management/designs",
      children: "Thiết kế",
      icon: <DesignServices />,
      badge: true,
    },
    {
      link: "/space-management/projects",
      children: "Dự án",
      icon: <FolderIcon />,
      badge: true,
    },
    {
      link: "/space-management/transactions",
      children: "Giao dịch",
      icon: <PaidIcon />,
    },
    {
      link: "/space-management/services",
      children: "Dịch vụ",
      icon: <BuildSharp />,
      badge: true,
    },
    {
      link: "/space-management/notifications",
      children: "Thông báo",
      icon: <NotificationsIcon />,
      badge: true,
    },
    {
      link: "/space-management/profile",
      children: "Hô sơ cá nhân",
      icon: <AssignmentIndIcon />,
    },
  ];

  const currentUser = useAppSelector(selectCurrentUser);
  const roleUser = useAppSelector(selectRole);
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Sidebar
        width={"300px"}
        userName={currentUser.fullName}
        userimg={currentUser.avatar}
        designation={roleUser}
      >
        <div onClick={() => navigate("/")}>
          <Logo ref={null}>
            {" "}
            <img src="/logo.png" alt="logo" />
          </Logo>
        </div>

        <Menu subHeading="">
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

export default LayoutCustomer;
