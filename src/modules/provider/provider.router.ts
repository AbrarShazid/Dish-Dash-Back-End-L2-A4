import { Router } from "express";
import { providerController } from "./provider.controller";
import authMiddleware, { UserRole } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/", providerController.getAllProviders);

router.get(
  "/my-profile",
  authMiddleware(UserRole.PROVIDER),
  providerController.providerMyProfile,
);

router.get("/:providerId", providerController.getMenuByProvider);

router.patch(
  "/become-provider",
  authMiddleware(UserRole.CUSTOMER),
  providerController.becomeProvider,
);
router.patch(
  "/provider-profile",
  authMiddleware(UserRole.PROVIDER),
  providerController.updateProviderProfile,
);

export const providerRoute: Router = router;
