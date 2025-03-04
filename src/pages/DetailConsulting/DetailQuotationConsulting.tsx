import { FieldQuotationDetailType } from "@/models";
import { Category } from "@/models/enums/Category";
import { useEffect, useState } from "react";
import { QuotationItem } from "./type";
import TableQuotation from "./TableQuotation";
import { Col, Input, Row } from "antd";
import { BorderlessTableOutlined } from "@ant-design/icons";

const DetailQuotationConsulting = ({ quotation, project }) => {
  const services = quotation.services;
  const equipments = quotation.equipments;
  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);
  const [totalPriceQuotation, setTotalPrice] = useState<number>(0);

  console.log("project: ", project);
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

    console.log(itemWork);

    // Update total price using previous state
    setTotalPrice((prevTotal) =>
      itemWork.reduce((sum, item) => sum + item.totalPrice, 0)
    );

    setItemWork(itemWork);
  }, [services, equipments]);

  return (
    <div>
      <Row className="flex flex-row items-start w-full gap-x-20">
        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Công trình: </label>
            <span className="text-gray-500"> #Tên dự án</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">
              Gói thiết kế thi công:
            </label>
            <span className="text-gray-500">{project.package.name}</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">
              Tổng giá trị hợp đồng{" "}
            </label>
            <span className="text-gray-500"> ### VND</span>
          </div>
        </Col>

        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Khách hàng: </label>
            <span className="text-gray-500"> {project.customerName}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Số điện thoại: </label>
            <span className="text-gray-500"> {project.phone}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Địa chỉ email: </label>
            <span className="text-gray-500"> {project.email}</span>
          </div>

          <div className="flex flex-row justify-start items-baseline gap-4 text-lg">
            <BorderlessTableOutlined />
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

      {totalPriceQuotation}
    </div>
  );
};

export default DetailQuotationConsulting;
