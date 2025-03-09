import { FieldQuotationDetailType } from "@/models";

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
}
