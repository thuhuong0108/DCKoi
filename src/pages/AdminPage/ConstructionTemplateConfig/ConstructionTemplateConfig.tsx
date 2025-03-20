import { confirmAlert, messageError, Title } from "@/components";
import { templateConstructionDetailActions } from "@/redux/slices/templateConstructionDetail/templateConstructionDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParentItem from "./ParentItem";
import { Button, Modal } from "antd";
import useForm from "@/hooks/useForm";
import {
  duration,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { validateTemplateConstruction } from "@/validations/validate";
import { createItemsTemlateConstruction } from "@/api/templateConstruction";
import * as yup from "yup";
import { Add } from "@mui/icons-material";

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
        duration: 1,
        category: "",
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
      validationSchema: validateTemplateConstruction.concat(
        yup.object().shape({
          category: yup.string().required("Vui lòng nhập hạng mục"),
        })
      ),
    });
    return (
      <Modal
        title="Thêm hạng mục công việc"
        visible={isModalVisible}
        onOk={() => regHandleSubmit()}
        onCancel={() => setIsModalVisible(false)}
        className="w-[500px] flex flex-col"
      >
        <div>
          <TextField
            required
            fullWidth
            style={{ marginTop: "1rem" }}
            className="mt-4"
            label="Tên hạng mục"
            {...regField("name")}
            error={Boolean(regField("name").error)}
            helperText={regField("name").error}
          />
          <TextField
            fullWidth
            label="Mô tả"
            style={{ marginTop: "1rem" }}
            {...regField("description")}
            error={Boolean(regField("description").error)}
            helperText={regField("description").error}
          />

          <FormControl
            fullWidth
            style={{ marginTop: "1rem" }}
            error={Boolean(regField("category")?.error)}
          >
            <InputLabel id="category">Phân loại</InputLabel>
            <Select label="" title="Hạng mục" {...regField("category")}>
              <MenuItem value="PRELIMINARIES">Công tác chuẩn bị</MenuItem>
              <MenuItem value="POND_LAYOUT">Khung hồ</MenuItem>
              <MenuItem value="PLUMBING_WORKS">Hệ thống bơm</MenuItem>
              <MenuItem value="POWER_HOUSE">Hệ thống điện</MenuItem>
              <MenuItem value="WATER_STORAGE_TANK_PLATFORM">
                Hệ thống nước
              </MenuItem>
              <MenuItem value="LANDSCAPING  ">Cảnh quan</MenuItem>
              <MenuItem value="CONTINGENCY">Chi phí phát sinh</MenuItem>
            </Select>
            {regField("category")?.error && (
              <FormHelperText>{regField("category").error}</FormHelperText>
            )}
          </FormControl>
        </div>
      </Modal>
    );
  };

  return (
    <div className="flex flex-col justify-between mb-5 mt-8 mx-10 h-full w-full">
      <Title name="Cấu hình mẫu thi công" />

      <div className="flex flex-col">
        <div className="flex flex-row justify-between py-2">
          <div className="mt-4 flex items-center gap-4">
            <h2 className="text-2xl font-bold">{template.name}</h2>
            <Button
              className={`${
                template.isActive ? "bg-green-500" : "bg-red-500"
              } font-bold text-white py-1 px-3 rounded-md`}
              onClick={() => {
                confirmAlert({
                  title: "Xác nhận",
                  message: `Bạn có chắc chắn muốn ${
                    template.isActive ? "vô hiệu hóa" : "kích hoạt"
                  } mẫu thi công này không?`,
                  yes: () => {
                    dispatch(
                      templateConstructionDetailActions.activeTemplateConstructionDetail(
                        id
                      )
                    );
                  },
                });
              }}
            >
              {template.isActive ? "Hoạt động" : "Không hoạt động"}
            </Button>
          </div>
        </div>
        <div className="py-4">
          <div className="text-lg font-semibold max-w-2xl break-words">
            {template.description}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">Danh sách hạng mục thi công:</div>
        <div className="flex flex-row gap-4">
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
            <Button
              block
              size="large"
              type="default"
              className="font-bold"
              onClick={() => setIsModalVisible(true)}
            >
              <Add />
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
