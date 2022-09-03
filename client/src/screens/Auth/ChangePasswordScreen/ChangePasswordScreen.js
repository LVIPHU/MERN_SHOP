import { useState } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import classes from "../LoginScreen/LoginScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import actions from './../../../actions/account';
import DropNotif from './../../../components/Modal/Modal';
import { logout } from './../../../actions/userAction';

const ForgotPasswordScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const changePassword = useSelector((state) => state.changePassword);
  const { loading, error, success } = changePassword;

  const forgotPassword = useSelector((state) => state.forgotPassword);
  const { loading: sending, error: sendErr, success: sendSuc } = forgotPassword;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const onSendCode = async () => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
      setMessage("Email invalid !");
      return;
    } else {
      dispatch(actions.forgotPasswordCode(email));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(actions.changePassword(email, password, verifyCode));
    }
  };

  return (
    <Container>
      <div className={classes.wrapper}>
      {success && (
        <DropNotif
          heading="Change Password"
          text="Change password success"
          resetData={() => {
            dispatch(logout());
          }}
        ></DropNotif>
      )}
      {sendSuc && (
        <DropNotif
          heading="Send Mail"
          text="Send success please check your email"
          resetData
        ></DropNotif>
      )}
        <div className={classes.leftSide}>
          <h3>New to our website?</h3>
          <p>
            We will have something right here, but we dont know what we gonna
            put yet?
          </p>
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Create an Account
          </Link>
        </div>
        <div className={classes.rightSide}>
          <h4>Change a password</h4>
          {error && <Message variant="danger">{error}</Message>}
          {sendErr && <Message variant="danger">{sendErr}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Row style={{ width: "100%" }}>
              <Col style={{ padding: "0 10px 0 0" }}>
                <input
                  type="text"
                  placeholder="Verify Code"
                  onChange={(e) => setVerifyCode(e.target.value)}
                />
              </Col>
              <Col style={{ padding: "0 0 0 10px" }}>
                {sending ? (
                  <Loader />
                ) : (
                  <Button
                    style={{ margin: "0 0 10px 0", borderRadius: 30 }}
                    onClick={() => onSendCode()}
                  >
                    Send Verify Code
                  </Button>
                )}
              </Col>
            </Row>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">CHANGE PASSWORD</button>
          </form>
        </div>
      </div>
    </Container>
  );
};
export default ForgotPasswordScreen;
