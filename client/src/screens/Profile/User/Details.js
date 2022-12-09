import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import { getUserDetails, updateUserProfile } from "../../../actions/userAction";
import addressApi from "../../../api/Address";
import { Col, Form, Row } from "react-bootstrap";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import DropNotif from "../../../components/Modal/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import classes from "./Details.module.css";

const Details = ({ history }) => {
  const [province, setProvince] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [provinceList, setProvinceList] = useState([]);

  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [districtList, setDistrictList] = useState([]);

  const [ward, setWard] = useState("");
  const [wardId, setWardId] = useState("");
  const [wardList, setWardList] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const updateLoading = userUpdateProfile.loading;
  const updateError = userUpdateProfile.error;
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!user || !user.name) {
      dispatch(getUserDetails("profile"));
    } else {
      if (userInfo.name) {
        setName(userInfo.name);
      }
      if (userInfo.email) {
        setEmail(userInfo.email);
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
    }
  }, [history, userInfo, dispatch, user]);

  console.log(user);

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
    const updateUser = {
      name: name,
      email: email,
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
  };
  return (
    <div className={classes.wrapper}>
      <h2>User Profile</h2>
      {success && (
        <DropNotif
          heading="Update Profile"
          text="Update Profile Successfully"
          resetData={() => {
            dispatch(getUserDetails("profile"));
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
          }}
        ></DropNotif>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {/* {message && <Message variant="danger">{message}</Message>} */}
      {loading && <Loader />}
      {updateLoading && <Loader />}
      {updateError && <Message variant="danger">{updateError}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" style={{ paddingBottom: "20px" }}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <Form.Group controlId="email" style={{ paddingBottom: "20px" }}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Row style={{ paddingBottom: "20px" }}>
          <Col xs={1}>
            <Form.Label>Province</Form.Label>
            <FormControl size={"small"} style={{ width: "100%" }}>
              <Select
                autoWidth
                value={province}
                label="Province"
                onChange={(e) => {
                  get_province(e.target.value);
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
            <Form.Label style={{ marginTop: "17px" }}></Form.Label>
            <Form.Control type="text" value={province} readOnly></Form.Control>
          </Col>
        </Row>

        <Row style={{ paddingBottom: "20px" }}>
          <Col xs={1}>
            <Form.Label>District</Form.Label>
            <FormControl size={"small"} style={{ width: "100%" }}>
              <Select
                autoWidth
                value={district}
                label="District"
                onChange={(e) => {
                  get_district(e.target.value)
                  setWard("");
                  setWardId("");
                }}
              >
                {districtList &&
                  districtList?.map((item) => (
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
            <Form.Label style={{ marginTop: "17px" }}></Form.Label>
            <Form.Control type="text" value={district} readOnly></Form.Control>
          </Col>
        </Row>

        <Row style={{ paddingBottom: "20px" }}>
          <Col xs={1}>
            <Form.Label>Ward</Form.Label>
            <FormControl size={"small"} style={{ width: "100%" }}>
              <Select
                autoWidth
                value={ward}
                label="Ward"
                onChange={(e) => get_ward(e.target.value)}
              >
                {wardList &&
                  wardList?.map((item) => (
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
            <Form.Label style={{ marginTop: "17px" }}></Form.Label>
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

        <button className={classes.update} type="submit" variant="primary">
          <FileDownloadDoneIcon />
          &nbsp; Update
        </button>
      </Form>
    </div>
  );
};

export default Details;
