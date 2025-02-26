import { requestProject } from "@/api/project";
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

const SelectForm = ({ visible, setVisible, result }) => {
  const renderModal = () => {
    const city = Cities.find((city) => city.name === "Hồ Chí Minh");
    const [filteredDistricts, setFilteredDistricts] = useState<IDistricts[]>(
      []
    );
    const [filteredWards, setFilteredWards] = useState<IWards[]>([]);

    const { loading, regField, regHandleSubmit, formik } = useForm({
      values: {
        customerName: "",
        district: "",
        ward: "",
        address: "",
        phone: "",
        area: "",
        depth: "",
        packageId: null,
        note: "",
        city: city ? city.code : null,
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

        console.log(request);

        const response = await requestProject(request);

        console.log(response);

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
      if (city) {
        const districts = Districts.filter(
          (district) => district.parent_code === city.code
        );
        setFilteredDistricts(districts);
      }
    }, [city]);

    return (
      <Modal
        title="Gửi yêu cầu"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          formik.setFieldValue("packageId", result.selectedPackage.id);

          regHandleSubmit();
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
          <FormControl fullWidth error={!!regField("district").error}>
            <InputLabel id="demo-simple-select-label">Quận/ Huyện</InputLabel>
            <Select
              style={{ width: "100%", height: "60px" }}
              value={regField("district").value}
              label="Quận/Huyện"
              onChange={(event) => {
                formik.setFieldValue("district", event.target.value);
                formik.setFieldValue("ward", "");

                const district = Districts.find(
                  (district) => district.name_with_type === event.target.value
                );
                const wards = Wards.filter(
                  (ward) => ward.parent_code === district.code
                );
                setFilteredWards(wards);
              }}
            >
              {filteredDistricts.map((district) => (
                <MenuItem key={district.code} value={district.name_with_type}>
                  {district.name_with_type}
                </MenuItem>
              ))}
            </Select>
            {regField("district").error && (
              <FormHelperText>{regField("district").error}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={!!regField("ward").error}>
            <InputLabel id="demo-simple-select-label">Phường/ Xã</InputLabel>
            <Select
              style={{ width: "100%", height: "60px" }}
              value={regField("ward").value}
              label="Phường/Xã"
              onChange={(event) => {
                formik.setFieldValue("ward", event.target.value);
              }}
            >
              {filteredWards.map((ward) => (
                <MenuItem key={ward.code} value={ward.name_with_type}>
                  {ward.name_with_type}
                </MenuItem>
              ))}
            </Select>
            {regField("ward").error && (
              <FormHelperText>{regField("ward").error}</FormHelperText>
            )}
          </FormControl>

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
