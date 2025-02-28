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

export const validateLogin = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const validatePackageItem = yup.object().shape({
  name: yup.string().required(),
});

export const validateEquipment = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
});

export const validateService = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  price: yup.number().required(),
  unit: yup.string().required(),
  type: yup.string().required(),
});

export const validateStaff = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  position: yup.string().required(),
});

export const validatePackage = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
});

export const validateTemplateConstruction = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

export const validateEstimatePrice = yup.object().shape({
  area: yup.number().required().min(0),
  depth: yup.number().required().min(0),
});
export const validateRequestProject = yup.object().shape({
  customerName: yup.string().required(),
  district: yup.string().required(),
  email: yup.string().email().required(),
  ward: yup.string().required(),
  address: yup.string().required(),
  phone: yup.number().required(),
  area: yup.number().required(),
  depth: yup.string().required(),
  packageId: yup.string().required(),
});
