import {
  FieldQuotationDetailType,
  TemplateConstructionItemType,
} from "@/models";
import { Category } from "@/models/enums/Category";
import { TableColumnsType } from "antd";

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

export const columns: TableColumnsType<TemplateConstructionItemType> = [
  {
    title: "Tiêu đề",
    dataIndex: "name",
    key: "name",
    width: "50%",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    width: "50%",
  },
];
