var router = require("express").Router();
const orders = require("../../controllers/orders");
const authorization = require("../../middlewares/authorization");
const errors = require("../../middlewares/validator");

router.post(
  "/orders",
  authorization,
  errors.ORDERS.CREATE_ORDER,
  orders.createOrder
);
router.get(
  "/orders/store",
  errors.ORDERS.GET_ALL_ORDERS_BY_STORE,
  orders.getAllOrdersByStore
);
router.get(
  "/orders/:id",
  errors.ORDERS.GET_ORDER_DETAILS,
  orders.getOrderDetails
);
router.patch(
  "/orders/:id",
  errors.ORDERS.UPDATE_ORDER_STATUS,
  orders.updateOrderStatus
);

module.exports = router;
