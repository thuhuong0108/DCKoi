import { Button, Card, Modal, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import TemplateSkeleton from "./TemplateSkeleton";
import { Title } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { templateConstructionActions } from "@/redux/slices/templateConstruction/templateContrutionSlices";
import { Pagination, TextField } from "@mui/material";
import TemplateCard from "./TemplateCard";
import PlusTemplate from "./PlusTemplate";
import useForm from "@/hooks/useForm";
import { validateTemplateConstruction } from "@/validations/validate";

const ConstructionTemplate = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.templateConstruction.loading
  );
  const items = useAppSelector(
    (state) => state.templateConstruction.templateConstructions
  );
  const [ModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(
      templateConstructionActions.getTemplateConstruction({
        pageNumber: 1,
        pageSize: 10,
      })
    );
  }, []);

  const { formik, loading, regField, regHandleSubmit } = useForm({
    values: {
      name: "",
      description: "",
    },
    onSubmit: (values) => {
      setModalVisible(false);
      dispatch(templateConstructionActions.createTemplateConstruction(values));
    },
    validationSchema: validateTemplateConstruction,
  });

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
      <Title name="Các quy trình thi công " />

      <div className="grid grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <TemplateSkeleton key={index} />
          ))
        ) : (
          <>
            <PlusTemplate setIsModalOpen={setModalVisible} />
            {items?.data?.map((item) => (
              <TemplateCard item={item} />
            ))}
          </>
        )}
      </div>
      <br />

      <Pagination
        count={items.totalPages}
        page={items.pageNumber}
        onChange={(event, value) => {
          dispatch(
            templateConstructionActions.getTemplateConstruction({
              pageNumber: value,
              pageSize: 10,
            })
          );
        }}
      />

      <Modal
        title="Thêm quy trình thi công"
        visible={ModalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Card>
          <Skeleton loading={loading} active>
            <TextField
              required
              fullWidth
              label="Tên quy trình"
              {...regField("name")}
              error={Boolean(regField("name").error)}
              helperText={regField("name").error}
            />
            <TextField
              required
              fullWidth
              label="Mô tả"
              {...regField("description")}
              error={Boolean(regField("description").error)}
              helperText={regField("description").error}
            />

            <Button onClick={regHandleSubmit} type="primary">
              Thêm
            </Button>
          </Skeleton>
        </Card>
      </Modal>
    </div>
  );
};

export default ConstructionTemplate;
