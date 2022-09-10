import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Carousel,
  Container,
  Form,
  Row,
  Card,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import DropNotif from "../../../../components/Modal/Modal";

import { createRequest } from "../../../../actions/requestAction";
import { getProductDetail } from "../../../../actions/productActions";

import { REQUEST_SELLER_RESET } from "../../../../constants/requestConstant";

import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Request = ({ match, history }) => {
  const productId = match.params.id;

  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("");
  const newAmount = quantity * unitPrice;

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const currentId = product._id;

  const productRequest = useSelector((state) => state.requestSeller);
  const {
    loading: loadingRequest,
    error: errorRequest,
    success: successRequest,
  } = productRequest;

  useEffect(() => {
    if (!product.name || currentId !== productId) {
      dispatch(getProductDetail(productId));
    } else {
      setBrand(product.brand);
    }
  }, [dispatch, productId, currentId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createRequest({
        brand: brand,
        quantity: quantity,
        price: unitPrice,
        amount: newAmount,
        product: product._id,
      })
    );
  };

  return (
    <>
      <Container className="mb-5">
        <Link
          to="/userProfile"
          className="btn btn-primary my-3"
          style={{ borderRadius: 30 }}
        >
          <i className="fas fa-arrow-left"></i>
          &nbsp; Go Back
        </Link>
        <h1>WAREHOUSE RECEIPT</h1>
        {loadingRequest && <Loader />}
        {errorRequest && <Message variant="danger">{errorRequest}</Message>}
        {successRequest && (
          <DropNotif
            heading="Import Product"
            text="Import Product Successfully"
            resetData={() => {
              dispatch({ type: REQUEST_SELLER_RESET });
            }}
          ></DropNotif>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row className="justify-content-md-center">
              <Col>
                <Row>
                  <Col>
                    <Card style={{ width: "18rem", textAlign: "center" }}>
                      <Carousel
                        fade
                        prevIcon={
                          <span
                            aria-hidden="true"
                            className="carousel-control-prev-icon"
                            style={{
                              backgroundColor: "#384aeb",
                              borderRadius: "30px",
                              margin: "10px",
                            }}
                          />
                        }
                        nextIcon={
                          <span
                            aria-hidden="true"
                            className="carousel-control-next-icon"
                            style={{
                              backgroundColor: "#384aeb",
                              borderRadius: "30px",
                              margin: "10px",
                            }}
                          />
                        }
                      >
                        {product.image &&
                          product.image.map((item) => (
                            <Carousel.Item key={item.public_id}>
                              <img
                                className="d-block w-100"
                                src={item.url}
                                alt="First slide"
                              />
                            </Carousel.Item>
                          ))}
                      </Carousel>
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Category</InputGroup.Text>
                      <Form.Control value={product.category} readOnly />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>Brand</InputGroup.Text>
                      <Form.Control value={brand} readOnly />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>Stock</InputGroup.Text>
                      <Form.Control value={product.countInStock} readOnly />
                    </InputGroup>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Form.Group as={Row} className="mb-3" controlId="id">
                  <Form.Label column sm="2">
                    ID
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="id" value={product._id} readOnly />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="name">
                  <Form.Label column sm="2">
                    Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="name" value={product.name} readOnly />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="countInStock">
                  <Form.Label column sm="2">
                    Quantity
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="price">
                  <Form.Label column sm="2">
                    Unit price
                  </Form.Label>
                  <Col sm="10">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                      />
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="amount">
                  <Form.Label column sm="2">
                    Amount
                  </Form.Label>
                  <Col sm="10">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="text"
                        Value={newAmount}
                      />
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Form.Group>

                <Button
                  className="mt-3"
                  type="submit"
                  variant="primary"
                  style={{ borderRadius: 30 }}
                >
                  <FileDownloadDoneIcon />
                  &nbsp; Request
                </Button>

                <Link
                  to={`/product/${product._id}`}
                  className="btn btn-primary mt-3 ms-3"
                  style={{ borderRadius: 30 }}
                >
                  <VisibilityIcon />
                  &nbsp; Go to product
                </Link>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </>
  );
};

export default Request;
