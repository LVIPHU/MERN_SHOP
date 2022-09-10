import React, { useState, useEffect } from "react";
import Details from "./Details";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import classes from "../../ProductScreen/ProductScreen.module.css";

import UserListScreen from "../Admin/Users/UserList/UserListScreen";
import ProductListScreen from "../Admin/Products/ProductList/ProductListScreen";
import OrderListScreen from "../Admin/OrderList/OrderListScreen";
import CancelListScreen from "../Admin/OrderList/CancelList/CancelListScreen";
import CategoryListScreen from './../Admin/Categories/CategoryList/CategoryListScreen';
import BrandListScreen from './../Admin/Brands/BrandList/BrandListScreen';
import ManageRequestScreen from "../Admin/ManageRequest/ManageRequestScreen";
import Chart from "../Admin/Chart/Chart";

import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InboxIcon from "@mui/icons-material/Inbox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import BarChartIcon from '@mui/icons-material/BarChart';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CategoryIcon from '@mui/icons-material/Category';
import WarningIcon from '@mui/icons-material/Warning';

const UserProfile = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const [selection, setSelection] = useState("1");

  const changeSelection = (e) => {
    setSelection(e.target.getAttribute("data-selection"));
  };

  let selectionShow;
  if (selection === "1") {
    if (userInfo && !userInfo.isAdmin && !userInfo.isSeller) {
      selectionShow = <Details />;
    } else {
      selectionShow = <Chart />;
    }
  } else if (selection === "2") {
    selectionShow = <Orders />;
  } else if (selection === "3") {
    selectionShow = <UserListScreen />;
  } else if (selection === "4") {
    selectionShow = <CategoryListScreen />;
  } else if (selection === "5") {
    selectionShow = <BrandListScreen />;
  } else if (selection === "6") {
    selectionShow = <ProductListScreen />;
  } else if (selection === "7") {
    selectionShow = <OrderListScreen />;
  } else if (selection === "8") {
    selectionShow = <CancelListScreen/>;
  } else if (selection === "9") {
    selectionShow = <ManageRequestScreen />;
  }
  return (
    <Container>
      <div className={classes["selection-container"]}>
        <ul className={classes.navSelection}>
          <li
            className={classes.navItem}
            data-selection="1"
            onClick={changeSelection}
          >
            {(!userInfo.isAdmin && !userInfo.isSeller) ? (
              <>
                <PersonIcon style={{ marginBottom: "5px" }} />
                &nbsp; Profile
              </>
            ) : (
              <>
                <BarChartIcon style={{ marginBottom: "5px" }} />
                &nbsp; Chart
              </>
            )}
          </li>
         
          {userInfo && !userInfo.isAdmin && !userInfo.isSeller && (
            <li
              className={classes.navItem}
              data-selection="2"
              onClick={changeSelection}
            >
              <ShoppingCartIcon style={{ marginBottom: "5px" }} />
              &nbsp; Orders
            </li>
          )}
          
          {userInfo && (userInfo.isAdmin || userInfo.isSeller) && (
            <li
              className={classes.navItem}
              data-selection="3"
              onClick={changeSelection}
            >
              <PeopleAltIcon style={{ marginBottom: "5px" }} />
              &nbsp; Users
            </li>
          )}
          {userInfo && (userInfo.isAdmin || userInfo.isSeller) && (
            <li
              className={classes.navItem}
              data-selection="4"
              onClick={changeSelection}
            >
              <CategoryIcon style={{ marginBottom: '5px'}}/>
              &nbsp; Categories
            </li>
          )} 
          {userInfo && (userInfo.isAdmin || userInfo.isSeller) && (
            <li
              className={classes.navItem}
              data-selection="5"
              onClick={changeSelection}
            >
              <BrandingWatermarkIcon style={{ marginBottom: '5px'}}/>
              &nbsp; Brands
            </li>
          )} 
          {userInfo && (userInfo.isAdmin || userInfo.isSeller) && (
            <li
              className={classes.navItem}
              data-selection="6"
              onClick={changeSelection}
            >
              <InboxIcon style={{ marginBottom: "5px" }} />
              &nbsp; Products
            </li>
          )}
          {userInfo && (userInfo.isAdmin || userInfo.isSeller) && (
            <li
              className={classes.navItem}
              data-selection="7"
              onClick={changeSelection}
            >
              <ShoppingCartIcon style={{ marginBottom: "5px" }} />
              &nbsp; Orders
            </li>
          )}
           {userInfo && (userInfo.isAdmin || userInfo.isSeller) && (
            <li
              className={classes.navItem}
              data-selection="8"
              onClick={changeSelection}
            >
              <WarningIcon style={{ marginBottom: "5px" }} />
              &nbsp; Cancel
            </li>
          )}
          {userInfo && userInfo.isAdmin && (
            <li
              className={classes.navItem}
              data-selection="9"
              onClick={changeSelection}
            >
              <InventoryOutlinedIcon style={{ marginBottom: "5px" }} />
              &nbsp; Requests
            </li>
          )}
        </ul>
        {selectionShow}
      </div>
      <div style={{ marginBottom: "100px" }}></div>
    </Container>
  );
};

export default UserProfile;
