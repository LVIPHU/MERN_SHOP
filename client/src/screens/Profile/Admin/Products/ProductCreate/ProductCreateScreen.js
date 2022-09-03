import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import { createProduct } from "../../../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../../../constants/productConstants";
import DropNotif from "../../../../../components/Modal/Modal";
import MarkdownEditor from "../../../../../components/TextEditor/MarkdownEditor";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

//import actions from "../../../../actions/upload";

const ProductCreateScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingDesc, setUploadingDesc] = useState(false);
  const [listImage, setListImage] = useState([]);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product, success } = productCreate;

  const submitHandler = (e) => {
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
      listImage.push(data);
      setImage(data);
      setUploading(false);
      console.log(listImage);
    } catch (error) {
      setUploading(false);
      console.log(error);
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
      listImage.pop();
      setUploading(false);
      console.log(data);
    } catch (error) {
      setUploading(false);
      console.log(error);
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
              {/* <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter image URL"
                value={image.url}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control> */}
              <Form.File
                id="image-file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>
            <Row>
              {listImage &&
                listImage.map((item) => (
                  <Col xs={6} md={2} style={{ paddingBottom: "12px" }} key={item.public_id}>
                    <Card
                      className="text-center"
                      style={{ width: "12rem" }}
                      
                    >
                      {/* {uploading ? (
                        <Loader />
                      ) : ( */}
                      <Card.Img variant="top" src={item.url} />
                      {/* )} */}
                      {/* <Card.Body>
                        <Button onClick={() => deleteFileHandler(item)}>Xóa</Button>
                      </Card.Body> */}
                    </Card>
                  </Col>
                ))}
              {uploading && (
                <Card style={{ width: "12rem" }}>
                  <Loader />
                </Card>
              )}
              {
                (listImage.length > 0) ? (
                    <Card style={{ width: "12rem", alignItems: "center", flexDirection: "row" }}>
                      <Button style={{width: "100%", borderRadius: 30}} onClick={() => deleteFileHandler(listImage[listImage.length-1])}>Xóa</Button>
                    </Card>
                  ) : <></>}
            </Row>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
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
                <option value="Tank Top">Tank Top</option>
                <option value="Shirts">Shirts</option>
                <option value="Polos">Polos</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Shorts">Shorts</option>
                <option value="Jeans">Jeans</option>
                <option value="Kaki">Kaki</option>
                <option value="Sport">Sport</option>
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
