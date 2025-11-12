import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCartItem } from "./cartSlice";
import { useNavigate } from "react-router-dom";

export default function AddToCart() {
  const { cart } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  // console.log("cart", cart);

  if (cart.length === 0)
    return (
      <div className="flex flex-col justify-center items-center gap-4 mb-10">
        <h1 className="text-[24px] flex justify-center mt-5">Cart is empty</h1>
        <Button
          size="lg"
          className="bg-[#E58608] capitalize text-[15px] "
          onClick={() => nav("/product-page")}
        >
          Continue Shopping
        </Button>
      </div>
    );

  // const handleOrder = async () => {
  //   try {
  //     const products = cart.map((item) => ({
  //       productId: item.id,
  //       name: item.name,
  //       price: item.price,
  //       qty: item.qty,
  //       image: item.image,
  //     }));
  //     await addOrder({
  //       totalAmt: total,
  //       products,
  //     }).unwrap();
  //     toast.success("Order created successfully");
  //     dispatch(clearCart());
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.data?.message || err.message || "Failed to Order");
  //   }
  // };

  return (
    <div>
      <div className="px-30 mt-10 mb-20">
        {cart.map((item) => (
          <div
            key={item.id}
            className="mb-5 flex items-center gap-5 border-b border-gray-300 pb-4"
          >
            <div className="w-[120px] flex-shrink-0">
              <img
                src={item.image}
                alt=""
                className="h-[120px] w-[120px] object-cover"
              />
            </div>

            <div className="w-[250px]">
              <p className="text-lg font-medium">{item.name}</p>
            </div>

            <div className="w-[100px]">
              <p className="text-lg">Rs. {item.price}</p>
            </div>

            <div className="w-[150px] flex items-center gap-2">
              <Button
                className="bg-[#E58608] w-10 h-10 flex items-center justify-center p-0"
                disabled={item.qty === 1}
                onClick={() =>
                  dispatch(addToCart({ ...item, qty: item.qty - 1 }))
                }
              >
                <i className="fas fa-minus" />
              </Button>
              <p className="w-8 text-center">{item.qty}</p>
              <Button
                className="bg-[#E58608] w-10 h-10 flex items-center justify-center p-0"
                disabled={item.qty >= item.stock}
                onClick={() =>
                  dispatch(addToCart({ ...item, qty: item.qty + 1 }))
                }
              >
                <i className="fas fa-plus" />
              </Button>
            </div>

            <div className="w-[80px] flex-shrink-0">
              <Button
                className="bg-red-700 w-full"
                onClick={() => dispatch(removeCartItem({ id: item.id }))}
              >
                <i className="fas fa-trash" />
              </Button>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <p className="text-[24px] font-bold mt-5">
            Total Amount: Rs. <span>{total}</span>
          </p>
          <div className="flex gap-5">
            <Button
              onClick={() => nav("/esewa-payment")}
              className="bg-[#E58608] capitalize text-[14px] "
            >
              CheckOut
            </Button>
            {/* <Button
              size="lg"
              className="bg-[#E58608] capitalize text-[14px] "
              loading={isLoading}
              onClick={handleOrder}
            >
              Place Order
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
