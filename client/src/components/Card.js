import classes from "./Card.module.css";

const Card = ({ showcase }) => {
  return (
    <div className={classes.card}>
      <img src={showcase.image.url} alt="Test"></img>
      <a className={classes.slideOver} href="/shop">
        <h3>{showcase.name}</h3>
        <p>{showcase.description}</p>
      </a>
    </div>
  );
};

export default Card;
