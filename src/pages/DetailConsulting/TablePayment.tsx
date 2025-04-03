import { dateDDMMYYY, formatPrice } from "@/utils/helpers";
import { Card, Table, TableProps } from "antd";
import { TablePaymentBatch } from "../ProjectDetail/type";

const columns: TableProps<TablePaymentBatch>["columns"] = [
  {
    title: "Đợt thanh toán",
    dataIndex: "index",
    key: "index",
    render: (_, __, index) => <a>Đợt {index + 1}</a>,
  },
  {
    title: "Giai đoạn thi công",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
];

const TablePayment = ({ payments }) => {
  console.log(payments);

  return (
    <Card hoverable>
      <Table<TablePaymentBatch>
        columns={columns}
        dataSource={payments}
        pagination={false}
      />
    </Card>
  );
};

export default TablePayment;
