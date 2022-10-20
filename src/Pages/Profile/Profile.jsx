import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../app/features/user/userAction";
import { getUserProducts } from "../../app/features/Product/productAction";
import { getUserOrders } from "../../app/features/cart/cartAction";
import SideBar from "../../Components/Profile/SideBar";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getUserProducts());
    dispatch(getUserOrders());
  }, []);

  return (
    <div className="d-flex">
      <SideBar />
      <div className="sub-section">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
