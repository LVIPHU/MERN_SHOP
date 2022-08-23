import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  // Table,
  Button,
  Card,
  Row,
  Col,
  Container,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import { Pagination } from "@mui/material";
import {
  getProducts,
  // getProductsForSeller,
} from "../../../../actions/productActions";
import { deleteProduct } from "../../../../actions/productActions";
import DropNotif from "../../../../components/Modal/Modal";
import { PRODUCT_DELETE_RESET } from "../../../../constants/productConstants";
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';

const ProductListScreen = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const productAll = useSelector((state) => state.productAll);
  const { loading, error, products, pageCount } = productAll;

  // const productForSeller = useSelector((state) => state.productForSeller);
  // const {
  //   loading: loadingForSeller,
  //   error: errorForSeller,
  //   products: productsSeller,
  // } = productForSeller;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  useEffect(() => {
    // if (userInfo.isAdmin) {
      dispatch(getProducts("", "", "", "", "", page));
    // } else if (userInfo.isSeller && !userInfo.isAdmin) {
    //   dispatch(getProductsForSeller());
    // }
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
  // if (userInfo.isAdmin) {
    if (products) {
      productsFinal = products;
    }
  // } else if (userInfo.isSeller) {
  //   if (productsSeller) {
  //     productsFinal = productsSeller;
  //   }
  // }

  console.log(productsFinal);
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
                <Col xs={6} md={2} style={{ paddingBottom: "12px" }}>
                  <Card
                    className="text-center"
                    style={{ width: "12rem" }}
                    key={product._id}
                  >
                    <Card.Img
                      variant="top"
                      src={product?.image?.url}
                      style={{ width: "190px", height: "280px" }}
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>$ {product.price}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>{product.brand}</ListGroup.Item>
                      <ListGroup.Item>{product.category}</ListGroup.Item>
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
                          <Button
                            style={{ borderRadius: 30 }}
                            variant="outline-danger"
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className="fas fa-trash"></i>
                            &nbsp; Delete
                          </Button>
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

          {/* <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>RATING</th>
                <th>IN STOCK</th>
              </tr>
            </thead>
            <tbody>
              {productsFinal &&
                productsFinal.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.rating}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table> */}
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
