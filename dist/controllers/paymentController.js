// import type { Request, Response } from "express";
// import Stripe from "stripe";
export {};
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-09-30" as any });
// export const createPaymentIntent = async (req: Request, res: Response) => {
//   try {
//     const { amount, currency = "inr" } = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency,
//       payment_method_types: ["card"],
//     });
//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).json({ message: "Payment intent failed", error });
//   }
// };
// export const handleWebhook = async (req: Request, res: Response) => {
//   try {
//     const event = req.body;
//     if (event.type === "payment_intent.succeeded") {
//       console.log("Payment succeeded for intent:", event.data.object.id);
//     }
//     res.status(200).send("Webhook received");
//   } catch (error) {
//     res.status(400).send("Webhook error");
//   }
// };
//# sourceMappingURL=paymentController.js.map