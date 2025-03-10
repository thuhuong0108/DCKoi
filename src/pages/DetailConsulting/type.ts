import {
  FieldQuotationDetailType,
  TemplateConstructionItemType,
} from "@/models";
import { TableColumnsType } from "antd";

export interface QuotationItem {
  name: string;
  totalPrice: number;
  items: FieldQuotationDetailType[];
}
export const columns: TableColumnsType<TemplateConstructionItemType> = [
  {
    title: "Tiêu đề",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
];
