import { messageError, Title } from "@/components";
import { templateConstructionDetailActions } from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParentItem from "./ParentItem";
import { Button, Modal } from "antd";
import useForm from "@/hooks/useForm";
import { TextField } from "@mui/material";
import { validateTemplateConstruction } from "@/validations/validate";
import { createItemsTemlateConstruction } from "@/api/templateConstruction";

const ConstructionTemplateConfig = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const template = useAppSelector(
    (state) => state.templateConstructionDetail.item
  );

  const isLoading = useAppSelector(
    (state) => state.templateConstructionDetail.loading
  );

  useEffect(() => {
    dispatch(
      templateConstructionDetailActions.getTemplateConstructionDetail(id)
    );
  }, [id]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderModal = () => {
    const { regHandleSubmit, formik, loading, regField } = useForm({
      values: {
        name: "",
        description: "",
      },
      onSubmit: async (values) => {
        setIsModalVisible(false);
        const res = await createItemsTemlateConstruction({
          idTemplateContruction: id,
          ...values,
        });
        if (res.isSuccess) {
          dispatch(
            templateConstructionDetailActions.getTemplateConstructionDetail(id)
          );
          formik.resetForm();
        } else {
          messageError(res.message);
        }
      },
      validationSchema: validateTemplateConstruction,
    });
    return (
      <Modal
        title="Thêm hạng mục công việc"
        visible={isModalVisible}
        onOk={() => regHandleSubmit()}
        onCancel={() => setIsModalVisible(false)}
      >
        <TextField
          required
          fullWidth
          label="Tên hạng mục"
          {...regField("name")}
          error={Boolean(regField("name").error)}
          helperText={regField("name").error}
        />
        <TextField
          fullWidth
          label="Mô tả"
          {...regField("description")}
          error={Boolean(regField("description").error)}
          helperText={regField("description").error}
        />
      </Modal>
    );
  };

  return (
    <div className="flex flex-col justify-between mb-5 mt-8 mx-10 h-full w-full">
      <Title name="Cấu hình mẫu thi công" />

      <div className="flex flex-col">
        <div className="flex flex-row justify-between p-2">
          <div>
            <div className="text-lg font-bold">Tên mẫu thi công:</div>
            <div>{template.name}</div>
          </div>
          <div>
            <div className="text-lg font-bold">Trạng thái:</div>
            <div>{template.isActive ? "Hoạt động" : "Không hoạt động"}</div>
          </div>
        </div>
        <div className="p-2">
          <div className="text-lg font-bold">Mô tả:</div>
          <div>{template.description}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold">Danh sách hạng mục thi công:</div>
        <div className="flex flex-row ">
          {template.templateContructionItems &&
            template.templateContructionItems.map((item) => (
              <ParentItem
                key={item.id}
                item={item}
                idTemplate={id}
                parentId={item.id}
              />
            ))}
          <div className="bg-gray-300 p-4 rounded-lg shadow-md w-[300px] h-full">
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Thêm hạng mục
            </Button>
          </div>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default ConstructionTemplateConfig;
