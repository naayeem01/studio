
'use server';
/**
 * @fileOverview A simple order management system using Firebase Firestore.
 *
 * - submitOrder - Creates a new order and stores it.
 * - getOrders - Retrieves all stored orders.
 * - updateOrderStatus - Updates the status of a specific order.
 * - deleteOrder - Deletes a specific order.
 * - sendPaymentLinkSms - Sends an SMS with the payment link.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { format } from 'date-fns';
import { 
    OrderInputSchema, 
    OrderSchema, 
    type Order, 
    type OrderInput,
    type OrderStatus
} from '@/lib/types/order';
import { addDocument, getDocuments, updateDocument, deleteDocument } from '@/lib/firebase/firestore';

const ORDERS_COLLECTION = 'orders';

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

        const result = await response.json();
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
    outputSchema: OrderSchema,
  },
  async (input) => {
    const newOrderData: Omit<Order, 'orderId' | 'date'> = {
        ...input,
    };
    
    // Generate a temporary ID to use for the document ID in Firestore
    const tempId = `OC-${Date.now()}`;
    const finalOrderData: Omit<Order, 'id'> = {
        ...newOrderData,
        orderId: tempId,
        date: format(new Date(), 'yyyy-MM-dd HH:mm'),
    }

    // Use the tempId as the document ID in Firestore
    await addDocument(ORDERS_COLLECTION, finalOrderData, tempId);
    
    console.log('New order submitted to Firestore:', finalOrderData);
    
    return { ...finalOrderData, id: tempId };
  }
);

const sendPaymentLinkSmsFlow = ai.defineFlow(
    {
        name: 'sendPaymentLinkSmsFlow',
        inputSchema: z.object({
            mobile: z.string(),
            orderId: z.string(),
            paymentUrl: z.string().url(),
        }),
        outputSchema: z.void(),
    },
    async ({ mobile, orderId, paymentUrl }) => {
        const smsMessage = `Thanks for your order at OushodCloud! Your order ID is ${orderId}. Please complete your payment using this link: ${paymentUrl}`;
        await sendSms(mobile, smsMessage);
    }
);

const getOrdersFlow = ai.defineFlow(
  {
    name: 'getOrdersFlow',
    inputSchema: z.void(),
    outputSchema: z.array(OrderSchema),
  },
  async () => {
    return getDocuments<Order>(ORDERS_COLLECTION, 'date', 'desc');
  }
);

const updateOrderStatusFlow = ai.defineFlow(
  {
    name: 'updateOrderStatusFlow',
    inputSchema: z.object({ 
        orderId: z.string(), 
        status: z.enum(["Pending Payment", "Paid", "Processing", "Shipped", "Cancelled"]) 
    }),
    outputSchema: z.boolean(),
  },
  async ({ orderId, status }) => {
    console.log(`Updating status for order ${orderId} to ${status}`);
    return updateDocument(ORDERS_COLLECTION, orderId, { status });
  }
);

const deleteOrderFlow = ai.defineFlow(
  {
    name: 'deleteOrderFlow',
    inputSchema: z.string(), // Expects orderId
    outputSchema: z.boolean(),
  },
  async (orderId) => {
    console.log(`Deleting order with ID ${orderId}`);
    return deleteDocument(ORDERS_COLLECTION, orderId);
  }
);


// Exported wrapper functions for client-side usage
export async function submitOrder(input: OrderInput): Promise<Order> {
  return submitOrderFlow(input);
}

export async function sendPaymentLinkSms(input: { mobile: string, orderId: string, paymentUrl: string }): Promise<void> {
    return sendPaymentLinkSmsFlow(input);
}

export async function getOrders(): Promise<Order[]> {
  return getOrdersFlow();
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
    return updateOrderStatusFlow({ orderId, status });
}

export async function deleteOrder(orderId: string): Promise<boolean> {
    return deleteOrderFlow(orderId);
}
