import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import PersonIcon from "@mui/icons-material/Person";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-3 h5">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              <PersonIcon style={{ marginBottom: "5px" }} /> Sign In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <PersonIcon style={{ marginBottom: "5px" }} /> Sign In
          </Nav.Link>
        )}
      </Nav.Item>
      <hr width="10%" color="#384aeb" align="right" size="5px" />
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>
              <PersonPinCircleIcon style={{ marginBottom: "5px" }} /> Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <PersonPinCircleIcon style={{ marginBottom: "5px" }} /> Shipping
          </Nav.Link>
        )}
      </Nav.Item>
      <hr width="10%" color="#384aeb" align="right" size="5px" />
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>
              <PaymentIcon style={{ marginBottom: "5px" }} /> Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <PaymentIcon style={{ marginBottom: "5px" }} /> Payment
          </Nav.Link>
        )}
      </Nav.Item>
      <hr width="10%" color="#384aeb" align="right" size="5px" />
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>
              <LocalAtmIcon style={{ marginBottom: "5px" }} /> Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <LocalAtmIcon style={{ marginBottom: "5px" }} /> Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
