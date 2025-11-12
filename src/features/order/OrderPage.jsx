import { useGetUserOrderQuery } from "./orderApi";
import { Card, Typography, Button } from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router";

export default function OrderPage() {
  const nav = useNavigate();
  const { data, isLoading, error } = useGetUserOrderQuery();
  if (isLoading)
    return (
      <div className="p-6">
        <Skeleton height={20} count={6} />
      </div>
    );

  if (error) {
    return (
      <h1 className="text-red-500 text-lg font-semibold">
        {error?.data?.message ||
          error?.error ||
          "Something went wrong. Please check your backend URL."}
      </h1>
    );
  }
  return (
    <div className="px-30 mt-20 mb-20">
      <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <Typography
            variant="h4"
            color="blue-gray"
            className="font-semibold text-center md:text-left"
          >
            User Order Details
          </Typography>
        </div>
        <div className="overflow-x-auto">
          <Card className="border border-gray-100 shadow-md min-w-full">
            <table className="min-w-full table-auto text-center">
              <thead className="bg-blue-50 border-b border-blue-100">
                <tr>
                  {[
                    "S.N",
                    "Order Id",
                    "Payment",
                    "Payment Status",
                    "Total Amount",
                    "Product Details",
                  ].map((head, index) => (
                    <th key={index} className="p-3 sm:p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold uppercase tracking-wide text-xs sm:text-sm"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data?.data.length > 0 ? (
                  data?.data?.map((order, index) => (
                    <tr
                      key={order._id}
                      className={`hover:bg-blue-50 transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-3 sm:p-4 text-sm sm:text-base font-semibold text-gray-700 text-center">
                        {index + 1}
                      </td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base">
                        {order._id}
                      </td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base">
                        {order.paymentMethod}
                      </td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base">
                        {order.paymentStatus}
                      </td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base">
                        Rs. {order.totalAmt}
                      </td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base">
                        <Button
                          className="bg-[#E58608] capitalize text-[14px] cursor-pointer"
                          onClick={() =>
                            nav(`/user-product-order/${order._id}`)
                          }
                        >
                          View More
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-6 text-gray-500">
                      No Order found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}
