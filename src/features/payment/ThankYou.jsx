import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router";

export default function ThankYou() {
  const nav = useNavigate();
  return (
    <div className="px-20 mt-20 mb-20 flex flex-col justify-center items-center gap-5">
      <h2 className="text-2xl font-bold">Payment Successfull</h2>
      <p className="font-bold text-xl">
        Your Order has been placed successfully. Thank you
      </p>
      <Button
        onClick={() => nav("/")}
        className="bg-[#E58608] text-[14px] capitalize cursor-pointer"
      >
        Go To Home Page
      </Button>
    </div>
  );
}
