import { Button } from "@/components";
import { ContractProjectType } from "@/models";
import { dateDDMMYYY, formatPrice, parseStatusContract } from "@/utils/helpers";
import { EyeOutlined } from "@ant-design/icons";
import { Table, TableProps, Tag } from "antd";

const columns: TableProps<ContractProjectType>["columns"] = [
  {
    title: "Stt",
    dataIndex: "index",
    key: "index",
    render: (_, __, index) => <a>{index + 1}</a>,
  },
  {
    title: "Tên hợp đồng",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Khách hàng",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Giá trị hợp đồng",
    dataIndex: "contractValue",
    key: "contractValue",
    render: (number) => <a>{formatPrice(number)} </a>,
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => <a>{dateDDMMYYY(text)} </a>,
  },

  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    render: (status) => {
      const statusMap = {
        ACTIVE: { color: "green", text: "ACTIVE" },
        PROCESSING: { color: "blue", text: "PROCESSING" },
        CANCELLED: {
          color: "red",
          text: "CANCELLED",
        },
      };

      const { color, text } = statusMap[status] || {
        color: "gray",
      };

      return <Tag color={color}>{parseStatusContract(text)}</Tag>;
    },
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (record) => (
      <Button leadingIcon={<EyeOutlined />} title="Xem chi tiết" />
    ),
  },
];

const TableContract = ({ contracts }) => {
  return (
    <Table<ContractProjectType>
      columns={columns}
      dataSource={contracts}
      pagination={false}
    />
  );
};

export default TableContract;
