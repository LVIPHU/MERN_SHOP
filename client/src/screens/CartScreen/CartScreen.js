import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, ListGroup, Button, Card, Container } from "react-bootstrap";
import Message from "../../components/Message";
import SubProduct from "./SubProduct/SubProduct";
import classes from "./CartScreen.module.css";
import LocalMallIcon from '@mui/icons-material/LocalMall';

const CartScreen = ({ match, location, history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <div className={classes.wrapper}>
      <Container>
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <SubProduct key={item.product} item={item} />
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item style={{display: "flex", flexDirection: "column" ,alignItems: "center"}}>
                  <Button
                    type="button"
                    size="lg"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    style={{ borderRadius: 30}}
                  >
                    <LocalMallIcon style={{ marginBottom: '5px' }}/>
                    &nbsp; Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartScreen;
