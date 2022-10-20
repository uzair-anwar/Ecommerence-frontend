/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increment,
  decrement,
  removeItem,
  clearCart,
  getTotal,
  changeCardItems,
} from "../../app/features/cart/cartSlice";
import "../../StyleSheets/cart-style.css";

const Cart = () => {
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const { userToken, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo !== null) {
      const tempCartItems = cartItems.filter(
        (item) => item.userId._id !== userInfo._id
      );
      dispatch(changeCardItems(tempCartItems));
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, cartItems]);

  const handleIncrement = (product) => {
    dispatch(increment(product));
  };

  const handleDecrement = (product) => {
    dispatch(decrement(product));
  };

  const handleRemove = (product) => {
    dispatch(removeItem(product));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (userToken == null) {
      navigate("/login");
    }
    if (cartItems == null || cartItems.length === 0) {
      navigate("/");
    } else {
      navigate("/payment");
    }
  };

  return (
    <div className="container-fluid">
      <div className="main-section">My Shopping Cart</div>

      <div className="container cart-section">
        <div className="desc-section">
          <div className="row col-md-4">
            <div className="col-md-4 mx-2">Image</div>
            <div className="col-md-6">Description</div>
          </div>
          <div className="col-md-2">Quantity</div>
          <div className="col-md-2">Remove</div>
          <div className="col-md-2">Product Price</div>
          <div className="col-ms-2">Total</div>
        </div>
        <hr />
        <div className="item-section">
          {cartItems?.map((element) => (
            <div className="item row">
              <div className="row col-md-4">
                <div className="col-md-4 mx-2">
                  <img
                    src={element.image[0]}
                    alt="Prduct Image"
                    className="product-image"
                  />
                </div>
                <div className="col-md-6">
                  <h3>Name</h3>
                  <span>{element?.name}</span>
                  <h4>Description</h4>
                  <span>{element?.description}</span>
                </div>
              </div>
              <div className="increment-btn col-md-2">
                <button
                  className="btn btn-primary col-md-6 w-25 mx-2"
                  onClick={() => handleDecrement(element)}
                >
                  -
                </button>
                <span>{element?.cartQuantity}</span>
                <button
                  className="btn btn-primary col-md-6 w-25 mx-2"
                  onClick={() => handleIncrement(element)}
                >
                  +
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleRemove(element)}
                >
                  Remove
                </button>
              </div>
              <div className="col-md-2">
                <span>{element?.price}$</span>
              </div>
              <div className="col-md-2">
                <span>{element?.price * element?.cartQuantity}$</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container amount-sec">
        <div className="clear-btn">
          <button className="btn btn-outline-success" onClick={handleClear}>
            Clear Cart
          </button>
        </div>
        <div className="container checkout">
          <span className="mx-3">Total Amount:</span>
          <span>{cartTotalAmount}$</span>

          <button className="btn btn-danger mx-5" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
