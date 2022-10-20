import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import "../../StyleSheets/cart-style.css";
import { getCoupan } from "../../app/features/cart/cartAction";
import { applyCoupan, removeCoupan } from "../../app/features/cart/cartSlice";

export default function ItemsInfo() {
  const {
    card,
    cartItems,
    cartTotalAmount,
    cartTotalQuantity,
    coupan,
    coupanApplied,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [creditCardNum] = useState(card?.number || "#### #### #### ####");
  const [cardHolder] = useState(card?.name || "");
  const [expireMonth] = useState(card?.exp_month || "MM");
  const [expireYear] = useState(card?.exp_year || "YYYY");
  const [coupanValue, setCoupanValue] = useState("");
  const [coupanInfo, setCoupanInfo] = useState(null);

  useEffect(() => {
    dispatch(removeCoupan());
  }, []);

  useEffect(() => {
    if (coupan) {
      const date = new Date();
      if (coupanApplied) {
        if (coupan.expireDate > date.toISOString()) {
          const discount = cartTotalAmount * coupan.discount;
          dispatch(applyCoupan(discount));
          setCoupanInfo("You avail discount");
        } else {
          setCoupanInfo("Coupan is expire");
        }
      } else {
        setCoupanInfo("Coupan is already applied");
      }
    }
  }, [coupan]);

  const handleCoupan = () => {
    dispatch(getCoupan({ name: coupanValue }));
  };

  return (
    <div className="cart-main-section">
      <div className="items-section">
        <div className="items-title">Items</div>
        <div className="row mt-5">
          <div className="col-md-4">Name</div>
          <div className="col-md-4">Quantity</div>
          <div className="col-md-4">Price</div>
        </div>
        <div className="items">
          {cartItems?.map((element) => (
            <div className="row item-sec">
              <div className="col-md-4">
                <span>{element?.name}</span>
              </div>
              <div className="col-md-4">
                <span>{element?.cartQuantity}</span>
              </div>
              <div className="col-md-4">
                <span>{element?.price}$</span>
              </div>
            </div>
          ))}
        </div>

        <div className="total-sec">
          <div className="my-3">Total Amount: {cartTotalAmount}$</div>
          <div>Total Items: {cartTotalQuantity}</div>
        </div>
        <div className="coupan-sec row">
          <TextField
            className="coupan-input"
            label="Coupan"
            variant="outlined"
            onChange={(e) => setCoupanValue(e.target.value)}
          />
          <Button
            className="coupan-button"
            variant="contained"
            onClick={handleCoupan}
          >
            Click
          </Button>
          {coupanInfo ? <span>{coupanInfo}</span> : null}
        </div>
      </div>
      <div className="card-section">
        <div className="card">
          <div className="card-number">
            <p>Card No</p>
            <p id="creditCardNumber">{creditCardNum}</p>
          </div>
          <div className="card-name">
            <p>Card Holder</p>
            <p>{cardHolder}</p>
          </div>
          <div className="card-expire">
            <p>Expires</p>
            <p>
              {expireMonth} / {expireYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
