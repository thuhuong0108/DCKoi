import { PlusSquareOutlined } from "@ant-design/icons";
import { Col, Collapse, Row, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { FieldQuotationDetailType } from "@/models";
import { useState } from "react";
import { Funtion, QuotationItem } from "./type";
import { TextField } from "@mui/material";
import { parseCategory } from "@/utils/helpers";

const TableQuotation = (
  props: QuotationItem &
    Funtion & { onUpdateItem: (item: FieldQuotationDetailType) => void }
) => {
  const [visible, setVisible] = useState(false);

  const toggleTable = () => {
    setVisible(!visible);
  };

  const handleChange = (
    record: FieldQuotationDetailType,
    field: keyof FieldQuotationDetailType,
    value: any
  ) => {
    const updatedItem = { ...record, [field]: value };
    props.onUpdateItem(updatedItem); // Gọi hàm callback để cập nhật state
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
        return (
          <>
            {record.isService ? (
              <Typography.Text>{record.price}</Typography.Text>
            ) : (
              <TextField
                type="number"
                inputProps={{ min: 0 }}
                value={text}
                onChange={(e) => {
                  handleChange(record, "price", Number(e.target.value));
                }}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "10%",
      render: (text, record) => {
        return (
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            value={text}
            onChange={(e) => {
              handleChange(record, "quantity", Number(e.target.value));
            }}
          />
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      width: "10%",
      render: (text, record) => {
        return (
          <Typography.Text>{record.price * record.quantity}</Typography.Text>
        );
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
      width: "25%",
      render: (text, record) => {
        return (
          <TextField
            value={text}
            onChange={(e) => {
              handleChange(record, "note", e.target.value);
            }}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Typography.Link
            onClick={() => {
              props.removeItem(record);
            }}
          >
            Xóa
          </Typography.Link>
        );
      },
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
    </div>
  );
};

export default TableQuotation;
