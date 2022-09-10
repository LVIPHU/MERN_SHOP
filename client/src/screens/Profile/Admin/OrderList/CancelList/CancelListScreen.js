import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import { listOrders } from "../../../../../actions/orderAction";

const CancelListScreen = ({ history }) => {
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
      <h1>Cancel</h1>
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
              <th>CANCEL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((x) => x.isCancel === true)
              .map((order) => (
                <tr key={order._id}>
                  {/* <td>{order._id}</td> */}
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>

                  <td>${order.totalPrice}</td>
                  <td>
                    <Button
                      variant="danger"
                      disabled
                      className="btn-sm"
                      style={{ borderRadius: 30, width: "50%", opacity: 1 }}
                    >
                      {order.cancelAt.substring(0, 10)}
                    </Button>
                  </td>

                  <td>
                    <LinkContainer
                      to={`/order/${order._id}`}
                      style={{ borderRadius: 30, width: "100%" }}
                    >
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
export default CancelListScreen;
