import {
  confirmAlert,
  messageSuccess,
  TableComponent,
  Title,
} from "@/components";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FormControl, Input, InputAdornment, TextField } from "@mui/material";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  packageItemActions,
  selectPackageItems,
} from "@/redux/slices/packageItem/packageItemSlices";
import { PackageItem } from "@/models/PackageItem";
interface Item {
  id: number;
  name: string;
}

const PackageItem = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.packageItem.loading);

  const items = useAppSelector(selectPackageItems);
  console.log("Items:", items.totalPages);

  useEffect(() => {
    dispatch(
      packageItemActions.fetchPackageItems({ pageNumber: 1, pageSize: 10 })
    );
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<PackageItemType | null>(
    null
  );

  const [search, setSearch] = useState("");

  const handleEdit = (item: PackageItem) => {
    console.log("Edit item:", item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: PackageItem) => {};

  const handleSave = () => {};

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách các hạng mục công việc" />
      <Row className="flex flex-row justify-between items-center my-3">
        <Col>
          <Button
            danger
            // onClick={() => setIsModalOpen(true)}
            title="Add new item"
            className="w-[165px] uppercase mt-3"
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

      <TableComponent<PackageItem>
        columns={["name"]}
        data={items.data}
        props={["name"]}
        actions={true}
        actionTexts={["Sửa", "Xóa"]}
        actionFunctions={[handleEdit, handleDelete]}
        loading={isLoading}
        enablePagination={true}
        page={items.pageNumber}
        setPage={(page) => {
          dispatch(
            packageItemActions.fetchPackageItems({
              pageNumber: page,
              pageSize: 10,
            })
          );
        }}
        itemsPerPage={items.pageSize}
        totalPages={items.totalPages}
      />

      <Modal
        title={selectedItem ? "Chỉnh sửa hạng mục" : "Thêm mới hạng mục"} // Dynamic title
        desc="Vui lòng nhập tên hạng mục công việc"
        size="xl"
        visible={isModalOpen}
        onVisibleChange={setIsModalOpen}
        content={
          <div className="flex flex-col">
            <TextField
              required
              label="Tên hạng mục công việc"
              value={inputValue}
            />
            <div className="flex justify-end">
              <Button
                primary
                onClick={handleSave}
                title="Lưu"
                className="w-[100px] uppercase mt-3"
              />
            </div>
          </div>
        }
        backdrop={true}
        closeBtn={true}
      />
    </div>
  );
};

export default PackageItem;
