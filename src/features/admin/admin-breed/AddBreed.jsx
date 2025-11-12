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
import { useAddBreedMutation } from "../../breed/breedApi";
import { useNavigate } from "react-router-dom";

const breedSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  lifeSpan: Yup.string().min(0).required(),
  description: Yup.string().required(),
  origin: Yup.string().required(),
  price: Yup.number().min(0).required(),
  image: Yup.mixed()
    .required()
    .test("File Type", "Unsupported File Format", (val) =>
      [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
        "image/gif",
      ].includes(val.type)
    ),
});

export default function AddBreed() {
  const [addBreed, { isLoading }] = useAddBreedMutation();
  const nav = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Breed
        </Typography>
        <Formik
          initialValues={{
            name: "",
            lifeSpan: "",
            description: "",
            origin: "",
            price: "",
            image: "",
          }}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("name", val.name);
              formData.append("lifeSpan", val.lifeSpan);
              formData.append("description", val.description);
              formData.append("origin", val.origin);
              formData.append("price", val.price);
              formData.append("image", val.image);
              await addBreed(formData).unwrap();
              resetForm();
              toast.success("Breed added successfully");
              nav("/admin-page/breed");
            } catch (err) {
              toast.error(
                err?.data?.message || err.message || "Failed to add breed"
              );
            }
          }}
          validationSchema={breedSchema}
        >
          {({ handleChange, handleSubmit, touched, errors, setFieldValue }) => (
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-1 flex flex-col gap-2">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Breed Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="husky"
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
                  Lifespan
                </Typography>
                <Input
                  size="lg"
                  placeholder="Lifespan"
                  type="number"
                  name="lifeSpan"
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.lifeSpan && touched.lifeSpan && (
                  <h1 className="text-red-700">{errors.lifeSpan}</h1>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Origin
                </Typography>
                <Input
                  size="lg"
                  placeholder="origin"
                  name="origin"
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.origin && touched.origin && (
                  <h1 className="text-red-700">{errors.origin}</h1>
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
                  Description
                </Typography>
                <Textarea
                  size="lg"
                  name="description"
                  onChange={handleChange}
                  placeholder="description"
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
                Add Breed
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
