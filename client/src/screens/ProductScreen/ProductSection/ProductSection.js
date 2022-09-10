import { useState } from "react";
import classes from "./ProductSection.module.css";
import { addToCart } from "../../../actions/cartAction";
import { useDispatch } from "react-redux";

import { Card, Carousel, Col, Row } from "react-bootstrap";
import CartModal from "../../../components/CartModal/CartModal";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductSection = ({ product }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);

  if (qty > product.countInStock) {
    setQty(product.countInStock);
  }
  const cartHandler = () => {
    // if(!product.countInStock === 0) {
    dispatch(addToCart(product._id, qty));
    setShowModal(true);
    // } else {

    // }
  };
  return (
    <div className={classes.container} >
      <CartModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      ></CartModal>
      {/* <img className={classes.productImage} src={product?.image?.url} alt="Product" /> */}
      <Row>
        <Col>
          <Card style={{ width: "18rem", textAlign: "center" }}>
            <Carousel
              fade
              prevIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-prev-icon"
                  style={{
                    backgroundColor: "#384aeb",
                    borderRadius: "30px",
                    margin: "10px",
                  }}
                />
              }
              nextIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-next-icon"
                  style={{
                    backgroundColor: "#384aeb",
                    borderRadius: "30px",
                    margin: "10px",
                  }}
                />
              }
            >
              {" "}
              {product.image &&
                product.image.map((item) => (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={item.url}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </Card>
        </Col>
        <Col>
          <div className={classes.content}>
            <h3 className={classes.productName}>{product.name}</h3>
            <h2 className={classes.productPrice}>${product.price}</h2>
            <ul className={classes.list}>
              <li>
                <a class="active" href="/">
                  <span>Category</span> : {product.category}
                </a>
              </li>
              <li>
                <a class="active" href="/">
                  <span>Availibility</span> :{" "}
                  {product.countInStock > 0 ? "In Stock" : `Not In Stock`}
                </a>
              </li>
            </ul>
            <div className={classes.productCount}>
              <label htmlFor="quantity">Quantity: </label>
              <input
                type="number"
                name="quantity"
                value={qty}
                min={0}
                onChange={(e) => setQty(e.target.value)}
              ></input>
            </div>
            <button
              disabled={product.countInStock === 0}
              onClick={cartHandler}
              className={classes.addCart}
            >
              <AddShoppingCartIcon />
              &nbsp; Add to Cart
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductSection;
