import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  deliveringOrder,
  cancelOrder,
} from "../../actions/orderAction";
import {
  ORDER_PAY_RESET,
  ORDER_UPDATE_DELIVER_RESET,
  ORDER_UPDATE_DELIVERING_RESET,
  ORDER_CANCEL_RESET,
  ORDER_CREATE_RESET,
} from "../../constants/orderConstant";
import DropNotif from "../../components/Modal/Modal";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import PaidIcon from '@mui/icons-material/Paid';
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import InventoryIcon from '@mui/icons-material/Inventory';
import CancelIcon from '@mui/icons-material/Cancel';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, loading, error } = orderDetail;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: sucessPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderDelivering = useSelector((state) => state.orderDelivering);
  const { loading: loadingDelivering, success: successDelivering } = orderDelivering;

  const orderCancel = useSelector((state) => state.orderCancel);
  const { loading: loadingCancel, success: successCancel } = orderCancel;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || sucessPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      }
    }
  }, [dispatch, orderId, order, sucessPay, history, userInfo]);

  if (!loading) {
    const addDecimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    // Caculate price
    order.itemPrices = addDecimal(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const deliveringHandler = () => {
    dispatch(deliveringOrder(order));
  };

  const cancelHandler = () => {
    dispatch(cancelOrder(order));
  };

  const getDate = (date) => {
    return new Date(date).toString();
  };

  const statusPayPal = (order) => {
    if(!order.isPaid && !order.isDelivering && !order.isDelivered) {
      return 0;
    } else if (order.isPaid && !order.isDelivering && !order.isDelivered) {
      return 1;
    } else if (order.isPaid && order.isDelivering && !order.isDelivered) {
      return 2;
    } else if (order.isPaid && order.isDelivering && order.isDelivered) {
      return 3;
    }
  };

  const statusCOD = (order) => {
    if(!order.isDelivering && !order.isPaid && !order.isDelivered) {
      return 0;
    } else if (order.isDelivering && !order.isPaid && !order.isDelivered) {
      return 1;
    } else if (order.isDelivering && order.isPaid && order.isDelivered) {
      return 2; 
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>Order</h1>
                <h2>Status</h2>
                { order.isCancel ? (
                  <Message variant="danger">Order has been cancelled</Message>
                ) : order.paymentMethod === "PayPal" ? (
                  <Box sx={{ width: '100%', paddingBottom: '20px' }}>
                    <Stepper activeStep={statusPayPal(order)} alternativeLabel>
                        <Step>
                          <StepLabel><PaidIcon/> Paid</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel><DeliveryDiningIcon/> Delivery</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel><InventoryIcon/> Receive</StepLabel>
                        </Step>
                    </Stepper>
                  </Box>
                ) : order.paymentMethod === "COD" ? (
                  <Box sx={{ width: '100%', paddingBottom: '20px' }}>
                    <Stepper activeStep={statusCOD(order)} alternativeLabel>
                        <Step>
                          <StepLabel><DeliveryDiningIcon/> Delivery</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel><InventoryIcon/> Receive and <PaidIcon/> Paid</StepLabel>
                        </Step>
                    </Stepper>
                  </Box>
                  ): <></>}
                <h2>Information</h2>
                <p>
                  <strong>Full Name: </strong> {order.shippingAddress.fullname}
                </p>
                <p>
                  <strong>Email: </strong>{" "}
                  <a href={`mailto:${order?.user?.email}`}>
                    {order?.user?.email}
                  </a>
                </p>
                <p>
                  <strong>Phone number: </strong>
                  {order.shippingAddress.phone}{" "}
                </p>
                <p className="mb-3">
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.ward},{" "}
                  {order.shippingAddress.district},{" "}
                  {order.shippingAddress.province}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : order.isDelivering ? (
                  <Message variant="primary">
                    Delivering
                  </Message>
                ) : (
                  <Message variant="warning">Not Delivery</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p className="mb-3">
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">
                    Paid on {getDate(order.paidAt)}
                  </Message>
                ) : (
                  <Message variant="warning">Not Paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Your order is empty</Message>
                ) : (
                  <Table striped="column" hover responsive>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Image
                              src={item?.image[0].url}
                              alt={item.name}
                              fluid
                              rounded
                              height={120}
                              width={60}
                            />
                          </td>
                          <td>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </td>
                          <td> </td>
                          <td> </td>
                          <td>${item.price}</td>
                          <td>{item.qty}</td>
                          <td>${item.qty * item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemPrices}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                {!order.isPaid && order.user._id === userInfo._id && order.paymentMethod === 'PayPal' && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    )}
                  </ListGroup.Item>
                )}

                {loadingDeliver && <Loader />}
                {successDeliver && (
                  <DropNotif
                    heading="Mark Delivered"
                    text="Mark as delivered successfully"
                    resetData={() => {
                      dispatch({ type: ORDER_UPDATE_DELIVER_RESET });
                      dispatch(getOrderDetails(orderId));
                      dispatch({ type: ORDER_CREATE_RESET });
                    }}
                  ></DropNotif>
                )}

              {loadingDelivering && <Loader />}
                {successDelivering && (
                  <DropNotif
                    heading="Mark Delivereing"
                    text="Mark as delivereing successfully"
                    resetData={() => {
                      dispatch({ type: ORDER_UPDATE_DELIVERING_RESET });
                      dispatch(getOrderDetails(orderId));
                      dispatch({ type: ORDER_CREATE_RESET });
                    }}
                  ></DropNotif>
                )}

              {loadingCancel && <Loader />}
                {successCancel && (
                  <DropNotif
                    heading="Cancel Oder"
                    text="Cancel oder successfully"
                    resetData={() => {
                      dispatch({ type: ORDER_CANCEL_RESET });
                      dispatch(getOrderDetails(orderId));
                      dispatch({ type: ORDER_CREATE_RESET });
                    }}
                  ></DropNotif>
                )}

                {(userInfo.isSeller || userInfo.isAdmin ) && order.paymentMethod === "PayPal" && order.isPaid && !order.isDelivering && (
                  <ListGroup.Item
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliveringHandler}
                      style={{ borderRadius: 30 }}
                    >
                      <DeliveryDiningIcon />
                      &nbsp; Mark as Delivering
                    </Button>
                  </ListGroup.Item>
                )}

                {!userInfo.isSeller && !userInfo.isAdmin  && order.paymentMethod === "COD" && !order.isDelivering && !order.isCancel && (
                  <ListGroup.Item
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="danger"
                      type="button"
                      className="btn btn-block"
                      onClick={cancelHandler}
                      style={{ borderRadius: 30 }}
                    >
                      <CancelIcon/>
                      &nbsp; Cancel Order
                    </Button>
                  </ListGroup.Item>
                )}

                {(userInfo.isSeller || userInfo.isAdmin ) && order.paymentMethod === "COD" && !order.isDelivering && !order.isCancel && (
                  <ListGroup.Item
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliveringHandler}
                      style={{ borderRadius: 30 }}
                    >
                      <DeliveryDiningIcon />
                      &nbsp; Mark as Delivering
                    </Button>
                  </ListGroup.Item>
                )}

                {userInfo && order.isDelivering && !order.isDelivered && !order.Cancel && (
                  <ListGroup.Item
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                      style={{ borderRadius: 30 }}
                    >
                      <InventoryIcon/>
                      &nbsp; Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderScreen;
