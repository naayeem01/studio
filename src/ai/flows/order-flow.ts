
'use server';
/**
 * @fileOverview A simple in-memory order management system.
 *
 * - submitOrder - Creates a new order and stores it.
 * - getOrders - Retrieves all stored orders.
 * - OrderInput - The input type for creating a new order.
 * - Order - The full order type, including server-generated fields.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { format } from 'date-fns';

const CustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const OrderInputSchema = z.object({
  customer: CustomerSchema,
  plan: z.string(),
  totalPrice: z.string(),
  status: z.string(),
  addons: z.array(z.string()),
  pharmacyName: z.string(),
  mobile: z.string(),
  address: z.string(),
  posDeliveryAddress: z.string().optional(),
});
export type OrderInput = z.infer<typeof OrderInputSchema>;

export const OrderSchema = OrderInputSchema.extend({
  orderId: z.string(),
  date: z.string(),
});
export type Order = z.infer<typeof OrderSchema>;

// In-memory store for orders. NOTE: This will be cleared on server restart.
const orders: Order[] = [];

let orderCounter = 1005; // Start after mock data

export const submitOrderFlow = ai.defineFlow(
  {
    name: 'submitOrderFlow',
    inputSchema: OrderInputSchema,
    outputSchema: z.object({ orderId: z.string() }),
  },
  async (input) => {
    orderCounter++;
    const newOrder: Order = {
      ...input,
      orderId: `OC-${orderCounter}`,
      date: format(new Date(), 'yyyy-MM-dd'),
    };
    orders.push(newOrder);
    console.log('New order submitted:', newOrder);
    return { orderId: newOrder.orderId };
  }
);

export const getOrdersFlow = ai.defineFlow(
  {
    name: 'getOrdersFlow',
    inputSchema: z.void(),
    outputSchema: z.array(OrderSchema),
  },
  async () => {
    // Return orders in reverse chronological order
    return [...orders].reverse();
  }
);

// Exported wrapper functions for client-side usage
export async function submitOrder(input: OrderInput): Promise<{ orderId: string }> {
  return submitOrderFlow(input);
}

export async function getOrders(): Promise<Order[]> {
  return getOrdersFlow();
}
