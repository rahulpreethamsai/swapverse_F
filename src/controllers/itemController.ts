import Item from "../models/itemSchema.js";
import type { Request, Response } from "express";


export async function getItemsController(req: Request, res: Response) {
  try {
    const items = await Item.find().populate("owner", "name email");
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
}


export async function getItemIdController(req: Request, res: Response) {
  try {
    const item = await Item.findById(req.params.id).populate("owner", "name email");
    if (!item) return res.status(404).json({ message: "Item Not Found", success: false });
    res.status(200).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
}


export async function getMyItemsController(req: any, res: Response) {
  try {
    const myItems = await Item.find({ owner: req.user?.id });
    res.status(200).json({ success: true, myItems });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
}

export async function postItemsController(req: any, res: Response) {
  try {
    const { name, description, category, estimatedValue, condition, images } = req.body;

    if (!name || !description || !category || !estimatedValue || !condition || !images) {
      return res.status(400).json({
        message: "All fields are mandatory",
        success: false
      });
    }

    const newItem = await Item.create({
      name,
      description,
      category,
      estimatedValue,
      condition,
      images,
      owner: req.user?.id,
    });

    res.status(201).json({
      message: "Item Posted Successfully",
      items: [newItem],  
      success: true,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
}


export async function putItemIdController(req: any, res: Response) {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) return res.status(404).json({ message: "Item Not Found", success: false });

    if (item.owner.toString() !== req.user?.id && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Item Updated Successfully", success: true, item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
}

export async function deleteItemIdController(req: any, res: Response) {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) return res.status(404).json({ message: "Item Not Found", success: false });

    if (item.owner.toString() !== req.user?.id && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Item Deleted Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
}