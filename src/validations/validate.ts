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
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
  address: yup.string().required(),
  dob: yup.date().required(),
  gender: yup.string().required(),
});

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
  area: yup.number().required(),
  depth: yup.number().required(),
});
