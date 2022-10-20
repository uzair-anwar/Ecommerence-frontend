import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleProduct } from "../../app/features/Product/productSlice";
import { removeProduct } from "../../app/features/user/userSlice";
import { deleteProduct } from "../../app/features/Product/productAction";
import { removeEdit } from "../../app/features/Product/productSlice";
import { getUserProducts } from "../../app/features/Product/productAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export default function Products() {
  let { userProducts } = useSelector((state) => state.product);

  const { deleteResult } = useSelector((state) => state.product);
  const [products, setProducts] = useState(userProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProducts());
    dispatch(removeEdit());
  }, []);

  useEffect(() => {
    notify(deleteResult?.message);
  }, [deleteResult]);

  const handledDeletePost = (product) => {
    dispatch(deleteProduct(product._id));
    dispatch(deleteSingleProduct({ id: product._id }));
    dispatch(removeProduct({ id: product._id }));
  };

  return (
    <div className="products">
      <div>
        <header className="product-title">
          <h1>My Products</h1>
        </header>
      </div>
      <div className="heading-section">
        <div className="col-md-2 product-detail">
          <h4>Image</h4>
        </div>
        <div className="col-md-4 product-detail">
          <h4>Details</h4>
        </div>
        <div className="d-flex col-md-2">
          <p className="col">Remove</p>
          <p className="col">Edit</p>
        </div>
        <div className="col-med-2 product-price">$Price</div>
      </div>
      <div>
        {products?.map((product, index) => (
          <div key={index} className="row product">
            <div className="col-md-2">
              <img
                className="item"
                src={product?.image[index]}
                alt="Product"
                height="150"
              />
            </div>
            <div className="col-md-4 product-detail">
              <h4>{product?.name}</h4>
              <p>{product?.description}</p>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-danger"
                onClick={() => handledDeletePost(product)}
              >
                Remove
              </button>
              <button className="btn btn-outline-danger mx-3">
                <NavLink
                  className="text-decoration-none"
                  to={"/profile/product/" + product._id + "/edit"}
                  state={{ product: product }}
                >
                  Edit
                </NavLink>
              </button>
            </div>
            <div className="col-md-2 product-price">${product?.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
