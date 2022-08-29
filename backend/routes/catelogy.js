const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");
const controller = require("../controller/catelogy");

router
  .route("/")
  .get(controller.getCatelogies)
  .post(protect.auth, protect.sellerAndAdmin, controller.createCatelogy);
router
  .route("/:id")
  .get(protect.auth, protect.sellerAndAdmin, controller.getCatelogyById)
  .put(protect.auth, protect.sellerAndAdmin, controller.updatedCatelogy)
  .delete(protect.auth, protect.admin, controller.deleteCatelogy);

module.exports = router;
