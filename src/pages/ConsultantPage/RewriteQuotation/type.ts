import { FieldQuotationDetailType } from "@/models";
import { Category } from "@/models/enums/Category";

export interface TableAddProps {
  data: FieldQuotationDetailType[];
}

export interface QuotationItem {
  name: Category;
  totalPrice: number;
  items: FieldQuotationDetailType[];
}
export interface Funtion {
  removeItem: (item: FieldQuotationDetailType) => void;
}
