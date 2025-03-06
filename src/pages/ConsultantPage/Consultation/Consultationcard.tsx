import { Button } from "@/components";
import Card from "@/components/ui/Card";
import { ProjectType, StaffType } from "@/models";
import { ProjectStatus } from "@/models/enums/Status";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parseStatusProject } from "@/utils/helpers";
import { UserOutlined } from "@ant-design/icons";
import ArticleIcon from "@mui/icons-material/Article";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Consultationcard = ({
  customerName,
  address,
  phone,
  packageName,
  status,
  createdDate,
  id,
}: ProjectType & {}) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`${id}`)}>
      <Card
        className="shadow-innerTop p-4 w-[370px] m-2"
        padding="sm"
        bordered
        inner
        hoverable
      >
        <Card.Header className="custom-header flex flex-row justify-between items-center">
          <div>
            <Avatar size="default" icon={<UserOutlined />} />
            <label className="text-xl font-weight-bold mx-2">
              {customerName}
            </label>
          </div>
          {status === ProjectStatus.REQUESTING ? (
            <label className="text-sm bg-yellow-100 text-yellow-500 p-1 border-none rounded-lg w-[70px] text-center">
              {parseStatusProject(status)}
            </label>
          ) : status === ProjectStatus.FINISHED ? (
            <label className="text-sm bg-red-100 text-red-500 p-1 border-none rounded-lg w-[70px] text-center">
              {parseStatusProject(status)}
            </label>
          ) : (
            <label className="text-sm bg-green-100 text-green-500 p-1 border-none rounded-lg w-[70px] text-center">
              {parseStatusProject(status)}
            </label>
          )}
        </Card.Header>
        <Card.Body className="custom-body">
          <div className="p-2 flex flex-row justify-between items-center text-gray-400 border-b-2 ">
            <label>{createdDate}</label>
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
            <label className="text-black">{packageName}</label>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Consultationcard;
