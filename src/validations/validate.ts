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

export const validatePackage = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
});
export const validateTemplateConstruction = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});
