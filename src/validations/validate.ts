// import { validateDemo } from "./validate";
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

export const validateProject = yup.object().shape({
  customerName: yup.string().required("Fullname is required"),
  address: yup.string().required(),
  phone: yup.string().required("Phone number is required").matches(/^(0|\+84)(3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])\d{7}$/, "Phone number is not valid"),
  email: yup.string().required().email(),
  area: yup.number().required().positive(),
  depth: yup.number().required().positive(),
  packageId: yup.string(),
  note: yup.string(),
  templatedesignid: yup.string()
});
