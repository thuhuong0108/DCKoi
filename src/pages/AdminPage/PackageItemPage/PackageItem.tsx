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
    dispatch(packageItemActions.fetchPackageItems(
      { pageNumber: 1, pageSize: 10 }
    ));
  }, []);
  // console.log("Items:", items);

  // const [page, setPage] = useState(1);
  // const itemsPerPage = 2;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreate = () => {
    console.log("Create");
    setIsModalOpen(false);
  };

  const handleEdit = (item: PackageItem) => {
    console.log("Edit item:", item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: PackageItem) => {};

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Package Item" />
      <Row className="flex flex-row justify-between my-3 ">
        <Col>
          <Button
            danger
            // onClick={() => setIsModalOpen(true)}
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

      <TableComponent<PackageItem>
        columns={["name"]}
        data={items.data}
        props={["name"]}
        actions={true}
        actionTexts={["Edit", "Delete"]}
        actionFunctions={[handleEdit, handleDelete]}
        loading={false}
        enablePagination={true}
        page={items.pageNumber}
        setPage={(page) => {
          dispatch(packageItemActions.fetchPackageItems(
            { pageNumber: page, pageSize: 10 }
          ));
        }}
        itemsPerPage={items.pageSize}
        totalPages={items.totalPages}
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
