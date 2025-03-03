import { TableComponent, Title } from "@/components";
import { EquipmentQuotationType, ServiceQuotationType } from "@/models";
import React from "react";

const DetailQuotationConsulting = ({ quotation, project }) => {
  const services = quotation.services;
  const equipments = quotation.equipments;
  return (
    <div>
      <TableComponent<ServiceQuotationType>
        columns={[
          "Danh mục công việc",
          "Mô tả",
          "Giá",
          "Số lượng",
          "Đơn vị",
          "Phân loại",
          "Ghi chú",
          "Kiểu công việc",
        ]}
        data={services}
        props={[
          "name",
          "description",
          "price",
          "unit",
          "type",
          "quantity",
          "note",
          "category",
        ]}
        actions={false}
        enablePagination={false}
      />

      <TableComponent<EquipmentQuotationType>
        columns={[
          "Tên thiết bị",
          "Mô tả",
          "Giá",
          "Số lượng",
          "Ghi chú",
          "Phân loại",
        ]}
        data={equipments}
        props={["name", "description", "price", "quantity", "note", "category"]}
        actions={false}
        enablePagination={false}
      />
    </div>
  );
};

export default DetailQuotationConsulting;
