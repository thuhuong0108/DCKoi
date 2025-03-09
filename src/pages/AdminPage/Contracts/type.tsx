import { TemplateConstructionItemType } from "@/models";
import { convertStringtoDate } from "@/utils/helpers";
import { Space, TableColumnsType, DatePicker, Switch } from "antd";
import { useState } from "react";

export const columns: TableColumnsType<TemplateConstructionItemType> = [
  {
    title: "Tiêu đề",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },

  {
    title: "Thời gian dự kiến",
    dataIndex: "esTime",
    key: "estTime",
    render: (text, record) => {
      return (
        <Space>
          <DatePicker
            format="YYYY-MM-DD"
            onChange={(date) => {
              record.estTime = convertStringtoDate(date.toString());
            }}
          />
        </Space>
      );
    },
  },
  {
    title: "Chọn cho thanh toán",
    key: "isPayment",
    dataIndex: "isParentSelected",
    render: (text, record) => {
      const isParent = record.child;

      return isParent ? (
        <Switch
          checked={record.isPayment}
          onChange={(checked) => {
            record.isPayment = checked;
          }}
        />
      ) : null;
    },
  },
];
