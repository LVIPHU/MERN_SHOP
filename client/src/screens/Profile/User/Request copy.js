
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Card, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import MarkdownEditor from "../../../components/TextEditor/MarkdownEditor";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import DropNotif from "../../../components/Modal/Modal";

import { createRequest } from "../../../actions/requestAction";
import {
  getProductDetail,
  updateProduct,
} from "../../../../actions/productActions";

import { REQUEST_SELLER_RESET } from "../../../constants/requestConstant";
import { PRODUCT_UPDATE_RESET } from "../../../../constants/productConstants";

import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Request = ({match, history}) => {
  const [description, setDescription] = useState("");
  const [uploadingDesc, setUploadingDesc] = useState(false);
  
  const dispatch = useDispatch();

  const requestSeller = useSelector((state) => state.requestSeller);
  const { loading, error, success } = requestSeller;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createRequest({
        description,
      })
    );
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

      setDescription(description + "\n" + data.url);
      setUploadingDesc(false);
    } catch (error) {
      setUploadingDesc(false);
    }
  };


  const onChange = (value) => {
    setDescription(value);
  };

  return (
    <>
      <Container className="mb-5">
        <h1>Request to become a Seller</h1>
        {success && (
          <DropNotif
            heading="Create Seller Request"
            text="Create Seller Request Successfully"
            resetData={() => {
              dispatch({ type: REQUEST_SELLER_RESET });
            }}
          ></DropNotif>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>

            <Form.Group className="mt-3" controlId="description">
              <Form.Label>Your Request Description</Form.Label>
              <Form.File
                className="mb-3"
                id="image-file"
                custom
                onChange={uploadImageForDesc}
              ></Form.File>
              {uploadingDesc && <Loader />}
              <MarkdownEditor text={description} onChange={onChange} />
            </Form.Group>

            <Button className="mt-3" type="submit" variant="primary">
              Submit Request
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};


export default Request;