
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

async function sendSms(to: string, message: string) {
    const apiKey = process.env.SMS_API_KEY;
    if (!apiKey || apiKey === "YOUR_API_KEY") {
        console.warn("SMS API Key not configured. Skipping SMS.");
        return;
    }

    const formData = new FormData();
    formData.append('api_key', apiKey);
    formData.append('msg', message);
    formData.append('to', to);

    try {
        const response = await fetch('https://api.sms.net.bd/sendsms', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json(); // sms.net.bd seems to return JSON
        if (result.status === 'success') {
            console.log('SMS sent successfully to:', to);
        } else {
            console.error('Failed to send SMS:', result.response_msg || 'Unknown error');
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
}


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

    // Send confirmation SMS
    const smsMessage = `Thanks for your order at OushodCloud! Your order number is ${newOrder.orderId}. We will contact you shortly.`;
    await sendSms(newOrder.mobile, smsMessage);

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
