import { createContract } from "@/api/contract";
import { Button, messageError, messageSuccess, Uploader } from "@/components";
import useForm from "@/hooks/useForm";
import { QuotationType } from "@/models";
import { ProjectDetailType } from "@/models/ProjectType";
import { ContractRequest } from "@/models/Request/ContractRequest";
import { validateContract } from "@/validations/validate";
import { TextField } from "@mui/material";
import { Card } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InformationContract = ({
  project,
  quotation,
}: {
  project: ProjectDetailType;
  quotation: QuotationType;
}) => {
  const navigate = useNavigate();

  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: async () => {
      console.log("formik.values", formik.values);

      const res = await createContract(formik.values as ContractRequest);
      if (res.isSuccess) {
        messageSuccess("Tạo hợp đồng thành công");
        navigate(`/admin/consultation/${project.id}`);
      } else {
        messageError(res.message);
      }
    },
    values: {
      projectId: project.id,
      quotationId: quotation.id,
      name: project.name,
      customerName: project.customerName,
      contractValue: quotation.totalPrice,
      url: "",
      note: "",
    },
    validationSchema: validateContract,
  });

  const fetchDataForm = () => {
    formik.setFieldValue("projectId", project.id);
    formik.setFieldValue("quotationId", quotation.id);
    formik.setFieldValue("name", project.name);
    formik.setFieldValue("customerName", project.customerName);
    formik.setFieldValue(
      "contractValue",
      quotation.promotion
        ? Math.floor(
            quotation.totalPrice -
              (quotation.totalPrice * quotation.promotion.discount) / 100
          )
        : quotation.totalPrice
    );
  };

  useEffect(() => {
    fetchDataForm();
  }, [project, quotation]);

  return (
    <Card hoverable className="w-2/3 m-1">
      <TextField
        fullWidth
        label="Tên khách hàng"
        margin="normal"
        variant="outlined"
        {...regField("customerName")}
        error={Boolean(regField("customerName").error)}
        helperText={regField("customerName").error}
      />
      <TextField
        fullWidth
        label="Tên dự án"
        margin="normal"
        variant="outlined"
        {...regField("name")}
        error={Boolean(regField("name").error)}
        helperText={regField("name").error}
      />
      <TextField
        fullWidth
        label="Giá trị hợp đồng"
        margin="normal"
        variant="outlined"
        {...regField("contractValue")}
        error={Boolean(regField("contractValue").error)}
        disabled
        helperText={regField("contractValue").error}
      />

      <TextField
        fullWidth
        label="Ghi chú"
        margin="normal"
        variant="outlined"
        {...regField("note")}
        error={Boolean(regField("note").error)}
        helperText={regField("note").error}
      />

      <TextField
        fullWidth
        label="File hợp đồng"
        margin="normal"
        variant="outlined"
        {...regField("url")}
        error={Boolean(regField("url").error)}
        helperText={regField("url").error}
        disabled
      />

      <Uploader
        buttonText="Gửi hợp đồng"
        listType="text"
        maxFiles={1}
        onUploadSuccess={(urls) => {
          formik.setFieldValue("url", urls[0]);
          setTimeout(() => {
            formik.handleSubmit();
          });
        }}
      />

      {/* <div>
        <Button
          onClick={regHandleSubmit}
          loading={loading}
          title="Gửi hợp đồng"
        />
      </div> */}
    </Card>
  );
};

export default InformationContract;
