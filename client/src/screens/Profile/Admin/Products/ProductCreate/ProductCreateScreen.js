import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DropNotif from "../../../../../components/Modal/Modal";
import MarkdownEditor from "../../../../../components/TextEditor/MarkdownEditor";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import { createProduct } from "../../../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../../../constants/productConstants";

import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

const ProductCreateScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingDesc, setUploadingDesc] = useState(false);
  // const [listImage, setListImage] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const brandAll = useSelector((state) => state.brandAll);
  const { brands } = brandAll;

  const categoryAll = useSelector((state) => state.categoryAll);
  const { categories } = categoryAll;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product, success } = productCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    console.log(image);
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    setUploading(true);
    formData.append("image", file);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/file/upload", formData, config);
      image.push(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const deleteFileHandler = async (file) => {
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/file/destroy", file, config);
      image.pop();
      setUploading(false);
    } catch (error) {
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
        "/api/file/descripion",
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

  // const validation = () => {

  // };

  return (
    <>
      <Container className="mb-5">
        <Link to="/userProfile" className="btn btn-primary my-3" style={{ borderRadius: 30}}>
          <i className="fas fa-arrow-left"></i>
          &nbsp; Go Back
        </Link>
        <h1>Create Product</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <DropNotif
            heading="Create Product"
            text="Create Product Successfully"
            resetData={() => {
              history.push(`/admin/product/${product._id}/edit`);
              dispatch({ type: PRODUCT_CREATE_RESET });
            }}
          ></DropNotif>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.File
                id="image-file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>
            <Row>
              {image &&
                image.map((item) => (
                  <Col xs={6} md={2} style={{ paddingBottom: "12px" }} key={item.public_id}>
                    <Card
                      className="text-center"
                      style={{ width: "12rem" }}>
                      <Card.Img variant="top" src={item.url} />
                    </Card>
                  </Col>
                ))}
              {uploading && (
                <Card style={{ width: "12rem" }}>
                  <Loader />
                </Card>
              )}
              {
                (image.length > 0) ? (
                    <Card style={{ width: "12rem", alignItems: "center", flexDirection: "row" }}>
                      <Button style={{width: "100%", borderRadius: 30}} onClick={() => deleteFileHandler(image[image.length-1])}>Xóa</Button>
                    </Card>
                  ) : <></>}
            </Row>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter the brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value=""></option>
                {brands && brands.map((item) => (
                    <option key={item._id} value={item.name}>{item.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="selection">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter the category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=""></option>
                {categories && categories.map((item) => (
                    <option key={item._id} value={item.name}>{item.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mt-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.File
                className="mb-3"
                id="image-file"
                custom
                onChange={uploadImageForDesc}
              ></Form.File>
              {uploadingDesc && <Loader />}
              <MarkdownEditor text={description} onChange={onChange} />
            </Form.Group>

            <Button className="mt-3" type="submit" variant="primary" style={{ borderRadius: 30}}>
              <FileDownloadDoneIcon/>
              &nbsp; Create product
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ProductCreateScreen;
