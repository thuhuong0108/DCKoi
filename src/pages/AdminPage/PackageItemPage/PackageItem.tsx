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
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { PackageItemType } from "@/models";

const PackageItem = () => {
  const [loading, setLoading] = useState(false);
  const setTimeDemoLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      messageSuccess("Time demo loading completed.");
    }, 1000);
  };

  const [items, setItems] = useState<PackageItemType[]>([
    { id: 1, name: "Đào hồ" },
    { id: 2, name: "Lắp đường ống" },
    { id: 3, name: "Cuốn thép" },
    { id: 4, name: "Đào hồ" },
    { id: 5, name: "Lắp đường ống" },
    { id: 6, name: "Cuốn thép" },
    { id: 1, name: "Đào hồ" },
    { id: 2, name: "Lắp đường ống" },
    { id: 3, name: "Cuốn thép" },
    { id: 4, name: "Đào hồ" },
  ]);

  const [page, setPage] = useState(1);
  const itemsPerPage = items.length < 10 ? items.length : 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<PackageItemType | null>(
    null
  );

  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearch(term);

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEdit = (item: PackageItemType) => {
    setSelectedItem(item);
    setInputValue(item.name);
    setIsModalOpen(true);
    console.log("Edit item:", item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: PackageItemType) => {
    confirmAlert({
      title: "Xác nhận xóa hạng mục",
      message: "Bạn có chắc chắn muốn xóa hạng mục ?",
      yes: () => {
        setItems(items.filter((p) => p.id !== item.id));
      },
      no: () => {
        console.log("Không");
      },
    });
  };

  const handleSave = () => {
    if (selectedItem) {
      const updatedItems = items.map((item) =>
        item.id === selectedItem.id ? { ...item, name: inputValue } : item
      );
      setItems(updatedItems);
    } else {
      const newItem = { id: items.length + 1, name: inputValue };
      setItems([...items, newItem]);
    }
    setIsModalOpen(false);
    setSelectedItem(null);
    setInputValue("");
  };

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách các hạng mục công việc" />
      <Row className="flex flex-row justify-between items-center my-3">
        <Col>
          <Button
            block
            onClick={() => setIsModalOpen(true)}
            title="Thêm mới hạng mục"
            className="w-[auto] uppercase mt-2"
          />
        </Col>
        <Col>
          <FormControl variant="standard" className="w-[500px]">
            <Input
              id="standard-adornment-amount"
              placeholder="Tìm kiếm ..."
              value={search}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Col>
      </Row>

      <TableComponent<PackageItemType>
        columns={["STT", "Hạng mục công việc"]}
        data={filteredItems}
        props={["id", "name"]}
        actions={true}
        actionTexts={["Sửa", "Xóa"]}
        actionFunctions={[handleEdit, handleDelete]}
        loading={false}
        enablePagination={true}
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        totalPages={Math.ceil(filteredItems.length)}
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
              onChange={handleInputChange}
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
