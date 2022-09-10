import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Row,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import { Pagination } from "@mui/material";
import {
  getProducts,
  // getProductsForSeller,
} from "../../../../../actions/productActions";
import { deleteProduct } from "../../../../../actions/productActions";

import DropNotif from "../../../../../components/Modal/Modal";
import { PRODUCT_DELETE_RESET } from "../../../../../constants/productConstants";
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const productAll = useSelector((state) => state.productAll);
  const { loading, error, products, pageCount } = productAll;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  useEffect(() => {
      dispatch(getProducts("", "", "", "", "", page));
  }, [dispatch, page, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };
  const pageHandler = (e, value) => {
    setPage(value);
  };

  let productsFinal;
    if (products) {
      productsFinal = products;
    }


  return (
    <Container className="mb-5">
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        {userInfo.isAdmin && 
        (<Col className="text-end">
          <Link
            className="my-3 btn btn-primary"
            to="/admin/product/create"
            style={{ marginLeft: "auto", borderRadius: 30 }}
          >
            <i className="fas fa-plus"></i> Create Product
          </Link>
        </Col>)}
      </Row>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {successDelete && (
            <DropNotif
              heading="Delete Product"
              text="Delete product successfully"
              resetData={() => {
                if (userInfo.isAdmin) {
                  dispatch(getProducts("", "", "", "", "", page));
                // } else if (userInfo.isSeller && !userInfo.isAdmin) {
                //   dispatch(getProductsForSeller());
                  dispatch({ type: PRODUCT_DELETE_RESET });
                }
                // dispatch({ type: PRODUCT_DELETE_RESET });
              }}
            />
          )}
          <Row>
            {productsFinal &&
              productsFinal.map((product) => (
                <Col xs={6} md={2} style={{ paddingBottom: "12px" }} key={product._id} >
                  <Card
                    className="text-center"
                    style={{ width: "12rem", textAlign: "center"}}
                    key={product._id}
                  >
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
                      <Card.Text>{product.category}</Card.Text>
                      <Card.Text>{product.brand}</Card.Text>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>$ {product.price}</Card.Text>
                    </Card.Body>
                    <ListGroup className="d-flex flex-column">
                      <ListGroup.Item>
                        Stock: {product.countInStock}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body className="d-flex flex-column">
                      {userInfo.isAdmin ? (
                        <>
                          {" "}
                          <LinkContainer
                            to={`/admin/product/${product._id}/edit`}
                            style={{ borderRadius: 30 }}
                          >
                            <Button variant="outline-primary" className="mb-2">
                              <i className="fas fa-edit"></i>
                              &nbsp; Edit
                            </Button>
                          </LinkContainer>
                          {product.countInStock <= 0 && (
                          <Button
                            style={{ borderRadius: 30 }}
                            variant="outline-danger"
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className="fas fa-trash"></i>
                            &nbsp; Delete
                          </Button>)}
                        </>
                      ) : userInfo.isSeller && !userInfo.isAdmin ? (
                        <LinkContainer
                          to={`/admin/product/${product._id}/import`}
                          style={{ borderRadius: 30 }}
                        >
                          <Button variant="outline-primary" className="mb-2">
                            <MoveToInboxOutlinedIcon/>
                            &nbsp; Import
                          </Button>
                        </LinkContainer>
                      ) : (
                        <></>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
          <Pagination
            count={pageCount}
            size="large"
            page={page}
            onChange={pageHandler}
          />
        </>
      )}
    </Container>
  );
};

export default ProductListScreen;
