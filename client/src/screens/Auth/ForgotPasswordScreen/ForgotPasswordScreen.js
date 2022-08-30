import { useState } from "react";
import { Container } from "react-bootstrap";
import classes from "../LoginScreen/LoginScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/userAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
const ForgotPasswordScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(login(email, password));
  };

  return (
    <Container>
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
      <div className={classes.wrapper}>
        <div className={classes.rightSide}style={{width: '100%'}}>
          <h4>Change a password</h4>
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            {error && <Message variant="danger">{error}</Message>}
            <input
              type="text"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">SEND MAIL</button>
          </form>
        </div>
      </div>
    </Container>
  );
};
export default ForgotPasswordScreen;
