import { FieldQuotationDetailType } from "@/models";
import { Category } from "@/models/enums/Category";
import { useEffect, useState } from "react";
import CategoryField from "./TableQuotation";
import { QuotationItem } from "./type";

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

  const handleChangePackage = (value: string) => {
    console.log(`Selected package: ${value}`);
  };

  return (
    <div>
      <div className="my-4"></div>

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
