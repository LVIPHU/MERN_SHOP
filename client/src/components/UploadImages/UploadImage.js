// import axios from "axios";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Container,
//   Form,
//   Button,
//   Row,
//   Col,
//   Image,
//   Card,
// } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../../../../components/Message";
// import Loader from "../../../../components/Loader";
// import { createProduct } from "../../../../actions/productActions";
// import { PRODUCT_CREATE_RESET } from "../../../../constants/productConstants";
// import DropNotif from "../../../../components/Modal/Modal";
// import MarkdownEditor from "../../../../components/TextEditor/MarkdownEditor";

// import actions from "../../../../actions/upload";

// useEffect(() => {
//     dispatch(contactActions.getContacts());
//   }, []);

// const UploadImage = ({ showcase }) => {
//   return (
//     <>
//       <Form.Group controlId="image" className="mb-3">
//         <Form.Label>Image</Form.Label>
//         {/* <Form.Control
//       className="mb-3"
//       type="text"
//       placeholder="Enter image URL"
//       value={image.url}
//       onChange={(e) => setImage(e.target.value)}
//     ></Form.Control> */}
//         <Form.File
//           id="image-file"
//           custom
//           onChange={uploadFileHandler}
//         ></Form.File>
//       </Form.Group>
//       <Row>
//         {listImage &&
//           listImage.map((item) => (
//             <Col xs={6} md={2} style={{ paddingBottom: "12px" }}>
//               {/* <Card className="text-center" style={{ width: "12rem" }} key={item.public_id}>
//             <Card.Img variant="top" src={item.url} />
//             <Card.Body>
//               {menu(item)}
//             </Card.Body>
//           </Card> */}
//               <Image src={item.url} />
//               {menu(item)}
//             </Col>
//           ))}
//         {uploading && (
//           <Card style={{ width: "12rem" }}>
//             <Loader />
//           </Card>
//         )}
//       </Row>
//     </>
//   );
// };

// export default UploadImage;
