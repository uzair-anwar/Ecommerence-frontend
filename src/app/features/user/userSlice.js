import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  updatePassword,
  sendEmail,
  addNewPassword,
  getUserDetails,
} from "./userAction";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  signedUpStatus: null,
  userInfo: null, // for user object {}
  userToken: userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  updateSuccess: false,
  updateInfo: null,
  updatePasswordSuccess: false,
  updatePasswordStatus: null,
  emailStatus: null,
  newPasswordSuccess: false,
  newPasswordStatus: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    signedUp: (state) => {
      state.success = false;
      state.signedUpStatus = null;
    },
    edited: (state) => {
      state.updateSuccess = false;
    },
    removeProduct: (state, action) => {
      state.products = state.userInfo.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: {
    //login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userToken = payload.token;
      state.userInfo = payload.result;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      if (payload.status === 201) {
        state.success = true; // registration successful
        state.userToken = payload.userToken;
      }
      state.loading = false;
      state.signedUpStatus = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //get User details
    [getUserDetails.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //Update user password
    [updatePassword.pending]: (state) => {
      state.loading = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.updatePasswordSuccess = true;
      }
      state.updatePasswordStatus = payload;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    //Send Email
    [sendEmail.pending]: (state) => {
      state.loading = true;
    },
    [sendEmail.fulfilled]: (state, { payload }) => {
      state.emailStatus = payload;
    },
    [sendEmail.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    //Update user password
    [addNewPassword.pending]: (state) => {
      state.loading = true;
    },
    [addNewPassword.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.newPasswordSuccess = true;
      }
      state.newPasswordStatus = payload;
    },
    [addNewPassword.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { signedUp, logout, edited, removeProduct } = userSlice.actions;
export default userSlice.reducer;
