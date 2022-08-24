import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { getRequestById, approveRequest } from "../../actions/requestAction";
import { APPROVE_SELLER_RESET } from "../../constants/requestConstant";
import DropNotif from "../../components/Modal/Modal";
import { Link } from "react-router-dom";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

const RequestDescriptionScreen = ({ match, history }) => {
  const requestDetail = useSelector((state) => state.getRequestById);
  const { loading, error, request } = requestDetail;
  console.log(request);
  const approveDetail = useSelector((state) => state.approveRequest);
  const {
    loading: loadingApproval,
    error: errorApproval,
    success,
  } = approveDetail;

  const dispatch = useDispatch();

  const requestId = match.params.id;
  useEffect(() => {
    dispatch(getRequestById(requestId));
  }, [requestId, dispatch]);

  const buttonHandler = (e) => {
    e.preventDefault();
    dispatch(approveRequest(requestId));
  };
  return (
    <Container className="mt-5 mb-5">
      <Link
        to="/userProfile"
        className="btn btn-primary my-3"
        style={{ borderRadius: 30 }}
      >
        <i className="fas fa-arrow-left"></i>
        &nbsp; Go Back
      </Link>
      {success && (
        <DropNotif
          heading="Request Approval"
          text="Approve request successfully"
          resetData={() => {
            dispatch({ type: APPROVE_SELLER_RESET });
          }}
        ></DropNotif>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Form>
            <Row className="justify-content-md-center">
              <Col md="auto">
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
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={request?.product?.image?.url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                  <Card.Body>
                    <Card.Title>{request?.product?.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Form.Group as={Row} className="mb-3" controlId="category">
                  <Form.Label column sm="2">
                    CATEGORY
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="id"
                      value={request?.product?.category}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="brand">
                  <Form.Label column sm="2">
                    BRAND
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="name" value={request?.brand} readOnly />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="qty">
                  <Form.Label column sm="2">
                    QUANTITY
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="number" value={request.qty} readOnly />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="price">
                  <Form.Label column sm="2">
                    UNIT PRICE
                  </Form.Label>
                  <Col sm="10">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        value={request?.price}
                        readOnly
                      />
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="amount">
                  <Form.Label column sm="2">
                    AMOUNT
                  </Form.Label>
                  <Col sm="10">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="text"
                        Value={request.amount}
                        readOnly
                      />
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Form.Group>
                {!request.approved && (
                  <>
                    {loadingApproval && <Loader />}
                    {errorApproval && (
                      <Message variant="danger">{errorApproval}</Message>
                    )}
                    <Button
                      className="mt-3 mb-3"
                      onClick={buttonHandler}
                      style={{ borderRadius: 30, marginLeft:"170px" }}
                    >
                      <FileDownloadDoneIcon />
                      {" "}
                      Approve Request
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Container>
  );
};

export default RequestDescriptionScreen;
