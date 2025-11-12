import { useNavigate, useParams } from "react-router-dom";
import { useAddReviewMutation, useGetProductByIdQuery } from "./productApi";
import Skeleton from "react-loading-skeleton";
import {
  Button,
  Option,
  Rating,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../cart/cartSlice";
import { Formik } from "formik";

export default function ProductCard() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const [count, setCount] = useState(1);
  const nav = useNavigate();
  const [addReview, { isLoading: isLoad }] = useAddReviewMutation();
  const { user } = useSelector((state) => state.authSlice);
  const product = data?.data;
  const dispatch = useDispatch();

  if (isLoading)
    return (
      <div className="p-6">
        <Skeleton height={20} count={6} />
      </div>
    );

  if (error) {
    return (
      <h1 className="text-red-500 text-lg font-semibold text-center p-6">
        {error?.data?.message ||
          error?.error ||
          "Something went wrong. Please check your backend URL."}
      </h1>
    );
  }

  const handleCard = () => {
    try {
      if (user) {
        dispatch(
          addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            qty: count,
            stock: product.stock,
            image: product.image,
          })
        );
        toast.success(`${product.name} is added to cart`);
        nav("/product-page");
      } else {
        toast.error("Please login to add to cart");
        nav("/login");
      }
    } catch (err) {
      toast.error(err.data.message || err.message || "Failed to add to cart");
    }
  };

  return (
    <div className="px-6 md:px-12 lg:px-30 mt-10 mb-20">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-20">
        <img
          src={product.image}
          alt={product.name}
          className="w-full sm:w-[350px] h-auto max-h-[400px] object-cover rounded-lg shadow-md"
        />

        <div className="flex flex-col justify-between w-full lg:w-1/2 space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold">{product.name}</h1>
          <span className="text-xl text-[#E58608] font-bold">
            Rs. {product.price}
          </span>
          <p className="text-gray-700 capitalize">
            Category: {product.category}
          </p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex gap-4 items-center">
            <Button
              onClick={() => setCount((prev) => prev - 1)}
              disabled={count === 1}
              className="bg-[#E58608] text-white rounded-full w-10 h-10 flex justify-center items-center"
            >
              <i className="fas fa-minus" />
            </Button>
            <p className="text-lg font-medium">
              {product.stock ? count : "Out of stock"}
            </p>
            <Button
              className="bg-[#E58608] text-white rounded-full w-10 h-10 flex justify-center items-center"
              disabled={count >= product.stock}
              onClick={() => setCount((prev) => prev + 1)}
            >
              <i className="fas fa-plus" />
            </Button>
          </div>

          <div>
            <Button
              className="capitalize bg-[#E58608] text-white text-[16px] md:text-[18px] px-5 py-2 rounded-lg"
              onClick={handleCard}
              disabled={user?.role === "Admin" || product.stock == 0}
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full lg:w-[70%] mx-auto">
        {user && user?.role === "User" && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Add Review</h1>
            <Formik
              initialValues={{
                rating: "",
                comment: "",
              }}
              onSubmit={async (val, { resetForm }) => {
                try {
                  await addReview({ data: val, id: product._id }).unwrap();
                  resetForm();
                  toast.success("Review added successfully");
                } catch (err) {
                  toast.error(
                    err?.data?.message || err.message || "Failed to add review"
                  );
                }
              }}
            >
              {({ handleChange, handleSubmit, values, setFieldValue }) => (
                <form
                  onSubmit={handleSubmit}
                  className="w-full sm:w-[350px] space-y-3"
                >
                  <Select
                    name="rating"
                    label="Rate Product"
                    onChange={(e) => setFieldValue("rating", e)}
                    value={values.rating}
                  >
                    <Option value="1">Bad</Option>
                    <Option value="2">Poor</Option>
                    <Option value="3">Good</Option>
                    <Option value="4">Very Good</Option>
                    <Option value="5">Excellent</Option>
                  </Select>

                  <Textarea
                    name="comment"
                    label="Comment"
                    onChange={handleChange}
                    value={values.comment}
                  />

                  <Button
                    type="submit"
                    loading={isLoad}
                    className="capitalize bg-[#E58608] text-[14px] text-white"
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Formik>

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">Reviews</h2>
              {product.reviews.length > 0 ? (
                product.reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <h3 className="font-medium">{rev.userId.name}</h3>
                    <Rating readonly value={rev.rating} />
                    <p className="text-gray-700">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
