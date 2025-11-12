import { Formik } from "formik";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../product/productApi";
import Skeleton from "react-loading-skeleton";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "../../blog/blogApi";

const blogSchema = Yup.object({
  title: Yup.string().required(),
  excerpt: Yup.string().required(),
  content: Yup.string().required(),
  author: Yup.string().required(),
  image: Yup.mixed()
    .nullable()
    .test(
      "fileType",
      "Unsupported File Format",
      (val) =>
        !val ||
        [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/webp",
          "image/gif",
        ].includes(val.type)
    ),
});

export default function UpdateProduct() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBlogByIdQuery(id);
  const [updateBlog, { isLoading: isLoad }] = useUpdateBlogMutation();

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
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Update Blog
        </Typography>
        <Formik
          enableReinitialize
          initialValues={{
            title: data?.data?.title,
            excerpt: data?.data?.excerpt,
            author: data?.data?.author,
            content: data?.data?.content,
            image: null,
            imagePrev: data?.data?.image,
          }}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("title", val.title);
              formData.append("excert", val.excerpt);
              formData.append("author", val.author);
              formData.append("content", val.content);
              if (val.image) {
                formData.append("image", val.image);
              }
              await updateBlog({ formData, id }).unwrap();
              resetForm();
              toast.success("Blog updated successfully");
              nav("/admin-page/blog");
            } catch (err) {
              toast.error(
                err?.data?.message || err.message || "Failed to update blog"
              );
            }
          }}
          validationSchema={blogSchema}
        >
          {({
            handleChange,
            handleSubmit,
            touched,
            errors,
            setFieldValue,
            values,
          }) => (
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-1 flex flex-col gap-2">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Blog Title
                </Typography>
                <Input
                  size="lg"
                  placeholder="Blog Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.title && touched.title && (
                  <h1 className="text-red-700">{errors.title}</h1>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Excert
                </Typography>
                <Input
                  size="lg"
                  placeholder="Excert"
                  name="excert"
                  value={values.excerpt}
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.excerpt && touched.excerpt && (
                  <h1 className="text-red-700">{errors.excerpt}</h1>
                )}

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Author
                </Typography>
                <Input
                  size="lg"
                  placeholder="Author"
                  name="author"
                  value={values.author}
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.author && touched.author && (
                  <h1 className="text-red-700">{errors.author}</h1>
                )}

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Content
                </Typography>
                <Textarea
                  size="lg"
                  name="content"
                  onChange={handleChange}
                  placeholder="Content"
                  value={values.content}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.content && touched.content && (
                  <h1 className="text-red-700">{errors.content}</h1>
                )}
                {data?.data?.image && !values.image && (
                  <img
                    src={data.data.image}
                    alt="Current"
                    className="w-32 h-32 mt-2 object-cover rounded"
                  />
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Image
                </Typography>
                <Input
                  size="lg"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("image", file);
                  }}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.image && touched.image && (
                  <Typography color="pink">{errors.image}</Typography>
                )}
              </div>
              <Button className="mt-6" fullWidth type="submit" loading={isLoad}>
                Update Blog
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
