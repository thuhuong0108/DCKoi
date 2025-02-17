import { Logo, Menu, MenuItem, Sidebar } from "@/components/Sidebar";
import { DashboardSharp, EditOutlined } from "@mui/icons-material";
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

const LayoutDesigner: React.FC<IndexProps> = ({ Page }) => {
  const homeMenu: MenuItemProps[] = [
      {
        link: "/designer",
        children: "Dashboard",
        icon: <DashboardSharp />,
        end: true,
      },
      {
        link: "/designer/design",
        children: "Design",
        icon: <EditOutlined />
      },
    ];

  return (
    <div className="flex">
      <Sidebar
        width={"270px"}
        userName="Hoang Thi Thu Huong"
        userimg=""
        designation="Admin"
      >
        <Logo ref={null}>
          {" "}
          <img src="/logo.png" alt="logo" />
        </Logo>
        <Menu subHeading="Home">
          {homeMenu.map((item, index) => (
            <MenuItem
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

export default LayoutDesigner;
