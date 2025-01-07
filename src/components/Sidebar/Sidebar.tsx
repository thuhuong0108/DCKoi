import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { Menu, MenuProps } from "antd";

interface SidebarItem {
  key: string;
  label: string;
  link: string;
  icon: React.ComponentType<AntdIconProps>;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      className="w-[300px] h-full bg-[background]"
      onClick={onClick}
      defaultSelectedKeys={["1"]}
      items={items.map((item) => ({
        key: item.key,
        label: item.label,
        link: item.link,
        icon: <item.icon />,
      }))}
    />
  );
};

export default Sidebar;
