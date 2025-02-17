import Card from "../ui/Card";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "../ui";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";

interface ConsultationProp {
  fullname: string;
  date: string;
  time: string;
  phone: string;
  address: string;
  basepackage: string;
  status: string;
}
const Consultationcard = ({
  fullname,
  date,
  time,
  phone,
  address,
  basepackage,
  status,
}: ConsultationProp) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate("/admin/detail-consultation");
  };
  const handleAddStaff = () => {
    console.log("data: ", status);
  };
  return (
    <Card
      className="shadow-innerTop p-4 w-[370px] m-2"
      padding="sm"
      bordered={true}
      inner={true}
      hoverable={true}
    >
      <Card.Header className="custom-header flex flex-row justify-between items-center">
        <div>
          <Avatar size="default" icon={<UserOutlined />} />
          <label className="text-xl font-weight-bold mx-2">{fullname}</label>
        </div>
        {status === "pending" ? (
          <label className="text-sm bg-yellow-100 text-yellow-500 p-1 border-none rounded-lg w-[70px] text-center">
            {status}
          </label>
        ) : status === "cancel" ? (
          <label className="text-sm bg-red-100 text-red-500 p-1 border-none rounded-lg w-[70px] text-center">
            {status}
          </label>
        ) : (
          <label className="text-sm bg-green-100 text-green-500 p-1 border-none rounded-lg w-[70px] text-center">
            {status}
          </label>
        )}
      </Card.Header>
      <Card.Body className="custom-body">
        <div className="p-2 flex flex-row justify-between items-center text-gray-400 border-b-2 ">
          <label>{date}</label>
          <label>{time}</label>
        </div>
        <div className="p-2 flex flex-row justify-start items-center">
          <LocalPhoneIcon className="mr-2 " />
          <label className="text-black">{phone}</label>
        </div>

        <div className="p-2 flex flex-row justify-start items-center">
          <LocationOnIcon className="mr-2 " />
          <label className="text-black">{address}</label>
        </div>
        <div className="p-2 flex flex-row justify-start items-center">
          <ArticleIcon className="mr-2 " />
          <label className="text-black">{basepackage}</label>
        </div>
      </Card.Body>
      <Card.Footer className="custom-footer flex flex-row justify-between">
        <Button
          info
          onClick={handleDetail}
          title="Detail"
          className="w-[165px]"
        />
        <Button
          danger
          onClick={handleAddStaff}
          title="Add staff"
          className="w-[165px] uppercase"
        />
      </Card.Footer>
    </Card>
  );
};

export default Consultationcard;
