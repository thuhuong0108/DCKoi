import { TemplateConstructionItemType } from "@/models";
import { convertStringtoDate, parseCategory } from "@/utils/helpers";
import { Space, TableColumnsType, DatePicker, Switch, Typography } from "antd";
import dayjs from "dayjs";
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
    title: "Hệ số ước tính",
    dataIndex: "duration",
    key: "duration",
  },

  {
    title: "Thời gian dự kiến",
    dataIndex: "esTime",
    key: "estTime",
    render: (text, record) => {
      const value =
        record.estTime && dayjs(record.estTime, "YYYY-MM-DD").isValid()
          ? dayjs(record.estTime, "YYYY-MM-DD")
          : null;
      return (
        <Space>
          <DatePicker
            format="YYYY-MM-DD"
            value={value}
            onChange={(date) => {
              record.estTime = date ? date.format("YYYY-MM-DD") : null;
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

export const columnsConstruction: TableColumnsType<TemplateConstructionItemType> =
  [
    {
      title: "Tiêu đề",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <div>
            {record.name}{" "}
            {record.category && <span>: {parseCategory(record.category)}</span>}
          </div>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Thời gian dự kiến",
      dataIndex: "estimateAt",
      key: "estimateAt",
    },
    {
      title: "Thanh toán",
      key: "isPayment",
      dataIndex: "isPayment",
      render: (text, record) => {
        const isParent = record.childs;

        return isParent ? (
          <Typography.Text>{record.isPayment ? "Có" : "Không"}</Typography.Text>
        ) : null;
      },
    },
  ];
