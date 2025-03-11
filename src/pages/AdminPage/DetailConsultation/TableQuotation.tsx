import { PlusSquareOutlined } from "@ant-design/icons";
import { Col, Row, Table } from "antd";
import type { TableColumnsType } from "antd";
import { FieldQuotationDetailType } from "@/models";
import { useState } from "react";
import { QuotationItem } from "./type";
import { formatPrice } from "@/utils/helpers";

const TableQuotation = (props: QuotationItem) => {
  const [visible, setVisible] = useState(false);

  const toggleTable = () => {
    setVisible(!visible);
  };

  const columns: TableColumnsType<FieldQuotationDetailType> = [
    {
      key: "1",
      title: "Danh mục công việc",
      dataIndex: "name",
      width: "25%",
    },
    {
      key: "2",
      title: "Mô tả",
      dataIndex: "description",
      width: "20%",
    },
    {
      key: "3",
      title: "Giá",
      dataIndex: "price",
      width: "10%",
      render: (text, record) => {
        return <>{formatPrice(record.price)}</>;
      },
    },
    {
      key: "4",
      title: "Số lượng",
      dataIndex: "quantity",
      width: "10%",
    },
    {
      key: "5",
      title: "Tổng tiền",
      dataIndex: "total",
      width: "15%",
      render: (text, record) => {
        return <>{formatPrice(record.price * record.quantity)}</>;
      },
    },
    {
      key: "6",
      title: "Đơn vị",
      dataIndex: "unit",
      width: "10%",
    },

    {
      key: "7",
      title: "Chú thích",
      dataIndex: "note",
      width: "15%",
    },
  ];

  return (
    <div className="pt-5">
      <Row>
        <Col className="flex items-center" onClick={toggleTable}>
          <PlusSquareOutlined
            style={{ marginRight: "8px", fontSize: "20px" }}
          />
          <label className="text-base">{props.name}</label>
        </Col>
      </Row>
      <Row className="px-5 pt-2">
        {visible && (
          <Table<FieldQuotationDetailType>
            className="w-full"
            columns={columns}
            dataSource={props.items}
            pagination={false}
          />
        )}
      </Row>

      <Row className="p-2 my-2 flex justify-end bg-gray-50">
        <Col span={18}>
          <label className="text-base font-semibold">Tổng tiền:</label>
        </Col>
        <Col span={6}>
          <label className="text-base font-semibold">
            {formatPrice(props.totalPrice)}
          </label>
        </Col>
      </Row>
    </div>
  );
};

export default TableQuotation;
