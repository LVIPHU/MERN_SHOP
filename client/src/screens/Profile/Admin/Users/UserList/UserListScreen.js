import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../../components/Message";
import Loader from "../../../../../components/Loader";
import { listUsers, deleteUser } from "../../../../../actions/userAction";
import DropNotif from "../../../../../components/Modal/Modal";
import { USER_DELETE_RESET } from "../../../../../constants/userConstants";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: errorDelete } = userDelete;

  useEffect(() => {
    if (userInfo && (userInfo.isAdmin || userInfo.isSeller)) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {successDelete && (
            <DropNotif
              heading="Delete user"
              text="Delete user successfully"
              resetData={() => {
                dispatch(listUsers());
                dispatch({ type: USER_DELETE_RESET });
              }}
            ></DropNotif>
          )}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          <Table striped="column" hover responsive>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>NAME</th>
                <th>EMAIL</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  {/* <td>{user._id}</td> */}
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isBlock ? (
                      <Button
                        variant="danger"
                        disabled
                        className="btn-sm"
                        style={{ borderRadius: 30, width: "50%", opacity: 1 }}
                      >
                        Block
                      </Button>
                    ) : user.isAdmin ? (
                      <Button
                        variant="warning"
                        disabled
                        className="btn-sm"
                        style={{ borderRadius: 30, width: "50%", opacity: 1 }}
                      >
                        Admin
                      </Button>
                    ) : user.isSeller ? (
                      <Button
                        variant="primary"
                        disabled
                        className="btn-sm"
                        style={{ borderRadius: 30, width: "50%", opacity: 1 }}
                      >
                        Seller
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        disabled
                        className="btn-sm"
                        style={{ borderRadius: 30, width: "50%", opacity: 1 }}
                      >
                        Customer
                      </Button>
                    )}
                  </td>

                  <td>
                    <LinkContainer
                      to={`/admin/user/${user._id}/edit`}
                      style={{ borderRadius: 30, width: "70%" }}
                    >
                      <Button variant="outline-primary">
                        <i className="fas fa-edit"></i>
                        &nbsp; Edit
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};
export default UserListScreen;
