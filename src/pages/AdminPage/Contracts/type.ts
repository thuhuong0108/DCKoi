import { TableColumnsType } from "antd";

export interface ItemConstruction {
  key: React.ReactNode;
  id: string;
  name: number;
  description: string;
  child?: ItemConstruction[];
}

export const conlums: TableColumnsType<ItemConstruction> = [
  {
    title: "Tiêu đề",
    dataIndex: "name",
    key: "name",
  },
];
