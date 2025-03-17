import { dateDDMMYYY, formatPrice, parsePaymentPhase } from "@/utils/helpers";
import { Table, TableProps, Tag } from "antd";
import { TablePaymentBatch } from "./type";

const TablePayment = ({ payments }) => {
  const columns: TableProps<TablePaymentBatch>["columns"] = [
    {
      title: "Đợt thanh toán",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giai đoạn thi công liên quan",
      dataIndex: "status",
      key: "status",
      render: (text) => <a>{parsePaymentPhase(text)}</a>,
    },
    {
      title: "Số tiền trả",
      dataIndex: "totalValue",
      key: "totalValue",
      render: (number) => <a>{formatPrice(number)} </a>,
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <a>{dateDDMMYYY(text)} </a>,
    },

    {
      title: "Trạng thái",
      key: "isPaid",
      dataIndex: "isPaid",
      render: (status) => {
        if (typeof status !== "boolean") return null;
        return status ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : (
          <Tag color="gray">Chưa thanh toán</Tag>
        );
      },
    },
  ];
  return (
    <Table<TablePaymentBatch>
      columns={columns}
      dataSource={payments}
      pagination={false}
    />
  );
};

export default TablePayment;
