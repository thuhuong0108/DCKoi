import { TemplateConstructionItemType } from "@/models";
import React, { useState } from "react";
import ChildItem from "./ChildItem";
import { Button, Modal } from "antd";
import { render } from "react-dom";
import { validateTemplateConstruction } from "@/validations/validate";
import useForm from "@/hooks/useForm";
import { TextField } from "@mui/material";
import { createItemsTemlateConstruction } from "@/api/templateConstruction";
import { useAppDispatch } from "@/redux/store/hook";
import { messageError } from "@/components";
import { templateConstructionDetailActions } from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";

const ParentItem = ({
  item,
  parentId,
  idTemplate,
}: {
  item: TemplateConstructionItemType;
  parentId: string;
  idTemplate: string;
}) => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const renderModal = () => {
    const { regHandleSubmit, formik, loading, regField } = useForm({
      values: {
        name: "",
        description: "",
      },
      onSubmit: async (values) => {
        setIsModalVisible(false);
        const data = {
          ...values,
          idParent: parentId,
          idTemplateContruction: idTemplate,
        };

        const res = await createItemsTemlateConstruction(data);
        if (res.isSuccess) {
          dispatch(
            templateConstructionDetailActions.getTemplateConstructionDetail(
              idTemplate
            )
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
        title={`Thêm công việc cho ${item.name}`}
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
    <div className="bg-gray-300 p-4 rounded-lg shadow-md w-[300px] h-full">
      <div className="text-lg font-bold">{item.name}</div>
      {/* line */}
      <div className="border-b-2 my-2"></div>

      <div className=" flex flex-col justify-between">
        {item.child &&
          item.child.map((child) => <ChildItem key={child.id} item={child} />)}

        {/* add new child */}
        <div className="bg-gray-300 p-4 rounded-lg shadow-md w-[300px] h-full">
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Thêm công việc
          </Button>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default ParentItem;
