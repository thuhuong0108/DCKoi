import { Button, Modal, TableComponent, Title } from "@/components";
import { FormControl, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { selectedStaff, staffActions } from "@/redux/slices/staff/staffSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { StaffType } from "@/models";
import FormStaff from "./FormStaff";

const StaffPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.staff.loading);

  const items = useAppSelector(selectedStaff);

  useEffect(() => {
    dispatch(staffActions.fetchStaff({ pageNumber: 1, pageSize: 10 }));
  }, []);

  const [selectedItem, setSelectedItem] = useState<StaffType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState();

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách nhân viên" />
      <Row className="flex flex-row justify-between items-center my-3">
        <Col>
          <Button
            danger
            onClick={() => {
              setSelectedItem(null);
              setIsModalOpen(true);
            }}
            title="Thêm nhân viên mới"
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
      <TableComponent<StaffType>
        columns={["Họ tên", "Email", "Số điện thoại", "Chức vụ"]}
        data={items.data}
        props={["fullName", "email", "phone", "position"]}
        loading={isLoading}
        //   actions={true}
        //   actionTexts={["Sửa", "Xóa"]}
        //   actionFunctions={[handleEdit, handleDelete]}
        enablePagination={true}
        page={items.pageNumber}
        setPage={(page) => {
          dispatch(staffActions.fetchStaff({ pageNumber: page, pageSize: 10 }));
        }}
        itemsPerPage={items.pageSize}
        totalPages={items.totalPages}
      />

      <FormStaff item={selectedItem} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  );
};

export default StaffPage;
