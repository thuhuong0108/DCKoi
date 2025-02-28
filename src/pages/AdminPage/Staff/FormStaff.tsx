import { Button } from "@/components";
import useForm from "@/hooks/useForm";
import { StaffType } from "@/models";
import { Position } from "@/models/enums/Position";
import { staffActions } from "@/redux/slices/staff/staffSlice";
import { useAppDispatch } from "@/redux/store/hook";
import { validateStaff } from "@/validations/validate";
import { parsePosition } from "@/utils/helpers";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Modal } from "antd";

const FormStaff = ({ item, setIsModalOpen, isModalOpen }) => {
  const dispatch = useAppDispatch();
  const { loading, regField, regHandleSubmit, formik } = useForm({
    values: item || {
      id: "",
      fullName: "",
      email: "",
      password: "",
      phone: "",
      position: "",
    },
    validationSchema: validateStaff,
    onSubmit: async (values: StaffType) => {
      if (values.id === "") {
        dispatch(staffActions.createStaff(values));
      } else {
        // dispatch(serviceActions.updateService(values));
      }

      setIsModalOpen(false);
    },
  });

  const renderModal = () => {
    return (
      <Modal
        title={item ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="flex flex-col">
          <TextField
            fullWidth
            label="Họ tên"
            margin="normal"
            variant="outlined"
            {...regField("fullName")}
            error={Boolean(regField("fullName").error)}
            helperText={regField("fullName").error}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
            {...regField("email")}
            error={Boolean(regField("email").error)}
            helperText={regField("email").error}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            margin="normal"
            variant="outlined"
            {...regField("password")}
            error={Boolean(regField("password").error)}
            helperText={regField("password").error}
          />

          <TextField
            fullWidth
            label="Số điện thoại"
            margin="normal"
            variant="outlined"
            {...regField("phone")}
            error={Boolean(regField("phone").error)}
            helperText={regField("phone").error}
          />

          <FormControl fullWidth>
            <InputLabel>Chức vụ</InputLabel>

            <Select
              value={regField("position").value}
              label="Chức vụ"

              onChange={(e) => {
                console.log(e.target.value);

                formik.setFieldValue("position", e.target.value)
              }}
            >
              {Object.values(Position).map((position) => (
                <MenuItem key={position} value={position.toString()}>
                  {parsePosition(position)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
      </Modal>
    )
  }
  return (
    <>{renderModal()}</>

  );
};

export default FormStaff;
