import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authSlice from './features/auth/authSlice';
import cartSlice from './features/cartSlice';
import couponSlice from './features/coupon/couponSlice';
import orderSlice from './features/order/orderSlice';
import wishlistSlice from './features/wishlist-slice';
import productSlice from './features/productSlice';
// Import testimonial API to register endpoints
import './testimonial/testimonialApi';
// Import portfolio API to register endpoints
import './portfolio/portfolioApi';
// Import inquiry API to register endpoints
import './inquiry/inquiryApi';
// Import FAQ API to register endpoints
import './faq/faqApi';
// Import measurement API to register endpoints
import './measurement/measurementApi';
// Import contact API to register endpoints
import './contact/contactApi';


export const store = configureStore({
  reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authSlice,
    cart:cartSlice,
    wishlist:wishlistSlice,
    coupon:couponSlice,
    order:orderSlice,
    product:productSlice,
  },
  middleware:(getDefaultMiddleware) => 
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
})

