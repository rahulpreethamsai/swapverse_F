import Swap from "../models/swapSchema.js";
export async function newSwapRequest(req, res) {
    try {
        const { itemRequestedId, itemOfferedId, startDate, endDate, proposedAmount } = req.body;
        const swap = await Swap.create({
            fromUserId: req.user.id,
            toUserId: req.body.toUserId,
            itemRequestedId,
            itemOfferedId: itemOfferedId || null,
            depositAmount: proposedAmount || 0,
            startDate,
            endDate,
            status: "proposed"
        });
        res.status(201).json({ message: "Swap Request Sent Successfully", swap, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
;
export async function getUsersSwapsController(req, res) {
    try {
        const userId = req.user.id;
        const userSwaps = await Swap.find({
            $or: [
                { fromUserId: userId },
                { toUserId: userId }
            ]
        }).populate("fromUserId toUserId itemRequestedId itemOfferedId");
        if (!userSwaps || userSwaps.length === 0) {
            return res.status(200).json({ message: "No swaps found for this user", success: true, swaps: [] });
        }
        res.status(200).json({ success: true, swaps: userSwaps });
    }
    catch (error) {
        console.error("Error fetching user swaps:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
;
export async function swapAccepted(req, res) {
    try {
        const swap = await Swap.findById(req.params.id);
        if (!swap)
            return res.status(404).json({ message: "No Swap Found", success: false });
        if (swap.toUserId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized", success: false });
        }
        swap.status = 'in_escrow';
        await swap.save();
        res.status(200).json({ message: "Swap Accepted Successfully, Escrow Initiated", swap, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
;
export async function swapCancelled(req, res) {
    try {
        const swap = await Swap.findById(req.params.id);
        if (!swap)
            return res.status(404).json({ message: "No Swap Found", success: false });
        if (swap.fromUserId.toString() !== req.user.id && swap.toUserId.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized", success: false });
        }
        swap.status = 'cancelled';
        await swap.save();
        res.status(200).json({ message: "Swap Cancelled Successfully", swap, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
;
export async function swapPickedUp(req, res) {
    try {
        const swap = await Swap.findById(req.params.id);
        if (!swap)
            return res.status(404).json({ message: "Swap not found" });
        swap.status = "picked_up";
        await swap.save();
        res.status(200).json({ message: "Pickup Confirmed", swap, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
;
export async function swapReturned(req, res) {
    try {
        const swap = await Swap.findById(req.params.id);
        if (!swap)
            return res.status(404).json({ message: "Swap not found" });
        swap.status = "returned";
        await swap.save();
        res.status(200).json({ message: "Return Confirmed", swap, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
;
export async function swapRaisedDispute(req, res) {
    try {
        const swap = await Swap.findById(req.params.id);
        if (!swap)
            return res.status(404).json({ message: "Swap not found" });
        if (swap.fromUserId.toString() !== req.user.id &&
            swap.toUserId.toString() !== req.user.id)
            return res.status(403).json({ message: "Unauthorized" });
        swap.status = "disputed";
        swap.contract.afterPhotos = req.body.evidencePhotos || [];
        await swap.save();
        res.status(200).json({ message: "Dispute raised successfully", swap, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
;
export async function swapFinished(req, res) {
    try {
        const swap = await Swap.findById(req.params.id);
        if (!swap)
            return res.status(404).json({ message: "Swap not found" });
        if (swap.fromUserId.toString() !== req.user.id &&
            swap.toUserId.toString() !== req.user.id &&
            req.user.role !== "admin")
            return res.status(403).json({ message: "Unauthorized" });
        swap.status = "closed";
        await swap.save();
        res.status(200).json({ message: "Swap finished and closed", swap, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
;
//# sourceMappingURL=swapController.js.map