import { NotiResult } from "@/components";
import Button from "@/components/ui/Button";
import {
  FieldQuotationDetailType,
  TemplateConstructionItemType,
} from "@/models";
import { Category } from "@/models/enums/Category";
import { QuotationStatus } from "@/models/enums/Status";
import { quotationActions } from "@/redux/slices/quotation/quotationSlices";
import { selectTemplateConstructionDetail } from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { formatPrice } from "@/utils/helpers";
import {
  BorderlessTableOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  InboxOutlined,
  MailOutlined,
  PhoneOutlined,
  PoundCircleOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Divider, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableQuotation from "./TableQuotation";
import { columns, QuotationItem } from "./type";

const DetailQuotationConsulting = ({
  quotation,
  project,
  setOpenDetailQuotation,
  isDetail,
}) => {
  const dispatch = useAppDispatch();
  const services = quotation.services;
  const equipments = quotation.equipments;
  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);
  const [totalPriceQuotation, setTotalPrice] = useState<number>(0);
  const [reason, setReason] = useState("");
  const template = useAppSelector(selectTemplateConstructionDetail);
  const [tableData, setTableData] = useState<TemplateConstructionItemType[]>(
    []
  );

  console.log("template", template);

  const { id } = useParams();
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

    if (quotation.promotion) {
      const discount = quotation.promotion.discount;
      setTotalPrice((prevTotal) =>
        Math.floor(prevTotal - (prevTotal * discount) / 100)
      );
    }

    setItemWork(itemWork);
  }, [services, equipments]);

  const handleEdit = () => {
    const requestUpdating = {
      id: quotation.id,
      isApprove: false,
      reason: reason,
    };

    dispatch(quotationActions.approveQuotation(requestUpdating));
    setOpenDetailQuotation(false);
  };
  const handleAprrove = () => {
    const acceptData = {
      id: quotation.id,
      isApprove: true,
      reason: reason,
    };

    dispatch(quotationActions.approveQuotation(acceptData));
    setOpenDetailQuotation(false);
  };

  return (
    <div>
      {!isDetail &&
        (quotation.status == QuotationStatus.PREVIEW ? (
          <>
            <Row className="flex flex-row gap-4 my-4 justify-end">
              <div>
                <Button
                  block
                  title="Yêu cầu cập nhật bản khác"
                  onClick={handleEdit}
                />
              </div>
              <Button
                success
                title="Đồng ý bản báo giá"
                onClick={handleAprrove}
              />
            </Row>

            <Input.TextArea
              rows={4}
              placeholder="Lí do"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mb-3"
            />
          </>
        ) : quotation.status == QuotationStatus.APPROVED ? (
          <>
            <NotiResult
              status="success"
              icon={<SmileOutlined className="text-blue-600" />}
              title="Hợp đồng đang được soạn. Vui lòng quay lại sau!"
              sutitle={quotation.reason}
            />
          </>
        ) : (
          <>
            <NotiResult
              status="error"
              icon={<CloseCircleOutlined className="text-blue-600" />}
              title="Báo giá bị từ chối!"
              sutitle={quotation.reason}
            />
            <label aria-disabled>{quotation.reason}</label>
          </>
        ))}

      <label>Phiên bản: {quotation.version}</label>
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
              {quotation.promotion && (
                <span className="text-red-500">
                  (Đã giảm: {quotation.promotion.discount}%)
                </span>
              )}
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
      <Divider orientation="left">Báo giá các hạng mục</Divider>
      {itemWork.map((item, index) => (
        <TableQuotation
          key={index}
          name={item.name}
          items={item.items}
          totalPrice={item.totalPrice}
        />
      ))}
      <Divider orientation="left">Quy trình thi công</Divider>

      <Table<TemplateConstructionItemType>
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
    </div>
  );
};

export default DetailQuotationConsulting;
