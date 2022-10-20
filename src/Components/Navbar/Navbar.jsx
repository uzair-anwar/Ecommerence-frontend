import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { CgProfile } from "react-icons/cg";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { BsFillCartPlusFill } from "react-icons/bs";
import { logout } from "../../app/features/user/userSlice";
import { removeProduct } from "../../app/features/Product/productSlice";
import SearchField from "./SearchField";
import {
  searchProduct,
  getSearchedProduct,
} from "../../app/features/Product/productAction";
import "../../StyleSheets/navbar-style.css";
import { getTotal } from "../../app/features/cart/cartSlice";

const Navbar = () => {
  const { userToken } = useSelector((state) => state.user);
  const { searchedProducts } = useSelector((state) => state.product);
  const { cartItems, cartTotalQuantity } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [stickyClass, setStickyClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 150 ? setStickyClass("sticky-nav") : setStickyClass("");
    }
  };

  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);

  const onInputChange = (event) => {
    if (event.target.value.length > 0) {
      dispatch(searchProduct(event.target.value));
      if (searchedProducts != null) setOptions(searchedProducts);
    } else {
      setOptions([]);
    }
  };

  const onClickInput = (id) => {
    console.log(id);
    dispatch(getSearchedProduct(id));
    navigate("/searchProduct");
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(removeProduct());
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, dispatch]);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-expand-sm navbar-light bg-secondary bg-gradient justify-content-between ${stickyClass}`}
    >
      <li className="navbar-brand insta-logo">Ecomrenece</li>
      <NavLink to="/" className="nav-home">
        Home
      </NavLink>
      <NavLink to="/about" className="nav-home">
        About
      </NavLink>

      <ul id="nav-mobile" className="navbar-nav float-right">
        <li className="search-field nav-item mt-1 mx-5">
          <SearchField
            options={options}
            onInputChange={onInputChange}
            onClickInput={onClickInput}
          />
        </li>
        <Tooltip title="Cart">
          <li className="nav-item mx-2">
            <NavLink className="ml-2" to="/cart">
              <BsFillCartPlusFill className="profile-icon" />
              <span class="badge badge-warning" id="lblCartCount">
                {cartTotalQuantity}
              </span>
            </NavLink>
          </li>
        </Tooltip>
        {userToken ? (
          <>
            <Tooltip title="Profile">
              <li className="nav-item mx-2">
                <NavLink className="pt-2" to={"/profile"}>
                  <CgProfile className="profile-icon" />
                </NavLink>
              </li>
            </Tooltip>
            <Tooltip title="Logout">
              <li className="nav-item mx-3">
                <FiLogOut className="profile-icon" onClick={logoutUser} />
              </li>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Login">
            <li className="nav-item mx-3">
              <NavLink className="pt-2 ml-2" to="/login">
                <FiLogIn className="profile-icon" />
              </NavLink>
            </li>
          </Tooltip>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
