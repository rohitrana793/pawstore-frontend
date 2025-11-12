import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../product/productApi";
import Skeleton from "react-loading-skeleton";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function SearchPage() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error } = useGetProductsQuery({
    search: searchParams.get("search"),
  });

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
    <div className="py-10 px-6 md:px-12 lg:px-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center bg-gray-50 mt-10 mb-10">
      {data.data.map((product) => (
        <Card
          key={product._id}
          className="w-full max-w-sm bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden"
          onClick={() => nav(`/product-card/${product._id}`)}
        >
          <CardHeader
            shadow={false}
            floated={false}
            className="relative aspect-square bg-gray-100"
          >
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-2xl"
              loading="lazy"
            />
          </CardHeader>
          <CardBody className="text-center px-4 py-1">
            <Typography
              variant="h5"
              color="blue-gray"
              className="capitalize font-semibold mb-2"
            >
              {product.name}
            </Typography>

            <Typography
              className="text-lg font-bold"
              style={{ color: "#E58608" }}
            >
              Rs. {product.price}
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
