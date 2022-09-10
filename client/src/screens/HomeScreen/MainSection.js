import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../actions/category";

import Carousel from "react-multi-carousel";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Container from "../../components/Container";

import trolly from "./images/xhero-banner.png.pagespeed.ic.Da3KtaVoQv.webp";
import classes from "./MainSection.module.css";
import "react-multi-carousel/lib/styles.css"; 

import showcase1 from "./images/xhero-slide1.png.pagespeed.ic.KZViXlyXiG.webp";
import showcase2 from "./images/xhero-slide2.png.pagespeed.ic.je2nitqAw1.webp";
import showcase3 from "./images/xhero-slide3.png.pagespeed.ic.jjMnTdDbyV.webp";

const showcases = [
  {
    image: showcase1,
    text: "That Bring The Style",
    category: "Shirts",
  },
  {
    image: showcase2,
    text: "Just Right Fit",
    category: "Pants",
  },
  {
    image: showcase3,
    text: "Move With You",
    category: "Jeans",
  },
];
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
};
const MainSection = () => {
  const dispatch = useDispatch();

  const categoryAll = useSelector((state) => state.categoryAll);
  const { loading, error, categories } = categoryAll;

  useEffect(() => {
    dispatch(actions.getCategories());
  }, [dispatch]);

  console.log(categories)
  return (
    <>
      <div className={classes.heroBanner}>
        <Container>
          <div className={classes.content}>
            <img className={classes.imageFluid} src={trolly} alt="Trolly" />
            <div className={classes.intro}>
              <h4>Shop is fun</h4>
              <h1>Browse Our Premium Product</h1>
              <p>
                Us which over of signs divide dominion deep fill bring they're
                meat beho upon own earth without morning over third. Their male
                dry. They are great appear whose land fly grass.
              </p>
              <a href="/shop">Browse Now</a>
            </div>
          </div>
        </Container>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
      <div className={classes.showcases}>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {categories.map((category) => (
            <Card key={category._id} showcase={category} />
          ))}
        </Carousel>
      </div>
      )}
    </>
  );
};

export default MainSection;
