// src/lib/types/order.ts
import { z } from "zod";

const CustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const OrderStatusSchema = z.enum(["Pending Payment", "Paid", "Processing", "Shipped", "Cancelled"]);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const OrderInputSchema = z.object({
  customer: CustomerSchema,
  plan: z.string(),
  totalPrice: z.string(),
  status: OrderStatusSchema,
  addons: z.array(z.string()),
  pharmacyName: z.string(),
  mobile: z.string(),
  address: z.string(),
  posDeliveryAddress: z.string().optional(),
});
export type OrderInput = z.infer<typeof OrderInputSchema>;

export const OrderSchema = OrderInputSchema.extend({
  id: z.string(), // Firestore document ID
  orderId: z.string(),
  date: z.string(),
});
export type Order = z.infer<typeof OrderSchema>;
