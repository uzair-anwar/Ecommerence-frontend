import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PaymentForm from "../Components/Payment/PaymentForm";
import ItemsInfo from "../Components/Payment/ItemsInfo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { payAmount } from "../app/features/cart/cartAction";
import { toast } from "react-toastify";
import { removeOrderInfo } from "../app/features/cart/cartSlice";
import "react-toastify/dist/ReactToastify.css";

const notify = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const Checkout = () => {
  const { account, cartItems, cartTotalAmount, card, paidAmount } = useSelector(
    (state) => state.cart
  );
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Add card info", "Payment Confirm", "Order Complete"];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (account?.status === 200)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    else notify(account?.message?.code);
  }, [account]);

  useEffect(() => {
    notify(paidAmount?.message);
    if (paidAmount?.status === 200) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (paidAmount?.status === 400) {
      notify(paidAmount?.message?.type);
    }
  }, [paidAmount]);

  const handleNext = () => {
    if (activeStep === 0 && account.status === 200) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (activeStep === 1) {
      dispatch(
        payAmount({
          price: cartTotalAmount,
          items: cartItems,
          paymentMethodId: account.result.id,
          cardNo: card.number,
        })
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleMain = () => {
    dispatch(removeOrderInfo());
    navigate("/");
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", paddingTop: "20px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length - 1 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Order Successfully Completed
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleMain}>Home</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 ? <PaymentForm /> : null}
          {activeStep === 1 ? <ItemsInfo /> : null}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button className="state-btn" onClick={handleNext}>
              {activeStep === steps.length - 2 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
export default Checkout;
