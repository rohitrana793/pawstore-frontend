import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";
import { useGetBreedQuery } from "./breedApi";

export default function BuyBreed() {
  const { data, isLoading, error } = useGetBreedQuery();

  if (isLoading)
    return (
      <div className="p-6">
        <Skeleton height={150} count={3} />
      </div>
    );

  if (error) {
    return (
      <h1 className="text-red-500 text-lg font-semibold text-center">
        {error?.data?.message ||
          error?.error ||
          "Something went wrong. Please check your backend URL."}
      </h1>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 place-items-center mt-10 mb-10">
      {data.data.map((breed) => (
        <Card
          key={breed._id}
          className="w-full max-w-sm bg-white shadow-md hover:shadow-2xl transition-transform duration-300 rounded-2xl overflow-hidden cursor-pointer hover:scale-105"
        >
          <CardHeader
            shadow={false}
            floated={false}
            className="relative aspect-square bg-gray-100"
          >
            <img
              src={breed.image || "/placeholder.jpg"}
              alt={breed.name}
              className="w-full h-full object-cover rounded-t-2xl"
              loading="lazy"
            />
          </CardHeader>
          <CardBody className="text-center px-4 py-2">
            <Typography
              variant="h5"
              color="blue-gray"
              className="capitalize font-semibold mb-2 text-sm sm:text-base md:text-lg"
            >
              {breed.name}
            </Typography>

            <Typography
              className="text-base sm:text-lg md:text-xl font-bold mb-2"
              style={{ color: "#E58608" }}
            >
              Rs. {breed.price}
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
