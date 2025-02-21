import { confirmAlert, TableComponent, Title } from "@/components";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FormControl, Input, InputAdornment } from "@mui/material";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  packageItemActions,
  selectPackageItems,
} from "@/redux/slices/packageItem/packageItemSlices";
import { PackageItemType } from "@/models";
import Form from "./Form";

const PackageItem = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.packageItem.loading);

  const items = useAppSelector(selectPackageItems);

  useEffect(() => {
    dispatch(
      packageItemActions.fetchPackageItems({ pageNumber: 1, pageSize: 10 })
    );
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PackageItemType | null>(
    null
  );

  const [search, setSearch] = useState("");

  const handleEdit = (item: PackageItemType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: PackageItemType) => {
    confirmAlert({
      title: "Xác nhận xóa hạng mục thi công",
      message: "Bạn có chắc muốn xóa hạng mục này ?",
      yes: () => {
        dispatch(packageItemActions.deletePackageItem(item.id));
      },
      no: () => {},
    });
  };

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách các hạng mục công việc" />
      <Row className="flex flex-row justify-between items-center my-3">
        <Col>
          <Button
            danger
            onClick={() => {
              setSelectedItem(null);
              setIsModalOpen(true);
            }}
            title="Thêm hạng mục mới"
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

      <TableComponent<PackageItemType>
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
        title={selectedItem ? "Chỉnh sửa hạng mục" : "Thêm mới hạng mục"}
        desc="Vui lòng nhập tên hạng mục công việc"
        size="xl"
        visible={isModalOpen}
        onVisibleChange={setIsModalOpen}
        content={<Form item={selectedItem} />}
        backdrop={true}
        closeBtn={true}
      />
    </div>
  );
};

export default PackageItem;
