import { FieldQuotationDetailType } from "@/models";

export interface QuotationItem {
  name: string;
  totalPrice: number;
  items: FieldQuotationDetailType[];
}
