import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Formik } from "formik";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useAddContactMutation } from "./contactApi";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

const contactVal = Yup.object({
  name: Yup.string().trim().required(),
  email: Yup.string().email().lowercase().required(),
  subject: Yup.string().required(),
  message: Yup.string().required(),
});

export default function ContactDetails() {
  const [addContact, { isLoading }] = useAddContactMutation();
  return (
    <div className="flex flex-col gap-10 mb-20 px-30 pt-5">
      <h2 className="text-center text-[36px] font-bold">Contact</h2>
      <div className="flex justify-center gap-40">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <span className="text-[24px]">
              <FaLocationDot />
            </span>
            <div>
              <h4 className="font-medium text-[20px]">Address</h4>
              <p className="text-[15px]">
                Mahendrapool <br />
                Pokhara, Nepal
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <span className="text-[24px]">
              <BsFillTelephoneFill />
            </span>
            <div>
              <h4 className="font-medium text-[20px]">Phone</h4>
              <p className="text-[15px]">+977-[0]61-328463</p>
            </div>
          </div>
        </div>
        <div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              subject: "",
              message: "",
            }}
            onSubmit={async (val, { resetForm }) => {
              try {
                await addContact(val).unwrap();
                toast.success("Contact added successfully");
                resetForm();
              } catch (err) {
                console.log(err);
                toast.error(
                  err?.data?.message || err.message || "Failed to add contact"
                );
              }
            }}
            validationSchema={contactVal}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <form className="w-[350px] space-y-5" onSubmit={handleSubmit}>
                <div>
                  <Typography className="font-medium">Your Name</Typography>
                  <Input
                    name="name"
                    label="john doe"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Typography className="font-medium">Email Address</Typography>
                  <Input
                    name="email"
                    label="john@gmail.com"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Typography className="font-medium">Subject</Typography>
                  <Input
                    name="subject"
                    label="This is a subject"
                    value={values.subject}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Typography className="font-medium">Message</Typography>
                  <Textarea
                    name="message"
                    label="Hi i'd like to ask about"
                    value={values.message}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    className="bg-[#E58608] capitalize text-[14px]"
                    loading={isLoading}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
