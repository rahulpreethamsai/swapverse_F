import Review from "../models/reviewSchema.js";
import type { Response } from "express";
import Swap from "../models/swapSchema.js";

export async function createReview(req: any, res: Response){
  try {
    const { swapId, toUserId, rating, comment } = req.body;
    const fromUserId = req.user._id;

    const swap = await Swap.findById(swapId);
    if (!swap || swap.status !== "closed") {
      return res.status(400).json({ message: "Swap not completed yet" });
    }

    const review = await Review.create({
      swapId,
      fromUserId,
      toUserId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

export async function getUserReviews(req: any, res: Response){
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ toUserId: userId }).populate("fromUserId", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};
