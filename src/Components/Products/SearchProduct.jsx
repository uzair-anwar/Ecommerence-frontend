import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageSwiper from "./ImageSwiper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addtoCart } from "../../app/features/cart/cartSlice";
import "../../StyleSheets/navbar-style.css";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from "@material-ui/core";
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
const SearchProduct = () => {
  const { searchSingleProduct } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function checkProduct(product) {
    for (let i = 0; i < cartItems?.length; i++) {
      console.log(cartItems[i]._id, product._id);
      if (cartItems[i]._id === product._id) return false;
    }
    return true;
  }

  const handleCart = () => {
    if (checkProduct(searchSingleProduct)) {
      if (userInfo?._id !== searchSingleProduct.userId._id) {
        notify("Item added to cart succesfully");
        dispatch(addtoCart(searchSingleProduct));
      } else {
        notify("You can not add your own product");
      }
    } else {
      notify("Already added in cart");
    }
  };

  return (
    <div className="home-card">
      <Card>
        <ImageSwiper images={searchSingleProduct?.image} />

        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Name:
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {searchSingleProduct?.name}
          </Typography>

          <Typography gutterBottom variant="h6" component="div">
            Description
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {searchSingleProduct?.description}
          </Typography>

          <Typography gutterBottom variant="h6" component="div">
            Price:
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {searchSingleProduct?.price}
          </Typography>
        </CardContent>
        <button className="btn btn-outline-primary" onClick={handleCart}>
          Add to cart
        </button>
      </Card>
    </div>
  );
};
export default SearchProduct;
