import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import { listOrders } from "../../../../actions/orderAction";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderLists = useSelector((state) => state.orderLists);
  const { loading, error, orders } = orderLists;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && (userInfo.isAdmin || userInfo.isSeller)) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped="column" hover responsive variant="light">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.filter(x => x.isCancel === false).map((order) => (
              <tr key={order._id}>
                {/* <td>{order._id}</td> */}
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>

                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                     <Button variant="success" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>
                    {order.paidAt.substring(0, 10)}</Button>
                  ) : (
                    <Button variant="danger" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>Not paid</Button>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    <Button variant="success" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>
                    {order.deliveredAt.substring(0, 10)}</Button>
                  ) : (
                    <Button variant="danger" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>Not delivered</Button>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`} style={{ borderRadius: 30, width: "100%"}}>
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
      )}
    </>
  );
};
export default OrderListScreen;
