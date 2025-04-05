import { Sidebar, Menu, MenuItem, Logo } from "@/components/Sidebar";
import { selectCurrentUser, selectRole } from "@/redux/slices/auth/authSlices";
import { useAppSelector } from "@/redux/store/hook";
import {
  AttachMoney as AttachMoneyIcon,
  Build as BuildIcon,
  CardGiftcard as CardGiftcardIcon,
  Dashboard as DashboardIcon,
  Folder as FolderIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  SupportAgent as SupportAgentIcon,
  Chat as ChatIcon,
  DesignServices as DesignServicesIcon,
  Article as ArticleIcon,
  LocalOffer as LocalOfferIcon,
  Construction as ConstructionIcon,
  Category as CategoryIcon,
  Handyman as HandymanIcon,
  LibraryBooks as LibraryBooksIcon,
} from "@mui/icons-material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import MainLayout from "../mainLayout/MainLayout";
import { AuthorizePage } from "@/pages";
import { RoleUser } from "@/models/enums/RoleUser";

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
      icon: <DashboardIcon />,
      end: true,
    },
    {
      link: "/admin/consultation",
      children: "Tư vấn",
      icon: <ChatIcon />,
    },
    {
      link: "/admin/design",
      children: "Thiết kế",
      icon: <DesignServicesIcon />,
    },
    {
      link: "/admin/blogs",
      children: "Blogs",
      icon: <ArticleIcon />,
    },
    {
      link: "/admin/promotions",
      children: "Khuyến mãi",
      icon: <LocalOfferIcon />,
    },
    {
      link: "/admin/transactions",
      children: "Giao dịch",
      icon: <AttachMoneyIcon />,
    },
    {
      link: "/admin/projects",
      children: "Dự án",
      icon: <FolderIcon />,
    },
    {
      link: "/admin/maintenance",
      children: "Bảo dưỡng",
      icon: <ConstructionIcon />,
    },
    {
      link: "/admin/staffs",
      children: "Nhân viên",
      icon: <PeopleIcon />,
    },
    {
      link: "/admin/users",
      children: "Tài khoản",
      icon: <PersonIcon />,
    },
    {
      link: "/admin/management-packages",
      children: "Gói thi công",
      icon: <CardGiftcardIcon />,
    },
    {
      link: "/admin/services",
      children: "Dịch vụ",
      icon: <BubbleChartIcon />,
    },
    {
      link: "/admin/equipments",
      children: "Thiết bị",
      icon: <HandymanIcon />,
    },
    {
      link: "/admin/category",
      children: "Quản lý danh mục",
      icon: <CategoryIcon />,
    },
    {
      link: "/admin/template-construction",
      children: "Template Construction",
      icon: <LibraryBooksIcon />,
    },
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
