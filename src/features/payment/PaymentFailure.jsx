import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router";

export default function PaymentFailure() {
  const nav = useNavigate();
  return (
    <div className="px-20 mt-20 mb-20 flex flex-col justify-center items-center gap-5">
      <h2>Payment Failed</h2>
      <p>
        Unfortunately, your payment could not be processed. Please try again
      </p>
      <Button
        onClick={() => nav("/add-to-cart")}
        className="bg-red-700 text-[14px] capitalize cursor-pointer"
      >
        Try Again
      </Button>
    </div>
  );
}
