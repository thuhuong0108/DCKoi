import { Button } from "@/components";
import useForm from "@/hooks/useForm";
import { ServiceType } from "@/models";
import { serviceActions } from "@/redux/slices/service/serviceSlice";
import { useAppDispatch } from "@/redux/store/hook";
import { validateService } from "@/validations/validate";
import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

const FormService = ({ item, setIsModalOpen }) => {
  const dispatch = useAppDispatch();
  const { loading, regField, regHandleSubmit } = useForm({
    values: item || {
      id: "",
      name: "",
      description: "",
      price: 0,
      unit: "",
      type: "Unit",
    },
    validationSchema: validateService,
    onSubmit: async (values: ServiceType) => {
      if (values.id === "") {
        dispatch(serviceActions.createService(values));
      } else {
        dispatch(serviceActions.updateService(values));
      }

      setIsModalOpen(false);
    },
  });
  return (
    <div className="flex flex-col">
      <TextField
        fullWidth
        label="Tên thiết bị"
        margin="normal"
        variant="standard"
        {...regField("name")}
        error={Boolean(regField("name").error)}
        helperText={regField("name").error}
      />

      <TextField
        fullWidth
        label="Mô tả thiết bị"
        margin="normal"
        variant="standard"
        {...regField("description")}
        error={Boolean(regField("description").error)}
        helperText={regField("description").error}
      />

      <TextField
        fullWidth
        label="Giá thiết bị"
        type="number"
        margin="normal"
        variant="standard"
        {...regField("price")}
        error={Boolean(regField("price").error)}
        helperText={regField("price").error}
      />

      <TextField
        fullWidth
        label="Đơn vị"
        margin="normal"
        variant="standard"
        {...regField("unit")}
        error={Boolean(regField("unit").error)}
        helperText={regField("unit").error}
      />

      <FormControl fullWidth margin="normal" variant="standard">
        <InputLabel>Phân loại</InputLabel>
        <NativeSelect
          {...regField("type")}
          error={Boolean(regField("type").error)}
          inputProps={{
            name: "type",
          }}
        >
          <option value="Unit">Unit</option>
          <option value="m2">m2</option>
          <option value="m3">m3</option>
        </NativeSelect>
        {regField("type").error && (
          <div className="text-red-500 text-sm">{regField("type").error}</div>
        )}
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
  );
};

export default FormService;
