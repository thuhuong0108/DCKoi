import {
  Button,
  confirmAlert,
  Modal,
  TableComponent,
  Title,
} from "@/components";
import { FormControl, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  selectedService,
  serviceActions,
} from "@/redux/slices/service/serviceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { ServiceType } from "@/models";
import FormService from "./FormService";

const ServicePage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.service.loading);

  const items = useAppSelector(selectedService);

  useEffect(() => {
    dispatch(serviceActions.fetchService({ pageNumber: 1, pageSize: 10 }));
  }, []);

  const [selectedItem, setSelectedItem] = useState<ServiceType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState();

  const handleEdit = (item: ServiceType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: ServiceType) => {
    confirmAlert({
      title: "Xác nhận xóa dịch vụ",
      message: "Bạn có chắc chắn muốn xóa dịch vụ này không ?",
      yes: () => {
        dispatch(serviceActions.deleteService(item.id));
      },
      no: () => {},
    });
  };
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách dịch vụ" />
      <Row className="flex flex-row justify-between items-center my-3">
        <Col>
          <Button
            danger
            onClick={() => {
              setSelectedItem(null);
              setIsModalOpen(true);
            }}
            title="Thêm dịch vụ mới"
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
      <TableComponent<ServiceType>
        columns={[
          "Tên dịch vụ",
          "Mô tả dịch vụ",
          " Giá",
          "Đơn vị",
          "Phân loại",
        ]}
        data={items.data}
        props={["name", "description", "price", "unit", "type"]}
        loading={isLoading}
        actions={true}
        actionTexts={["Sửa", "Xóa"]}
        actionFunctions={[handleEdit, handleDelete]}
        enablePagination={true}
        page={items.pageNumber}
        setPage={(page) => {
          dispatch(
            serviceActions.fetchService({ pageNumber: page, pageSize: 10 })
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
          <FormService item={selectedItem} setIsModalOpen={setIsModalOpen} />
        }
        backdrop={true}
        closeBtn={true}
      />
    </div>
  );
};

export default ServicePage;
