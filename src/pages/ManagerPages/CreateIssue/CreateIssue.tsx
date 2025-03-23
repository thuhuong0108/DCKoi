import { Button, Title, Uploader } from "@/components";
import useForm from "@/hooks/useForm";
import { IssueRequest } from "@/models/Request/IssueRequest";
import { issueActions } from "@/redux/slices/issue/issueSlices";
import { useAppDispatch } from "@/redux/store/hook";
import { validateIssue } from "@/validations/validate";
import { TextField } from "@mui/material";
import { Divider } from "antd";
import React, { useEffect, useState } from "react";

const CreateIssue = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   dispatch();
  // });

  const { loading, regField, regHandleSubmit, formik } = useForm({
    values: {
      name: "",
      description: "",
      cause: "",
      reason: "",
      solution: "",
      issueImage: "",
      confirmImage: "",
      estimateAt: "",
      actualAt: "",
      issueTypeId: "",
      staffId: "",
    },
    validationSchema: validateIssue,
    onSubmit: async (values: IssueRequest) => {
      // dispatch(issueActions.createIssue({ issue: values, constructionItemId }));
      setIsModalOpen(false);
    },
  });
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Vấn đề thi công mới" />
      <TextField
        fullWidth
        label="Tên thiết bị"
        margin="normal"
        variant="outlined"
        {...regField("name")}
        error={Boolean(regField("name").error)}
        helperText={regField("name").error}
      />
      <TextField
        fullWidth
        label="Mô tả thiết bị"
        margin="normal"
        variant="outlined"
        {...regField("description")}
        error={Boolean(regField("description").error)}
        helperText={regField("description").error}
      />
      <TextField
        fullWidth
        label="Hạng mục công việc "
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Nguyên nhân"
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Giải pháp"
        margin="normal"
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Người chịu trách nhiệm"
        margin="normal"
        variant="outlined"
        {...regField("staffId")}
        error={Boolean(regField("staffId").error)}
        helperText={regField("staffId").error}
      />

      <Divider orientation="left">Ảnh minh họa</Divider>
      <Uploader
        listType="picture"
        maxFiles={1}
        onUploadSuccess={(urls) => formik.setFieldValue("issueImage", urls[0])}
      />

      <div className="flex justify-end">
        <Button
          primary
          onClick={regHandleSubmit}
          title="Lưu"
          className="w-[100px] uppercase mt-3"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CreateIssue;
