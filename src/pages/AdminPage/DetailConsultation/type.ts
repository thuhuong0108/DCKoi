import { FieldQuotationDetailType } from "@/models";

export interface QuotationItem {
  name: string;
  totalPrice: number;
  items: FieldQuotationDetailType[];
}

// export type QuatationFieldpros = {
//   label: string;
//   totalPrice: number;
//   data: FieldQuotationDetailType[];
// };
