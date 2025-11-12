import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";
import { useGetBlogsQuery } from "./blogApi";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function BlogCard() {
  const { data, isLoading, error } = useGetBlogsQuery();
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.data.map((blog) => {
        return (
          <Card
            className="mt-6 w-full max-w-md shadow-lg h-90 cursor-pointer transition-transform duration-300 hover:scale-105"
            key={blog._id}
            onClick={() => nav(`/blog-page/${blog._id}`)}
          >
            <img
              src={blog.image || "/placeholder.jpg"}
              alt={blog.title || "Blog"}
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-[20px]"
            />

            <CardBody className="flex flex-col items-center">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-[14px] sm:text-[16px] md:text-[18px] text-center"
              >
                {blog.title}
              </Typography>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
