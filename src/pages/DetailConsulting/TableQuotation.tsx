import { FieldQuotationDetailType } from "@/models";
import { formatPrice, parseCategory } from "@/utils/helpers";
import type { TableColumnsType } from "antd";
import { Col, Collapse, Row, Table } from "antd";
import { useState } from "react";
import { QuotationItem } from "./type";

const TableQuotation = (props: QuotationItem) => {
  const [visible, setVisible] = useState(false);

  const toggleTable = () => {
    setVisible(!visible);
  };

  const columns: TableColumnsType<FieldQuotationDetailType> = [
    {
      title: "Danh mục công việc",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "20%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "10%",
      render: (text, record) => {
        return <>{formatPrice(record.price)}</>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "10%",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      width: "15%",
      render: (text, record) => {
        return <>{formatPrice(record.price * record.quantity)}</>;
      },
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      width: "10%",
    },

    {
      title: "Chú thích",
      dataIndex: "note",
      width: "15%",
    },
  ];

  return (
    <div className="pt-5">
      <Collapse
        items={[
          {
            key: "index",
            label: `${parseCategory(props.name)}`,
            children: (
              <Table<FieldQuotationDetailType>
                className="w-full"
                columns={columns}
                dataSource={props.items}
                pagination={false}
              />
            ),
          },
        ]}
      />

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
