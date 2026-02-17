import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const { mealId } = req.params;

    const { rating, comment } = req.body;
    const result = await reviewService.createReview(
      userId,
      mealId as string,
      rating,
      comment,
    );

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed",
    });
  }
};

const getReviewsByMeal = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;

    const reviews = await reviewService.getReviewsByMeal(mealId as string);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch reviews",
    });
  }
};

export const reviewController = {
  createReview,
  getReviewsByMeal,
};
