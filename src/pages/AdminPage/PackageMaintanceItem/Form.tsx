import { Button } from "@/components";
import useForm from "@/hooks/useForm";
import { PackageItemType } from "@/models";

import { useAppDispatch } from "@/redux/store/hook";
import { validatePackageItem } from "@/validations/validate";
import { TextField } from "@mui/material";
import { packageMaintenceItemActions } from "@/redux/slices/packageMaintenceItem/packageMaintenceItemSlices";

const Form = ({ item, setIsModalOpen }) => {
  const dispatch = useAppDispatch();
  const { loading, regField, regHandleSubmit } = useForm({
    values: item || { name: "", description: "", id: "" },
    validationSchema: validatePackageItem,
    onSubmit: async (values: PackageItemType) => {
      console.log("values: ", values);

      if (values.id == "") {
        console.log("values: ", values);
        dispatch(packageMaintenceItemActions.createPackageItem(values));
      } else {
        dispatch(packageMaintenceItemActions.updatePackageItem(values));
      }

      setIsModalOpen(false);
    },
  });
  return (
    <div className="flex flex-col">
      <TextField
        required
        label="Tên hạng mục công việc"
        {...regField("name")}
        error={Boolean(regField("name").error)}
        helperText={regField("name").error}
      />
      <TextField
        required
        label="Mô tả"
        {...regField("description")}
        error={Boolean(regField("description").error)}
        helperText={regField("description").error}
        className="mt-3"
        multiline
        rows={4}
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

export default Form;
