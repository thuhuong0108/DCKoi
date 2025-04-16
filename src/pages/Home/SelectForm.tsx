import { requestProject } from "@/api/project";
import { getInforUser } from "@/api/user";
import { Button, messageError, messageSuccess } from "@/components";
import {
  Cities,
  Districts,
  IDistricts,
  IWards,
  Wards,
} from "@/constants/Address";
import useForm from "@/hooks/useForm";
import { ProjectRequest } from "@/models";
import { validateRequestProject } from "@/validations/validate";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Modal, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";

const SelectForm = ({ visible, setVisible, result, area, depth }) => {
  const renderModal = () => {
    const city = Cities.find((city) => city.name === "Hồ Chí Minh");

    const { loading, regField, regHandleSubmit, formik } = useForm({
      values: {
        customerName: "",

        address: "",
        phone: "",
        area: "",
        depth: "",
        packageId: null,
        note: "",

        email: "",
        templatedesignid: null,
      },
      validationSchema: validateRequestProject,
      onSubmit: async (values) => {
        const request: ProjectRequest = {
          customerName: values.customerName,
          note: values.note,
          address:
            values.address +
            ", " +
            values.ward +
            ", " +
            values.district +
            ", " +
            city.name_with_type,
          phone: values.phone,
          email: values.email,
          area: values.area,

          depth: values.depth,

          packageId: values.packageId,

          templatedesignid: values.templatedesignid,
        };

        const response = await requestProject(request);

        if (response.isSuccess) {
          messageSuccess("Gửi yêu cầu thành công");
          setVisible(false);
          formik.resetForm();
        } else {
          messageError(response.message);
          setVisible(false);
        }
      },
    });

    useEffect(() => {
      formik.setFieldValue("depth", depth);
      formik.setFieldValue("area", area);
    }, [depth, area]);

    useEffect(() => {
      const getInformation = async () => {
        const response = await getInforUser();
        if (response.isSuccess) {
          formik.setFieldValue("customerName", response.data.fullName);
          formik.setFieldValue("phone", response.data.phone);
          formik.setFieldValue("email", response.data.email);
          formik.setFieldValue("address", response.data.address);
        }
      };
      if (visible) {
        getInformation();
      }
    }, [visible]);
    return (
      <Modal
        title="Gửi yêu cầu"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          formik.setFieldValue("packageId", result.selectedPackage.id);
          setTimeout(() => {
            regHandleSubmit();
          }, 0);
        }}
        // footer={[
        //   <Button
        //     key="submit"
        //     primary
        //     title="Gửi yêu cầu"
        //     onClick={() => regHandleSubmit()}
        //     loading={loading}
        //   />,
        // ]}
      >
        <Typography.Title level={4}>
          {result && `Bạn đang chọn gói ${result.selectedPackage.name}`}
        </Typography.Title>
        <div className="flex flex-col gap-4">
          <TextField
            required
            label="Họ và tên"
            {...regField("customerName")}
            error={Boolean(regField("customerName").error)}
            helperText={regField("customerName").error}
          />
          <TextField
            required
            label="Số điện thoại"
            {...regField("phone")}
            error={Boolean(regField("phone").error)}
            helperText={regField("phone").error}
          />

          <TextField
            required
            label="Email"
            {...regField("email")}
            error={Boolean(regField("email").error)}
            helperText={regField("email").error}
          />

          <TextField
            required
            type="number"
            label="Diện tích dự tính xây hồ cá Koi"
            {...regField("area")}
            error={Boolean(regField("area").error)}
            helperText={regField("area").error}
          />
          <TextField
            required
            type="number"
            label="Độ sâu của hồ cá Koi"
            {...regField("depth")}
            error={Boolean(regField("depth").error)}
            helperText={regField("depth").error}
          />

          <TextField
            required
            label="Địa chỉ"
            {...regField("address")}
            error={Boolean(regField("address").error)}
            helperText={regField("address").error}
          />
          <TextArea rows={10} placeholder="Ghi chú" {...regField("note")} />
        </div>
      </Modal>
    );
  };
  return <div>{renderModal()}</div>;
};

export default SelectForm;
