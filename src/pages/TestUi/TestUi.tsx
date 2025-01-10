import { validateDemo } from "@/validations/validate";
import { Button, TextField } from "@mui/material";
import { Formik, Form as FormikForm } from "formik";

interface IFormValues {
  email: string;
  password: string;
  name: string;
}

const TestUi = () => {
  const initialValues: IFormValues = {
    email: "",
    password: "",
    name: "",
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validateDemo}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
         
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <FormikForm>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.name && touched.name)}
              helperText={touched.name && errors.name ? errors.name : ""}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.email && touched.email)}
              helperText={touched.email && errors.email ? errors.email : ""}
              fullWidth
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.password && touched.password)}
              helperText={
                touched.password && errors.password ? errors.password : ""
              }
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={Object.keys(errors).length > 0}
            >
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default TestUi;
