import { createSlice } from "@reduxjs/toolkit";
import {
  payAmount,
  createAccount,
  getUserOrders,
  getCoupan,
} from "./cartAction";
const initialState = {
  loading: false,
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  paidAmount: null,
  account: null,
  card: null,
  userOrders: null,
  coupan: null,
  coupanApplied: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const tempItem = { ...action.payload, cartQuantity: 1 };
      state.cartItems.push(tempItem);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    increment: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) state.cartItems[itemIndex].cartQuantity += 1;
    },

    decrement: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity > 1)
        state.cartItems[itemIndex].cartQuantity -= 1;
    },

    removeItem: (state, action) => {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },

    getTotal: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
      state.coupanApplied = true;
    },

    addCardInfo: (state, action) => {
      state.card = action.payload;
    },

    changeCardItems: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeOrderInfo: (state) => {
      state.account = null;
      state.card = null;
      state.paidAmount = null;
      state.cartItems = [];
      state.cartTotalAmount = null;
      state.cartTotalQuantity = null;
      localStorage.removeItem("items");
    },

    applyCoupan: (state, action) => {
      const num = state.cartTotalAmount - action.payload;
      state.cartTotalAmount = num.toFixed(2);
      state.coupanApplied = false;
    },

    removeCoupan: (state) => {
      state.coupan = null;
    },
  },
  extraReducers: {
    [createAccount.pending]: (state) => {},
    [createAccount.fulfilled]: (state, { payload }) => {
      state.account = payload;
    },
    [createAccount.rejected]: (state, { payload }) => {},

    // Pay Amount
    [payAmount.pending]: (state) => {},
    [payAmount.fulfilled]: (state, { payload }) => {
      state.paidAmount = payload;
    },
    [payAmount.rejected]: (state, { payload }) => {
      state.paidAmount = payload;
    },

    //Get orders of user
    [getUserOrders.pending]: (state) => {},
    [getUserOrders.fulfilled]: (state, { payload }) => {
      state.userOrders = payload;
    },
    [getUserOrders.rejected]: (state, { payload }) => {
      state.paidAmount = payload;
    },

    //Get Coupan

    [getCoupan.pending]: (state) => {},
    [getCoupan.fulfilled]: (state, { payload }) => {
      state.coupan = payload;
    },
    [getCoupan.rejected]: (state, { payload }) => {},
  },
});

export const {
  addtoCart,
  increment,
  decrement,
  removeItem,
  clearCart,
  getTotal,
  addCardInfo,
  removeOrderInfo,
  changeCardItems,
  applyCoupan,
  removeCoupan,
} = cartSlice.actions;

export default cartSlice.reducer;
