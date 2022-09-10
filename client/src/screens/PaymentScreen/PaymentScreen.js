import React, { useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutStep/CheckoutStep";
import { savePaymentMethod } from "../../actions/cartAction";
import classes from "../Shipping/ShippingScreen.module.css";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { Checkbox } from "@mui/material";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { shippingAddress } = userInfo;

  if (
    !shippingAddress.fullname ||
    !shippingAddress.phone ||
    !shippingAddress.address ||
    !shippingAddress.ward ||
    !shippingAddress.district ||
    !shippingAddress.province
  ) {
    history.push("/shipping");
  }

  console.log(paymentMethod);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <Container>
      <CheckoutSteps step1 step2 step3 />
      <div className={classes.wrapper}>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <input type="radio" id="cod" name="paymentMethod" value="COD" onChange={(e) => setPaymentMethod(e.target.value)}/>
              <label for="cod"> &nbsp; &nbsp; COD</label><br/>
              <input type="radio" id="paypal" name="paymentMethod" value="PayPal" onChange={(e) => setPaymentMethod(e.target.value)}/>
              <label for="paypal"> &nbsp; &nbsp; PayPal or Credit Card</label><br/>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-3" style={{ borderRadius: 30}}>
          <FileDownloadDoneIcon/>&nbsp; Continue
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default PaymentScreen;
