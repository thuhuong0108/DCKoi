import {
  FieldQuotationDetailType,
  TemplateConstructionItemType,
} from "@/models";
import { Category } from "@/models/enums/Category";
import { RoleUser } from "@/models/enums/RoleUser";
import { QuotationStatus } from "@/models/enums/Status";
import { selectRole } from "@/redux/slices/auth/authSlices";
import { quotationActions } from "@/redux/slices/quotation/quotationSlices";
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
import { Button, Col, Divider, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollapseQuotation from "./CollapseQuotation";
import { columns, QuotationItem } from "./type";

const DetailQuotationConsulting = ({
  quotation,
  project,
  setOpenDetailQuotation,
  isDetail,
}) => {
  const dispatch = useAppDispatch();
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

  const handleActionClick = async (action) => {
    setActionType(action);
    if (action == "reject") {
      setShowTextArea(true);
    } else {
      await dispatch(
        quotationActions.rejectAcceptQuotation({
          id: quotation.id,
          isAccept: action === "approve" ? true : false,
          reason,
        })
      );
      setShowTextArea(false);
      setReason("");
      setOpenDetailQuotation(false);
    }
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
    setOpenDetailQuotation(false);
  };

  return (
    <div>
      <div className="my-4"></div>
      {!isDetail && (
        <>
          {role === RoleUser.ADMINISTRATOR &&
            quotationStatus === QuotationStatus.OPEN && (
              <div className="bg-white w-full p-5 border-2 rounded-md my-4">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="text-xl text-red-500">
                      Báo giá chi tiết từ người tư vấn báo giá có được chấp
                      thuận không?
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
                      onClick={async () => handleActionClick("approve")}
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
                      Vui lòng nhập lý do:
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
                      <Button onClick={() => setShowTextArea(false)}>
                        Hủy
                      </Button>
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
        </>
      )}

      <label>Phiên bản: {quotation.version}</label>
      <Row className="flex flex-row items-start w-full gap-x-20 mt-4">
        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Công trình: </label>
            <span className="text-gray-500">{project.name}</span>
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
              {formatPrice(totalPriceQuotation)}
              {quotation.promotion && (
                <span className="text-red-500">
                  {" "}
                  (Đã giảm: {quotation.promotion.discount}%)
                </span>
              )}
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

      <Divider orientation="left">Báo giá các hạng mục công việc </Divider>
      {itemWork.map((item, index) => (
        <CollapseQuotation
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
