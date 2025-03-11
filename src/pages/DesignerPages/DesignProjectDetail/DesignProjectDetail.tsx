import { Title } from "@/components";
import { FieldQuotationDetailType } from "@/models";
import { Category } from "@/models/enums/Category";
import {
  projectDetailActions,
  selectedProjectDetail,
} from "@/redux/slices/projectDetail/projectDetailSlices";
import { selectedQuotationDetail } from "@/redux/slices/quotationDetail/quotationDetailSlices";
import {
  quotationProjectActions,
  selectedQuotationProject,
} from "@/redux/slices/quotationProject/quotationProjectSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DesignServicesOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import {
  Card,
  Col,
  Descriptions,
  Divider,
  FloatButton,
  Row,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CollapseQuotation from "./CollapseQuotation";
import { QuotationItem } from "./type";
import { formatPrice } from "@/utils/helpers";

const DesignProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectedProjectDetail);
  const quotations = useAppSelector(selectedQuotationProject);
  const quotation = useAppSelector(selectedQuotationDetail);
  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);
  const [totalPriceQuotation, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
    dispatch(quotationProjectActions.fetchQuotationActiveProject(id));
  }, [dispatch, id]);

  const services = quotation?.services;
  const equipments = quotation?.equipments;

  useEffect(() => {
    const categoryCollection: string[] = Object.values(Category);

    // Build itemWork from services and equipments
    const itemWork = categoryCollection.map((category) => {
      const servicesInCategory = services.filter(
        (service) => service.category === category
      );

      const equipmentsInCategory = equipments
        .filter((equipment) => equipment.category === category)
        .map((equipment) => ({
          ...equipment,
          unit: "Chiếc",
        }));

      const fieldQuotationDetailType: FieldQuotationDetailType[] = [
        ...servicesInCategory,
        ...equipmentsInCategory,
      ];

      const totalPrice = fieldQuotationDetailType.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        totalPrice,
        name: category,
        items: fieldQuotationDetailType,
      };
    });

    // Update total price using previous state
    setTotalPrice((prevTotal) =>
      itemWork.reduce((sum, item) => sum + item.totalPrice, 0)
    );

    setItemWork(itemWork);
  }, [services, equipments]);

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
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name={`Dự án thi công`} />
      <Row>
        <Col span={8} className="mr-4">
          <Divider orientation="left">Thông tin khách hàng</Divider>
          <div className="flex flex-row w-full space-x-4 items-center justify-between">
            <Card className="w-full">
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
          <Divider orientation="left">Thông tin báo giá</Divider>
          <Descriptions>
            <Descriptions.Item label="Tổng giá trị dự án">
              {formatPrice(totalPriceQuotation)}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Báo giá các hạng mục</Divider>
          {itemWork.map((item, index) => (
            <CollapseQuotation
              key={index}
              name={item.name}
              items={item.items}
              totalPrice={item.totalPrice}
            />
          ))}
        </Col>
      </Row>

      <FloatButton
        icon={<DesignServicesOutlined />}
        onClick={() => {
          navigate(`/designer/${id}/design`);
        }}
        className="fixed bottom-10 right-10"
      />
    </div>
  );
};

export default DesignProjectDetail;
