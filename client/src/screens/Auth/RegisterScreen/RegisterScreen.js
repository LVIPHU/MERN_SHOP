import { Container, Button, Row, Col, Toast } from "react-bootstrap";
import classes from "../LoginScreen/LoginScreen.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../actions/userAction";
import { Link } from "react-router-dom";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import actions from "./../../../actions/account";
import DropNotif from './../../../components/Modal/Modal';

const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const sendVerifyCode = useSelector((state) => state.sendVerifyCode);
  const { loading: sending, error: sendErr, success } = sendVerifyCode;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const onSendCode = async () => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
      setMessage("Email invalid !");
      return;
    } else {
      dispatch(actions.sendVerifyCode(email));
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(username, email, password, verifyCode));
    }
  };
  return (
    <Container>
      <div className={classes.wrapper}>
      {success && (
        <DropNotif
          heading="Send Mail"
          text="Send success please check your email"
          resetData={() => {}}
        ></DropNotif>
      )}
        <div className={classes.leftSide}>
          <h3>Already have an account?</h3>
          <p>
            We will have something right here, but we dont know what we gonna
            put yet?
          </p>
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login Now
          </Link>
        </div>
        <div className={classes.rightSide}>
          <h4>Create an account</h4>
          {error && <Message variant="danger">{error}</Message>}
          {sendErr && <Message variant="danger">{sendErr}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
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
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </Container>
  );
};
export default RegisterScreen;
