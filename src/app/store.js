import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import { breedApi } from "../features/breed/breedApi";
import { productApi } from "../features/product/productApi";
import { blogApi } from "../features/blog/blogApi";
import { subscriberApi } from "../features/subscribe/subscriberApi";
import { cartSlice } from "../features/cart/cartSlice";
import { orderApi } from "../features/order/orderApi";
import { adminApi } from "../features/admin/adminApi";
import { contactApi } from "../features/contact/contactApi";

export const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [breedApi.reducerPath]: breedApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [subscriberApi.reducerPath]: subscriberApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      breedApi.middleware,
      productApi.middleware,
      blogApi.middleware,
      subscriberApi.middleware,
      orderApi.middleware,
      adminApi.middleware,
      contactApi.middleware,
    ]),
});
