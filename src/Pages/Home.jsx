import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Components/Products/ProductCard";
import "../StyleSheets/products-style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addtoCart } from "../app/features/cart/cartSlice";
import { getAllProducts } from "../app/features/Product/productAction";
import { getUserDetails } from "../app/features/user/userAction";
toast.configure();

const notify = (message) => {
  if (message !== undefined) {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
const Home = () => {
  const { products } = useSelector((state) => state.product);
  const { userToken, userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  function checkProduct(product) {
    for (let i = 0; i < cartItems?.length; i++) {
      console.log(cartItems[i]._id, product._id);
      if (cartItems[i]._id === product._id) return false;
    }
    return true;
  }

  const handleCart = (product) => {
    if (checkProduct(product)) {
      if (userInfo?._id !== product.userId._id) {
        notify("Item added to cart succesfully");
        dispatch(addtoCart(product));
      } else {
        notify("You can not add your own product");
      }
    } else {
      notify("Already added in cart");
    }
  };

  return products?.map((product, index) => (
    <div key={index} className="product-sec">
      <ProductCard product={product} handleCart={handleCart} />
    </div>
  ));
};
export default Home;
