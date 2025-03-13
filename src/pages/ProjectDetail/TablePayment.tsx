import { dateDDMMYYY, formatPrice, parsePaymentPhase } from "@/utils/helpers";
import { Modal, Table, TableProps, Tag } from "antd";
import { TablePaymentBatch } from "./type";
import { Button } from "@/components";
import { useState } from "react";
import ModalPayment from "./ModalPayment";

const TablePayment = ({ payments }) => {
  const [openPayment, setOpenPayment] = useState(false);
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
          <Button
            primary
            title="Thanh toán"
            onClick={() => setOpenPayment(true)}
          />
        );
      },
    },
  ];
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <>
      {!payments[0]?.isPaid ? (
        <div className="mb-3">
          <Button
            primary
            title="Thanh toán toàn bộ"
            onClick={() => setOpenPayment(true)}
          />
        </div>
      ) : (
        <></>
      )}

      <Table<TablePaymentBatch>
        columns={columns}
        dataSource={payments}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => setSelectedPayment(record),
          };
        }}
      />

      <Modal
        title={`Thanh toán ${selectedPayment ? selectedPayment.name : ""}`}
        centered
        open={openPayment}
        footer={false}
        onClose={() => setOpenPayment(false)}
        onOk={() => setOpenPayment(false)}
        onCancel={() => setOpenPayment(false)}
        width={800}
      >
        {selectedPayment && <ModalPayment payment={selectedPayment} />}
      </Modal>
    </>
  );
};

export default TablePayment;
