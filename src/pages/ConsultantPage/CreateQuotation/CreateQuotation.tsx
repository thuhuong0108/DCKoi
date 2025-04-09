import { messageError, Title } from "@/components";
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
  UserOutlined,
} from "@ant-design/icons";
import { Col, Modal, Row } from "antd";
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
  TemplateConstructionItemType,
  TemplateConstructionType,
} from "@/models";
import { Category } from "@/models/enums/Category";
import { columns, QuotationItem } from "./type";

import { Space, Table } from "antd";
import TableQuotation from "./TableQuotation";
import {
  selectTemplateConstruction,
  templateConstructionActions,
} from "@/redux/slices/templateConstruction/templateContrutionSlices";
import {
  QuotationEquipmentRequest,
  QuotationRequest,
  QuotationServiceRequest,
} from "@/models/Request/QuotationRequest";
import { quotationActions } from "@/redux/slices/quotation/quotationSlices";
import {
  selectTemplateConstructionDetail,
  templateConstructionDetailActions,
} from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { parseCategory } from "@/utils/helpers";
import { PromotionType } from "@/models/PromotionType";
import { promotionActions } from "@/redux/slices/promotion/promotionSlices";
import { set } from "date-fns";
import { select } from "redux-saga/effects";

const CreateQuotation = () => {
  const { Column } = Table;
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectedProjectDetail);
  const equipments = useAppSelector(selectEquipment);
  const services = useAppSelector(selectedService);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    dispatch(projectDetailActions.fetchProjectDetail(id));
  }, [id]);

  const [itemWork, setItemWork] = useState<QuotationItem[]>([]);
  const templates = useAppSelector(selectTemplateConstruction);

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateConstructionType | null>(null);

  const template = useAppSelector(selectTemplateConstructionDetail);

  const [tableData, setTableData] = useState<
    TemplateConstructionItemType[] | null
  >(null);

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
    dispatch(
      templateConstructionDetailActions.resetTemplateConstructionDetail()
    );
  }, []);

  const promotions = useAppSelector((state) => state.promotion);

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
    dispatch(
      templateConstructionDetailActions.getTemplateConstructionDetail(
        template.id
      )
    );
  };
  const calculateTotal = () => {
    let total = 0;
    total = itemWork.reduce(
      (sum, item) =>
        sum +
        item.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      0
    );
    if (selectedPromotion) {
      total = total - (total * selectedPromotion.discount) / 100;
      total = Math.floor(total);
    }
    return total;
  };

  useEffect(() => {
    if (template.templateContructionItems) {
      setTableData(flattenData(template.templateContructionItems));
    }
  }, [template.templateContructionItems]);

  const flattenData = (items: TemplateConstructionItemType[]) => {
    return items.map((item) => ({
      ...item,
      key: item.id,
      children: item.child ? flattenData(item.child) : undefined,
    }));
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
    if (!selectedTemplate) {
      messageError("Vui lòng chọn mẫu quy trình thi công");
      return;
    }

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
      promotionId: selectedPromotion?.id || null,
    };

    dispatch(quotationActions.createQuotation(data));
    dispatch(
      templateConstructionDetailActions.resetTemplateConstructionDetail()
    );
    navigate(`/consultant/${id}`);
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
  const [visible, setVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] =
    useState<PromotionType | null>(null);

  const PreviewModal = ({
    itemWork,
    onClose,
  }: {
    itemWork: QuotationItem[];
    onClose: () => void;
  }) => {
    return (
      <Modal
        title="Xem trước báo giá"
        width={1000}
        open={true}
        onCancel={onClose}
        footer={null}
      >
        {itemWork.map((item, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {parseCategory(item.name)}
            </h3>
            <Table
              columns={[
                { title: "Tên", dataIndex: "name", key: "name" },
                { title: "Đơn giá", dataIndex: "price", key: "price" },
                { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
                {
                  title: "Thành tiền",
                  render: (_, record) => record.price * record.quantity,
                  key: "total",
                },
              ]}
              dataSource={item.items}
              pagination={false}
            />
            <div className="text-right mt-2 font-medium">
              Tổng cộng:{" "}
              {item.items
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString()}
              VND
            </div>
          </div>
        ))}
        <div className="text-right text-xl font-bold mt-4 border-t pt-4">
          Tổng cộng: {calculateTotal().toLocaleString()} VND
          {selectedPromotion && (
            <div>Giảm giá: {selectedPromotion.discount}%</div>
          )}
        </div>
      </Modal>
    );
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
      <Row className="flex flex-row items-start w-full gap-x-20 mt-4">
        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <BorderlessTableOutlined />
            <label className="text-blue-800 font-semibold">Công trình: </label>
            <span className="text-gray-500"> {project.name}</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <InboxOutlined />
            <label className="text-blue-800 font-semibold">
              Gói thiết kế thi công:
            </label>
            <span className="text-gray-500">{project.package.name}</span>
          </div>
        </Col>

        <Col>
          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <UserOutlined />
            <label className="text-blue-800 font-semibold">Khách hàng: </label>
            <span className="text-gray-500"> {project.customerName}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <PhoneOutlined />
            <label className="text-blue-800 font-semibold">
              Số điện thoại:{" "}
            </label>
            <span className="text-gray-500"> {project.phone}</span>
          </div>

          <div className="flex flex-row justify-start items-center gap-4 text-lg">
            <MailOutlined />
            <label className="text-blue-800 font-semibold">
              Địa chỉ email:{" "}
            </label>
            <span className="text-gray-500"> {project.email}</span>
          </div>

          <div className="flex flex-row justify-start items-baseline gap-4 text-lg">
            <EnvironmentOutlined />
            <label className="text-blue-800 font-semibold">
              Địa chỉ thi công:
            </label>

            <span className=" text-gray-500">{project.address}</span>
          </div>
        </Col>
      </Row>
      <h1 className="text-xl font-semibold text-black-500 my-4">
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
        <Table<ServiceType>
          dataSource={services.data}
          pagination={{
            pageSize: 10,
            total: services.totalRecords,
            showTotal: (total) => `Tổng ${total} dịch vụ`,
          }}
          onChange={(value) => {
            dispatch(
              serviceActions.fetchService({
                pageNumber: value.current,
                pageSize: value.pageSize,
              })
            );
          }}
        >
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
        <Table<EquipmentType>
          dataSource={equipments.data}
          pagination={{
            pageSize: 10,
            total: equipments.totalRecords,
            showTotal: (total) => `Tổng ${total} thiết bị`,
          }}
          onChange={(value) => {
            dispatch(
              equipmentActions.fetchEquipment({
                pageNumber: value.current,
                pageSize: value.pageSize,
              })
            );
          }}
        >
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
      <h1 className="text-xl font-semibold text-black-500 my-4">
        Quy trình thi công
      </h1>
      <div>
        <Button
          title="Chọn quy trình thi công"
          onClick={() => {
            dispatch(
              templateConstructionActions.getTemlateConstructionActive({
                pageNumber: 1,
                pageSize: 10,
              })
            );
            setOpenTemplate(true);
          }}
        />
      </div>
      <div>
        <div className="flex flex-row justify-between items-center my-4">
          <label className="text-blue-800 font-semibold">
            Mẫu quy trình: {selectedTemplate?.name}
          </label>
        </div>
      </div>
      {tableData && tableData.length > 0 ? (
        <Table<TemplateConstructionItemType>
          columns={columns}
          dataSource={tableData}
          pagination={false}
        />
      ) : (
        <></>
      )}
      {/* line */}

      <div className="border-t-2 border-gray-300 my-5"></div>

      {/* promotions */}
      <div>
        <Button
          title="Chọn khuyến mãi"
          onClick={() => {
            dispatch(
              promotionActions.fetchPromotion({ pageNumber: 1, pageSize: 10 })
            );
            setVisible(true);
          }}
        />

        {selectedPromotion && (
          <div className="flex flex-row justify-between items-center my-4">
            <label className="text-blue-800 font-semibold">
              Khuyến mãi: {selectedPromotion.name}
            </label>
          </div>
        )}
      </div>

      <Modal
        title="Chọn khuyến mãi"
        visible={visible}
        onCancel={() => setVisible(false)}
        loading={promotions.loading}
        footer={null}
      >
        <Table<PromotionType> dataSource={promotions.promotions.data}>
          <Column title="Tên khuyến mãi" dataIndex="name" key="name" />
          <Column title="Giảm giá" dataIndex="discount" key="discount" />
          <Column
            title="Action"
            key="action"
            render={(_: any, record: PromotionType) => (
              <Space size="middle">
                <a
                  onClick={() => {
                    setSelectedPromotion(record);
                    setVisible(false);
                  }}
                >
                  Chọn
                </a>
              </Space>
            )}
          />
        </Table>
      </Modal>

      {/* line */}

      <div className="flex justify-end gap-4 mt-4">
        <Button
          title="Xem trước"
          onClick={() => {
            setPreviewVisible(true);
          }}
        />
      </div>
      {previewVisible && (
        <PreviewModal
          itemWork={itemWork}
          onClose={() => setPreviewVisible(false)}
        />
      )}
      <Modal
        width={1000}
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
      <div className="flex justify-end mt-4">
        <Button title="Lưu báo giá" onClick={handleSaveQuotation} />
      </div>
    </div>
  );
};

export default CreateQuotation;
