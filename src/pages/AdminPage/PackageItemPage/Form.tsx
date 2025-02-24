import { Button } from "@/components";
import useForm from "@/hooks/useForm";
import { PackageItemType } from "@/models";
import { packageItemActions } from "@/redux/slices/packageItem/packageItemSlices";
import { useAppDispatch } from "@/redux/store/hook";
import { validatePackageItem } from "@/validations/validate";
import { TextField } from "@mui/material";

const Form = ({ item, setIsModalOpen }) => {
  const dispatch = useAppDispatch();
  const { loading, regField, regHandleSubmit } = useForm({
    values: item || { name: "", id: "" },
    validationSchema: validatePackageItem,
    onSubmit: async (values: PackageItemType) => {
      console.log("values: ", values);

      if (values.id == "") {
        console.log("values: ", values);
        dispatch(packageItemActions.createPackageItem(values));
      } else {
        dispatch(packageItemActions.updatePackageItem(values));
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
