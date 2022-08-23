import { useState, useEffect } from "react";
import Rating from "../../../components/Rating/Rating";
import Review from "../../../components/Review/Review";
import classes from "./ProductReview.module.css";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import { Link } from "react-router-dom";
import {
  createProductReview,
  getProductDetail,
} from "../../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../../constants/productConstants";
import { FaStar } from "react-icons/fa";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

const ProductReview = ({ productId }) => {
  const dispatch = useDispatch();

  const colors = {
    yellow: "rgb(248, 232, 37)",
    grey: "#a9a9a9",
  };

  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const [comment, setComment] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetail = useSelector((state) => state.productDetail);
  const { product } = productDetail;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successReview, error: errorReview } = productReviewCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    if (successReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch(getProductDetail(productId));
    }
  }, [dispatch, successReview, productId]);

  const handleClick = (value) => {
    setRating(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };
  return (
    <div className={classes.container}>
      <div className={classes.leftSide}>
        <div className={classes.ratingWrapper}>
          <div className={classes.ratingCard}>
            <h3>Overall</h3>
            <h2>{product.rating}/5</h2>
            <h4>({product.numReviews} Reviews)</h4>
          </div>
          <div className={classes.ratingStart}>
            <h4>Based on {product.numReviews} Reviews </h4>
            <ul className={classes.list}>
              <li>
                <div className={classes.startTitle}>5 Star</div>
                <Rating value={5}></Rating>
                {/* <div className={classes.startPercent}>20%</div> */}
              </li>
              <li>
                <div className={classes.startTitle}>4 Star</div>
                <Rating value={4}></Rating>
                {/* <div className={classes.startPercent}>20%</div> */}
              </li>
              <li>
                <div className={classes.startTitle}>3 Star</div>
                <Rating value={3}></Rating>
                {/* <div className={classes.startPercent}>20%</div> */}
              </li>
              <li>
                <div className={classes.startTitle}>2 Star</div>
                <Rating value={2}></Rating>
                {/* <div className={classes.startPercent}>20%</div> */}
              </li>
              <li>
                <div className={classes.startTitle}>1 Star</div>
                <Rating value={1}></Rating>
                {/* <div className={classes.startPercent}>20%</div> */}
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.reviewSection}>
          <h2>Reviews</h2>
          <div>
            {product.reviews.length === 0 ? (
              <Message>No Review</Message>
            ) : (
              product.reviews.map((review) => (
                <Review
                  key={review._id}
                  name={review.name}
                  createdAt={review.createdAt}
                  comment={review.comment}
                  rating={review.rating}
                ></Review>
              ))
            )}
          </div>
        </div>
      </div>
      <div className={classes.rightSide}>
        {errorReview && <Message variant="danger">{errorReview}</Message>}
        {userInfo ? (
          <Form onSubmit={submitReviewHandler}>
            <Form.Group controlId="rating">
              <h3 className={classes.titleForm}>Rating</h3>
              <div className={classes.stars}>
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={30}
                      onClick={() => handleClick(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={handleMouseLeave}
                      color={
                        (hoverValue || rating) > index
                          ? colors.yellow
                          : colors.grey
                      }
                      style={{
                        marginRight: 10,
                        cursor: "pointer",
                        paddingBottom: "5px",
                        borderColor: "rgb(248, 232, 37)",
                      }}
                    />
                  );
                })}
              </div>
            </Form.Group>
            
            <Form.Group controlId="comment">
              <h3 className={classes.titleForm}>Comment</h3>
              <Form.Control
                as="textarea"
                row="3"
                className={classes.text}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <button className={classes.submitReview}><FileDownloadDoneIcon/>&nbsp;Submit</button>
          </Form>
        ) : (
          <Message>
            Please <Link to="/login">log in</Link> to write a review
          </Message>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
