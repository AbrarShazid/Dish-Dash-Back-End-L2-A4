import { Router } from "express";
import { reviewController } from "./review.controller";
import authMiddleware, { UserRole } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/meal/:mealId", reviewController.getReviewsByMeal);

router.post(
  "/:mealId",
  authMiddleware(UserRole.CUSTOMER),
  reviewController.createReview,
);

export const reviewRouter: Router = router;
