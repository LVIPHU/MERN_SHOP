import classes from "./SmallCard.module.css";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
const SmallCard = ({ product }) => {
  return (
    <div className={classes.container}>
      <Link to={`/product/${product._id}`}>
        <Carousel
          fade
        > {product.image && product.image.map((item) => (
            <Carousel.Item key={item.public_id}>
              <img
                className="d-block w-100"
                src={item.url}
                alt="First slide"
              />
            </Carousel.Item>
           ))} 
        </Carousel>
      </Link>
      <div className={classes.content}>
        <p className={classes.category}>{product.category}</p>
        <a href="/">{product.name}</a>
        <p className={classes.price}>${product.price}</p>
      </div>
    </div>
  );
};

export default SmallCard;
