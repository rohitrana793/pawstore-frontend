import { useGenerateSignatureMutation } from "../order/orderApi";
import { Formik } from "formik";
import { Button, Input, Typography } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function EsewaPayment() {
  const [generateSignature] = useGenerateSignatureMutation();
  const { cart } = useSelector((state) => state.cartSlice);
  const totalAmount = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <div className="mb-20 mt-20 px-30 flex flex-col gap-5 items-center justify-center">
      <Typography className="text-[30px] font-bold">eSewa Payment</Typography>
      <Formik
        enableReinitialize
        initialValues={{
          totalAmt: totalAmount,
        }}
        onSubmit={async (val) => {
          const formData = {
            amount: val.totalAmt,
            tax_amount: 0,
            total_amount: val.totalAmt,
            transaction_uuid: `order-${Math.floor(Math.random() * 100000)}`,
            product_code: "EPAYTEST",
            product_service_charge: 0,
            product_delivery_charge: 0,
            success_url: "http://localhost:5173/payment-success",
            failure_url: "http://localhost:5173/payment-failure",
            signed_field_names: "total_amount,transaction_uuid,product_code",
          };

          try {
            // 🔹 Request backend to generate eSewa signature
            const res = await generateSignature(formData).unwrap();
            const { signature } = await res;

            // 🔹 Create and submit form dynamically
            const form = document.createElement("form");
            form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
            form.method = "POST";

            const fields = {
              ...formData,
              signature,
            };

            Object.entries(fields).forEach(([key, value]) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = value;
              form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
          } catch (err) {
            console.log(err);
            console.error(err);
            toast.error(
              err?.data?.message || err.message || "Failed to initiate payment"
            );
          }
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <form
            className="w-[300px] flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <div>
              <Typography className="text-xl font-bold">
                Total Amount
              </Typography>
              <Input
                name="totalAmt"
                value={`Rs. ${values.totalAmt}`}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div>
              <Button
                className="bg-[#E58608] text-[14px] capitalize cursor-pointer"
                type="submit"
              >
                Pay Via eSewa
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
