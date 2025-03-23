import {
  Button,
  messageError,
  messageSuccess,
  Title,
  Uploader,
} from "@/components";
import useForm from "@/hooks/useForm";
import { IssueRequest } from "@/models/Request/IssueRequest";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validateIssue } from "@/validations/validate";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { Divider, Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateIssue = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const construction = useAppSelector(
    (state) => state.projectStateDetail.construction
  );

  useEffect(() => {
    dispatch(projectStateDetailActions.fetchConstructions(id));
  }, [id]);

  console.log("construction", construction);
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
      console.log("values", values);
      // dispatch(issueActions.createIssue({ issue: values, constructionItemId }));
    },
  });
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Vấn đề thi công mới" />
      <TextField
        fullWidth
        label="Vấn đề"
        margin="normal"
        variant="outlined"
        {...regField("name")}
        error={Boolean(regField("name").error)}
        helperText={regField("name").error}
      />
      <TextField
        fullWidth
        label="Mô tả "
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

      <Divider orientation="left">Hạng mục công việc</Divider>
      <FormControl fullWidth>
        <Select
          className="h-[55px]"
          value={regField("constructionId").value}
          onChange={(e) => {
            formik.setFieldValue("constructionId", e.target.value);
          }}
        >
          {Object.values(construction.constructions).map((item) => (
            <MenuItem key={item.id} value={item.id.toString()}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
