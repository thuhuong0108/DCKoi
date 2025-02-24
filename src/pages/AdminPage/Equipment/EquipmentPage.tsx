import { EquipmentType } from "@/models";
import { FormControl, Input, InputAdornment } from "@mui/material";
import { Col, Row } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  equipmentActions,
  selectEquipment,
} from "@/redux/slices/equipment/equipmentSlice";
import { Button, confirmAlert, TableComponent, Title } from "@/components";
import FormEquipment from "./FormEquipment";

const EquipmentPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.equipment.loading);
  const items = useAppSelector(selectEquipment);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(equipmentActions.fetchEquipment({ pageNumber: 1, pageSize: 10 }));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EquipmentType | null>(null);

  const handleEdit = (item: EquipmentType) => {
    console.log("edit item: ", item);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: EquipmentType) => {
    confirmAlert({
      title: "Xác nhận xóa thiết bị",
      message: "Bạn có chắc muốn xóa thiết bị này ?",
      yes: () => {
        console.log("delete equipment: ", item);
        dispatch(equipmentActions.deleteEquipment(item.id));
      },
      no: () => {},
    });
  };
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách thiết bị" />

      <Row className="flex flex-row justify-between items-center my-3">
        <Col>
          <Button
            danger
            onClick={() => {
              setSelectedItem(null);
              setIsModalOpen(true);
            }}
            title="Thêm thiết bị mới"
            className="w-[185px] uppercase mt-3"
          />
        </Col>
        <Col>
          <FormControl variant="standard" className="w-[500px]">
            <Input
              id="standard-adornment-amount"
              placeholder="Tìm kiếm ..."
              value={search}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Col>
      </Row>

      <TableComponent<EquipmentType>
        columns={["Tên thiết bị", "Mô tả"]}
        data={items.data}
        props={["name", "description"]}
        actions={true}
        actionTexts={["Sửa", "Xóa"]}
        actionFunctions={[handleEdit, handleDelete]}
        loading={isLoading}
        enablePagination={true}
        page={items.pageNumber}
        setPage={(page) => {
          dispatch(
            equipmentActions.fetchEquipment({
              pageNumber: page,
              pageSize: 10,
            })
          );
        }}
        itemsPerPage={items.pageSize}
        totalPages={items.totalPages}
      />

      <Modal
        title={selectedItem ? "Chỉnh sửa thiết bị" : "Thêm thiết bị mới"}
        desc="Vui lòng nhập tên thiết bị"
        size="xl"
        visible={isModalOpen}
        onVisibleChange={setIsModalOpen}
        content={
          <FormEquipment item={selectedItem} setIsModalOpen={setIsModalOpen} />
        }
        backdrop={true}
        closeBtn={true}
      />
    </div>
  );
};

export default EquipmentPage;
