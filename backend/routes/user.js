const express = require("express");
const router = express.Router();
const controller = require("../controller/user");
const protect = require("../middlewares/auth");

router
  .route("/profile")
  .get(protect.auth, controller.getUserProfile)
  .put(protect.auth, controller.updateUserprofile);
router.route("/login").post(controller.login);
router.route("/register").post(controller.signup);
router.route("/getusers").get(protect.auth, protect.sellerAndAdmin, controller.getUsers);
router.route("/deleteUser/:id").delete(protect.auth, protect.admin, controller.deleteUser);
router.route("/updateUser/:id").put(protect.auth, protect.admin, controller.updateUserbyId);
router.route("/:id").get(protect.auth, protect.sellerAndAdmin, controller.getUserbyId);

module.exports = router;
