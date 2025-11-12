import { useDispatch, useSelector } from "react-redux";
import { useAddOrderMutation } from "../order/orderApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearCart } from "../cart/cartSlice";

export default function PaymentSuccess() {
  const { cart } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const nav = useNavigate();
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  const handleOrder = async () => {
    try {
      const products = cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        image: item.image,
      }));
      await addOrder({
        totalAmt: total,
        products,
      }).unwrap();
      dispatch(clearCart());
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.message || "Failed to Order");
    }
  };

  useEffect(() => {
    const processPayment = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const encodeData = params.get("data");
        if (!encodeData) {
          nav("/payment-failure");
        }
        // decoded the encoded data
        const decodedData = atob(encodeData);
        console.log("decodeddata", decodedData);

        // string to object
        const paymentData = JSON.parse(decodedData);

        if (paymentData.status === "COMPLETE") {
          // save order to database
          handleOrder();

          // redirect to thankyou page
          nav("/thank-you");
        } else {
          // if payment was not successfull
          Navigate("/payment-failure");
        }
      } catch (err) {
        Navigate("/payment-failure");
      }
    };
    processPayment();
  }, [nav]);

  return (
    <div>
      <h1 className="text-center mt-20 mb-20">Processing Payment...........</h1>
    </div>
  );
}
