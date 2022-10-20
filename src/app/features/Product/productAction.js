import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createNewProduct = createAsyncThunk(
  // action type string
  "product/create",
  // callback function
  async (formData, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // make request to backend
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/products/create`,
        data: formData,
        headers: {
          Authorization: `Bearer ${user.userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteProduct = createAsyncThunk(
  // action type string
  "product/delete",
  // callback function
  async (productId, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // make request to backend
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_SERVER_API}/products/${productId}`,
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      });
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editProduct = createAsyncThunk(
  // action type string
  "product/editproduct",
  // callback function
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      const { name, description, price, productId } = arg;

      // make request to backend
      const { data } = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_SERVER_API}/products/${productId}`,
        data: { name, description, price },
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
        //
      });
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAllproducts",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/products/all`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserProducts = createAsyncThunk(
  "product/getUserproducts",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      const { data } = await axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_API}/products/userproducts`,
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/products/searchitems/${arg}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSearchedProduct = createAsyncThunk(
  "product/getSearchedProduct",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/products/getsearchitem/${id}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
      //sdiuh
    }
  }
);
