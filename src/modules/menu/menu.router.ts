import { Router } from "express";
import { menuController } from "./menu.controller";
import authMiddleware, { UserRole } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/", menuController.getAllMenuItems);

router.get(
  "/provider",
  authMiddleware(UserRole.PROVIDER),
  menuController.getMenuByProvider,
);

router.get("/:id", menuController.getMenuItemById);

router.post(
  "/add-item",
  authMiddleware(UserRole.PROVIDER),
  menuController.addMenuItem,
);

router.patch(
  "/update/:itemId",
  authMiddleware(UserRole.PROVIDER),
  menuController.updateMenuItem,
);
router.patch(
  "/delete/:itemId",
  authMiddleware(UserRole.PROVIDER),
  menuController.deleteMenuItem,
);

export const menuRouter: Router = router;
