import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./features/home/Home";
import NotFound from "./features/not-found/NotFound";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import AdminDashboard from "./features/admin/AdminDashboard";
import Information from "./features/admin/Information";
import BreedList from "./features/admin/admin-breed/BreedList";
import AddBreed from "./features/admin/admin-breed/AddBreed";
import UpdateBreed from "./features/admin/admin-breed/UpdateBreed";
import ProductList from "./features/admin/admin-product/ProductList";
import AddProduct from "./features/admin/admin-product/AddProduct";
import UpdateProduct from "./features/admin/admin-product/UpdateProduct";
import BlogList from "./features/admin/admin-blog/BlogList";
import AddBlog from "./features/admin/admin-blog/AddBlog";
import UpdateBlog from "./features/admin/admin-blog/UpdateBlog";
import SubscriberList from "./features/admin/admin-subscriber/SubscriberList";
import BreedPage from "./features/breed/BreedPage";
import ProductPage from "./features/product/ProductPage";
import BlogPage from "./features/blog/BlogPage";
import BreedDetails from "./features/breed/BreedDetails";
import ProductDetail from "./features/product/ProductDetail";
import BlogDetails from "./features/blog/BlogDetails";
import ProductCard from "./features/product/ProductCard";
import AddToCart from "./features/cart/AddToCart";
import OrderList from "./features/admin/admin-order/OrderList";
import ProductOrderDetails from "./features/admin/admin-order/ProductOrderDetails";
import ContactDetails from "./features/contact/ContactDetails";
import SearchPage from "./features/search/SearchPage";
import ContactList from "./features/admin/admin-contact/ContactList";
import AdminLogin from "./features/auth/AdminLogin";
import BuyBreed from "./features/breed/BuyBreed";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import AuthRoute from "./components/AuthRoute";
import EsewaPayment from "./features/payment/EsewaPayment";
import PaymentSuccess from "./features/payment/PaymentSuccess";
import ThankYou from "./features/payment/ThankYou";
import PaymentFailure from "./features/payment/PaymentFailure";
import OrderPage from "./features/order/OrderPage";
import UserProductOrder from "./features/order/UserProductOrder";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "breed-details",
          element: <BreedDetails />,
        },
        {
          path: "product-details",
          element: <ProductDetail />,
        },
        {
          path: "blog-details",
          element: <BlogDetails />,
        },
        {
          path: "contact-details",
          element: <ContactDetails />,
        },
        {
          path: "breed-page/:id",
          element: <BreedPage />,
        },
        {
          path: "product-page",
          element: <ProductPage />,
        },
        {
          path: "blog-page/:id",
          element: <BlogPage />,
        },
        {
          path: "buy-breed",
          element: <BuyBreed />,
        },
        {
          path: "product-card/:id",
          element: <ProductCard />,
        },
        {
          path: "user-product-order/:id",
          element: <UserProductOrder />,
        },

        // user router
        {
          element: <UserRoute />,
          children: [
            {
              path: "add-to-cart",
              element: <AddToCart />,
            },
            {
              path: "user-order",
              element: <OrderPage />,
            },
          ],
        },

        {
          path: "search-page",
          element: <SearchPage />,
        },
        {
          path: "esewa-payment",
          element: <EsewaPayment />,
        },
        {
          path: "payment-success",
          element: <PaymentSuccess />,
        },
        {
          path: "thank-you",
          element: <ThankYou />,
        },
        {
          path: "payment-failure",
          element: <PaymentFailure />,
        },
      ],
    },

    // auth route
    {
      element: <AuthRoute />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "admin",
      element: <AdminLogin />,
    },
    {
      path: "*",
      element: <NotFound />,
    },

    // admin route
    {
      element: <AdminRoute />,
      children: [
        {
          path: "admin-page",
          element: <AdminDashboard />,
          children: [
            {
              index: true,
              element: <Information />,
            },
            {
              path: "information",
              element: <Information />,
            },
            {
              path: "breed",
              element: <BreedList />,
            },
            {
              path: "add-breed",
              element: <AddBreed />,
            },
            {
              path: "update-breed/:id",
              element: <UpdateBreed />,
            },
            {
              path: "product",
              element: <ProductList />,
            },
            {
              path: "add-product",
              element: <AddProduct />,
            },
            {
              path: "update-product/:id",
              element: <UpdateProduct />,
            },
            {
              path: "blog",
              element: <BlogList />,
            },
            {
              path: "add-blog",
              element: <AddBlog />,
            },
            {
              path: "update-blog/:id",
              element: <UpdateBlog />,
            },
            {
              path: "order",
              element: <OrderList />,
            },
            {
              path: "product-order-details/:id",
              element: <ProductOrderDetails />,
            },
            {
              path: "subscriber",
              element: <SubscriberList />,
            },
            {
              path: "contact",
              element: <ContactList />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
