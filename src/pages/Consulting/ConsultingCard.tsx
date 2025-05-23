import { Avatar, Badge } from "antd";
import {
  AliwangwangOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import { ProjectType } from "@/models/ProjectType";
import { Card, IconAnimation } from "@/components";
import { parseStatusProject } from "@/utils/helpers";
import { ProjectStatus } from "@/models/enums/Status";

const ConsultingCard = ({ item }: { item: ProjectType }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`${item.id}/detail-consulting`)}
      style={{
        cursor: "pointer",
      }}
    >
      <Card
        className="shadow-innerTop p-4 w-[360px] m-2 relative"
        padding="sm"
        bordered
        hoverable
      >
        <Card.Header className="custom-header flex flex-row justify-between items-center">
          <div>
            <Avatar size="default" icon={<UserOutlined />} />
            <label className="text-xl font-weight-bold mx-2">
              {item.customerName}
            </label>
          </div>
          {item.status === ProjectStatus.REQUESTING ? (
            <label className="text-sm bg-indigo-200 text-indigo-500 p-1 border-none rounded-lg w-[100px] text-center">
              {parseStatusProject(item.status)}
            </label>
          ) : item.status === ProjectStatus.FINISHED ? (
            <label className="text-sm bg-red-100 text-red-500 p-1 border-none rounded-lg w-[100px] text-center">
              {parseStatusProject(item.status)}
            </label>
          ) : (
            <label className="text-sm bg-green-100 text-green-500 p-1 border-none rounded-lg w-[100px] text-center">
              {parseStatusProject(item.status)}
            </label>
          )}
        </Card.Header>
        <Card.Body className="custom-body">
          {item.standOut ? (
            <Badge count={<IconAnimation />} />
          ) : (
            <div className="text-[35px] ml-4">
              <AliwangwangOutlined />
            </div>
          )}
          <div className="p-2 flex flex-row justify-between items-center text-gray-400 border-b-2">
            <label>Ngày gửi: {item.createdDate}</label>
            <label>Cập nhật: {item.updatedDate}</label>
          </div>
          <div className="p-2 flex flex-row justify-start items-center">
            <LocalPhoneIcon className="mr-2" />
            <label className="text-black">{item.phone}</label>
          </div>

          <div className="p-2 flex flex-row justify-start items-center">
            <LocationOnIcon className="mr-2" />
            <label className="text-black">{item.address}</label>
          </div>
          <div className="p-2 flex flex-row justify-start items-center">
            <ArticleIcon className="mr-2" />
            <label className="text-black">{item.packageName}</label>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ConsultingCard;
