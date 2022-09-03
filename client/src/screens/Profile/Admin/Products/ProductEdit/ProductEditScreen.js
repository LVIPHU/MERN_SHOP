import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Card, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import {
  getProductDetail,
  updateProduct,
} from "../../../../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../../../../constants/productConstants";
import DropNotif from "../../../../../components/Modal/Modal";
import MarkdownEditor from "../../../../../components/TextEditor/MarkdownEditor";

import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingDesc, setUploadingDesc] = useState(false);


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

  return (
    <>
      <Container className="mb-5">
        <Link to="/userProfile" className="btn btn-primary my-3" style={{ borderRadius: 30}}>
          <i className="fas fa-arrow-left"></i>
          &nbsp; Go Back
        </Link>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {successUpdate && (
          <DropNotif
            heading="Update Product"
            text="Update Product Successfully"
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
                value={image.urlurl}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control> */}
              <Form.File
                id="image-file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>
            <Row>
                  <Col xs={6} md={2} style={{ paddingBottom: "12px" }}>
                    <Card className="text-center" style={{ width: "12rem" }} key={image?.public_id}>
                      {uploading ? (
                        <Loader />
                      ) : (
                        <Card.Img variant="top" src={image?.url} />
                      )}
                    </Card>
                  </Col>
              {/* {uploading && (
                <Card style={{ width: "12rem" }}>
                  <Loader />
                </Card>
              )} */}
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
              &nbsp; Update
            </Button>
            <Link
              to={`/product/${product._id}`}
              className="btn btn-primary mt-3 ms-3"
              style={{ borderRadius: 30}}>
              <VisibilityIcon/> 
              &nbsp; Go to product
            </Link>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ProductEditScreen;
