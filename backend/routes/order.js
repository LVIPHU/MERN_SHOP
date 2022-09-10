const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");
const controller = require("../controller/order");
const { updateOrderToDelivering } = require("../controller/order");

router
  .route("/")
  .post(protect.auth, controller.addOrderItems)
  .get(protect.auth, protect.sellerAndAdmin, controller.getOrders);
router.route("/myorder").get(protect.auth, controller.getMyOrders);
router.route("/:id").get(protect.auth, controller.getOrderById);
router.route("/:id/pay").put(protect.auth, controller.updateOrderToPaid);
router.route("/:id/delivering").put(protect.auth, protect.sellerAndAdmin, controller.updateOrderToDelivering);
router.route("/:id/deliver").put(protect.auth, controller.updateOrderToDeliver);
router.route("/:id/cancel").put(protect.auth, controller.cancelOrder);

module.exports = router;
