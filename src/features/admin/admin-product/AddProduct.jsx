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
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../product/productApi";

const productSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  category: Yup.string()
    .oneOf(
      ["dog food", "accessories", "toys", "health & care", "others"],
      "Invalid category"
    )
    .required("Category is required"),
  price: Yup.number()
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  stock: Yup.number()
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  description: Yup.string().required("Description is required"),
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

export default function AddProduct() {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const nav = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Product
        </Typography>
        <Formik
          initialValues={{
            name: "",
            category: "",
            price: "",
            stock: "",
            description: "",
            image: "",
          }}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("name", val.name);
              formData.append("category", val.category);
              formData.append("price", val.price);
              formData.append("stock", val.stock);
              formData.append("description", val.description);
              formData.append("image", val.image);
              await addProduct(formData).unwrap();
              resetForm();
              toast.success("Product added successfully");
              nav("/admin-page/Product");
            } catch (err) {
              toast.error(
                err?.data?.message || err.message || "Failed to add Product"
              );
            }
          }}
          validationSchema={productSchema}
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
                  Product Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Product Name"
                  name="name"
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.name && touched.name && (
                  <h1 className="text-red-700">{errors.name}</h1>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Category
                </Typography>
                <Select
                  name="category"
                  placeholder="Category"
                  value={values.category}
                  onChange={(e) => setFieldValue("category", e)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                >
                  <Option value="dog food">dog food</Option>
                  <Option value="accessories">accessories</Option>
                  <Option value="toys">toys</Option>
                  <Option value="health & care">health & care</Option>
                  <Option value="others">others</Option>
                </Select>
                {errors.category && touched.category && (
                  <h1 className="text-red-700">{errors.category}</h1>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Price
                </Typography>
                <Input
                  size="lg"
                  placeholder="Price"
                  name="price"
                  type="number"
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.price && touched.price && (
                  <h1 className="text-red-700">{errors.price}</h1>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Stock
                </Typography>
                <Input
                  size="lg"
                  placeholder="Stock"
                  name="stock"
                  type="number"
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.stock && touched.stock && (
                  <h1 className="text-red-700">{errors.stock}</h1>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Description
                </Typography>
                <Textarea
                  size="lg"
                  name="description"
                  onChange={handleChange}
                  placeholder="Description"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.description && touched.description && (
                  <h1 className="text-red-700">{errors.description}</h1>
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
              <Button
                className="mt-6"
                fullWidth
                type="submit"
                loading={isLoading}
              >
                Add Product
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
