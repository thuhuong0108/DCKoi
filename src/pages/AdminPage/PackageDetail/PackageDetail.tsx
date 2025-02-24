import { getPackage, updatePackage } from "@/api/package";

import { PackageType } from "@/models";
import { PackageRequest } from "@/models/Request/PackageRequest";
import { packageItemActions } from "@/redux/slices/packageItem/packageItemSlices";

import { messageError, messageSuccess, Title } from "@/components";
import useForm from "@/hooks/useForm";
import { selectPackageItems } from "@/redux/slices/packageItem/packageItemSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validatePackage } from "@/validations/validate";
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
const PackageDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const fetchPackage = async () => {
    const res = await getPackage(id);
    if (res.isSuccess) {
      const data = res.data as PackageType;
      await formik.setValues({
        name: data.name,
        description: data.description,
        price: data.price[0],
        items: data.items,
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
      price: 0,
      items: [],
    },
    validationSchema: validatePackage,
    onSubmit: async (values: PackageRequest) => {
      const response = await updatePackage(id, values);
      if (response.isSuccess) {
        messageSuccess("Cập nhật gói dịch vụ thành công");
      } else {
        messageError(response.message);
      }
    },
  });
  const items = useAppSelector(selectPackageItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const price = regField("price").value || 0;
  const error = regField("price").error;
  useEffect(() => {
    dispatch(
      packageItemActions.fetchPackageItems({ pageNumber: 1, pageSize: 10 })
    );
  }, []);

  const [selection, setSelection] = useState<Object[]>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const renderModal = () => {
    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
      setRowSelectionModel(selectionModel); // ✅ Cập nhật state để UI nhận thay đổi

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

    // Khi mở modal, cập nhật lại danh sách chọn ban đầu
    useEffect(() => {
      if (isModalOpen) {
        const initialSelection =
          regField("items").value?.map((item) => item.idPackageItem) || [];
        setRowSelectionModel(initialSelection); // ✅ Đặt giá trị chọn ban đầu
      }
    }, [isModalOpen]);

    return (
      <Modal
        title="Chọn hạng mục thi công"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          console.log(selection);
          formik.setFieldValue("items", selection);
          setIsModalOpen(false);
        }}
      >
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={items.data}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            rowSelectionModel={rowSelectionModel} // ✅ Giữ trạng thái chọn đúng
            onRowSelectionModelChange={handleSelectionChange} // ✅ Cập nhật khi chọn mới
          />
        </Paper>
      </Modal>
    );
  };

  return (
    <div className="flex flex-col justify-between mb-5 mt-8 mx-10 h-full w-full">
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
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                    p: 2,
                  }}
                >
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
                        <InputAdornment position="end">vnd/1m3</InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>

        <CardContent>
          <Typography variant="h6" gutterBottom>
            Chọn hạng mục thi công
          </Typography>
          <Grid container spacing={2}>
            {regField("items").value.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.name}
                  </Typography>
                  <TextField
                    fullWidth
                    label="Số lượng"
                    type="number"
                    {...regField(`items[${index}].quantity`)}
                    value={item.quantity}
                  />
                  <TextField
                    label="Mô tả"
                    {...regField(`items[${index}].description`)}
                    value={item.description}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          <Button onClick={() => setIsModalOpen(true)}>Thêm hạng mục</Button>
        </CardContent>

        <CardContent>
          <Button
            type="primary"
            onClick={regHandleSubmit}
            loading={loading}
            disabled={loading}
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
