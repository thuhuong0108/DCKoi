import useForm from "@/hooks/useForm";
import Button from "../../components/ui/Button";
import {
  validateEstimatePrice,
  validateRequestProject,
} from "@/validations/validate";
import { Form, Modal, Select, Typography } from "antd";
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  packageActions,
  selectPackage,
} from "@/redux/slices/package/packageSlices";
import { useEffect, useState } from "react";
import { PackageType } from "@/models";
import { messageError } from "../../components/ui";
import { EstimatePrice } from "./type";
import { formatPrice } from "@/utils/helpers";
import {
  Cities,
  Districts,
  IDistricts,
  IWards,
  Wards,
} from "@/constants/Address";
import TextArea from "antd/es/input/TextArea";
import SelectForm from "./SelectForm";

const EstimatedPrice = () => {
  const dispatch = useAppDispatch();
  const packageLoading = useAppSelector((state) => state.package.loading);

  const [visible, setVisible] = useState(false);

  const packages = useAppSelector(selectPackage);

  useEffect(() => {
    dispatch(packageActions.getPackage({ pageNumber: 1, pageSize: 10 }));
  }, []);

  const optionPackage: PackageType[] = packages.data;
  const caculatePrice = (volume: number, price: number[]) => {
    if (volume < 10) return price[0];
    if (volume >= 10 && volume < 20) return price[1];
    if (volume >= 20 && volume < 50) return price[2];
    if (volume >= 50 && volume < 100) return price[3];
    if (volume >= 100) return price[4];
    return null;
  };
  const [result, setResult] = useState<EstimatePrice | null>(null);
  const { loading, regField, regHandleSubmit, formik } = useForm({
    values: { package: "Chọn gói thi công", area: 0, depth: 0 },
    validationSchema: validateEstimatePrice,
    onSubmit: async (values: {
      package: string;
      area: number;
      depth: number;
    }) => {
      if (!values.package.match("Chọn gói thi công")) {
        const volume = values.area * values.depth;

        const selectedPackage = optionPackage.find(
          (pkg) => pkg.name === values.package
        );

        if (selectPackage !== null) {
          const totalPrice =
            caculatePrice(volume, selectedPackage.price) * volume;
          const price = caculatePrice(volume, selectedPackage.price);
          setResult({
            volume,
            totalPrice,
            price,
            selectedPackage,
          });
        }
      } else {
        messageError("Vui lòng chọn gói thi công");
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 my-5">
      <Select
        size="large"
        style={{ width: "100%", height: "60px" }}
        value={regField("package")}
        onChange={(value) => formik.setFieldValue("package", value)}
      >
        {optionPackage.map((pkg) => (
          <Select.Option
            key={pkg.id}
            value={pkg.name}
            style={{ padding: "12px 16px", fontSize: "16px" }}
          >
            {pkg.name}
          </Select.Option>
        ))}
      </Select>

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

      <Button
        primary
        size="lg"
        onClick={regHandleSubmit}
        title="Dự tính chi phí ban đầu"
        loading={loading}
      />
      {result && (
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <label className="text-indigo-800 font-bold text-xl">
            Kết quả tính toán
          </label>

          <label className="text-gray-500 font-bold text-xl">
            Thể tích thi công dự tính
          </label>

          <div className="flex flex-row items-center gap-4">
            <TextField
              type="number"
              label="Diện tích của hồ"
              value={formik.values.area}
            />
            <label className="text-gray-500 font-bold text-xl">X</label>
            <TextField
              type="number"
              label="Độ sâu của hồ cá Koi"
              value={formik.values.depth}
            />
            <label className="text-gray-500 font-extrabold text-3xl">=</label>
            <TextField
              type="number"
              label="Thể tích hồ"
              value={result.volume}
            />
          </div>
          <label className="text-gray-500 font-bold text-xl">
            Giá thi công dự tính ban đầu
          </label>
          <div className="flex flex-row items-center gap-4">
            <TextField
              type="number"
              label="Thể tích của hồ cá Koi"
              value={result.volume}
            />
            <label className="text-gray-500 font-bold text-xl">X</label>
            <TextField label="Giá thi công" value={formatPrice(result.price)} />
            <label className="text-gray-500 font-extrabold text-3xl">=</label>
            <TextField
              label="Chi phí dự tính"
              value={formatPrice(result.totalPrice)}
            />
          </div>

          <Button
            primary
            size="lg"
            title="Gửi yêu cầu"
            onClick={() => {
              setVisible(true);
            }}
          />
        </div>
      )}
      <SelectForm
        visible={visible}
        setVisible={setVisible}
        result={result}
        area={regField("area").value}
        depth={regField("depth").value}
      />
    </div>
  );
};

export default EstimatedPrice;
