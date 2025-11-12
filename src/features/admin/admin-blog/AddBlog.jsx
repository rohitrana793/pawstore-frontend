import { Formik } from "formik";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAddBlogMutation } from "../../blog/blogApi";

const blogSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  excerpt: Yup.string().required("Excerpt is required"),
  content: Yup.string().required("Content is required"),
  author: Yup.string().required("Author is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Unsupported File Format", (val) => {
      if (!val) return false;
      const supportedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
        "image/gif",
      ];
      return supportedTypes.includes(val.type);
    }),
});

export default function AddBlog() {
  const [addBlog, { isLoading }] = useAddBlogMutation();
  const nav = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Add Blog
        </Typography>

        <Formik
          initialValues={{
            title: "",
            excerpt: "",
            content: "",
            author: "",
            image: null,
          }}
          validationSchema={blogSchema}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("title", val.title);
              formData.append("excerpt", val.excerpt);
              formData.append("content", val.content);
              formData.append("author", val.author);
              formData.append("image", val.image);

              await addBlog(formData).unwrap();
              resetForm();
              toast.success("Blog added successfully");
              nav("/admin-page/blog");
            } catch (err) {
              console.log("Full error:", err);
              const errorMsg =
                err?.data?.message ||
                err?.error ||
                err?.message ||
                JSON.stringify(err);

              toast.error(errorMsg);
            }
          }}
        >
          {({ handleChange, handleSubmit, touched, errors, setFieldValue }) => (
            <form
              className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 flex flex-col gap-4">
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Blog Title
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Enter blog title"
                    name="title"
                    onChange={handleChange}
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-600 text-sm">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Typography variant="h6" color="blue-gray">
                    Excerpt
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Short summary"
                    name="excerpt"
                    onChange={handleChange}
                  />
                  {errors.excerpt && touched.excerpt && (
                    <p className="text-red-600 text-sm">{errors.excerpt}</p>
                  )}
                </div>

                <div>
                  <Typography variant="h6" color="blue-gray">
                    Author
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Author name"
                    name="author"
                    onChange={handleChange}
                  />
                  {errors.author && touched.author && (
                    <p className="text-red-600 text-sm">{errors.author}</p>
                  )}
                </div>

                <div>
                  <Typography variant="h6" color="blue-gray">
                    Content
                  </Typography>
                  <Textarea
                    name="content"
                    placeholder="Write your blog content here..."
                    onChange={handleChange}
                  />
                  {errors.content && touched.content && (
                    <p className="text-red-600 text-sm">{errors.content}</p>
                  )}
                </div>

                <div>
                  <Typography variant="h6" color="blue-gray">
                    Image
                  </Typography>
                  <Input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      setFieldValue("image", file);
                    }}
                  />
                  {errors.image && touched.image && (
                    <p className="text-red-600 text-sm">{errors.image}</p>
                  )}
                </div>
              </div>

              <Button
                className="mt-4"
                fullWidth
                type="submit"
                loading={isLoading}
              >
                Add Blog
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
