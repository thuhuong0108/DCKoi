import { FieldQuotationDetailType } from "@/models";
import { Category } from "@/models/enums/Category";
import { useEffect, useState } from "react";
import { QuotationItem } from "./type";
import TableQuotation from "@/pages/DetailConsulting/TableQuotation";

const DetailQuotationConsulting = ({ quotation, project }) => {
  const services = quotation.services;
  const equipments = quotation.equipments;
  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);
  const [totalPriceQuotation, setTotalPrice] = useState<number>(0);

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
  return (
    <div>
      <div className="my-4"></div>
      {totalPriceQuotation}

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
