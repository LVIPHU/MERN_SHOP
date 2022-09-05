import React, { useEffect, useState } from "react";
import Message from "../../../components/Message";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import classes from "./Address.module.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../../actions/userAction";
import Loader from "../../../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import { getUserDetails } from "../../../actions/userAction";
import DropNotif from "../../../components/Modal/Modal";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

const Addresses = () => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [postCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const updateLoading = userUpdateProfile.loading;
  const updateError = userUpdateProfile.error;
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (user?.shippingAddress?.address) {
      setAddress(user.shippingAddress.address);
    }
    if (user?.shippingAddress?.phone) {
      setMobile(user.shippingAddress.phone);
    }
    if (user?.shippingAddress?.state) {
      setState(user.shippingAddress.state);
    }
    if (user?.shippingAddress?.city) {
      setCity(user.shippingAddress.city);
    }
    if (user?.shippingAddress?.fullname) {
      setFullName(user.shippingAddress.fullname);
    }
    if (user?.shippingAddress?.postalCode) {
      setPostCode(user.shippingAddress.postalCode);
    }
  }, []);

  const saveAddressHandler = (e) => {
    e.preventDefault();
    const updateUser = {
      address,
      city,
      phone: mobile,
      state,
      postalCode: postCode,
      fullname: fullName,
    };
    dispatch(updateUserProfile(updateUser));
  };

  const stateHandler = (e) => {
    setState(e.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" gutterBottom component="div">
        Add a new Address
      </Typography>
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
      {loading && <Loader />}
      {updateLoading && <Loader />}
      {error && <Message>{error}</Message>}
      {updateError && <Message variant="danger">{updateError}</Message>}
      <form onSubmit={saveAddressHandler}>
        <TextField
          fullWidth
          label="Full Name"
          variant="filled"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          type="number"
          fullWidth
          label="Mobile Number"
          variant="filled"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <TextField
          fullWidth
          label="district"
          variant="filled"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
        />
        <TextField
          fullWidth
          label="Address"
          variant="filled"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="ward"
          variant="filled"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">City</InputLabel>
          <Select autoWidth value={state} label="State" onChange={stateHandler}>
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
        <br />
        <Button type="submit" variant="contained" style={{ borderRadius: 30}}>
          <FileDownloadDoneIcon/>
          &nbsp; Add new Address
        </Button>
      </form>
    </div>
  );
};

export default Addresses;
