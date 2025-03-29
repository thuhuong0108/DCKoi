import { messageError, messageSuccess, ServiceCard } from "@/components";
import { packageMaintainceActions } from "@/redux/slices/packageMaintaice/packageMaintainceSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect, useState } from "react";
import ImgFish from "@/assets/images/fish.png";
import { Modal, Row, Typography } from "antd";
import { PackageMaintainType } from "@/models/PackageType";
import useForm from "@/hooks/useForm";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { validateMaincetainRequest } from "@/validations/validate";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { set } from "date-fns";
import { formatPrice } from "@/utils/helpers";
import {
  CheckOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  TrademarkOutlined,
} from "@ant-design/icons";
import { projectActions } from "@/redux/slices/project/projectSlices";
import { requestMaintennance } from "@/api/maintennances";
import ProjectCard from "./ProjectCard";

const PackageMaintance = () => {
  const dispatch = useAppDispatch();
  const packageLoading = useAppSelector(
    (state) => state.packageMaintaince.loading
  );

  const packages = useAppSelector(
    (state) => state.packageMaintaince.packageMaintainItems
  );

  useEffect(() => {
    dispatch(
      packageMaintainceActions.getPackageMaintaince({
        pageNumber: 1,
        pageSize: 10,
      })
    );
    // dispatch(
    //   projectActions.fetchProjectFinish({ pageNumber: 1, pageSize: 10 })
    // );
  }, []);
  const [visible, setVisible] = useState(false);
  const [selectPackage, setSelectPackage] = useState<PackageMaintainType>();

  const project = useAppSelector((state) => state.project.projects);

  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: async (values) => {
      await formik.setFieldValue(
        "estimateAt",
        dayjs(values.estimateAt).format("YYYY-MM-DD")
      );

      console.log("values", values);

      const res = await requestMaintennance(values);
      if (res.isSuccess) {
        messageSuccess("Đặt dịch vụ thành công");
        setVisible(false);
      } else {
        messageError(res.message);
      }
    },
    values: {
      maintenancePackageId: selectPackage?.id,
      name: "",
      area: "",
      depth: "",
      address: "",
      type: "",
      duration: 1,
      estimateAt: "",
      totalValue: "",
    },
    validationSchema: validateMaincetainRequest,
  });
  return (
    <div className="">
      <div className="text-center">
        <h2 className="text-indigo-800 font-bold text-2xl">
          Dịch vụ vệ sinh, bảo trì bảo dưỡng hồ cá Koi
        </h2>
      </div>

      {/* Service Price */}

      {/* Service Card */}
      <div className="flex flex-wrap gap-10 items-center mt-6 text-center max-md:max-w-full">
        {packages.data.map((item) => (
          <div className="flex flex-col self-stretch px-px pt-28 my-auto min-w-[240px] shadow-md rounded-2xl w-[588px] max-md:pt-24 max-md:max-w-full">
            <div className="flex z-10 flex-col px-11 pb-14 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
              <img
                loading="lazy"
                src={ImgFish}
                className="object-contain z-10 self-center -mt-28 max-w-full aspect-square rounded-[100px] shadow-sm w-[250px]"
              />
              <div className="mt-20 text-4xl font-bold text-indigo-800 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                {item.name}
              </div>
              <div className="flex flex-col mt-20 text-lg font-medium leading-none text-gray-500 min-h-[248px] max-md:mt-10 max-md:max-w-full">
                {item.maintenanceItems.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col pt-2.5 mt-6 w-full max-md:max-w-full"
                  >
                    <div className="self-center">{feature.name}</div>
                    <div className="shrink-0 mt-3.5 h-0.5 border border-black border-dashed max-md:max-w-full" />
                  </div>
                ))}
              </div>
              <button
                onClick={async () => {
                  setVisible(true);
                  setSelectPackage(item);
                  await dispatch(
                    projectActions.fetchProjectFinish({
                      pageNumber: 1,
                      pageSize: 10,
                    })
                  );
                }}
                className="self-center px-14 py-2 mt-20 max-w-full text-lg font-semibold leading-loose text-white bg-indigo-600 hover:bg-indigo-800 transition-all duration-300 rounded-xl w-[264px] max-md:px-5 max-md:mt-10"
              >
                Đặt dịch vụ
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={selectPackage?.name}
        visible={visible}
        width={2000}
        onOk={async () => {
          await formik.setFieldValue("maintenancePackageId", selectPackage?.id);

          regHandleSubmit();
        }}
        onCancel={() => setVisible(false)}
      >
        <div className="flex flex-row gap-4  w-full">
          <div className="flex flex-col gap-4 w-full">
            <TextField
              className="mb-4"
              required
              label="Tên"
              {...regField("name")}
              fullWidth
              error={Boolean(regField("name").error)}
              helperText={regField("name").error}
            />

            <TextField
              className="mb-4"
              required
              label="Diện tích"
              {...regField("area")}
              fullWidth
              error={Boolean(regField("area").error)}
              helperText={regField("area").error}
              onChange={(e) => {
                formik.setFieldValue("area", e.target.value);

                if (
                  e.target.value &&
                  formik.values.depth &&
                  formik.values.duration &&
                  formik.values.type
                ) {
                  let duration = Number(formik.values.duration);
                  if (formik.values.type === "UNSCHEDULED") duration = 1;
                  const volume =
                    Number(e.target.value) * Number(formik.values.depth);
                  let pricePerM3 = 0;
                  if (volume < 10) pricePerM3 = selectPackage?.priceList[0];
                  else if (volume >= 10 && volume < 20)
                    pricePerM3 = selectPackage?.priceList[1];
                  else if (volume >= 20 && volume < 50)
                    pricePerM3 = selectPackage?.priceList[2];
                  else if (volume >= 50 && volume < 100)
                    pricePerM3 = selectPackage?.priceList[3];
                  else pricePerM3 = selectPackage?.priceList[4];

                  let totalValue = pricePerM3 * volume * duration;
                  formik.setFieldValue("totalValue", totalValue);
                }
              }}
            />

            <TextField
              className="mb-4"
              required
              label="Độ sâu"
              {...regField("depth")}
              onChange={(e) => {
                formik.setFieldValue("depth", e.target.value);
                if (
                  formik.values.area &&
                  e.target.value &&
                  formik.values.duration &&
                  formik.values.type
                ) {
                  let duration = Number(formik.values.duration);
                  if (formik.values.type === "UNSCHEDULED") duration = 1;
                  const volume =
                    Number(formik.values.area) * Number(e.target.value);
                  let pricePerM3 = 0;
                  if (volume < 10) pricePerM3 = selectPackage?.priceList[0];
                  else if (volume >= 10 && volume < 20)
                    pricePerM3 = selectPackage?.priceList[1];
                  else if (volume >= 20 && volume < 50)
                    pricePerM3 = selectPackage?.priceList[2];
                  else if (volume >= 50 && volume < 100)
                    pricePerM3 = selectPackage?.priceList[3];
                  else pricePerM3 = selectPackage?.priceList[4];

                  let totalValue = pricePerM3 * volume * duration;
                  formik.setFieldValue("totalValue", totalValue);
                }
              }}
              fullWidth
              error={Boolean(regField("depth").error)}
              helperText={regField("depth").error}
            />

            <TextField
              required
              label="Địa chỉ"
              {...regField("address")}
              fullWidth
              error={Boolean(regField("address").error)}
              helperText={regField("address").error}
            />
            <FormControl
              className="mb-4"
              fullWidth
              error={Boolean(regField("type").error)}
              helperText={regField("type").error}
            >
              <InputLabel id="demo-simple-select-label">Loại</InputLabel>
              <Select
                fullWidth
                {...regField("type")}
                onChange={(e) => {
                  formik.setFieldValue("type", e.target.value);
                  if (
                    formik.values.area &&
                    formik.values.depth &&
                    formik.values.duration &&
                    e.target.value
                  ) {
                    let duration = Number(formik.values.duration);
                    if (e.target.value === "UNSCHEDULED") duration = 1;
                    const volume =
                      Number(formik.values.area) * Number(formik.values.depth);
                    let pricePerM3 = 0;
                    if (volume < 10) pricePerM3 = selectPackage?.priceList[0];
                    else if (volume >= 10 && volume < 20)
                      pricePerM3 = selectPackage?.priceList[1];
                    else if (volume >= 20 && volume < 50)
                      pricePerM3 = selectPackage?.priceList[2];
                    else if (volume >= 50 && volume < 100)
                      pricePerM3 = selectPackage?.priceList[3];
                    else pricePerM3 = selectPackage?.priceList[4];

                    let totalValue = pricePerM3 * volume * duration;
                    formik.setFieldValue("totalValue", totalValue);
                  }
                }}
              >
                <MenuItem value="SCHEDULED">Định kì</MenuItem>
                <MenuItem value="UNSCHEDULED">Không định kì</MenuItem>
              </Select>
            </FormControl>

            {formik.values.type === "SCHEDULED" && (
              <TextField
                className="mb-4"
                required
                label="Thời gian"
                {...regField("duration")}
                fullWidth
                error={Boolean(regField("duration").error)}
                helperText={regField("duration").error}
                onChange={(e) => {
                  formik.setFieldValue("duration", e.target.value);
                  if (
                    formik.values.area &&
                    formik.values.depth &&
                    e.target.value &&
                    formik.values.type
                  ) {
                    let duration = Number(e.target.value);
                    const volume =
                      Number(formik.values.area) * Number(formik.values.depth);
                    let pricePerM3 = 0;
                    if (volume < 10) pricePerM3 = selectPackage?.priceList[0];
                    else if (volume >= 10 && volume < 20)
                      pricePerM3 = selectPackage?.priceList[1];
                    else if (volume >= 20 && volume < 50)
                      pricePerM3 = selectPackage?.priceList[2];
                    else if (volume >= 50 && volume < 100)
                      pricePerM3 = selectPackage?.priceList[3];
                    else pricePerM3 = selectPackage?.priceList[4];

                    let totalValue = pricePerM3 * volume * duration;
                    formik.setFieldValue("totalValue", totalValue);
                  }
                }}
              />
            )}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker", "DatePicker"]}
              >
                <DatePicker
                  className="mb-4"
                  label="Ngày dự kiến"
                  views={["year", "month", "day"]}
                  value={dayjs(formik.values.estimateAt)}
                  onChange={(date) => formik.setFieldValue("estimateAt", date)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              className="mb-4"
              required
              label="Tổng giá trị"
              {...regField("totalValue")}
              fullWidth
              value={formatPrice(formik.values.totalValue)}
              error={Boolean(regField("totalValue").error)}
              helperText={regField("totalValue").error}
              disabled
            />
          </div>
          <div className="w-full p-6 bg-white rounded-lg shadow-sm">
            <Typography.Title
              level={5}
              className="text-gray-800 font-semibold mb-4"
            >
              Dịch vụ bao gồm
            </Typography.Title>
            <div className="flex flex-col gap-3">
              {selectPackage?.maintenanceItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start py-2 px-3 bg-gray-50 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <CheckOutlined className="text-green-500 mt-1 mr-2" />
                  <Typography.Text className="text-gray-700">
                    {item.name}
                  </Typography.Text>
                </div>
              ))}
            </div>

            <br />
            <Typography.Title
              level={5}
              className="text-gray-800 font-semibold mb-4"
            >
              Bảng giá
            </Typography.Title>
            <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <Typography.Title
                level={5}
                className="text-gray-800 font-semibold mb-4 flex items-center"
              >
                <DollarOutlined className="mr-2 text-blue-500" /> Bảng giá theo
                thể tích hồ
              </Typography.Title>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600">
                      <th className="py-3 px-4 text-left rounded-tl-md">
                        Thể tích hồ
                      </th>
                      <th className="py-3 px-4 text-right rounded-tr-md">
                        Đơn giá
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { range: "8-10 m³", price: selectPackage?.priceList[0] },
                      { range: "10-20 m³", price: selectPackage?.priceList[1] },
                      { range: "20-50 m³", price: selectPackage?.priceList[2] },
                      {
                        range: "50-100 m³",
                        price: selectPackage?.priceList[3],
                      },
                      {
                        range: "Trên 100 m³",
                        price: selectPackage?.priceList[4],
                      },
                    ].map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-gray-700 font-medium">
                          <TrademarkOutlined className="mr-2 text-blue-400" />
                          Hồ từ {item.range}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {formatPrice(item.price)} /m³
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Typography.Text type="secondary" className="block mt-4 text-sm">
                <InfoCircleOutlined className="mr-1" />
                Giá trên chưa bao gồm VAT. Áp dụng cho khu vực TP.HCM.
              </Typography.Text>
            </div>
          </div>

          <div className="w-full p-6 bg-white rounded-lg shadow-sm">
            <Typography.Title
              level={5}
              className="text-gray-800 font-semibold mb-4"
            >
              Dự án
            </Typography.Title>
            <Row className="flex flex-row ">
              {project.data.map((item, index) => (
                <div
                  className=""
                  onClick={() => {
                    formik.setFieldValue("area", item.area);
                    formik.setFieldValue("depth", item.depth);
                    formik.setFieldValue(
                      "address",
                      item.address ? item.address : ""
                    );
                    setTimeout(() => {
                      let totalValue = 0;
                      if (formik.values.type) {
                        let duration = Number(formik.values.duration);
                        if (formik.values.type === "UNSCHEDULED") duration = 1;
                        const volume =
                          Number(formik.values.area) *
                          Number(formik.values.depth);
                        let pricePerM3 = 0;
                        if (volume < 10)
                          pricePerM3 = selectPackage?.priceList[0];
                        else if (volume >= 10 && volume < 20)
                          pricePerM3 = selectPackage?.priceList[1];
                        else if (volume >= 20 && volume < 50)
                          pricePerM3 = selectPackage?.priceList[2];
                        else if (volume >= 50 && volume < 100)
                          pricePerM3 = selectPackage?.priceList[3];
                        else pricePerM3 = selectPackage?.priceList[4];

                        totalValue = pricePerM3 * volume * duration;

                        formik.setFieldValue("totalValue", totalValue);
                      }
                    }, 0);
                  }}
                >
                  <ProjectCard {...item} />
                </div>
              ))}
            </Row>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PackageMaintance;
