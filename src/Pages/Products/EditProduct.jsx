import React, { useEffect } from "react";
import { TextField, InputLabel } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../app/features/Product/productAction";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import ImageSwiper from "../../Components/Products/ImageSwiper";
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

const EditProduct = () => {
  const { edit, editSuccess } = useSelector((state) => state.product);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = location.state.product;

  useEffect(() => {
    notify(edit?.message);
    if (editSuccess) {
      navigate("/profile/products");
    }
  }, [edit, editSuccess, navigate]);

  const onSubmit = async (values) => {
    const newProduct = {
      name: values.name,
      description: values.description,
      price: values.price,
      productId: product._id,
    };
    dispatch(editProduct(newProduct));
  };

  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description,
      price: product.price,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
    }),

    onSubmit,
  });

  return (
    <div className="main-sec">
      <div className="main-title">Edit Your Product</div>
      <form onSubmit={formik.handleSubmit}>
        <InputLabel for="name">Name</InputLabel>
        <TextField
          className="my-2 w-100"
          type="text"
          placeholder="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.name && formik.errors.name ? (
          <div className="error-msg">{formik.errors.name}</div>
        ) : null}

        <InputLabel for="description">Description</InputLabel>
        <TextField
          className="my-2 w-100"
          type="text"
          name="description"
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.description && formik.errors.description ? (
          <div className="error-msg">{formik.errors.description}</div>
        ) : null}

        <InputLabel for="price">Price</InputLabel>
        <TextField
          className="my-2 w-100"
          type="number"
          placeholder="Price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.price && formik.errors.price ? (
          <div className="error-msg">{formik.errors.price}</div>
        ) : null}

        <div className="images-sec">
          <ImageSwiper images={product.image} />
        </div>
        <div className="button-sec">
          <button className="btn btn-primary" type="submit">
            Edit product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
