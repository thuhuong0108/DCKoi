import { Button, messageError, messageSuccess, Title } from "@/components";
import { TemplateConstructionItemType } from "@/models";
import {
  selectTemplateConstructionDetail,
  templateConstructionDetailActions,
} from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Table, DatePicker, Switch, Space, Form, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ConstructionRequest } from "@/models/Request/ConstructionRequest";
import { useParams } from "react-router-dom";
import { createConstruction } from "@/api/construction";
import {
  CalculateEndDate,
  convertIOSDatetoNormalDate,
  convertStringtoDate,
  parseCategory,
} from "@/utils/helpers";
import { selectedProjectDetail } from "@/redux/slices/projectDetail/projectDetailSlices";
import { constructionProjectActions } from "@/redux/slices/constructionProject/constructionProjectSlices";

const PlanConstruction = ({ id, setOpen }) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const template = useAppSelector(selectTemplateConstructionDetail);
  const project = useAppSelector(selectedProjectDetail);
  const columns: TableColumnsType<TemplateConstructionItemType> = [
    {
      title: "Tiêu đề",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <div>
            {record.name}{" "}
            {record.category && <span>: {parseCategory(record.category)}</span>}
          </div>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hệ số ước tính",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Thời gian dự kiến",
      dataIndex: "estTime",
      key: "estTime",
      render: (text, record, index) => {
        const value =
          record.estTime && dayjs(record.estTime, "YYYY-MM-DD").isValid()
            ? dayjs(record.estTime, "YYYY-MM-DD")
            : null;
        return (
          <Space>
            <DatePicker
              format="YYYY-MM-DD"
              value={value}
              onChange={(date) => {
                const newEstTime = date ? date.format("YYYY-MM-DD") : null;
                const updatedTableData = [...tableData];
                updatedTableData[index].estTime = newEstTime;
                setTableData(updatedTableData);
              }}
            />
          </Space>
        );
      },
    },
    {
      title: "Chọn cho thanh toán",
      key: "isPayment",
      dataIndex: "isParentSelected",
      render: (text, record, index) => {
        const isParent = record.child;

        return isParent ? (
          <Switch
            checked={record.isPayment}
            onChange={(checked) => {
              const updatedTableData = [...tableData];
              updatedTableData[index].isPayment = checked;
              setTableData(updatedTableData);
            }}
          />
        ) : null;
      },
    },
  ];
  const [tableData, setTableData] = useState<TemplateConstructionItemType[]>(
    []
  );
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(
      templateConstructionDetailActions.getTemplateConstructionDetail(id)
    );
  }, [id]);

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

  const [loading, setLoading] = useState(false);

  const handleSave = async (value) => {
    setLoading(true);

    let hasError = false;

    if (!value) {
      messageError("Lỗi: Dữ liệu không hợp lệ");
      setLoading(false);
      return;
    }

    const data: ConstructionRequest = {
      projectId: params.id,
      items: value.map((item, itemIndex) => {
        if (hasError) return null;

        if (!item) {
          messageError("Lỗi: Danh mục không hợp lệ");
          hasError = true;
          return null;
        }

        if (!item.id) {
          messageError(`Lỗi: Danh mục thứ ${itemIndex + 1} thiếu trường 'id'`);
          hasError = true;
          return null;
        }
        if (!item.estTime) {
          messageError(
            `Lỗi: Danh mục thứ ${itemIndex + 1} thiếu trường thời gian dự kiến`
          );
          hasError = true;
          return null;
        }
        if (item.isPayment === undefined) {
          item.isPayment = false;
        }

        return {
          templateItemId: item.id,
          estimateAt: item.estTime,
          isPayment: item.isPayment,
          childs: item.children
            ? item.children.map((child, childIndex) => {
                if (hasError) return null;

                if (!child) {
                  messageError("Lỗi: Danh mục con không hợp lệ");
                  hasError = true;
                  return null;
                }

                if (!child.id) {
                  messageError(
                    `Lỗi: Danh mục con thứ ${
                      childIndex + 1
                    } trong danh mục thứ ${itemIndex + 1} thiếu trường 'id'`
                  );
                  hasError = true;
                  return null;
                }
                if (!child.estTime) {
                  messageError(
                    `Lỗi: Danh mục con thứ ${
                      childIndex + 1
                    } trong danh mục thứ ${
                      itemIndex + 1
                    } thiếu trường thời gian dự kiến`
                  );
                  hasError = true;
                  return null;
                }
                if (child.isPayment === undefined) {
                  child.isPayment = false;
                }

                return {
                  templateItemId: child.id,
                  estimateAt: child.estTime,
                  isPayment: child.isPayment,
                };
              })
            : null,
        };
      }),
    };

    if (hasError) {
      setLoading(false);
      setOpen(false);
      return;
    }

    const res = await createConstruction(data);
    if (res.isSuccess) {
      messageSuccess("Lưu thành công");
      dispatch(constructionProjectActions.fetchConstructionProject(id));
    } else {
      messageError(res.message);
    }

    // dispatch cho fetch lại dữ liệu
    setOpen(false);

    setLoading(false);
  };

  const handleChangeStartDate = async (date: Date | null) => {
    setStartDate(date);

    if (date) {
      const updatedTableData = [];
      let previousEstTime = date;

      for (const item of tableData) {
        const itemEstTime = convertIOSDatetoNormalDate(
          (
            await CalculateEndDate(
              previousEstTime,
              item.duration,
              project.area * project.depth
            )
          ).toISOString()
        );

        let updatedChildren = [];
        // childPreviousEstTime is start date of parent
        let childPreviousEstTime = previousEstTime;

        if (item.children) {
          for (const child of item.children) {
            const childEstTime = convertIOSDatetoNormalDate(
              (
                await CalculateEndDate(
                  childPreviousEstTime,
                  child.duration,
                  project.area * project.depth
                )
              ).toISOString()
            );
            updatedChildren.push({
              ...child,
              estTime: childEstTime,
            });
            childPreviousEstTime = childEstTime;
          }
        }

        updatedTableData.push({
          ...item,
          estTime: itemEstTime,
          children: updatedChildren.length > 0 ? updatedChildren : undefined,
        });

        previousEstTime = itemEstTime;
      }

      await setTableData(updatedTableData);
    }
  };

  return (
    <div className="flex flex-col">
      <Title name={template.name} />
      <p className="text-gray-500 text-sm my-3">{template.description}</p>

      <Form.Item
        label="Ngày bắt đầu"
        name="startDate"
        rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
      >
        <DatePicker
          className="w-full"
          value={startDate}
          onChange={handleChangeStartDate}
        />
      </Form.Item>

      <Table<TemplateConstructionItemType>
        columns={columns}
        dataSource={tableData}
        pagination={false}
        footer={(data) => (
          <div className="flex justify-end">
            <Button
              title="Lưu"
              primary
              className="w-[100px]"
              loading={loading}
              onClick={() => handleSave(data)}
            />
          </div>
        )}
      />
    </div>
  );
};

export default PlanConstruction;
