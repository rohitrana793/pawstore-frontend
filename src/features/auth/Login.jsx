import { Formik } from "formik";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router";
import * as Yup from "yup";
import { useLoginUserMutation } from "./authApi";
import { toast } from "react-hot-toast";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
});

export default function Login() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Please enter your details to login.
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (val, { resetForm }) => {
            try {
              const res = await loginUser(val).unwrap();
              dispatch(setCredentials(res.user));
              resetForm();
              if (res.user.role === "User") {
                toast.success("User login successfully");
                nav("/");
              } else {
                nav("/admin");
              }
            } catch (err) {
              toast.error(
                err?.data?.message || err.message || "Failed to login"
              );
            }
          }}
          validationSchema={loginSchema}
        >
          {({ handleChange, handleSubmit, touched, errors }) => (
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-1 flex flex-col gap-5">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  name="email"
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.email && touched.email && (
                  <h1 className="text-red-700">{errors.email}</h1>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  name="password"
                  onChange={handleChange}
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.password && touched.password && (
                  <h1 className="text-red-700">{errors.password}</h1>
                )}
              </div>

              <Button
                className="mt-6"
                fullWidth
                type="submit"
                loading={isLoading}
              >
                Sign In
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Don't have an account?{" "}
                <NavLink to={"/register"} className="font-medium text-gray-900">
                  sign up
                </NavLink>
              </Typography>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
