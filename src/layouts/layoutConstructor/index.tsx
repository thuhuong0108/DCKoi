import { Sidebar } from "@/components";
import { HomeOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { ReactElement } from "react";
import ImgLogo from "@/assets/images/logo.png";
import UserProfile, {
  UserProfileProps,
} from "@/components/Header/HeaderItem/UserProfile";

const { Header, Footer, Content, Sider } = Layout;
interface IndexProps {
  Page: () => ReactElement;
}

const sidebarItems = [
  {
    key: "1",
    label: "Dashboard",
    link: "/staff",
    icon: HomeOutlined,
  },
  {
    key: "2",
    label: "Projects",
    link: "/staff/projects",
    icon: HomeOutlined,
  },
  {
    key: "2",
    label: "Tasks",
    link: "/staff/tasks",
    icon: HomeOutlined,
  },
];
const user: UserProfileProps = {
  name: "Constructor",
  role: "Staff",
  avatar:
    "https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_female_woman_person_people_white_tone_icon_159360.png",
};
interface IndexProps {
  Page: () => ReactElement;
}
const LayoutConstructor: React.FC<IndexProps> = ({ Page }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="flex flex-wrap items-center justify-between px-4 bg-white h-[80px]">
        <img loading="lazy" src={ImgLogo} alt="Logo" className="w-[7%]" />
        <UserProfile prop={user} />
      </Header>
      <Layout>
        <Sider>
          <Sidebar items={sidebarItems} />
        </Sider>
        <Content>
          <Page />
        </Content>
      </Layout>
      <Footer className="text-center">@DCKoi</Footer>
    </Layout>
  );
};

export default LayoutConstructor;
