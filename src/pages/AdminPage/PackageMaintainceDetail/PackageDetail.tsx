import { getPackage, updatePackage } from "@/api/package";

import { PackageType } from "@/models";
import { PackageRequest } from "@/models/Request/PackageRequest";
import { packageItemActions } from "@/redux/slices/packageItem/packageItemSlices";

import { messageError, messageSuccess, Title } from "@/components";
import useForm from "@/hooks/useForm";
import { selectPackageItems } from "@/redux/slices/packageItem/packageItemSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  validatePackage,
  validatePackageMaintance,
} from "@/validations/validate";
import {
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { columns, priceTiers } from "./type";
import {
  getPackageMaintanceById,
  updatePackageMaintance,
} from "@/api/packageMaintance";
import { packageMaintenceItemActions } from "@/redux/slices/packageMaintenceItem/packageMaintenceItemSlices";
const PackageDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const fetchPackage = async () => {
    const res = await getPackageMaintanceById(id);
    if (res.isSuccess) {
      const data = res.data;
      await formik.setValues({
        name: data.name,
        description: data.description,
        price: data.priceList[0],
        rate: Math.floor(100 - (data.priceList[1] / data.priceList[0]) * 100),
        maintenanceItems: data.maintenanceItems,
      });
    }
  };
  useEffect(() => {
    fetchPackage();
  }, [id]);

  const { loading, regField, regHandleSubmit, formik } = useForm({
    values: {
      name: "",
      description: "",
      rate: 0,
      price: 0,
      maintenanceItems: [],
    },
    validationSchema: validatePackageMaintance,
    onSubmit: async (values) => {
      const collectionIdItem = values.maintenanceItems.map((item) => item.id);
      const packageRequest = {
        ...values,
        maintenanceItems: collectionIdItem,
      };

      const res = await updatePackageMaintance(id, packageRequest);
      if (res.isSuccess) {
        messageSuccess("Cập nhật gói dịch vụ thành công");
      } else {
        messageError(res.message);
      }
    },
  });
  const items = useAppSelector(
    (state) => state.packageMaintenceItem.packageItems
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const price = regField("price").value || 0;
  const error = regField("price").error;
  useEffect(() => {
    dispatch(
      packageMaintenceItemActions.fetchPackageItems({
        pageNumber: 1,
        pageSize: 10,
      })
    );
  }, []);

  const [selection, setSelection] = useState<Object[]>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const renderModal = () => {
    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
      setRowSelectionModel(selectionModel);

      const selectedData = items.data
        .filter((row) => selectionModel.includes(row.id))
        .map((row) => ({
          id: row.id,
          name: row.name,
        }));

      setSelection(selectedData);
    };

    useEffect(() => {
      if (isModalOpen) {
        const initialSelection =
          regField("maintenanceItems").value?.map((item) => item.id) || [];
        setRowSelectionModel(initialSelection);
      }
    }, [isModalOpen]);

    return (
      <Modal
        title="Chọn hạng mục bảo dưỡng"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          console.log(selection);
          formik.setFieldValue("maintenanceItems", selection);
          setIsModalOpen(false);
        }}
      >
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={items.data}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={handleSelectionChange}
          />
        </Paper>
      </Modal>
    );
  };

  return (
    <div className="flex flex-col justify-between mb-5 mt-8 mx-10 h-full w-full space-y-4">
      <Title name="Chi tiết gói" />
      <Card elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Thông tin gói dịch vụ
          </Typography>
          <Grid container spacing={2}>
            {/* Tên gói */}
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Tên gói"
                {...regField("name")}
                error={Boolean(regField("name").error)}
                helperText={regField("name").error}
              />
            </Grid>

            {/* Mô tả */}
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Mô tả"
                {...regField("description")}
                error={Boolean(regField("description").error)}
                helperText={regField("description").error}
              />
            </Grid>

            {/* Tỷ lệ */}
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Tỷ lệ giá"
                {...regField("rate")}
                error={Boolean(regField("rate").error)}
                helperText={regField("rate").error}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Bảng giá theo dung tích hồ
          </Typography>
          <Grid container spacing={2}>
            {priceTiers.map((tier, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <div className="space-y-2 text-blue-700">
                    <Typography variant="subtitle1" fontWeight={600}>
                      {tier.label}
                    </Typography>
                    <TextField
                      required
                      fullWidth
                      label="Giá"
                      {...(tier.editable ? regField("price") : {})}
                      value={
                        tier.editable ? price : Math.round(price * tier.factor)
                      }
                      error={Boolean(error)}
                      helperText={error}
                      InputProps={{
                        readOnly: !tier.editable,
                        endAdornment: (
                          <InputAdornment position="end">/m3</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>

        <CardContent className="space-y-3">
          <Typography variant="h6" gutterBottom>
            Chọn hạng mục thi công
          </Typography>
          <Grid container spacing={2}>
            {regField("maintenanceItems").value.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <div className="space-y-3">
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.name}
                    </Typography>
                  </div>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Button
            className="border-none text-lg font-bold"
            onClick={() => setIsModalOpen(true)}
          >
            Thêm hạng mục
          </Button>
        </CardContent>

        <CardContent>
          <Button
            block
            size="large"
            type="primary"
            onClick={() => {
              regHandleSubmit();
            }}
            loading={loading}
            disabled={loading}
            className="text-lg font-semibold"
          >
            Lưu
          </Button>
        </CardContent>
      </Card>

      {renderModal()}
    </div>
  );
};

export default PackageDetail;
