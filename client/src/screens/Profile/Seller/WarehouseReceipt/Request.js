import axios from "axios";
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
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// import MarkdownEditor from "../../../../components/TextEditor/MarkdownEditor";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import DropNotif from "../../../../components/Modal/Modal";

import { createRequest } from "../../../../actions/requestAction";
import {
  getProductDetail,
  updateProduct,
} from "../../../../actions/productActions";

import { REQUEST_SELLER_RESET } from "../../../../constants/requestConstant";
import { PRODUCT_UPDATE_RESET } from "../../../../constants/productConstants";

import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Request = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingDesc, setUploadingDesc] = useState(false);

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const currentId = product._id;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (!product.name || currentId !== productId) {
      dispatch(getProductDetail(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, productId, currentId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadImageForDesc = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploadingDesc(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/upload/descripion",
        formData,
        config
      );

      setDescription(description + "\n" + data);
      setUploadingDesc(false);
    } catch (error) {
      console.error(error);
      setUploadingDesc(false);
    }
  };

  const onChange = (value) => {
    setDescription(value);
  };

  console.log(image);

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
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {successUpdate && (
          <DropNotif
            heading="Import Product"
            text="Import Product Successfully"
            resetData={() => {
              dispatch({ type: PRODUCT_UPDATE_RESET });
            }}
          ></DropNotif>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
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
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={image.url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{brand}</ListGroupItem>
                    <ListGroupItem>{category}</ListGroupItem>
                    <ListGroupItem>Stock: {countInStock}</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
              <Col>2 of 2</Col>
            </Row>
          </Form>
        )}
      </Container>
    </>
  );
};

export default Request;
