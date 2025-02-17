import {
  confirmAlert,
  messageSuccess,
  TableComponent,
  Title,
} from "@/components";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Col, Row } from "antd";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
interface Item {
  id: number;
  name: string;
}

const PackageItem = () => {
  const [loading, setLoading] = useState(false);
  const setTimeDemoLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      messageSuccess("Time demo loading completed.");
    }, 1000);
  };

  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Đào hồ" },
    { id: 2, name: "Lắp đường ống" },
    { id: 3, name: "Cuốn thép" },
    { id: 4, name: "Đào hồ" },
    { id: 5, name: "Lắp đường ống" },
    { id: 6, name: "Cuốn thép" },
  ]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 2;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreate = () => {
    console.log("Create");
    setIsModalOpen(false);
  };

  const handleEdit = (item: Item) => {
    console.log("Edit item:", item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Item) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      yes: () => {
        setItems(items.filter((p) => p.id !== item.id));
      },
      no: () => {
        console.log("No");
      },
    });
  };

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Package Item" />
      <Row className="flex flex-row justify-between my-3 ">
        <Col>
          <Button
            danger
            onClick={() => setIsModalOpen(true)}
            title="Add new item"
            className="w-[165px] uppercase mt-3"
          />
        </Col>
        <Col>
          <FormControl className="w-[500px]">
            <OutlinedInput
              id="outlined-adornment-weight"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
                placeholder: "Search for something...",
              }}
              // onChange={handleSearch}
              className="rounded-[20px]"
            />
          </FormControl>
        </Col>
      </Row>

      <TableComponent<Item>
        columns={["name"]}
        data={items}
        props={["name"]}
        actions={true}
        actionTexts={["Edit", "Delete"]}
        actionFunctions={[handleEdit, handleDelete]}
        loading={false}
        enablePagination={true}
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        totalPages={Math.ceil(items.length / itemsPerPage)}
      />

      <Modal
        title="Add New Item"
        desc="Please typing"
        size="lg"
        visible={isModalOpen}
        onVisibleChange={setIsModalOpen}
        content={
          <div className="flex flex-col">
            <TextField required label="Name" />
            <div className="flex justify-end">
              <Button
                success
                disabled
                onClick={handleCreate}
                title="Save"
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
