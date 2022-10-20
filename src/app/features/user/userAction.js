import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  // action type string
  "user/register",
  // callback function
  async (formData, { rejectWithValue }) => {
    try {
      // make request to backend
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/account/signup`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
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

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/account/login`,
        data: {
          email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      // store user's token in local storage
      localStorage.setItem("userToken", data.token);
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

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/account/getUser`,
        config
      );
      console.log(data);
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

export const updatePassword = createAsyncThunk(
  // action type string
  "user/updatePassword",
  // callback function
  async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      // make request to backend
      const { user } = getState();
      const { data } = await axios({
        method: "put",
        url: `${process.env.REACT_APP_SERVER_API}/auth/updatePassword`,
        data: { oldPassword, newPassword },
        headers: {
          "Content-Type": "application/json",
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

export const sendEmail = createAsyncThunk(
  // action type string
  "user/sendEmail",
  // callback function
  async ({ email }, { rejectWithValue }) => {
    try {
      // make request to backend
      const { data } = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_API}/auth/sendEmail`,
        data: { email },
        headers: {
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

export const addNewPassword = createAsyncThunk(
  // action type string
  "user/addNewPassword",
  // callback function
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // make request to backend
      const { data } = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_API}/auth/addPassword`,
        data: { email, password },
        headers: {
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
