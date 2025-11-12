import {
  Card,
  IconButton,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  useGetProductsQuery,
  useRemoveProductMutation,
} from "../../product/productApi";

export default function ProductList() {
  const { data, isLoading, error } = useGetProductsQuery();
  const [removeProduct] = useRemoveProductMutation();
  const nav = useNavigate();
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await removeProduct(id);
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Typography
          variant="h4"
          color="blue-gray"
          className="font-semibold text-center md:text-left"
        >
          Product Details
        </Typography>
        <Button
          onClick={() => nav("/admin-page/add-product")}
          className="bg-[#E58608] capitalize text-[14px]"
        >
          Add Product
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Card className="border border-gray-100 shadow-md min-w-full">
          <table className="min-w-full table-auto text-center">
            <thead className="bg-blue-50 border-b border-blue-100">
              <tr>
                {[
                  "S.N",
                  "Image",
                  "Name",
                  "Description",
                  "Category",
                  "Stock",
                  "Price",
                  "Action",
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
                data?.data?.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3 sm:p-4 text-sm sm:text-base font-semibold text-gray-700 text-center">
                      {index + 1}
                    </td>

                    <td className="p-3 sm:p-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.image}
                          className="h-10 w-10 sm:h-12 sm:w-12 object-cover mx-auto"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs sm:text-sm">
                          No Image
                        </span>
                      )}
                    </td>

                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      {product.name}
                    </td>
                    <td className="p-3 sm:p-4 text-center text-sm sm:text-base">
                      {product.description}
                    </td>
                    <td className="p-3 sm:p-4 text-center text-sm sm:text-base">
                      {product.category}
                    </td>
                    <td className="p-3 sm:p-4 text-center text-sm sm:text-base">
                      {product.stock}
                    </td>
                    <td className="p-3 sm:p-4 text-center text-sm sm:text-base">
                      {product.price}
                    </td>

                    <td className="p-3 sm:p-4 text-center">
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <Tooltip content="Edit Product">
                          <IconButton
                            variant="text"
                            size="sm"
                            onClick={() =>
                              nav(`/admin-page/update-product/${product._id}`)
                            }
                          >
                            <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Product">
                          <IconButton
                            variant="text"
                            size="sm"
                            onClick={() => handleDelete(product._id)}
                          >
                            <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-6 text-gray-500">
                    No products found.
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
