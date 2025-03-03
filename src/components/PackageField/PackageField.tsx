import { PlusSquareOutlined } from "@ant-design/icons";
import { Col, Row, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";

interface DataType {
  key: React.Key;
  item: string;
  description: string;
  unit: string;
  quantity: number;
}

type PackageFieldpros = {
  label: string;
  data: DataType[];
};

const PackageField = (props: PackageFieldpros) => {
  const [visible, setVisible] = useState(false);

  const toggleTable = () => {
    setVisible(!visible);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Danh mục",
      dataIndex: "item",
      width: "25%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "45%",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
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
          <label className="text-lg">{props.label}</label>
        </Col>
      </Row>
      <Row className="px-5 pt-2">
        {visible && (
          <Table<DataType>
            className="w-full"
            columns={columns}
            dataSource={props.data}
            pagination={false}
          />
        )}
      </Row>
    </div>
  );
};

export default PackageField;
