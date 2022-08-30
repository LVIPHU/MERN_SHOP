import { Container, Button } from "react-bootstrap";
import classes from "../LoginScreen/LoginScreen.module.css";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../actions/userAction";
import { Link } from "react-router-dom";
import axios from "axios";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [verifyCode, setVerifyCode] = useState("");
  const [isSending, setIsSending] = useState(false);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const emailRef = useRef("");

  // fn: gửi mã xác nhận
  const onSendCode = async () => {
    try {
      // kiểm tra email
      const email = emailRef.current;
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!regex.test(email)) {
        message.error("Email invalid !");
        return;
      }
      // set loading, tránh việc gửi liên tục
      setIsSending(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user/verify", config);
      if (data.status === 200) {
        message.success("Send success, please check your email");
        setIsSending(false);
      }
    } catch (error) {
      setIsSending(false);
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("Send fail, please check your mail again");
      }
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
          {message && <Message variant="danger">{message}</Message>}
          {loading && <Loader></Loader>}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              autocomplete="nope"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              autocomplete="nope"
              onChange={(e) => setEmail(e.target.value)}
            />
            {isSending ? (
              <Loader />
            ) : (
              <Button
                size="sm"
                style={{borderRadius: "30px", width: "180px",
                marginBottom: "20px"}}
                onClick={onSendCode}
              >
                Send Verify Code
              </Button>
            )}
            <input
              type="text"
              placeholder="Verify Code"
              autocomplete="nope"
              onChange={(e) => setVerifyCode(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              autocomplete="nope"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              autocomplete="nope"
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
