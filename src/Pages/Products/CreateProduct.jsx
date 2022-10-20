import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewProduct,
  getAllProducts,
} from "../../app/features/Product/productAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageSwiper from "../../Components/Products/ImageSwiper";

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

const CreateProduct = () => {
  const { error, success, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === true) {
      notify("Product creation is in process");
    }
  }, [loading]);

  useEffect(() => {
    if (success) {
      notify("Product created successfully");
      dispatch(getAllProducts());
      navigate("/profile/products");
    }
  }, [navigate, success, dispatch]);

  const fileObj = [];
  const fileArray = [];
  const [displayImages, setDisplayImages] = useState([]);
  const [images, setImages] = useState("");
  const [imageError, setImageError] = useState(null);

  const uploadMultipleFiles = (e) => {
    fileObj.push(e.target.files);
    setImages(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setDisplayImages(fileArray);
  };

  const checkImages = () => {
    if (images.length === 0) {
      setImageError("Images is required");
      return false;
    }
    if (images.length > 10) {
      setImageError("Only 10 images are allowed");
      return false;
    }
    return true;
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    if (checkImages()) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      dispatch(createNewProduct(formData));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
    }),

    onSubmit,
  });

  return (
    <>
      <div className="card input-filed create-post">
        <div className="create-heading">Create Your Product</div>
        <form onSubmit={formik.handleSubmit}>
          <Input
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

          <Input
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

          <Input
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
          {displayImages.length > 0 ? (
            <div className="row">
              <ImageSwiper images={displayImages} />
            </div>
          ) : null}
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              onChange={uploadMultipleFiles}
              multiple
            />
          </div>
          {imageError ? <div className="error-msg">{imageError}</div> : null}

          <div className="button-sec mt-2">
            <button className="btn btn-primary" type="submit">
              Create Product
            </button>
          </div>
        </form>

        {error !== null ? <div className="error-msg">{error}</div> : null}
      </div>
    </>
  );
};

export default CreateProduct;
