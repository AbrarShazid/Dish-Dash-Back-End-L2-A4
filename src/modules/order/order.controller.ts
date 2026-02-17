import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;

    const result = await orderService.createOrder(customerId, req.body);
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed",
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const { status } = req.body;

    const result = await orderService.updateOrderStatus(
      req.user!.id,
      req.user!.role,
      orderId as string,
      status,
    );
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed",
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getMyOrders(req.user!.id);
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed",
    });
  }
};

const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getProviderOrders(req.user!.id);
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed",
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrder();
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed",
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const userId = req.user!.id;
    const userRole = req.user!.role;

    const result = await orderService.getOrderById(
      userId,
      userRole,
      orderId as string,
    );
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed",
    });
  }
};

export const orderController = {
  createOrder,
  updateOrderStatus,
  getMyOrders,
  getProviderOrders,
  getAllOrder,
  getOrderById,
};
