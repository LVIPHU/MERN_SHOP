import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import constants from "../../../../../constants/brand";
import actions from "../../../../../actions/brand";
import DropNotif from "../../../../../components/Modal/Modal";
import MarkdownEditor from "../../../../../components/TextEditor/MarkdownEditor";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

const ProductCreateScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product, success } = productCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      actions.createBrand({
        name,
        image,
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
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.log(error);
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
        <Link
          to="/userProfile"
          className="btn btn-primary my-3"
          style={{ borderRadius: 30 }}
        >
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
              dispatch({ type: constants.BRAND_CREATE_RESET });
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

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>

              <Form.File
                id="image-file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>

            <Card className="text-center" style={{ width: "12rem" }}>
              {uploading ? (
                <Loader />
              ) : (
                <Card.Img variant="top" src={image.url} />
              )}
            </Card>

            <Form.Group className="mt-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <MarkdownEditor text={description} onChange={onChange} />
            </Form.Group>

            <Button
              className="mt-3"
              type="submit"
              variant="primary"
              style={{ borderRadius: 30 }}
            >
              <FileDownloadDoneIcon />
              &nbsp; Create brand
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ProductCreateScreen;
