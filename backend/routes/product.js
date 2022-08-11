const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");
const controller = require("../controller/product");

router.route("/:id/reviews").post(protect.auth, controller.createProductReview);
router.route("/trending").get(controller.getTrendingProducts);
router.route("/top").get(controller.getTopProducts);
router.route("/seller").get(protect.auth, controller.getProductsForSeller);
router
  .route("/:id")
  .get(controller.getProductById)
  .delete(protect.auth, protect.sellerAndAdmin, controller.deleteProduct)
  .put(protect.auth, protect.sellerAndAdmin, controller.updatedProduct);
router
  .route("/")
  .get(controller.getProducts)
  .post(protect.auth, protect.sellerAndAdmin, controller.createProduct);
module.exports = router;
