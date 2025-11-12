import { useGetBlogByIdQuery } from "./blogApi";
import { useParams } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BlogPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBlogByIdQuery(id);

  if (isLoading)
    return (
      <div className="p-10 max-w-4xl mx-auto">
        <Skeleton height={250} count={1} />
        <Skeleton height={20} count={4} className="mt-4" />
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

  const blog = data?.data;

  return (
    <div className="py-10 px-6 md:px-10 flex justify-center min-h-screen mt-10 mb-10">
      <Card className="w-96 max-w-xl rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:cursor-pointer">
        <CardHeader
          shadow={false}
          floated={false}
          className="relative h-48 bg-gray-100"
        >
          <img
            src={blog?.image || "/placeholder.jpg"}
            alt={blog?.title || "Blog"}
            className="w-full h-full object-cover rounded-t-2xl"
            loading="lazy"
          />
        </CardHeader>

        <CardBody className="px-6 py-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-semibold mb-2"
          >
            {blog?.title}
          </Typography>

          <Typography className="text-gray-600 text-sm mb-2 font-medium">
            {blog?.excerpt}
          </Typography>

          <Typography className="text-gray-500 text-xs mb-4">
            By {blog?.author}
          </Typography>

          <Typography className="text-gray-700 text-sm leading-relaxed">
            {blog?.content}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
