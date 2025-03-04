import { FieldQuotationDetailType } from "@/models";
import { Category } from "@/models/enums/Category";
import { useEffect, useState } from "react";
import CategoryField from "./TableQuotation";
import { QuotationItem } from "./type";
import { Button, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { selectRole } from "@/redux/slices/auth/authSlices";
import { RoleUser } from "@/models/enums/RoleUser";
import { QuotationStatus } from "@/models/enums/Status";
import { quotationActions } from "@/redux/slices/quotation/quotationSlices";

const DetailQuotationConsulting = ({ quotation, project }) => {
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

    console.log(itemWork);

    // Update total price using previous state
    setTotalPrice((prevTotal) =>
      itemWork.reduce((sum, item) => sum + item.totalPrice, 0)
    );

    setItemWork(itemWork);
  }, [services, equipments]);

  const handleChangePackage = (value: string) => {
    console.log(`Selected package: ${value}`);
  };

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
  };

  return (
    <div>
      <div className="my-4"></div>

      {(role === RoleUser.ADMINISTRATOR && quotationStatus === QuotationStatus.OPEN) && (
        <div className="bg-white w-full p-5 border-2 rounded-md">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-xl text-red-500">Báo giá chi tiết từ người tư vấn báo giá có được chấp thuận không?</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleActionClick("reject")} color="danger" variant="solid">Từ chối</Button>
              <Button onClick={() => handleActionClick("approve")} color="primary" variant="solid">Chấp nhận</Button>
            </div>
          </div>
          {showTextArea && (
            <div className="mt-4">
              <p className="text-lg font-semibold mb-2">Vui lòng nhập lý do {actionType === "approve" ? "chấp nhận" : "từ chối"}:</p>
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

      {itemWork.map((item, index) => (
        <CategoryField
          key={index}
          name={item.name}
          items={item.items}
          totalPrice={item.totalPrice}
        />
      ))}

      {totalPriceQuotation}
    </div>
  );
};

export default DetailQuotationConsulting;
