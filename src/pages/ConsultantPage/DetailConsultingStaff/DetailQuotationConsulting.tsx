import { Button } from "@/components";
import {
  FieldQuotationDetailType,
  TemplateConstructionItemType,
} from "@/models";
import { Category } from "@/models/enums/Category";
import { QuotationStatus } from "@/models/enums/Status";
import {
  selectTemplateConstructionDetail,
  templateConstructionDetailActions,
} from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { formatPrice } from "@/utils/helpers";
import {
  BorderlessTableOutlined,
  EnvironmentOutlined,
  InboxOutlined,
  MailOutlined,
  PhoneOutlined,
  PoundCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Divider, Result, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableQuotation from "./TableQuotation";
import { columns, QuotationItem } from "./type";

const DetailQuotationConsulting = ({ quotation, project }) => {
  const dispatch = useAppDispatch();
  console.log("quotationdetail", quotation);
  const services = quotation.services;
  const equipments = quotation.equipments;

  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);
  const [totalPriceQuotation, setTotalPrice] = useState<number>(0);

  const navigate = useNavigate();
  const template = useAppSelector(selectTemplateConstructionDetail);
  const [tableData, setTableData] = useState<TemplateConstructionItemType[]>(
    []
  );

  useEffect(() => {
    if (quotation?.templateConstructionId) {
      dispatch(
        templateConstructionDetailActions.getTemplateConstructionDetail(
          quotation.templateConstructionId
        )
      );
    }
  }, [quotation?.templateConstructionId]);

  useEffect(() => {
    if (template.templateContructionItems) {
      setTableData(flattenData(template.templateContructionItems));
    }
  }, [template.templateContructionItems]);

  const flattenData = (items: TemplateConstructionItemType[]) => {
    return items.map((item) => ({
      ...item,
      key: item.id,
      children: item.child ? flattenData(item.child) : undefined,
    }));
  };

  useEffect(() => {
    const categoryCollection: string[] = Object.values(Category);

    // Build itemWork from services and equipments
    const itemWork = categoryCollection.map((category) => {
      const servicesInCategory = services
        .filter((service) => service.category === category)
        .map((service) => ({
          ...service,
        }));

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

  const handleRewrite = () => {
    navigate(`/consultant/${quotation.id}/rewrite-quotation`);
  };
  return (
    <div>
      {quotation.status === QuotationStatus.UPDATING ||
      quotation.status === QuotationStatus.REJECTED ? (
        <div className="flex flex-col justify-center">
          <Result
            status="error"
            subTitle={quotation.reason}
            title={
              quotation.status === QuotationStatus.UPDATING
                ? "Báo giá đang được cập nhật"
                : "Báo giá đã bị người điều hành từ chối"
            }
            extra={[
              <Button
                danger
                title="Viết lại báo cáo"
                onClick={handleRewrite}
              />,
            ]}
          />
        </div>
      ) : quotation.status === QuotationStatus.APPROVED ||
        quotation.status === QuotationStatus.OPEN ? (
        <Result
          status="success"
          subTitle={quotation.reason}
          title={
            quotation.status === QuotationStatus.OPEN
              ? "Báo giá đang chờ admin duyệt"
              : "Báo giá đã được chấp thuận"
          }
        />
      ) : (
        <></>
      )}
      s<label>Phiên bản: {quotation.version}</label>
      <Row className="flex flex-row items-start w-full gap-x-20 mt-4">
        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined className="text-blue-600" />
            <label className="text-blue-600 font-semibold">Công trình: </label>
            <span className="text-gray-500">{project.name}</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <InboxOutlined className="text-blue-600" />
            <label className="text-blue-600 font-semibold">
              Gói thiết kế thi công:
            </label>
            <span className="text-gray-500">{project.package.name}</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <PoundCircleOutlined className="text-blue-600" />
            <label className="text-blue-600 font-semibold">
              Tổng giá trị hợp đồng:
            </label>
            <span className="text-gray-500">
              {" "}
              {formatPrice(totalPriceQuotation)}
            </span>
          </div>
        </Col>

        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <UserOutlined className="text-blue-600" />
            <label className="text-blue-600 font-semibold">Khách hàng: </label>
            <span className="text-gray-500"> {project.customerName}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <PhoneOutlined className="text-blue-600" />
            <label className="text-blue-600 font-semibold">
              Số điện thoại:{" "}
            </label>
            <span className="text-gray-500"> {project.phone}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <MailOutlined className="text-blue-600" />
            <label className="text-blue-600 font-semibold">
              Địa chỉ email:{" "}
            </label>
            <span className="text-gray-500"> {project.email}</span>
          </div>

          <div className="flex flex-row justify-start items-baseline gap-4 text-lg">
            <EnvironmentOutlined className="text-blue-600" />
            <label className="text-blue-600 font-semibold">
              Địa chỉ thi công:
            </label>

            <span className="max-w-[300px] text-gray-500">
              {project.address}
            </span>
          </div>
        </Col>
      </Row>
      <Divider orientation="left">Báo giá các hạng mục thi công</Divider>
      {itemWork.map((item, index) => (
        <TableQuotation
          key={index}
          name={item.name}
          items={item.items}
          totalPrice={item.totalPrice}
        />
      ))}
      <Divider orientation="left">Kế hoạch thi công</Divider>
      <Table<TemplateConstructionItemType>
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
    </div>
  );
};

export default DetailQuotationConsulting;
