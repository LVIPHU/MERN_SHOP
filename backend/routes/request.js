const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");
const controller = require("../controller/request");

router.route("/approve/:id").put(protect.auth, protect.admin, controller.approveUserRequest)
router.route("/newSeller").post(protect.auth, controller.createRequest)
router.route("/all").get(protect.auth, protect.admin, controller.getAllRequest)
router.route("/:id").get(protect.auth, protect.admin, controller.getRequestById)

module.exports = router;