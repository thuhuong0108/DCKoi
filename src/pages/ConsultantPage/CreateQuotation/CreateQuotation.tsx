import {
  messageError,
  messageSuccess,
  TableComponent,
  Title,
} from "@/components";
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
import { useNavigate, useParams } from "react-router-dom";

import {
  projectDetailActions,
  selectedProjectDetail,
} from "@/redux/slices/projectDetail/projectDetailSlices";
import Button from "@/components/ui/Button";
import {
  EquipmentType,
  FieldQuotationDetailType,
  ServiceType,
  TemplateConstructionType,
} from "@/models";
import TableServices from "./TableService";
import TableEquipments from "./TableEquipment";
import { Category } from "@/models/enums/Category";
import { QuotationItem } from "./type";

import { Space, Table, Tag } from "antd";
import TableQuotation from "./TableQuotation";
import { templateConstructionActions } from "@/redux/slices/templateConstruction/templateContrutionSlices";
import {
  QuotationEquipmentRequest,
  QuotationRequest,
  QuotationServiceRequest,
} from "@/models/Request/QuotationRequest";
import { createQuotation } from "@/api/quotation";

const CreateQuotation = () => {
  const { Column, ColumnGroup } = Table;
  const navigate = useNavigate();

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
  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);
  const templates = useAppSelector(
    (state) => state.templateConstruction.templateConstructions
  );
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateConstructionType | null>(null);

  useEffect(() => {
    const categoryCollection: string[] = Object.values(Category);

    // Build itemWork with category field
    const itemWork: QuotationItem[] = categoryCollection.map((category) => {
      return {
        name: category,
        items: [],
        totalPrice: 0,
      };
    });

    setItemWork(itemWork);
  }, []);

  const handleAddEquipments = () => {
    dispatch(equipmentActions.fetchEquipment({ pageNumber: 1, pageSize: 10 }));
    setOpenEquipments(true);
  };

  const handleAddEquipmentsToItem = (item: EquipmentType) => {
    const newItem: FieldQuotationDetailType = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: 0,
      quantity: 1,
      unit: "Chiếc",
      category: category,
      note: "",
    };

    const itemWorkClone = [...itemWork];
    const index = itemWorkClone.findIndex((item) => item.name === category);
    // if exist category and id => update quantity
    const indexItem = itemWorkClone[index].items.findIndex(
      (item) => item.id === newItem.id
    );
    if (indexItem !== -1) {
      itemWorkClone[index].items[indexItem].quantity += 1;
    } else {
      itemWorkClone[index].items.push(newItem);
    }

    setItemWork(itemWorkClone);
  };

  const handlePickTemplate = (template: TemplateConstructionType) => {
    setSelectedTemplate(template);
    setOpenTemplate(false);
  };

  const removeItem = (item: FieldQuotationDetailType) => {
    const itemWorkClone = [...itemWork];

    const index = itemWorkClone.findIndex((work) => work.name === category);
    if (index === -1) return;

    const indexItem = itemWorkClone[index].items.findIndex(
      (i) => i.id === item.id
    );
    if (indexItem === -1) return;
    itemWorkClone[index].items.splice(indexItem, 1);
    setItemWork(itemWorkClone);
  };

  const handleSaveQuotation = async () => {
    const services: QuotationServiceRequest[] = itemWork
      .map((item) => item.items)
      .flat()
      .filter((item) => item.isService)
      .map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          category: item.category,
          note: item.note,
        };
      });

    const equipments: QuotationEquipmentRequest[] = itemWork
      .map((item) => item.items)
      .flat()
      .filter((item: FieldQuotationDetailType) => !item.isService)
      .map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          category: item.category,
          note: item.note,
          price: item.price,
        };
      });
    //  build data
    const data: QuotationRequest = {
      projectId: id,
      templateConstructionId: selectedTemplate?.id || "",
      services: services,
      equipments: equipments,
    };
    const res = await createQuotation(data);
    if (res.isSuccess) {
      messageSuccess("Tạo báo giá thành công");
      navigate(`/consultant/${id}`);
    } else {
      messageError(res.message);
    }
  };

  const handleAddServicesToItem = (item: ServiceType) => {
    const newItem: FieldQuotationDetailType = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: 1,
      unit: item.unit,
      category: category,
      note: "",
      isService: true,
    };

    const itemWorkClone = [...itemWork];
    const index = itemWorkClone.findIndex((item) => item.name === category);
    // if exist category and id => update quantity
    const indexItem = itemWorkClone[index].items.findIndex(
      (item) => item.id === newItem.id
    );
    if (indexItem !== -1) {
      itemWorkClone[index].items[indexItem].quantity += 1;
    } else {
      itemWorkClone[index].items.push(newItem);
    }

    setItemWork(itemWorkClone);
  };

  const handleAddServices = () => {
    dispatch(serviceActions.fetchService({ pageNumber: 1, pageSize: 10 }));
    setOpenServices(true);
  };
  const [category, setCategory] = useState(Category.CONTINGENCY);

  const handleDelete = (item: FieldQuotationDetailType) => {};

  const [openServices, setOpenServices] = useState(false);
  const [openEquipments, setOpenEquipments] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);

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

      {itemWork.map((item, index) => (
        <div>
          <TableQuotation
            removeItem={removeItem}
            key={index}
            name={item.name}
            items={item.items}
            totalPrice={item.totalPrice}
          />
          <div>
            <Button
              title="Thêm thiết bị"
              onClick={() => {
                setCategory(item.name as Category);
                handleAddEquipments();
              }}
            />
            <Button
              title="Thêm dịch vụ"
              onClick={() => {
                setCategory(item.name as Category);
                handleAddServices();
              }}
            />
          </div>
        </div>
      ))}

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
        <Table<ServiceType> dataSource={services.data}>
          <Column title="Tên dịch vụ" dataIndex="name" key="name" />
          <Column title="Mô tả" dataIndex="description" key="description" />

          <Column
            title="Action"
            key="action"
            render={(_: any, record: ServiceType) => (
              <Space size="middle">
                <a onClick={() => handleAddServicesToItem(record)}>Thêm</a>
              </Space>
            )}
          />
        </Table>
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
        <Table<EquipmentType> dataSource={equipments.data}>
          <Column title="Tên thiết bị" dataIndex="name" key="name" />
          <Column title="Mô tả" dataIndex="description" key="description" />

          <Column
            title="Action"
            key="action"
            render={(_: any, record: EquipmentType) => (
              <Space size="middle">
                <a onClick={() => handleAddEquipmentsToItem(record)}>Thêm</a>
              </Space>
            )}
          />
        </Table>
      </Modal>

      {/* line */}
      <div className="border-t-2 border-gray-300 my-5"></div>
      <h1 className="text-xl font-semibold text-blue-500 my-4">
        Quy trình thi công
      </h1>

      <div>
        {" "}
        <div className="flex flex-row justify-between items-center">
          <label className="text-black font-semibold">
            Tên quy trình: {selectedTemplate?.name}
          </label>
        </div>
      </div>

      <div>
        <Button
          title="Chọn quy trình thi công"
          onClick={() => {
            dispatch(
              templateConstructionActions.getTemplateConstruction({
                pageNumber: 1,
                pageSize: 10,
              })
            );
            setOpenTemplate(true);
          }}
        />
      </div>

      <Modal
        footer={null}
        onCancel={() => setOpenTemplate(false)}
        title="Chọn quy trình thi công"
        open={openTemplate}
      >
        {" "}
        <Table<TemplateConstructionType> dataSource={templates.data}>
          <Column title="Tên thiết bị" dataIndex="name" key="name" />
          <Column title="Mô tả" dataIndex="description" key="description" />

          <Column
            title="Action"
            key="action"
            render={(_: any, record: TemplateConstructionType) => (
              <Space size="middle">
                <a onClick={() => handlePickTemplate(record)}>Chọn</a>
              </Space>
            )}
          />
        </Table>
      </Modal>

      <div className="flex justify-end">
        <Button title="Lưu báo giá" onClick={handleSaveQuotation} />
      </div>
    </div>
  );
};

export default CreateQuotation;
