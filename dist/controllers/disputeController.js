import Dispute from "../models/disputeSchema.js";
export async function raiseDispute(req, res) {
    try {
        const { swapId, evidence } = req.body;
        if (!swapId) {
            return res.status(400).json({ message: "swapId is required" });
        }
        const dispute = await Dispute.create({
            swapId,
            raisedBy: req.user._id,
            evidence,
        });
        res.status(201).json(dispute);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error raising dispute", error });
    }
}
;
export async function getAllDisputes(req, res) {
    try {
        const disputes = await Dispute.find().populate("swapId").populate("raisedBy", "name");
        res.status(200).json(disputes);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching disputes", error });
    }
}
;
export const resolveDispute = async (req, res) => {
    try {
        const { id } = req.params;
        const { resolution, status } = req.body;
        const dispute = await Dispute.findByIdAndUpdate(id, {
            resolution,
            status: "resolved",
            adminId: req.user._id,
            resolvedAt: new Date(),
        }, { new: true });
        res.status(200).json(dispute);
    }
    catch (error) {
        res.status(500).json({ message: "Error resolving dispute", error });
    }
};
//# sourceMappingURL=disputeController.js.map