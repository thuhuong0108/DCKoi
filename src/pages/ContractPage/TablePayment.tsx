import { Card, Table, TableProps } from "antd";
import React from "react";
import { TablePaymentBatch } from "./type";
import { formatPrice } from "@/utils/helpers";

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
    render: (number) => <a>{formatPrice(number)} VND</a>,
  },
  {
    title: "Ngày thanh toán",
    dataIndex: "createdAt",
    key: "createdAt",
  },

  // {
  //   title: "Trạng thái",
  //   key: "status",
  //   dataIndex: "status",
  //   render: (status) => {
  //     const statusMap = {
  //       paid: { color: "green", text: "Đã thanh toán" },
  //       unpaid: {
  //         color: "gray",
  //         text: (
  //           <button
  //             style={{
  //               backgroundColor: "blue",
  //               color: "white",
  //               padding: "5px 10px",
  //               borderRadius: "5px",
  //             }}
  //           >
  //             Thanh toán
  //           </button>
  //         ),
  //       },
  //     };

  //     const { color, text } = statusMap[status] || {
  //       color: "gray",
  //       text: "Chưa xác định",
  //     };

  //     return status === "unpaid" ? text : <Tag color={color}>{text}</Tag>;
  //   },
  // },
];

const TablePayment = ({ payments }) => {
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
