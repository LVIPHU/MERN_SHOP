import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Card} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import constants from "../../../../../constants/brand";
import actions from "../../../../../actions/brand"
import DropNotif from "../../../../../components/Modal/Modal";
import MarkdownEditor from "../../../../../components/TextEditor/MarkdownEditor";

import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BrandEditScreen = ({ match, history }) => {
  const brandId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);


  const brandDetail = useSelector((state) => state.brandDetail);
  const { loading, error, brand } = brandDetail;
  const currentId = brand._id;

  const brandUpdate = useSelector((state) => state.brandUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = brandUpdate;

  useEffect(() => {
    if (!brand.name || currentId !== brandId) {
      dispatch(actions.getBrandDetail(brandId));
    } else {
      setName(brand.name);
      setImage(brand.image);
      setDescription(brand.description);
    }
  }, [dispatch, brandId, currentId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      actions.updatedBrand({
        _id: brandId,
        name,
        image,
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

  const onChange = (value) => {
    setDescription(value);
  };

  console.log(brand);

  return (
    <>
      <Container className="mb-5">
        <Link to="/userProfile" className="btn btn-primary my-3" style={{ borderRadius: 30}}>
          <i className="fas fa-arrow-left"></i>
          &nbsp; Go Back
        </Link>
        <h1>Edit Brand</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {successUpdate && (
          <DropNotif
            heading="Update Brand"
            text="Update Brand Successfully"
            resetData={() => {
              dispatch({ type: constants.BRAND_UPDATE_RESET });
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
            
                    <Card className="text-center" style={{ width: "12rem" }} key={image?.public_id}>
                      {uploading ? (
                        <Loader />
                      ) : (
                        <Card.Img variant="top" src={image?.url} />
                      )}
                    </Card>
                 
    
            <Form.Group className="mt-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <MarkdownEditor text={description} onChange={onChange} />
            </Form.Group>

            <Button className="mt-3" type="submit" variant="primary" style={{ borderRadius: 30}}>
              <FileDownloadDoneIcon/>
              &nbsp; Update
            </Button>
            {/* <Link
              to={`/brand/${brand._id}`}
              className="btn btn-primary mt-3 ms-3"
              style={{ borderRadius: 30}}>
              <VisibilityIcon/> 
              &nbsp; Go to brand
            </Link> */}
          </Form>
        )}
      </Container>
    </>
  );
};

export default BrandEditScreen;
