import Dispute from "../models/disputeSchema.js";
import type { Response } from "express";

export async function raiseDispute(req: any, res: Response) {
  try {
    const { swapId, evidence } = req.body;

    if (!swapId) {
        return res.status(400).json({ message: "swapId is required" });
    }

    const dispute = await Dispute.create({
      swapId,
      raisedBy: req.user._id || req.user.id,
      evidence,
    });

    res.status(201).json(dispute);
  } catch (error) {
    console.log("DISPUTE ERROR:", error);
    console.error(error);
    res.status(500).json({ message: "Error raising dispute", error });
  }
};



export async function getAllDisputes(req: any, res: Response){
  try {
    const disputes = await Dispute.find().populate("swapId").populate("raisedBy", "name");
    res.status(200).json(disputes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching disputes", error });
  }
};


export const resolveDispute = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { resolution, status } = req.body;

    const dispute = await Dispute.findByIdAndUpdate(
      id,
      {
        resolution,
        status: "resolved",
        adminId: req.user._id,
        resolvedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json(dispute);
  } catch (error) {
    res.status(500).json({ message: "Error resolving dispute", error });
  }
};
