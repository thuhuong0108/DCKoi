import {
  FieldQuotationDetailType,
  TemplateConstructionItemType,
} from "@/models";
import { Category } from "@/models/enums/Category";
import { Staff } from "@/models/ProjectType";
import { parsePosition } from "@/utils/helpers";
import { TableColumnsType, TableProps } from "antd";

export const staffConlumns: TableProps<Staff>["columns"] = [
  {
    title: "Tên",
    dataIndex: "fullName",
    key: "fullName",
    render: (text, record) => {
      return (
        <div className="flex items-center">
          <img
            src={record.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span>{record.fullName}</span>
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Chức vụ",
    dataIndex: "position",
    key: "position",
    render: (text, record) => {
      return <span>{parsePosition(record.position)}</span>;
    },
  },
];

export interface TablePaymentBatch {
  id: string;
  key: string;
  createdAt: string;
  name: string;
  totalValue: number;
  status: string;
}

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
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
];
