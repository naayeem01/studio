
'use server';
/**
 * @fileOverview A simple in-memory order management system.
 *
 * - submitOrder - Creates a new order and stores it.
 * - getOrders - Retrieves all stored orders.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { format } from 'date-fns';
import { OrderInputSchema, OrderSchema, type Order, type OrderInput } from '@/lib/types/order';


// In-memory store for orders. NOTE: This will be cleared on server restart.
const orders: Order[] = [];

let orderCounter = 1005; // Start after mock data

const submitOrderFlow = ai.defineFlow(
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

const getOrdersFlow = ai.defineFlow(
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
