import { EquipmentType } from "@/models";

export interface TableAddProps {
  data: EquipmentType[];
}

export interface QuotationItem {
  name: string;
  totalPrice: number;
  items: [];
}
