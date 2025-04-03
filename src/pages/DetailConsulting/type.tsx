import {
  FieldQuotationDetailType,
  TemplateConstructionItemType,
} from "@/models";
import { Category } from "@/models/enums/Category";
import { parseCategory } from "@/utils/helpers";
import { TableColumnsType } from "antd";

export interface QuotationItem {
  name: Category;
  totalPrice: number;
  items: FieldQuotationDetailType[];
}
export const columns: TableColumnsType<TemplateConstructionItemType> = [
  {
    title: "Tiêu đề",
    dataIndex: "name",
    key: "name",
    width: "50%",
    render: (text, record) => {
      return (
        <div>
          {record.name}{" "}
          {record.category && <span> :{parseCategory(record.category)}</span>}
        </div>
      );
    },
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
];
