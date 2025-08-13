'use server';
/**
 * @fileOverview Manages payment gateway integration with UddoktaPay.
 *
 * - createPayment - Initiates a payment request and returns a payment URL.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CreatePaymentInputSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  amount: z.number(),
  metadata: z.object({
    orderId: z.string(),
    plan: z.string(),
  }),
});
export type CreatePaymentInput = z.infer<typeof CreatePaymentInputSchema>;

const CreatePaymentOutputSchema = z.object({
  payment_url: z.string().url(),
});
export type CreatePaymentOutput = z.infer<typeof CreatePaymentOutputSchema>;

const createPaymentFlow = ai.defineFlow(
  {
    name: 'createPaymentFlow',
    inputSchema: CreatePaymentInputSchema,
    outputSchema: CreatePaymentOutputSchema,
  },
  async (input) => {
    const apiKey = process.env.UDDOKTAPAY_API_KEY;
    const apiUrl = process.env.UDDOKTAPAY_API_URL;
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

    if (!apiKey || apiKey === "YOUR_UDDOKTAPAY_API_KEY") {
      throw new Error("UddoktaPay API Key not configured.");
    }
    if (!apiUrl) {
        throw new Error("UddoktaPay API URL not configured.");
    }
     if (!hostUrl) {
        throw new Error("Host URL not configured.");
    }

    const payload = {
      full_name: input.fullName,
      email: input.email,
      amount: input.amount,
      metadata: input.metadata,
      redirect_url: `${hostUrl}/checkout/success`,
      cancel_url: `${hostUrl}/checkout/cancel`,
      // webhook_url: `${hostUrl}/api/webhooks/uddoktapay`, // Optional: for server-to-server notifications
    };

    try {
      const response = await fetch(`${apiUrl}/api/checkout`, {
        method: 'POST',
        headers: {
          'RT-UDDOKTAPAY-API-KEY': apiKey,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('UddoktaPay API Error:', errorBody);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();

      if (result.status === true && result.payment_url) {
        return { payment_url: result.payment_url };
      } else {
        console.error('Failed to create payment link:', result.message || 'Unknown error');
        throw new Error(result.message || "Failed to get payment URL from UddoktaPay.");
      }
    } catch (error) {
      console.error('Error creating UddoktaPay payment:', error);
      throw error; // Re-throw the error to be handled by the client
    }
  }
);


export async function createPayment(input: CreatePaymentInput): Promise<CreatePaymentOutput> {
  return createPaymentFlow(input);
}
