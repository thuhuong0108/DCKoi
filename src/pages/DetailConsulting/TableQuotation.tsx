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
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "10%",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      width: "10%",
    },
    {
      title: "Note",
      dataIndex: "note",
      width: "25%",
    },
  ];

  return (
    <div className="pt-5">
      <Row>
        <Col className="flex items-center" onClick={toggleTable}>
          <PlusSquareOutlined
            style={{ marginRight: "8px", fontSize: "20px" }}
          />
          <label className="text-lg">{props.name}</label>
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

      <Row className="px-5 pt-2">
        <Col span={24} className="flex justify-end">
          <label className="text-lg font-bold">
            Tổng tiền: {formatPrice(props.totalPrice)}
          </label>
        </Col>
      </Row>
    </div>
  );
};

export default TableQuotation;
