import { Button, messageError, messageSuccess, Title } from "@/components";
import { TemplateConstructionItemType } from "@/models";
import {
  selectTemplateConstructionDetail,
  templateConstructionDetailActions,
} from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Table, DatePicker, Switch, Space } from "antd";
import { useEffect, useState } from "react";
import { columns } from "./type";
import { ConstructionRequest } from "@/models/Request/ConstructionRequest";
import { useParams } from "react-router-dom";
import { createConstruction } from "@/api/construction";

const PlanConstruction = ({ id, setOpen }) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const template = useAppSelector(selectTemplateConstructionDetail);

  const [tableData, setTableData] = useState<TemplateConstructionItemType[]>(
    []
  );

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

    console.log("value", value);

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

    console.log("data", data);

    const res = await createConstruction(data);
    if (res.isSuccess) {
      messageSuccess("Lưu thành công");
    } else {
      messageError(res.message);
    }

    // dispatch cho fetch lại dữ liệu
    setOpen(false);

    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <Title name={template.name} />
      <p className="text-gray-500 text-sm my-3">{template.description}</p>

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
