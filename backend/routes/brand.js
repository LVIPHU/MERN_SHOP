const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");
const controller = require("../controller/brand");

router
  .route("/")
  .get(controller.getBrands)
  .post(protect.auth, protect.sellerAndAdmin, controller.createBrand);
router
  .route("/:id")
  .get(protect.auth, protect.sellerAndAdmin, controller.getBrandById)
  .put(protect.auth, protect.sellerAndAdmin, controller.updatedBrand)
  .delete(protect.auth, protect.admin, controller.deleteBrand);

module.exports = router;