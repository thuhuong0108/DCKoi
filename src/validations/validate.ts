import * as yup from "yup";
export const validateDemo = yup.object().shape({
  name: yup.string().required().max(50),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
export interface ParseResult {
  data: object | null;
  error: object | null;
  errorArr: Record<string, string>;
}

export const validateRegister = yup.object().shape({
  fullName: yup.string().required("Yêu cầu nhập họ tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập email"),
  phone: yup.string().required("Yêu cầu nhập số điện thoại"),
  password: yup.string().required("Yêu cầu nhập mật khẩu"),
  address: yup.string().required("Yêu cầu nhập địa chỉ"),
  dob: yup.date().required("Yêu cầu nhập ngày sinh"),
  gender: yup.string().required("Yêu cầu chọn giới tính"),
});

export const validateLogin = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập email"),
  password: yup.string().required("Yêu cầu nhập mật khẩu"),
});

export const validatePackageItem = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập thông tin"),
});

export const validateEquipment = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên thiết bị"),
  description: yup.string(),
});

export const validateService = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên dịch vụ"),
  description: yup.string(),
  price: yup.number().required("Yêu cầu nhập giá"),
  unit: yup.string().required("Yêu cầu nhập đơn vị"),
  type: yup.string().required("Yêu cầu chọn loại dịch vụ"),
});

export const validateStaff = yup.object().shape({
  fullName: yup.string().required("Yêu cầu nhập họ tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập email"),
  password: yup.string().required("Yêu cầu nhập mật khẩu"),
  phone: yup.string().required("Yêu cầu nhập số điện thoại"),
  position: yup.string().required("Yêu cầu nhập chức vụ"),
});

export const validatePackage = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên gói"),
  description: yup.string().required("Yêu cầu nhập mô tả"),
  price: yup.number().required("Yêu cầu nhập giá"),
});

export const validateTemplateConstruction = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên mẫu"),
  description: yup.string().required("Yêu cầu nhập mô tả"),
});

export const validateEstimatePrice = yup.object().shape({
  area: yup
    .number()
    .required("Vui lòng nhập diện tích")
    .min(0, "Diện tích không được nhỏ hơn 0"),
  depth: yup
    .number()
    .required("Vui lòng nhập độ sâu")
    .min(0, "Độ sâu không được nhỏ hơn 0"),
});
export const validateRequestProject = yup.object().shape({
  customerName: yup.string().required("Yêu cầu nhập tên khách hàng"),
  district: yup.string().required("Yêu cầu chọn quận"),
  email: yup.string().email().required("Yêu cầu nhập email"),
  ward: yup.string().required("Yêu cầu chọn phường"),
  address: yup.string().required("Yêu cầu nhập địa chỉ"),
  phone: yup.number().required("Yêu cầu nhập số điện thoại"),
  area: yup.number().required("Yêu cầu nhập diện tích"),
  depth: yup.string().required("Yêu cầu nhập độ sâu"),
  packageId: yup.string().required("Yêu cầu chọn gói dịch vụ"),
});

export const validateDeny = yup.object().shape({
  reason: yup.string().required("Yêu cầu nhập lý do"),
});
export const validateContract = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên hợp đồng"),
  customerName: yup.string().required("Yêu cầu nhập tên khách hàng"),
  url: yup.string().required("Yêu cầu hợp đồng"),
});
