import ImgLogo from "@/assets/images/logo.png";
import { InputField } from "@/components";
import { Field, Form, Formik } from "formik";
import *  as Yup from "yup";

const Login = () => {
  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = {
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
  };

  const handleSubmit = () => {
    console.log("Login");

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-row justify-evenly items-center">
        <img src={ImgLogo} alt="Logo" className="w-[30%]" />
        <div className="flex flex-col rounded-3xl shadow-lg p-10 m-8 min-h-[500px] w-full max-w-xl bg-white">
          <h2 className="text-2xl font-bold">Login</h2>
          <div className="">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {({ values, handleChange }) => (
                <Form className="flex flex-col w-full mt-10 bg-white rounded-lg max-w-screen-xl">
                  <div className="grid grid-cols-2 gap-6 w-full">
                    <div className="flex flex-col col-span-2 bg-white rounded-lg p-6">
                      <Field
                        component={InputField}
                        label="Email"
                        name="email"
                        id="email"
                        placeholder="example@gmail.com"
                        value={values.email}
                        onChange={handleChange} />
                      <Field
                        component={InputField}
                        label="Password"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="*******"
                        value={values.password}
                        onChange={handleChange} />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
