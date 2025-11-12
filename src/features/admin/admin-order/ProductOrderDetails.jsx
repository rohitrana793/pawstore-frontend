import { useGetOrderByIdQuery } from "../../order/orderApi";
import { useParams } from "react-router";
import { Card, Typography } from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";

export default function ProductOrderDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOrderByIdQuery(id);

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
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Typography
          variant="h4"
          color="blue-gray"
          className="font-semibold text-center md:text-left"
        >
          Product Order Details
        </Typography>
      </div>
      <div className="overflow-x-auto">
        <Card className="border border-gray-100 shadow-md min-w-full">
          <table className="min-w-full table-auto text-center">
            <thead className="bg-blue-50 border-b border-blue-100">
              <tr>
                {["S.N", "Image", "Product Id", "Product", "Price", "Qty"].map(
                  (head, index) => (
                    <th key={index} className="p-3 sm:p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold uppercase tracking-wide text-xs sm:text-sm"
                      >
                        {head}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {data?.data?.products?.length > 0 ? (
                data?.data?.products?.map((product, index) => (
                  <tr
                    key={product.productId}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3 sm:p-4 text-sm sm:text-base font-semibold text-gray-700 text-center">
                      {index + 1}
                    </td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      <img
                        src={product.image}
                        alt={product.image}
                        className="h-10 w-10 sm:h-12 sm:w-12 object-cover mx-auto"
                      />
                    </td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      {product.productId}
                    </td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      {product.name}
                    </td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      Rs. {product.price}
                    </td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      {product.qty}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-6 text-gray-500">
                    No Product Order found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
