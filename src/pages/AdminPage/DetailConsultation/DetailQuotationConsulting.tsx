import { FieldQuotationDetailType } from "@/models";
import { Category } from "@/models/enums/Category";
import { useEffect, useState } from "react";
import CategoryField from "./TableQuotation";
import { QuotationItem } from "./type";
import { Button, Col, Input, Row } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { selectRole } from "@/redux/slices/auth/authSlices";
import { RoleUser } from "@/models/enums/RoleUser";
import { QuotationStatus } from "@/models/enums/Status";
import { quotationActions } from "@/redux/slices/quotation/quotationSlices";
import TableQuotation from "./TableQuotation";
import { projectDetailActions } from "@/redux/slices/projectDetail/projectDetailSlices";
import { Title } from "@/components";
import {
  BorderlessTableOutlined,
  EnvironmentOutlined,
  InboxOutlined,
  MailOutlined,
  PhoneOutlined,
  PoundCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatPrice } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

const DetailQuotationConsulting = ({
  quotation,
  project,
  setOpenDetailQuotation,
}) => {
  const navigate = useNavigate();
  const services = quotation.services;
  const equipments = quotation.equipments;
  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);
  const [totalPriceQuotation, setTotalPrice] = useState<number>(0);

  const [showTextArea, setShowTextArea] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [reason, setReason] = useState("");

  const role = useAppSelector(selectRole);
  const quotationStatus = quotation.status;

  const dispatch = useAppDispatch();

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

      let totalPrice = fieldQuotationDetailType.reduce(
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

  const handleActionClick = (action) => {
    setActionType(action);
    setShowTextArea(true);
  };

  const handleConfirmAction = () => {
    if (actionType !== null) {
      dispatch(
        quotationActions.rejectAcceptQuotation({
          id: quotation.id,
          isAccept: actionType === "approve" ? true : false,
          reason,
        })
      );
    }
    setShowTextArea(false);
    setReason("");
    dispatch(projectDetailActions.fetchProjectDetail(project.id));
    setOpenDetailQuotation(false);
  };

  return (
    <div>
      <div className="my-4"></div>

      {role === RoleUser.ADMINISTRATOR &&
        quotationStatus === QuotationStatus.OPEN && (
          <div className="bg-white w-full p-5 border-2 rounded-md my-4">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <p className="text-xl text-red-500">
                  Báo giá chi tiết từ người tư vấn báo giá có được chấp thuận
                  không?
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleActionClick("reject")}
                  color="danger"
                  variant="solid"
                >
                  Từ chối
                </Button>
                <Button
                  onClick={() => handleActionClick("approve")}
                  color="primary"
                  variant="solid"
                >
                  Chấp nhận
                </Button>
              </div>
            </div>
            {showTextArea && (
              <div className="mt-4">
                <p className="text-lg font-semibold mb-2">
                  Vui lòng nhập lý do{" "}
                  {actionType === "approve" ? "chấp nhận" : "từ chối"}:
                </p>
                <Input.TextArea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-2 mt-2">
                  <Button onClick={handleConfirmAction} type="primary">
                    Xác nhận
                  </Button>
                  <Button onClick={() => setShowTextArea(false)}>Hủy</Button>
                </div>
              </div>
            )}
          </div>
        )}

      {quotationStatus === QuotationStatus.APPROVED && (
        <div className="bg-white w-full p-5 border-2 rounded-md my-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-xl text-red-500">
                Tạo hợp đồng cho khách hàng!
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setOpenDetailQuotation(false)}
                color="danger"
                variant="solid"
              >
                Hủy
              </Button>
              <Button
                onClick={() => navigate(`contract/${quotation.id}`)}
                color="primary"
                variant="solid"
              >
                Tạo
              </Button>
            </div>
          </div>
        </div>
      )}

      <Title name="Thông tin báo giá chi tiết" />
      <label>Phiên bản: {quotation.version}</label>
      <Row className="flex flex-row items-start w-full gap-x-20 mt-4">
        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Công trình: </label>
            <span className="text-gray-500"> #Tên dự án</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <InboxOutlined />
            <label className="text-black font-semibold">
              Gói thiết kế thi công:
            </label>
            <span className="text-gray-500">{project.package.name}</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <PoundCircleOutlined />
            <label className="text-black font-semibold">
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
            <UserOutlined />
            <label className="text-black font-semibold">Khách hàng: </label>
            <span className="text-gray-500"> {project.customerName}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <PhoneOutlined />
            <label className="text-black font-semibold">Số điện thoại: </label>
            <span className="text-gray-500"> {project.phone}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <MailOutlined />
            <label className="text-black font-semibold">Địa chỉ email: </label>
            <span className="text-gray-500"> {project.email}</span>
          </div>

          <div className="flex flex-row justify-start items-baseline gap-4 text-lg">
            <EnvironmentOutlined />
            <label className="text-black font-semibold">
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
