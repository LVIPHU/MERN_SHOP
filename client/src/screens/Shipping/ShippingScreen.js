import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutStep/CheckoutStep";
import classes from "./ShippingScreen.module.css";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { updateUserProfile } from "../../actions/userAction";
import Message from "../../components/Message";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (success) {
      history.push("/payment");
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
    if (userInfo.shippingAddress.address) {
      setAddress(userInfo.shippingAddress.address);
    }
    if (userInfo.shippingAddress.phone) {
      setPhone(userInfo.shippingAddress.phone);
    }
    if (userInfo.shippingAddress.state) {
      setState(userInfo.shippingAddress.state);
    }
    if (userInfo.shippingAddress.city) {
      setCity(userInfo.shippingAddress.city);
    }
    if (userInfo.shippingAddress.fullname) {
      setFullName(userInfo.shippingAddress.fullname);
    }
    if (userInfo.shippingAddress.postalCode) {
      setPostalCode(userInfo.shippingAddress.postalCode);
    }
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !city || !postalCode || !state) {
      setMessage("Please fill up all the information");
    } else {
      const updateUser = {
        address,
        fullname: fullName,
        city,
        state,
        postalCode,
        phone,
      };
      dispatch(updateUserProfile(updateUser));
    }
  };
  return (
    <Container>
      <CheckoutSteps step1 step2 />
      <div className={classes.wrapper}>
        <h1>Shipping</h1>
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="fullName">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="ward">
            <Form.Label>ward</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your ward"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label>district</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your district"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <FormControl sx={{ mt: 2, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              City
            </InputLabel>
            <Select
              autoWidth
              value={state}
              label="City"
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value={"Hồ Chí Minh"}>Hồ Chí Minh</MenuItem>
              <MenuItem value={"Hà Nội"}>Hà Nội</MenuItem>
              <MenuItem value={"Bà Rịa & Vũng Tàu"}>
              Bà Rịa & Vũng Tàu
              </MenuItem>
              <MenuItem value={"Bình Dương"}>Bình Dương</MenuItem>
              <MenuItem value={"Cà Mau"}>Cà Mau</MenuItem>
              <MenuItem value={"Cần Thơ"}>Cần Thơ</MenuItem>
              <MenuItem value={"Đà Nẵng"}>
              Đà Nẵng
              </MenuItem>
              <MenuItem value={"Huế"}>Huế</MenuItem>
            </Select>
          </FormControl>
          <button className={classes.continue} style={{ borderRadius: 30}}><FileDownloadDoneIcon/>&nbsp; Continue</button>
        </Form>
      </div>
    </Container>
  );
};

export default ShippingScreen;
