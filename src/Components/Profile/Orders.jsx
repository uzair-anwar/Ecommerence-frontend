import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../app/features/cart/cartAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Orders() {
  let { userOrders } = useSelector((state) => state.cart);

  const [orders, setOrders] = useState(userOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <div className="products">
      <header className="product-title">
        <h1>My Orders</h1>
      </header>
      <div className="row orders-title">
        <div className="col-md-12 orders-detail">
          <p>Total Items</p>
          <p>Payment Id</p>
          <p>Card No</p>
          <p>Amount</p>
        </div>
      </div>

      {orders?.map((order, index) => (
        <div key={index} className="row product">
          <div className="col-md-12 orders-detail">
            <h4>{order?.items.length}</h4>
            <p>{order?.paymentId}</p>
            <p>{order?.cardNo}</p>
            <p>${order?.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
