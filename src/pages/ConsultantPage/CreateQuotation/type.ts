import { EquipmentType, FieldQuotationDetailType } from "@/models";

export interface TableAddProps {
  data: FieldQuotationDetailType[];
}

export interface QuotationItem {
  name: string;
  totalPrice: number;
  items: FieldQuotationDetailType[];
}
export interface Funtion {
  removeItem: (item: FieldQuotationDetailType) => void;
  // openEquipments: () => void;
  // openServices: () => void;
}
// export interface Items {
//   id: string;
//   quantity: number;
//   name: string;
//   note: string;
//   category: string;
//   unit: string;
//   price: number;
// }
