const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");
const controller = require("../controller/category");

router
  .route("/")
  .get(controller.getCategories)
  .post(protect.auth, protect.sellerAndAdmin, controller.createCategory);
router
  .route("/:id")
  .get(protect.auth, protect.sellerAndAdmin, controller.getCategoryById)
  .put(protect.auth, protect.sellerAndAdmin, controller.updatedCategory)
  .delete(protect.auth, protect.admin, controller.deleteCategory);

module.exports = router;
