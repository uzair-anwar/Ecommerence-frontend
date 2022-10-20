import React, { useEffect } from "react";
import { Input, Button, Container, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./account-style.css";
import { updatePassword } from "../../app/features/user/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const UpdatePassword = () => {
  const navigate = useNavigate();

  const { updatePasswordSuccess, updatePasswordStatus } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (updatePasswordSuccess) {
      notify(updatePasswordStatus.message);
      navigate("/");
    }
  }, [navigate, updatePasswordSuccess, updatePasswordStatus]);

  const onSubmit = async (values) => {
    const password = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    dispatch(updatePassword(password));
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string().when("newPassword", {
        is: (value) => value && value.length > 0,
        then: Yup.string().required(
          "Old password is required when setting new password"
        ),
        otherwise: Yup.string(),
      }),

      newPassword: Yup.string().min(
        6,
        "password should be greater than 6 digit"
      ),

      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),

    onSubmit,
  });

  return (
    <Container className="container">
      <Paper className="paper">
        <div className="header">
          <h5>Update Password</h5>
        </div>

        <div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <Input
              className="input"
              placeholder="Enter Old Password"
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter Old Password"
            />

            {formik.touched.oldPassword && formik.errors.oldPassword ? (
              <div className="error-msg">{formik.errors.oldPassword}</div>
            ) : null}

            <Input
              className="input"
              placeholder="Enter new Password"
              id="newPassword"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter new Password"
            />

            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="error-msg">{formik.errors.newPassword}</div>
            ) : null}

            <Input
              className="input"
              placeholder="Enter confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter confirm Password"
            />

            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error-msg">{formik.errors.confirmPassword}</div>
            ) : null}

            <Button className="button" type="submit">
              Update
            </Button>

            {updatePasswordStatus !== null &&
            updatePasswordStatus.status !== 200 ? (
              <div className="error-msg">{updatePasswordStatus.message}</div>
            ) : null}
          </form>
        </div>

        <div className="login-link">
          <p className="text">
            Don'nt want to UpdatePassword{" "}
            <span>
              <NavLink className="link" to="/profile">
                Profile
              </NavLink>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default UpdatePassword;
