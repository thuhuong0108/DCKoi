import { Title } from "@/components";
import {
  projectDetailActions,
  selectedProjectDetail,
} from "@/redux/slices/projectDetail/projectDetailSlices";
import {
  quotationDetailActions,
  selectedQuotationDetail,
} from "@/redux/slices/quotationDetail/quotationDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DesignServicesOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { Card, Col, Divider, FloatButton, Row, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DesignProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectedProjectDetail);
  const quotation = useAppSelector(selectedQuotationDetail);
  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(quotationDetailActions.fetchQuotationDetail());
  }, [dispatch, id]);

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
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full w-full space-y-4">
      <Title name={`Thiết kế`} />
      <Row className="gap-4">
        <Col span={8}>
          <Divider orientation="left">Dự án thi công</Divider>

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

          <Divider orientation="left">Yêu cầu</Divider>
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
        </Col>
        <Col span={12}>
          {/* Thông tin báo giá */}
          <Divider orientation="left">Báo giá các hạng mục thi công </Divider>
        </Col>
      </Row>

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
