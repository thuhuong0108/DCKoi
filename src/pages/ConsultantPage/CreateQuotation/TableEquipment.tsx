import { TableComponent } from "@/components";
import Button from "@/components/ui/Button";
import { EquipmentType } from "@/models";
import { useState } from "react";

const TableEquipments = ({ equipments }) => {
  const [number, setNumber] = useState(0);
  const handleAdd = (equipment: EquipmentType) => {
    setNumber(number + 1);
    console.log("equipment 123: ", equipment);
  };

  const handleDetele = (equipment: EquipmentType) => {
    setNumber(number + 1);
    console.log("equipment 123: ", equipment);
  };
  return (
    <div>
      <TableComponent<EquipmentType>
        columns={["Thiết bị", "Mô tả"]}
        data={equipments.data}
        props={["name", "description"]}
        actions={true}
        actionTexts={["Thêm"]}
        actionFunctions={[handleAdd, handleDetele]}
        enablePagination={false}
      />

      <Button block title={`Thêm ${number} thiết bị`} />
    </div>
  );
};

export default TableEquipments;
