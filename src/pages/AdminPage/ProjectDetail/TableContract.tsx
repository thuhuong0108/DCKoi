import { Button } from "@/components";
import { ContractProjectType } from "@/models";
import { dateDDMMYYY, formatPrice, parseStatusContract } from "@/utils/helpers";
import { EyeOutlined } from "@ant-design/icons";
import { Modal, Table, TableProps, Tag } from "antd";
import { useState } from "react";
import ModalContract from "./ModalContract";

const TableContract = ({ contracts }) => {
  const [openDetailContract, setOpenDetailContract] = useState(false);
  const [selectedContract, setSelectedContract] =
    useState<ContractProjectType | null>(null);

  const handleCloseModal = () => {
    setOpenDetailContract(false);
    setSelectedContract(null);
  };

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
      render: (_, record) => (
        <Button
          leadingIcon={<EyeOutlined />}
          title="Xem chi tiết"
          onClick={() => {
            setSelectedContract(record);
            setOpenDetailContract(true);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Table<ContractProjectType>
        columns={columns}
        dataSource={contracts}
        pagination={false}
      />

      {/* <Modal
        title={`Thông tin chi tiêt hợp đồng`}
        open={openDetailContract}
        width={1500}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
        onOk={handleCloseModal}
        footer={false}
      >
        {selectedContract && <ModalContract id={selectedContract.id} />}
      </Modal> */}
    </>
  );
};

export default TableContract;
