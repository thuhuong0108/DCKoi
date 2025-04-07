import { createPackage } from "@/api/package";
import { messageError, messageSuccess, Title } from "@/components";
import useForm from "@/hooks/useForm";
import { PackageRequest } from "@/models/Request/PackageRequest";
import { packageMaintenceItemActions } from "@/redux/slices/packageMaintenceItem/packageMaintenceItemSlices";
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
import { useNavigate } from "react-router-dom";
import { columns, priceTiers } from "./type";
import { createPackageMaintance } from "@/api/packageMaintance";
const PackageCreate = () => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const items = useAppSelector(
    (state) => state.packageMaintenceItem.packageItems
  );
  const { loading, regField, regHandleSubmit, formik } = useForm({
    values: {
      name: "",
      description: "",
      price: 0,
      rate: 0,
      maintenanceItems: [],
    },
    validationSchema: validatePackageMaintance,
    onSubmit: async (values) => {
      // build maintenanceItems is array of id
      const packageRequest = {
        ...values,
        maintenanceItems: values.maintenanceItems.map(
          (item) => item.idPackageItem
        ),
      };
      const res = await createPackageMaintance(packageRequest);
      if (res.isSuccess) {
        messageSuccess("Thêm mới gói dịch vụ thành công");
        navigate("/admin/management-packages/packages-maintance");
      } else {
        messageError(res.message);
      }
    },
  });

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

  const renderModal = () => {
    const [selection, setSelection] = useState<Object[]>([]);
    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
      const selectedData = items.data
        .filter((row) => selectionModel.includes(row.id))
        .map((row) => ({
          idPackageItem: row.id,
          name: row.name,
          description: "",
          quantity: 0,
        }));
      setSelection(selectedData);
    };
    const initialSelection = regField("maintenanceItems").value.map(
      (item) => item.id
    );

    return (
      <Modal
        title="Chọn hạng mục thi công"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          console.log(selection);
          formik.setFieldValue("maintenanceItems", selection);
          setIsModalOpen(false);
        }}
      >
        {/* display items and tick save list for submit */}
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={items.data}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
          />
        </Paper>
      </Modal>
    );
  };
  return (
    <div className="flex flex-col justify-between mb-5 mt-8 mx-10 h-full w-full space-y-4">
      <Title name="Thêm mới gói" />
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
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <div className="space-y-3 text-blue-700">
                    <Typography variant="subtitle1" fontWeight={600}>
                      {tier.label}
                    </Typography>
                    <TextField
                      required
                      fullWidth
                      label="Giá"
                      {...(tier.editable ? regField("price") : {})}
                      value={
                        tier.editable
                          ? price
                          : Math.round(
                              price -
                                price * ((formik.values.rate * index) / 100)
                            )
                      }
                      error={Boolean(error)}
                      helperText={error}
                      InputProps={{
                        readOnly: !tier.editable,
                        endAdornment: (
                          <InputAdornment position="end">/1m3</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>

        <CardContent>
          <Typography variant="h6" gutterBottom>
            Chọn hạng mục bảo dưỡng
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
            onClick={regHandleSubmit}
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

export default PackageCreate;
