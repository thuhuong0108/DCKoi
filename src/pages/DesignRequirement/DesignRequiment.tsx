import { Title } from "@/components";
import { projectDetailActions } from "@/redux/slices/projectDetail/projectDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { TextareaAutosize, TextField } from "@mui/material";
import { Card, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { FloatButton } from "antd";
import { DesignServicesOutlined } from "@mui/icons-material";

const DesignProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.projectDetail.projectDefault);
  const quotation = useAppSelector(
    (state) => state.quotationDetail.quotationDetail
  );
  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
  }, [dispatch, id]);
  console.log(project);

  const customerInfor = [
    {
      title: "Tên khách hàng",
      content: project?.customerName,
      icon: <UserOutlined />,
    },
    {
      title: "Email",
      content: project?.email,
      icon: <MailOutlined />,
    },
    {
      title: "Số điện thoại",
      content: project?.phone,
      icon: <PhoneOutlined />,
    },
    {
      title: "Địa chỉ",
      content: project?.address,
      icon: <EnvironmentOutlined />,
    },
  ];

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full space-y-4">
      <Title name={`Dự án thi công`} />

      <div className="flex flex-row w-full space-x-4 items-center justify-between">
        <Card title="Thông tin khách hàng" className="w-full">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
              {customerInfor.map((item, index) => (
                <div key={index} className="flex flex-row space-x-4">
                  {item.icon}
                  <Typography.Text strong>{item.title}:</Typography.Text>
                  <Typography.Text>{item.content}</Typography.Text>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Title name={`Yêu cầu`} />
      <div>
        <div className="flex flex-row w-full space-x-4 items-center justify-between">
          <TextField
            className="w-full"
            label="Diện tích"
            value={project?.area}
            disabled
            InputProps={{
              endAdornment: <span>m²</span>,
            }}
          />

          <TextField
            className="w-full"
            label="Độ sâu"
            value={project?.depth}
            disabled
            InputProps={{
              endAdornment: <span>m</span>,
            }}
          />
        </div>

        <div>
          <TextField
            style={{ width: "100%", marginTop: "16px" }}
            className="w-full"
            label="Chú thích"
            value={project?.note}
            disabled
          />
        </div>
      </div>

      {/* Thông tin báo giá */}

      {/*  */}
      <FloatButton
        icon={<DesignServicesOutlined />}
        onClick={() => {
          navigate(`design`);
        }}
        className="fixed bottom-10 right-10"
      />
    </div>
  );
};

export default DesignProjectDetail;
