import { TableComponent, Title } from "@/components";
import {
  equipmentActions,
  selectEquipment,
} from "@/redux/slices/equipment/equipmentSlice";
import {
  selectedService,
  serviceActions,
} from "@/redux/slices/service/serviceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { BorderlessTableOutlined } from "@ant-design/icons";
import { Col, Input, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddItem from "./AddITem";
import {
  projectDetailActions,
  selectedProjectDetail,
} from "@/redux/slices/projectDetail/projectDetailSlices";
import Button from "@/components/ui/Button";
import { FieldQuotationDetailType } from "@/models";
import TableServices from "./TableService";
import TableEquipments from "./TableEquipment";

const CreateQuotation = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectedProjectDetail);
  const equipments = useAppSelector(selectEquipment);
  const services = useAppSelector(selectedService);
  const [itemQuotation, setItemQuotation] = useState<
    FieldQuotationDetailType[]
  >([]);
  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
  });

  const handleAddEquipments = () => {
    dispatch(equipmentActions.fetchEquipment({ pageNumber: 1, pageSize: 10 }));
    setOpenEquipments(true);
  };

  const handleAddServices = () => {
    dispatch(serviceActions.fetchService({ pageNumber: 1, pageSize: 10 }));
    setOpenServices(true);
  };

  const handleDelete = (item: FieldQuotationDetailType) => {};

  const [openServices, setOpenServices] = useState(false);
  const [openEquipments, setOpenEquipments] = useState(false);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Thông tin báo giá chi tiết thi công" />

      <Row className="flex flex-row items-center w-full gap-x-20">
        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Công trình: </label>
            <span className="text-gray-400ay"> #Tên dự án</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">
              Gói thiết kế thi công:
            </label>
            <Input
              placeholder={project.package.name}
              disabled
              className="w-[200px]"
            />
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">
              Tổng giá trị hợp đồng{" "}
            </label>
            <span className="text-gray-400ay"> ####</span>
          </div>
        </Col>

        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Khách hàng: </label>
            <span className="text-gray-400ay"> {project.customerName}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Số điện thoại: </label>
            <span className="text-gray-400ay"> {project.phone}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Địa chỉ email: </label>
            <span className="text-gray-400ay"> {project.email}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Địa chỉ thi công</label>
            <Input
              placeholder={project.address}
              disabled
              className="w-[500px]"
            />
          </div>
        </Col>
      </Row>

      <h1 className="text-xl font-semibold text-blue-500 my-4">
        Các hạng mục báo giá chi tiết
      </h1>

      <Button block title="Thêm dịch vụ" onClick={handleAddServices} />

      <TableComponent<FieldQuotationDetailType>
        columns={[
          "Tên dịch vụ",
          "Mô tả",
          "Giá",
          "Đơn vị",
          "Số lượng",
          "Chú thích",
          "Phân loại",
          "category",
        ]}
        data={itemQuotation}
        props={[
          "name",
          "description",
          "price",
          "unit",
          "quantity",
          "note",
          "category",
        ]}
        actions={true}
        actionTexts={["delete"]}
        actionFunctions={[handleDelete]}
        enablePagination={false}
      />

      <h1 className="text-xl font-semibold text-blue-500 my-4">
        Các thiết bị hồ cá
      </h1>

      <Button block title="Thêm thiết bị" onClick={handleAddEquipments} />

      <Modal
        title={`Thêm dịch vụ `}
        centered
        open={openServices}
        width={1000}
        onCancel={() => setOpenServices(false)}
        onClose={() => setOpenServices(false)}
        onOk={() => setOpenServices(false)}
        footer={[]}
      >
        <TableServices services={services} />
      </Modal>

      <Modal
        title={`Thêm thiết bị `}
        centered
        open={openEquipments}
        width={1000}
        onCancel={() => setOpenEquipments(false)}
        onClose={() => setOpenEquipments(false)}
        onOk={() => setOpenEquipments(false)}
        footer={[]}
      >
        <TableEquipments equipments={equipments} />
      </Modal>
    </div>
  );
};

export default CreateQuotation;
