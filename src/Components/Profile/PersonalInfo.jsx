import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./profile-style.css";

export default function PersonalInfo() {
  let { userInfo } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handlePassword = () => {
    navigate("/profile/updatePassword");
  };

  return (
    <div className="info-sec">
      <div className="info-details">
        <h4>Name</h4>
        <p>{userInfo?.name}</p>
        <h4>Email</h4>
        <p>{userInfo?.email}</p>
        <h4>Total Products</h4>
        <h6>{userInfo?.products?.length} Products</h6>
        <h4>Total Orders</h4>
        <h6>{userInfo?.orders?.length} Orders</h6>
        <button className="btn btn-outline-primary" onClick={handlePassword}>
          Update Password
        </button>
      </div>
      <div className="pic-details">
        <h4 className="profile-name">Profile Pic</h4>
        <img
          className="profile-image"
          src={userInfo?.image}
          alt="Profile Pic"
        />
        <button></button>
      </div>
    </div>
  );
}
