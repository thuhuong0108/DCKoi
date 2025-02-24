import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

type UseFormValues = {
  [key: string]: any;
};

interface IUseForm {
  values: UseFormValues;
  validationSchema?: Yup.ObjectSchema<any>;
  onSubmit: (values: UseFormValues) => void;
}

export default function useForm(config: IUseForm) {
  const [loading, setLoading] = useState(false);
  const formik = useFormik<typeof config.values>({
    initialValues: config.values,
    validationSchema: config.validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      config.onSubmit(values);
      setSubmitting(false);
      setLoading(false);
    },
  });

  const regField = (name: string) => {
    return {
      name,
      error: formik.errors[name] as string,
      value: formik.values[name],
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    };
  };

  return {
    loading,
    regField,
    regHandleSubmit: formik.handleSubmit,
    formik,
  };
}
