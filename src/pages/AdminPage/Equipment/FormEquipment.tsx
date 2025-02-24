import { Button } from "@/components";
import useForm from "@/hooks/useForm";
import { EquipmentType } from "@/models";
import { equipmentActions } from "@/redux/slices/equipment/equipmentSlice";

import { useAppDispatch } from "@/redux/store/hook";
import { validateEquipment } from "@/validations/validate";
import { TextField } from "@mui/material";

const FormEquipment = ({ item, setIsModalOpen }) => {
  const dispatch = useAppDispatch();
  const { loading, regField, regHandleSubmit } = useForm({
    values: item || { id: "", name: "", description: "" },
    validationSchema: validateEquipment,
    onSubmit: async (values: EquipmentType) => {
      if (values.id == "") {
        dispatch(equipmentActions.createEquipment(values));
      } else {
        dispatch(equipmentActions.updateEquipment(values));
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

export default FormEquipment;
