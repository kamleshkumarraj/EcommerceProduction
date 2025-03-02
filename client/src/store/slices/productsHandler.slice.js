import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories: [],
    latestProducts: [],
    topRatedProducts: [],
    discountedProducts: [],
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload;
    },
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLatestProducts: (state, action) => {
      console.log("latest running", action.payload);
      state.latestProducts = action.payload;
    },
    setSingleLatestProducts : (state , action) => {
      state.latestProducts.push(action.payload)
    },
    setTopRatedProducts: (state, action) => {
      state.topRatedProducts = action.payload;
    },
    setDiscountedProducts: (state, action) => {
      state.discountedProducts = action.payload;
    },
  },
});

export const productsHandler = slice.reducer;
export const {
  setAllProducts,
  setAllCategories,
  setDiscountedProducts,
  setLatestProducts,
  setTopRatedProducts,
  setSingleLatestProducts
} = slice.actions;
export const getAllProducts = (state) => state.productsList.products;
export const getAllCategories = (state) => state.productsList.categories;
export const getLatestProducts = (state) => {
  const latestProducts = state.productsList.latestProducts;
  return [...latestProducts].reverse() || [];
};
export const getTopRatedProducts = (state) =>
  state.productsList.topRatedProducts;
export const getDiscountedProducts = (state) =>
  state.productsList.discountedProducts;
