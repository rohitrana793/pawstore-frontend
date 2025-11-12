import { useParams, useNavigate } from "react-router-dom";
import { useGetBreedByIdQuery } from "./breedApi";
import Skeleton from "react-loading-skeleton";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function BreedPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetBreedByIdQuery(id);
  console.log(data);

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
    <div className="py-10 px-8 flex justify-center mt-10 mb-10">
      <Card className="mt-6 w-96 max-w-md shadow-lg ">
        <CardHeader
          color="blue-gray"
          className="relative h-56 overflow-hidden rounded-t-xl"
        >
          <img
            src={data?.data?.image || "/placeholder.jpg"}
            alt={data?.data?.name || "Breed"}
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody className="flex flex-col">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-center"
          >
            {data?.data?.name}
          </Typography>
          <Typography>{data?.data?.description}</Typography>
          <Typography>Lifespan : {data?.data?.lifeSpan} yrs</Typography>
          <Typography>Origin : {data?.data?.origin}</Typography>
        </CardBody>
      </Card>
    </div>
  );
}
