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
import {
  useGetBreedByIdQuery,
  useUpdateBreedMutation,
} from "../../breed/breedApi";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const updateBreedSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  lifeSpan: Yup.string().required("lifeSpan is required"),
  description: Yup.string().required("Description is required"),
  origin: Yup.string().required(),
  price: Yup.number().min(0).required(),
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
        ].includes(val.type),
    ),
});

export default function UpdateBreed() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBreedByIdQuery(id);
  const [updateBreed, { isLoading: isLoad }] = useUpdateBreedMutation();
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
          Update Breed
        </Typography>
        <Formik
          enableReinitialize
          initialValues={{
            name: data?.data?.name || "",
            lifeSpan: data?.data?.lifeSpan || "",
            description: data?.data?.description || "",
            origin: data?.data?.origin,
            price: data?.data?.price,
            image: null,
          }}
          validationSchema={updateBreedSchema}
          onSubmit={async (val, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("name", val.name);
              formData.append("lifeSpan", val.lifeSpan);
              formData.append("description", val.description);
              formData.append("origin", val.origin);
              formData.append("price", val.price);

              if (val.image) {
                formData.append("image", val.image);
              }

              await updateBreed({ formData, id }).unwrap();
              toast.success("Breed updated successfully");
              resetForm();
              nav("/admin-page/breed");
            } catch (err) {
              toast.error(
                err?.data?.message || err.message || "Failed to update breed",
              );
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            touched,
            errors,
            values,
            setFieldValue,
          }) => (
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Breed Name
                </Typography>
                <Input
                  size="lg"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Breed Name"
                />
                {errors.name && touched.name && (
                  <Typography color="pink">{errors.name}</Typography>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Lifespan
                </Typography>
                <Input
                  size="lg"
                  placeholder="Lifespan"
                  name="lifeSpan"
                  value={values.lifeSpan}
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
                  value={values.origin}
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
                  value={values.price}
                  onChange={handleChange}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.price && touched.price && (
                  <h1 className="text-red-700">{errors.price}</h1>
                )}

                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Description
                </Typography>
                <Textarea
                  size="lg"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                {errors.description && touched.description && (
                  <Typography color="pink">{errors.description}</Typography>
                )}

                {data?.data?.image && !values.image && (
                  <img
                    src={data.data.image}
                    alt="Current"
                    className="w-32 h-32 mt-2 object-cover rounded"
                  />
                )}

                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Image
                </Typography>
                <Input
                  size="lg"
                  type="file"
                  name="image"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                />
                {errors.image && touched.image && (
                  <Typography color="pink">{errors.image}</Typography>
                )}
              </div>

              <Button className="mt-4" fullWidth type="submit" loading={isLoad}>
                Update Breed
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
