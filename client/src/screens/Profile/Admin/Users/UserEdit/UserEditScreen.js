import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../../../../../components/Message";
import Loader from "./../../../../../components/Loader";
import { getUserDetails, updateUser } from "./../../../../../actions/userAction";
import { USER_UPDATE_RESET } from "./../../../../../constants/userConstants";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DropNotif from './../../../../../components/Modal/Modal';

const UserEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const userId = match.params.id;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isBlock, setIsBlock] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsSeller(user.isSeller);
      setIsBlock(user.isBlock);
    }
  }, [dispatch, user, userId, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin, isSeller, isBlock }));
  };

  return (
    <>
      <Container>
        <Link to="/userProfile" className="btn btn-primary my-3" style={{ borderRadius: 30}}>
          <i className="fas fa-arrow-left"></i>
          &nbsp; Go Back
        </Link>
        <h1>Edit User</h1>
        {successUpdate && (
          <DropNotif
            heading="Change User status"
            text="Change User status successfully"
            resetData={() => {
              dispatch({ type: USER_UPDATE_RESET });
              history.push("/userProfile");
            }}
          ></DropNotif>
        )}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader></Loader>
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

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {userInfo.isAdmin && (userInfo._id !== userId) && (<>
            <Form.Group controlId="isAdmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="isSeller" className="my-3">
              <Form.Check
                type="checkbox"
                label="Is Seller"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="isBlock" className="my-3">
              <Form.Check
                type="checkbox"
                label="Block user"
                checked={isBlock}
                onChange={(e) => setIsBlock(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            </>)}

            <Button size="lg" type="submit" variant="primary" style={{ borderRadius: 30, marginTop: '20px'}}>
              <FileDownloadDoneIcon/>
              &nbsp; Update
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};
export default UserEditScreen;
