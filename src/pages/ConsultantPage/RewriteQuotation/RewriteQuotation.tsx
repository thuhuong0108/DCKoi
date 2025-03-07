import { messageError, messageSuccess, Title } from "@/components";
import {
  equipmentActions,
  selectEquipment,
} from "@/redux/slices/equipment/equipmentSlice";
import {
  selectedService,
  serviceActions,
} from "@/redux/slices/service/serviceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  BorderlessTableOutlined,
  EnvironmentOutlined,
  InboxOutlined,
  MailOutlined,
  PhoneOutlined,
  PoundCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Input, Modal, Row } from "antd";
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
import { Category } from "@/models/enums/Category";
import { QuotationItem } from "./type";

import { Space, Table } from "antd";
import TableQuotation from "./TableQuotation";
import { templateConstructionActions } from "@/redux/slices/templateConstruction/templateContrutionSlices";
import {
  QuotationEquipmentRequest,
  QuotationRequest,
  QuotationServiceRequest,
} from "@/models/Request/QuotationRequest";
import {
  quotationDetailActions,
  selectedQuotationDetail,
} from "@/redux/slices/quotationDetail/quotationDetailSlices";
import { formatPrice } from "@/utils/helpers";
import { rewriteQuotation, updateQuotation } from "@/api/quotation";
import { quotationActions } from "@/redux/slices/quotation/quotationSlices";
import { QuotationStatus } from "@/models/enums/Status";

const RewriteQuotation = () => {
  const { Column } = Table;
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const quotation = useAppSelector(selectedQuotationDetail);
  const project = useAppSelector(selectedProjectDetail);
  const equipmentTable = useAppSelector(selectEquipment);
  const serviceTable = useAppSelector(selectedService);
  const [totalPriceQuotation, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    dispatch(quotationDetailActions.fetchQuotationDetail(id));
  }, [id]);

  useEffect(() => {
    if (quotation.projectId)
      dispatch(projectDetailActions.fetchProjectDetail(quotation.projectId));
  }, [quotation.projectId]);

  const equipments = quotation.equipments;
  const services = quotation.services;

  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);
  const templates = useAppSelector(
    (state) => state.templateConstruction.templateConstructions
  );

  useEffect(() => {
    const categoryCollection: string[] = Object.values(Category);

    // Build itemWork from services and equipments
    const itemWork = categoryCollection.map((category) => {
      const servicesInCategory = services
        .filter((service) => service.category === category)
        .map((service) => ({
          ...service,
          isService: true,
        }));

      const equipmentsInCategory = equipments
        .filter((equipment) => equipment.category === category)
        .map((equipment) => ({
          ...equipment,
          unit: "Chiếc",
        }));

      const fieldQuotationDetailType: FieldQuotationDetailType[] = [
        ...servicesInCategory,
        ...equipmentsInCategory,
      ];

      const totalPrice = fieldQuotationDetailType.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        totalPrice,
        name: category,
        items: fieldQuotationDetailType,
      };
    });

    // Update total price using previous state
    setTotalPrice((prevTotal) =>
      itemWork.reduce((sum, item) => sum + item.totalPrice, 0)
    );

    setItemWork(itemWork);
  }, [services, equipments]);

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateConstructionType | null>(null);

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

  const removeItem = (itemToRemove: FieldQuotationDetailType) => {
    if (!itemWork || itemWork.length === 0) return;

    const updatedItemWork = itemWork.map((work) => {
      if (work.name === itemToRemove.category) {
        const updatedItems = work.items.filter(
          (item) => item.id !== itemToRemove.id
        );
        const updatedTotalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return {
          ...work,
          items: updatedItems,
          totalPrice: updatedTotalPrice,
        };
      }
      return work;
    });
    setItemWork(updatedItemWork);
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
          name: item.name,
          description: item.description,
          price: item.price,
          unit: item.unit,
          type: "",
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
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          note: item.note,
        };
      });
    //  build data
    const data: QuotationRequest = {
      id: id,
      projectId: quotation.projectId,
      templateConstructionId: selectedTemplate?.id || "",
      services: services,
      equipments: equipments,
    };

    if (quotation.status === QuotationStatus.REJECTED) {
      dispatch(quotationActions.rewriteQuotation(data));
    } else {
      dispatch(quotationActions.updateQuotation(data));
    }

    navigate(-1);
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

  const [openServices, setOpenServices] = useState(false);
  const [openEquipments, setOpenEquipments] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const handleUpdateItem = (updatedItem: FieldQuotationDetailType) => {
    const updatedItemWork = itemWork.map((work) => {
      return {
        ...work,
        items: work.items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
      };
    });
    setItemWork(updatedItemWork);
  };

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Thông tin báo giá chi tiết thi công" />
      <label>Phiên bản: {quotation.version}</label>
      <Row className="flex flex-row items-start w-full gap-x-20 mt-4">
        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-black font-semibold">Công trình: </label>
            <span className="text-gray-500"> #Tên dự án</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <InboxOutlined />
            <label className="text-black font-semibold">
              Gói thiết kế thi công:
            </label>
            <span className="text-gray-500">{project.package.name}</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <PoundCircleOutlined />
            <label className="text-black font-semibold">
              Tổng giá trị hợp đồng:
            </label>
            <span className="text-gray-500">
              {formatPrice(totalPriceQuotation)} VND
            </span>
          </div>
        </Col>

        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <UserOutlined />
            <label className="text-black font-semibold">Khách hàng: </label>
            <span className="text-gray-500"> {project.customerName}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <PhoneOutlined />
            <label className="text-black font-semibold">Số điện thoại: </label>
            <span className="text-gray-500"> {project.phone}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <MailOutlined />
            <label className="text-black font-semibold">Địa chỉ email: </label>
            <span className="text-gray-500"> {project.email}</span>
          </div>

          <div className="flex flex-row justify-start items-baseline gap-4 text-lg">
            <EnvironmentOutlined />
            <label className="text-black font-semibold">
              Địa chỉ thi công:
            </label>

            <span className=" text-gray-500">{project.address}</span>
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
            onUpdateItem={handleUpdateItem}
          />
          <div className="my-2">
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
        <Table<ServiceType> dataSource={serviceTable.data}>
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
        <Table<EquipmentType> dataSource={equipmentTable.data}>
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
        <Button title="Gửi báo giá" onClick={handleSaveQuotation} />
      </div>
    </div>
  );
};

export default RewriteQuotation;
