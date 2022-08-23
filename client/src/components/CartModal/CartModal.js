import classes from "./CartModal.module.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
function CartModal({ showModal, closeModal }) {
  const handleClose = () => {
    closeModal();
  };
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Item to your cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to keep shopping?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose} style={{ borderRadius: "30px" }}>
            Keep Shoping
          </Button>
          <Button variant="primary" style={{ borderRadius: "30px" }}>
            <Link className={classes.link} to="/cart">
              Go to cart
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CartModal;
