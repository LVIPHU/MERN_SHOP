import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import { getAllRequest } from "../../../../actions/requestAction";

const ManageRequestScreen = () => {
  const dispatch = useDispatch();
  const getRequestSeller = useSelector((state) => state.getRequestSeller);
  const { loading, error, request } = getRequestSeller;

  useEffect(() => {
    dispatch(getAllRequest());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped="column" hover responsive variant="light">
            <thead>
              <tr>
                {/* <th>Request ID</th>
                <th>User ID</th> */}
                <th>DATE</th>
                <th>TIME</th>
                <th>SELLER</th>
                <th>BRAND</th>
                <th>APPROVED</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {request.map((r) => (
                <tr key={r._id}>
                  {/* <td>{r._id}</td>
                  <td>{r.user._id}</td> */}
                  <td>{r.requestAt.substring(0, 10)}</td>
                  <td>{r.requestAt.substring(11, 19)}</td>
                  <td>{r?.user?.name}</td>
                  <td>{r.brand}</td>
                  <td>
                    {r.approved ? (
                      <Button variant="success" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>{r.approvedAt.substring(0, 10)}</Button>
                    ) : (
                      <Button variant="danger" disabled className="btn-sm" style={{ borderRadius: 30, width: "50%", opacity: 1}}>Not approved</Button>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/request/${r._id}`} style={{ borderRadius: 30, width: "100%"}}>
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
      )}
    </>
  );
};

export default ManageRequestScreen;

