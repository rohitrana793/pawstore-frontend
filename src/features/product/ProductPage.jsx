import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Select,
  Option,
  Rating,
} from "@material-tailwind/react";
import { useGetProductsQuery } from "./productApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CircularPagination } from "./CircularPagination";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [searchParams, setSearchParamas] = useSearchParams();
  const [price, setPrice] = useState("price");
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, error } = useGetProductsQuery({
    page: searchParams.get("page"),
    sort: price,
  });

  const nav = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isLoading)
    return (
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} height={350} />
        ))}
      </div>
    );

  if (error)
    return (
      <h1 className="text-red-500 text-lg font-semibold text-center py-10">
        {error?.data?.message ||
          error?.error ||
          "Something went wrong. Please check your backend URL."}
      </h1>
    );

  if (!data?.data?.length)
    return (
      <div className="text-center text-gray-500 text-lg py-10">
        No products found.
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center mt-8 px-4 w-full">
        <div className="w-full sm:w-[250px] md:w-[200px]">
          <Select
            label="Sort By"
            onChange={(value) => setPrice(value)}
            value={price}
          >
            <Option value="price">Low Price</Option>
            <Option value="-price">High Price</Option>
          </Select>
        </div>
      </div>

      <div className="py-10 px-6 md:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center mt-5 mb-5">
        {data.data.map((product) => (
          <Card
            key={product._id}
            className="w-full max-w-sm bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer"
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
            <CardBody className="text-center px-4 py-2">
              <Typography
                variant="h5"
                color="blue-gray"
                className="capitalize font-semibold mb-2"
              >
                {product.name}
              </Typography>

              <Typography
                className="text-lg font-bold mb-2"
                style={{ color: "#E58608" }}
              >
                Rs. {product.price}
              </Typography>
              <Rating value={product.rating} readonly />
            </CardBody>
          </Card>
        ))}
      </div>

      <CircularPagination
        page={page}
        setSearchParamas={setSearchParamas}
        totalPages={data.totalPages}
      />
    </div>
  );
}
