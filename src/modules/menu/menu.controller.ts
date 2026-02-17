import { Request, Response } from "express";
import { menuService } from "./menu.service";

const addMenuItem = async (req: Request, res: Response) => {
  try {
    const result = await menuService.addMenuItem(
      req.user?.id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      data: result,
      message: "Menu item added successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed",
    });
  }
};

const updateMenuItem = async (req: Request, res: Response) => {
 try {
   if (!req.params.id) {
     return res.status(400).json({
       success: false,
       message: "Meal ID is required",
     });
   }


   const result = await menuService.updateMenuItem(
     req.user?.id as string,
     req.params.id as string,
     req.body,
   );


   res.status(200).json({
     success: true,
     data: result,
     message: "Menu item updated successfully",
   });
 } catch (error: any) {
   res.status(400).json({
     success: false,
     message: error.message || "Failed to update menu item",
   });
 }
};




export const menuController = {
  addMenuItem,
  updateMenuItem,
  // getAllMenuItems,
  // getMenuItemById,
};
