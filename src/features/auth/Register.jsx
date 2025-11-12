import { Formik } from "formik";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { NavLink } from "react-router";
import * as Yup from "yup";
import { useRegisterUserMutation } from "./authApi";
import { toast } from "react-hot-toast";

const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
});

export default function Register() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={async (val, { resetForm }) => {
            try {
              await registerUser(val).unwrap();
              resetForm();
              toast.success("User registered successfully");
            } catch (err) {
              toast.error(
                err?.data?.message || err.message || "Failed to register"
              );
            }
          }}
          validationSchema={registerSchema}
        >
          {({ handleChange, handleSubmit, touched, errors }) => (
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-1 flex flex-col gap-5">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="john doe"
                  name="name"
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.name && touched.name && (
                  <h1 className="text-red-700">{errors.name}</h1>
                )}
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
                sign up
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <NavLink to={"/login"} className="font-medium text-gray-900">
                  Sign In
                </NavLink>
              </Typography>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
