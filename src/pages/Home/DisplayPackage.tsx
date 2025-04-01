import { Card, Table, Tag, Typography } from "antd";
import { PackageType } from "@/models";
import { PackageItem } from "@/models/PackageItem";
import React from "react";
import { priceTiers } from "./type";
import { formatPrice } from "@/utils/helpers";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CrownFilled,
  StarFilled,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const DisplayPackage = ({
  pkg,
  itemPackage,
}: {
  pkg: PackageType[];
  itemPackage: PackageItem[];
}) => {
  // Prepare columns for Ant Design Table
  const columns = [
    {
      dataIndex: "feature",
      key: "feature",
      width: 220,
      fixed: "left" as const,
      render: (text: string, record: any) => {
        if (record.isTier) {
          return (
            <Text strong className="text-blue-600 text-base">
              {text}
            </Text>
          );
        }
        return <Text className="text-gray-800">{text}</Text>;
      },
    },
    ...pkg.map((pack, index) => ({
      title: (
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            {index === 0 && <CrownFilled className="text-yellow-500 mr-1" />}
            <Title level={4} className="m-0 text-gray-800">
              {pack.name}
            </Title>
          </div>
          {pack.description && (
            <Text type="secondary" className="text-xs">
              {pack.description}
            </Text>
          )}
        </div>
      ),
      key: pack.id,
      dataIndex: pack.id,
      align: "center" as const,
      width: 180,
      render: (value: any, record: any) => {
        if (record.isTier) {
          return (
            <div className="flex flex-col items-center">
              <Text strong className="text-lg text-gray-900">
                {value ? `${formatPrice(value)} đ/m³` : "N/A"}
              </Text>
              {index === 0 && (
                <Tag color="gold" className="mt-1">
                  <StarFilled className="mr-1" />
                  Phổ biến
                </Tag>
              )}
            </div>
          );
        }

        if (value === false) {
          return <CloseCircleFilled className="text-red-400 text-xl" />;
        }

        if (typeof value === "object") {
          return (
            <Tag
              color="green"
              className="font-bold py-1 px-3 rounded-full"
              icon={<CheckCircleFilled />}
            >
              {value.description || value.quantity}
            </Tag>
          );
        }

        return value;
      },
    })),
  ];

  // Prepare data for Ant Design Table
  const data = [
    // Price tiers rows
    ...priceTiers.map((tier, tierIndex) => ({
      key: `tier-${tierIndex}`,
      feature: tier.label,
      isTier: true,
      ...pkg.reduce((acc, pack) => {
        return {
          ...acc,
          [pack.id]:
            pack.price.length > tierIndex ? pack.price[tierIndex] : null,
        };
      }, {}),
    })),
    // Package items rows
    ...itemPackage.map((item) => ({
      key: `item-${item.id}`,
      feature: item.name,
      isTier: false,
      ...pkg.reduce((acc, pack) => {
        const foundItem = pack.items.find(
          (pItem) => pItem.idPackageItem === item.id
        );
        return {
          ...acc,
          [pack.id]: foundItem
            ? {
                description: foundItem.description,
                quantity: foundItem.quantity,
              }
            : false,
        };
      }, {}),
    })),
  ];

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <Card
        bordered={false}
        className="shadow-lg rounded-xl overflow-hidden border-0 w-full bg-slate-50"
        bodyStyle={{ padding: 0 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          size="middle"
          className="rounded-xl"
          rowClassName={(record) =>
            record.isTier
              ? "bg-blue-50 hover:bg-blue-100"
              : "hover:bg-gray-50 border-b border-gray-200"
          }
          scroll={{ x: true }}
        />

        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <CheckCircleFilled className="text-green-500 text-lg mr-2" />
              <Text className="text-gray-600">Bao gồm</Text>
            </div>
            <div className="flex items-center">
              <CloseCircleFilled className="text-red-400 text-lg mr-2" />
              <Text className="text-gray-600">Không bao gồm</Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DisplayPackage;
