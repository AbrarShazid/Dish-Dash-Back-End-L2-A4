import { Router } from "express";
import { orderController } from "./order.controller";
import authMiddleware, { UserRole } from "../../middlewares/authMiddleware";

const router = Router();

// customer get orders

router.get(
  "/my-orders",
  authMiddleware(UserRole.CUSTOMER),
  orderController.getMyOrders,
);

//provider get his order
router.get(
  "/provider-orders",
  authMiddleware(UserRole.PROVIDER),
  orderController.getProviderOrders,
);

// admin get all order

router.get(
  "/all-order",
  authMiddleware(UserRole.ADMIN),
  orderController.getAllOrder,
);

//  get  order by id

router.get(
  "/details/:orderId",
  authMiddleware(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN),
  orderController.getOrderById,
);

router.post(
  "/create",
  authMiddleware(UserRole.CUSTOMER),
  orderController.createOrder,
);

router.patch(
  "/:orderId/status",
  authMiddleware(UserRole.CUSTOMER,UserRole.PROVIDER),
  orderController.updateOrderStatus,
);

export const orderRouter: Router = router;
