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
import constants from "../../../../../constants/brand";
import actions from "../../../../../actions/brand";
import DropNotif from "../../../../../components/Modal/Modal";


const BrandListScreen = () => {
  const dispatch = useDispatch();

  const brandAll = useSelector((state) => state.brandAll);
  const { loading, error, brands } = brandAll;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const brandDelete = useSelector((state) => state.brandDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = brandDelete;

  useEffect(() => {
      dispatch(actions.getBrands());
  }, [dispatch, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(actions.deleteBrand(id));
    }
  };

  console.log(brands);

  return (
    <Container className="mb-5">
      <Row className="align-items-center">
        <Col>
          <h1>brands</h1>
        </Col>
        {userInfo.isAdmin && 
        (<Col className="text-end">
          <Link
            className="my-3 btn btn-primary"
            to="/admin/brand/create"
            style={{ marginLeft: "auto", borderRadius: 30 }}
          >
            <i className="fas fa-plus"></i> Create brand
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
              heading="Delete brand"
              text="Delete brand successfully"
              resetData={() => {
                  dispatch(actions.getBrands);
                  dispatch({ type: constants.BRAND_DELETE_RESET });
              }}
            />
          )}
          <Row>
            {brands &&
              brands.map((brand) => (
                <Col xs={6} md={2} style={{ paddingBottom: "12px" }} key={brand._id}>
                  <Card
                    className="text-center"
                    style={{ width: "12rem" }}
                    key={brand._id}
                  >
                    <Card.Img
                      variant="top"
                      src={brand?.image?.url}
                      style={{ width: "190px", height: "280px" }}
                    />
                    <Card.Body>
                      <Card.Title>{brand.name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="d-flex flex-column">
                      <ListGroup.Item>
                        {brand.products.length} product
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body className="d-flex flex-column">
                        
                          <LinkContainer
                            to={`/admin/brand/${brand._id}/edit`}
                            style={{ borderRadius: 30 }}
                            >
                            <Button variant="outline-primary" className="mb-2">
                              <i className="fas fa-edit"></i>
                              &nbsp; Edit
                            </Button>
                          </LinkContainer>
                            {brand.products.length === 0 && (
                          <Button
                            style={{ borderRadius: 30 }}
                            variant="outline-danger"
                            onClick={() => deleteHandler(brand._id)}
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

export default BrandListScreen;
