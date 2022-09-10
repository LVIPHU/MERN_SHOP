import React, { useEffect } from "react";
import Message from "../../../components/Message";
import { listMyOrders } from "../../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../../components/Loader";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Orders = () => {
  const dispatch = useDispatch();
  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = orderMyList;

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  let order;
  if (orders) {
    if (orders.length === 0) {
      order = (
        <>
          <Message>No Products Ordered</Message>
          <h1>Make a new Purchase now!</h1>

          <LinkContainer to={`/shop`} style={{ borderRadius: 30}}>
            <Button size="lg"><AddShoppingCartIcon style={{ marginBottom: '5px'}}/>&nbsp;Shop now</Button>
          </LinkContainer>
        </>
      );
    } else {
      order = (
        <>
          <Table striped="column" hover responsive variant="light">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  {/* <td>{order._id}</td> */}
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice} $</td>
                  <td>
                  {order.isPaid ? (
                     <Button variant="success" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>
                    {order.paidAt.substring(0, 10)}</Button>
                  ) : (
                    <Button variant="warning" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>Not paid</Button>
                  )}
                </td>

                <td>
                  {order.isCancel ? (
                    <Button variant="danger" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>
                    Cancelled </Button>
                  ) : order.isDelivering && !order.isDelivered ? (
                    <Button variant="primary" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>
                    isDelivering </Button>
                  ) : order.isDelivering && order.isDelivered ? (
                    <Button variant="success" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>
                    {order.deliveredAt.substring(0, 10)}</Button>
                  ) : (
                    <Button variant="warning" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>Not delivered</Button>
                  )}
                </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`} style={{ borderRadius: 30, width: "70%"}}>
                      <Button variant="outline-success">
                        <i className="fas fa-eye"></i>
                        &nbsp; Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      );
    }
  }
  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <div>{order}</div>
    </>
  );
};

export default Orders;
