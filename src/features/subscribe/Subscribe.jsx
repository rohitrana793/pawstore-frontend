import dog_image from "../../assets/dog_image.png";
import { Button } from "@material-tailwind/react";
import { Formik } from "formik";
import { useAddSubscriberMutation } from "./subscriberApi";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

const subscribeSchema = Yup.object({
  email: Yup.string().email().required(),
});

export default function Subscribe() {
  const [addSubscriber, { isLoading }] = useAddSubscriberMutation();
  return (
    <div className="mb-25 mx-4 sm:mx-10 md:mx-20 lg:mx-24 bg-[#fff0d9] rounded-[50px] h-auto sm:h-[300px] relative py-20 sm:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center px-6 sm:px-12 md:px-20 absolute lg:relative top-0 lg:top-[-100px] gap-10 lg:gap-0">
        <img
          src={dog_image}
          alt=""
          className="w-[250px] h-[300px] sm:w-[300px] sm:h-[370px] lg:w-[350px] lg:h-[430px] mx-auto lg:mx-0"
        />
        <div className="flex flex-col gap-6 pt-0 lg:pt-15">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-center lg:text-left">
              Get Pawsome News!
            </h2>
            <p className="text-sm sm:text-base lg:text-[16px] pr-0 sm:pr-5 lg:pr-10 text-center lg:text-left">
              Exclusive training tips, ticks, product deals and more.
            </p>
          </div>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={async (val, { resetForm }) => {
              try {
                await addSubscriber(val).unwrap();
                resetForm();
                toast.success("Subscribed successfully");
              } catch (err) {
                toast.error(
                  err?.data?.message || err.message || "Failed to subscribe"
                );
              }
            }}
            validationSchema={subscribeSchema}
          >
            {({ handleChange, handleSubmit, touched, errors, values }) => (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                  <input
                    placeholder="Enter email..."
                    name="email"
                    onChange={handleChange}
                    className="rounded-[15px] bg-[#fffdf8] p-3 w-full sm:w-[370px]"
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <h1 className="text-red-700 text-sm mt-1">
                      {errors.email}
                    </h1>
                  )}
                </div>
                <Button
                  type="submit"
                  className="bg-[#E58608] capitalize text-[16px] font-light px-4 py-2 rounded-[18px] w-fit"
                  loading={isLoading}
                >
                  Subscribe
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
