import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Card,
  Row,
  Col,
  Container,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import constants from "../../../../../constants/category";
import actions from "../../../../../actions/category";
import DropNotif from "../../../../../components/Modal/Modal";
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';

const CategoryListScreen = () => {
  const dispatch = useDispatch();

  const categoryAll = useSelector((state) => state.categoryAll);
  const { loading, error, categories } = categoryAll;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = categoryDelete;

  useEffect(() => {
      dispatch(actions.getCategories());
  }, [dispatch, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(actions.deleteCategory(id));
    }
  };


  return (
    <Container className="mb-5">
      <Row className="align-items-center">
        <Col>
          <h1>Categories</h1>
        </Col>
        {userInfo.isAdmin && 
        (<Col className="text-end">
          <Link
            className="my-3 btn btn-primary"
            to="/admin/category/create"
            style={{ marginLeft: "auto", borderRadius: 30 }}
          >
            <i className="fas fa-plus"></i> Create category
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
              heading="Delete category"
              text="Delete category successfully"
              resetData={() => {
                  dispatch(actions.getCategories);
                  dispatch({ type: constants.CATEGORY_DELETE_RESET });
              }}
            />
          )}
          <Row>
            {categories &&
              categories.map((category) => (
                <Col xs={6} md={2} style={{ paddingBottom: "12px" }} key={category._id}>
                  <Card
                    className="text-center"
                    style={{ width: "12rem" }}
                    key={category._id}
                  >
                    <Card.Img
                      variant="top"
                      src={category?.image?.url}
                      style={{ width: "190px", height: "280px" }}
                    />
                    <Card.Body>
                      <Card.Title>{category.name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="d-flex flex-column">
                      <ListGroup.Item>
                        {category.products.length} product
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body className="d-flex flex-column">
                       
                          <LinkContainer
                            to={`/admin/category/${category._id}/edit`}
                            style={{ borderRadius: 30 }}
                            >
                            <Button variant="outline-primary" className="mb-2">
                              <i className="fas fa-edit"></i>
                              &nbsp; Edit
                            </Button>
                          </LinkContainer>
                            {(category.products.length === 0) && (
                          <Button
                            style={{ borderRadius: 30 }}
                            variant="outline-danger"
                            onClick={() => deleteHandler(category._id)}
                          >
                            <i className="fas fa-trash"></i>
                            &nbsp; Delete
                          </Button>
                           )}
                       
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
         
        </>
      )}
    </Container>
  );
};

export default CategoryListScreen;
