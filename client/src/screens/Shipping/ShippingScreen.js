import React, { useState, useEffect } from "react";
import { Form, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutStep/CheckoutStep";
import classes from "./ShippingScreen.module.css";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { updateUserProfile } from "../../actions/userAction";
import Message from "../../components/Message";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import addressApi from "./../../api/Address";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const [province, setProvince] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [provinceList, setProvinceList] = useState([]);

  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [districtList, setDistrictList] = useState([]);

  const [ward, setWard] = useState("");
  const [wardId, setWardId] = useState("");
  const [wardList, setWardList] = useState([]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (success) {
      history.push("/payment");
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
    if (userInfo.shippingAddress.fullname) {
      setFullName(userInfo.shippingAddress.fullname);
    }
    if (userInfo.shippingAddress.address) {
      setAddress(userInfo.shippingAddress.address);
    }
    if (userInfo.shippingAddress.phone) {
      setPhone(userInfo.shippingAddress.phone);
    }
    if (
      userInfo.shippingAddress.province &&
      userInfo.shippingAddress.provinceId
    ) {
      setProvince(userInfo.shippingAddress.province);
      setProvinceId(userInfo.shippingAddress.provinceId);
    }
    if (
      userInfo.shippingAddress.district &&
      userInfo.shippingAddress.districtId
    ) {
      setDistrict(userInfo.shippingAddress.district);
      setDistrictId(userInfo.shippingAddress.districtId);
    }
    if (userInfo.shippingAddress.ward && userInfo.shippingAddress.wardId) {
      setWard(userInfo.shippingAddress.ward);
      setWardId(userInfo.shippingAddress.wardId);
    }

    let isSubscribe = true;

    async function getProvinceList() {
      try {
        const response = await addressApi.getProvinces();
        if (response) {
          if (isSubscribe) setProvinceList(response.data);
        }
      } catch (error) {}
    }
    getProvinceList();
    // cleanup
    return () => (isSubscribe = false);
  }, [success]);

  // fn: lấy danh sách huyện/xã khi đã chọn tỉnh/thành
  const getDistrictList = async (provinceId) => {
    try {
      const response = await addressApi.getDistricts(provinceId);
      if (response) {
        setDistrictList(response.data.districts);
      }
    } catch (error) {
      throw error;
    }
  };

  // fn: lấy danh sách huyện/xã khi đã chọn tỉnh/thành
  const getWardStreetList = async (districtId) => {
    try {
      const response = await addressApi.getWards(districtId);
      if (response) {
        setWardList(response.data.wards);
      }
    } catch (error) {
      throw error;
    }
  };

  const get_province = (e) => {
    var array = e.split("|");
    setProvinceId(array[0]);
    setProvince(array[1]);
    getDistrictList(array[0]);
    console.log(province);
  };

  const get_district = (e) => {
    var array = e.split("|");
    setDistrictId(array[0]);
    setDistrict(array[1]);
    getWardStreetList(array[0]);
    console.log(district);
  };

  const get_ward = (e) => {
    var array = e.split("|");
    setWardId(array[0]);
    setWard(array[1]);
    console.log(ward);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !fullName ||
      !phone ||
      !address ||
      !province ||
      !district ||
      !ward ||
      !provinceId ||
      !districtId ||
      !wardId
    ) {
      setMessage("Please fill up all the information");
    } else {
      const updateUser = {
        fullname: fullName,
        address,
        phone,
        province,
        provinceId,
        district,
        districtId,
        ward,
        wardId,
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
        <Form onSubmit={submitHandler} style={{ paddingBottom: "20px" }}>

          <Form.Group controlId="fullName" style={{ paddingBottom: "20px" }}>
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="phone" style={{ paddingBottom: "20px" }}>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Row style={{ paddingBottom: "20px" }}>
            <Col xs={1}>
              <Form.Label>Province</Form.Label>
              <FormControl size={"small"} style={{ width: '100%'}}>
                <Select
                  autoWidth
                  value={province}
                  label="Province"
                  onChange={(e) => {get_province(e.target.value);
                  setDistrict("");
                  setDistrictId("");
                  setWard("");
                  setWardId("");
                  }}
                >
                  {provinceList &&
                    provinceList?.map((item) => (
                      <MenuItem
                        key={item.code}
                        value={`${item.code}|${item.name}`}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Col>
            <Col xs={11}>
              <Form.Label style={{ marginTop: '17px'}}></Form.Label>
              <Form.Control type="text" value={province} readOnly></Form.Control>
            </Col>
          </Row>

          <Row style={{ paddingBottom: "20px" }}>
            <Col xs={1}>
              <Form.Label>District</Form.Label>
              <FormControl size={"small"} style={{ width: '100%'}}>
                <Select
                  autoWidth
                  value={district}
                  label="District"
                  onChange={(e) => {get_district(e.target.value);
                    setWard("");
                  setWardId("");
                  }}
                >
                  {districtList &&
                    districtList?.map((item) => (
                      <MenuItem key={item.code} value={`${item.code}|${item.name}`}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Col>
            <Col xs={11}>
              <Form.Label style={{ marginTop: '17px'}}></Form.Label>
              <Form.Control type="text" value={district} readOnly></Form.Control>
            </Col>
          </Row>

          <Row style={{ paddingBottom: "20px" }}>
            <Col xs={1}>
              <Form.Label>Ward</Form.Label>
              <FormControl size={"small"} style={{ width: '100%'}}>
            <Select
              autoWidth
              value={ward}
              label="Ward"
              onChange={(e) => get_ward(e.target.value)}
            >
              {wardList &&
                wardList?.map((item) => (
                  <MenuItem key={item.code} value={`${item.code}|${item.name}`}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          </Col>
            <Col xs={11}>
              <Form.Label style={{ marginTop: '17px'}}></Form.Label>
              <Form.Control type="text" value={ward} readOnly></Form.Control>
            </Col>
          </Row>

          <Form.Group controlId="address" style={{ paddingBottom: "20px" }}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <button className={classes.continue} style={{ borderRadius: 30 }}>
            <FileDownloadDoneIcon />
            &nbsp; Continue
          </button>
        </Form>
      </div>
    </Container>
  );
};

export default ShippingScreen;
