import { useState } from "react";
import { Alert, Toast } from "react-bootstrap";

const Toasts = ({ message, variant }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "relative",
        minHeight: "100px",
      }}
    >
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <Alert variant={variant}>
          <Toast.Header>
            <img src="/favicon.ico" className="rounded mr-2" alt="logo" />
            <strong className="mr-auto">Shopology</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Alert>
      </Toast>
    </div>
  );
};

export default Toasts;
