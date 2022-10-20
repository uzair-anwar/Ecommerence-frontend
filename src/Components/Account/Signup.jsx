import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Paper, Input } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import "./account-style.css";
import { registerUser } from "../../app/features/user/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const Signup = () => {
  const [image, setImage] = useState(null);
  const { loading, userToken, error, success, signedUpStatus } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (loading === true) {
      notify("Account creation is in process, please wait");
    }
  }, [loading]);
  useEffect(() => {
    notify(signedUpStatus?.message);
  }, [signedUpStatus]);

  useEffect(() => {
    if (success) {
      navigate("/login");
    }

    if (userToken) {
      notify(
        "You already have a account, Please logout first and then make a new one"
      );
      navigate("/profile");
    }
  }, [userToken, success, navigate]);

  const onSubmit = async (values) => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", image);

    dispatch(registerUser(formData));
  };

  //use Formik libraray
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      image: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name ")
        .required("Required")
        .max(25, "Must be 25 characters or less"),

      email: Yup.string().required("Required").email("Invalid email address"),

      password: Yup.string()
        .min(6, "password should be greater than 6 digit")
        .required("Required"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit,
  });

  return (
    <Container className="container">
      <Paper className="paper">
        <div className="header">
          <h5>Create Account</h5>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <Input
              className="input"
              placeholder="Enter Name"
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter Name"
            />

            {formik.touched.name && formik.errors.name ? (
              <div className="error-msg">{formik.errors.name}</div>
            ) : null}

            <Input
              className="input"
              placeholder="Enter Email"
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter email"
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="error-msg">{formik.errors.email}</div>
            ) : null}

            <Input
              className="input"
              placeholder="Enter Password"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter  Password"
            />

            {formik.touched.password && formik.errors.password ? (
              <div className="error-msg">{formik.errors.password}</div>
            ) : null}

            <Input
              className="input"
              placeholder="Enter Confirm Password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter Confirm Password"
            />

            {formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation ? (
              <div className="error-msg">
                {formik.errors.passwordConfirmation}
              </div>
            ) : null}

            <label className="label">Image for Profile</label>

            <Input
              type="file"
              name="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              onBlur={formik.handleBlur}
              required
            />

            <Button className="button" type="submit">
              Sign Up
            </Button>

            {error !== null ? <div className="error-msg">{error}</div> : null}
          </form>
        </div>

        <div className="login-link">
          <p className="text">
            Already have Account ?{" "}
            <span>
              <NavLink className="link" to="/login">
                Log In
              </NavLink>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default Signup;
