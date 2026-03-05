import { Request, Response } from "express";
import { providerService } from "./provider.service";

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const result = await providerService.getAllProviders();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed",
    });
  }
};

const getMenuByProvider = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    const result = await providerService.getMenuByProvider(
      providerId as string,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed",
    });
  }
};

// become provider from customer
const becomeProvider = async (req: Request, res: Response) => {
  try {
    const result = await providerService.becomeProvider(
      req.user?.id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || "Failed, something went wrong!",
    });
  }
};

export const updateProviderProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const payload = req.body;

    const result = await providerService.updateProviderProfile(userId, payload);

    res.json({
      success: true,
      message: "Provider profile updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update provider profile",
    });
  }
};

export const providerMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const result = await providerService.providerMyProfile(userId);

    res.json({
      success: true,
      message: "Provider profile fetch successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get provider profile",
    });
  }
};

export const providerController = {
  getAllProviders,
  getMenuByProvider,
  becomeProvider,
  updateProviderProfile,
  providerMyProfile,
};
