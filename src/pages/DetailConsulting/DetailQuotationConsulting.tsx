import { FieldQuotationDetailType } from "@/models";
import { Category } from "@/models/enums/Category";
import { useEffect, useState } from "react";
import { QuotationItem } from "./type";
import TableQuotation from "./TableQuotation";
import { Col, Input, Row } from "antd";
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
import { formatPrice } from "@/utils/helpers";
import Button from "@/components/ui/Button";
import { NotiResult, Title } from "@/components";
import { useAppDispatch } from "@/redux/store/hook";
import { quotationActions } from "@/redux/slices/quotation/quotationSlices";
import { projectDetailActions } from "@/redux/slices/projectDetail/projectDetailSlices";
import { QuotationStatus } from "@/models/enums/Status";

const DetailQuotationConsulting = ({
  quotation,
  project,
  setOpenDetailQuotation,
}) => {
  const dispatch = useAppDispatch();
  const services = quotation.services;
  const equipments = quotation.equipments;
  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);
  const [totalPriceQuotation, setTotalPrice] = useState<number>(0);
  const [reason, setReason] = useState("");

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

  const handleEdit = () => {
    const requestUpdating = {
      id: quotation.id,
      isApprove: false,
      reason: reason,
    };

    dispatch(quotationActions.approveQuotation(requestUpdating));
    setOpenDetailQuotation(false);
    dispatch(projectDetailActions.reloadProjectDetail(project.id));
  };
  const handleAprrove = () => {
    const acceptData = {
      id: quotation.id,
      isApprove: true,
      reason: reason,
    };
    dispatch(quotationActions.approveQuotation(acceptData));
    setOpenDetailQuotation(false);
    dispatch(projectDetailActions.reloadProjectDetail(project.id));
  };

  return (
    <div>
      {quotation.status == QuotationStatus.PREVIEW ? (
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
      )}

      <Title name="Thông tin báo giá chi tiết" />
      <label>Phiên bản: {quotation.version}</label>
      <Row className="flex flex-row items-start w-full gap-x-20 mt-4">
        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined className="text-blue-600" />
            <label className="text-blue-600 font-semibold">Công trình: </label>
            <span className="text-gray-500"> #Tên dự án</span>
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
              {formatPrice(totalPriceQuotation)} VND
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

      {itemWork.map((item, index) => (
        <TableQuotation
          key={index}
          name={item.name}
          items={item.items}
          totalPrice={item.totalPrice}
        />
      ))}
    </div>
  );
};

export default DetailQuotationConsulting;
