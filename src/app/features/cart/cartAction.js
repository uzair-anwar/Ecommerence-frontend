import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const payAmount = createAsyncThunk(
  // action type string
  "cart/payAmount",
  // callback function
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      const { price, paymentMethodId, items, cardNo } = arg;
      console.log(arg);

      // make request to backend
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/orders`,
        data: {
          price,
          paymentMethodId,
          items,
          cardNo,
          stripeId: user.userInfo.stripeId,
        },
        headers: {
          Authorization: `Bearer ${user.userToken}`,
          "Content-Type": "application/json",
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

export const createAccount = createAsyncThunk(
  // action type string
  "cart/createAccount",
  // callback function
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      const { number, exp_month, exp_year, cvc } = arg;
      console.log(arg);

      // make request to backend
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/payments/create`,
        data: { number, exp_month, exp_year, cvc },
        headers: {
          Authorization: `Bearer ${user.userToken}`,
          "Content-Type": "application/json",
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

export const getUserOrders = createAsyncThunk(
  // action type string
  "cart/getUserOrders",
  // callback function
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // make request to backend
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_API}/orders`,
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

export const getCoupan = createAsyncThunk(
  // action type string
  "cart/getCoupan",
  // callback function
  async ({ name }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // make request to backend
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_API}/coupans/${name}`,
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
