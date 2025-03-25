import { FieldQuotationDetailType } from "@/models";
import { Category } from "@/models/enums/Category";

export interface QuotationItem {
  name: Category;
  totalPrice: number;
  items: FieldQuotationDetailType[];
}
