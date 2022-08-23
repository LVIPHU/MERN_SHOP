const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");
const controller = require("../controller/request");

router.route("/approve/:id").put(protect.auth, protect.sellerAndAdmin, protect.admin, controller.approveUserRequest)
router.route("/newRequest").post(protect.auth, protect.sellerAndAdmin, controller.addRequestItem)
router.route("/all").get(protect.auth, protect.admin, controller.getAllRequest)
router.route("/:id").get(protect.auth, protect.admin, controller.getRequestById)

module.exports = router;