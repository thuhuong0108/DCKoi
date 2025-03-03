import { TableComponent } from "@/components";
import Button from "@/components/ui/Button";
import { ServiceType } from "@/models";
import { useState } from "react";

const TableServices = ({ services }) => {
  const [number, setNumber] = useState(0);
  const handleAdd = (service: ServiceType) => {
    setNumber(number + 1);
    console.log("service 123: ", service);
  };
  return (
    <div>
      <TableComponent<ServiceType>
        columns={["Dịch vụ", "Mô tả", "Giá", "Đơn vị", "Loại"]}
        data={services.data}
        props={["name", "description", "price", "unit", "type"]}
        actions={true}
        actionTexts={["Thêm"]}
        actionFunctions={[handleAdd]}
        enablePagination={false}
      />

      <Button block title={`Thêm ${number} thiết bị`} />
    </div>
  );
};

export default TableServices;
