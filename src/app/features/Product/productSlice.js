import { createSlice } from "@reduxjs/toolkit";
import {
  createNewProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  searchProduct,
  getSearchedProduct,
  getUserProducts,
} from "./productAction";

const initialState = {
  loading: false,
  products: null, // for product object {}
  createProduct: null,
  deleteResult: null,
  deleteSuccess: false,
  edit: null,
  editSuccess: false,
  userProducts: null,
  error: null,
  success: false, // for monitoring the creation process.
  searchedProducts: null,
  searchSingleProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    removeProduct: (state) => {
      state.loading = false;
      state.products = null;
      state.error = null;
    },
    deleteSingleProduct: (state, action) => {
      state.products = state.products?.filter(
        (product) => product._id !== action.payload
      );
      state.deleteResult = null;
    },
    removeEdit: (state) => {
      state.editSuccess = false;
      state.edit = null;
    },
  },
  extraReducers: {
    //create product
    [createNewProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createNewProduct.fulfilled]: (state, { payload }) => {
      if (payload.status === 201) {
        state.loading = false;
        state.success = true;
      }
      state.createproduct = payload;
    },
    [createNewProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //Delete product
    [deleteProduct.pending]: (state) => {
      state.deleteSuccess = false;
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.deleteSuccess = true;
      }

      state.deleteResult = payload;
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    // getAllproduct
    [getAllProducts.pending]: (state) => {},
    [getAllProducts.fulfilled]: (state, { payload }) => {
      state.editSuccess = false;
      state.deleteSuccess = false;
      state.deleteResult = null;
      state.products = payload;
      state.success = false;
    },
    [getAllProducts.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    // getAllproduct
    [getUserProducts.pending]: (state) => {},
    [getUserProducts.fulfilled]: (state, { payload }) => {
      state.userProducts = payload;
    },
    [getUserProducts.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    // edited a product
    [editProduct.pending]: (state) => {},
    [editProduct.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.editSuccess = true;
      }
      state.edit = payload;
    },
    [editProduct.rejected]: (state, { payload }) => {},

    // search products
    [searchProduct.pending]: (state) => {},
    [searchProduct.fulfilled]: (state, { payload }) => {
      state.searchedProducts = payload;
    },
    [searchProduct.rejected]: (state, { payload }) => {},

    // get search product details
    [getSearchedProduct.pending]: (state) => {},
    [getSearchedProduct.fulfilled]: (state, { payload }) => {
      state.searchSingleProduct = payload;
    },
    [getSearchedProduct.rejected]: (state, { payload }) => {},
  },
});

export const { removeProduct, deleteSingleProduct, removeEdit } =
  productSlice.actions;
export default productSlice.reducer;
