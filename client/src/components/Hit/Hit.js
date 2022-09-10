import classes from "../SmallCard/SmallCard.module.css";
import { Link } from "react-router-dom";
import { Highlight } from "react-instantsearch-dom";
import { Carousel } from "react-bootstrap";
const Hit = ({ hit }) => {
  return (
    <div className={classes.container}>
      <Link to={`/product/${hit.id}`}>
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
        > {hit.image && hit.image.map((item) => (
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
        <p className={classes.category}>
          <Highlight attribute="category" hit={hit} tagName="mark" />
        </p>
        <p className={classes.category}>
          <Highlight attribute="brand" hit={hit} tagName="mark" />
        </p>
        <Link to={`/product/${hit.id}`}>
          <Highlight attribute="name" hit={hit} tagName="mark" />
        </Link>
        <p className={classes.price}>
          $<Highlight attribute="price" hit={hit} tagName="mark" />
        </p>
      </div>
    </div>
  );
};
export default Hit;
