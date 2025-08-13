'use server';
/**
 * @fileOverview Manages demo requests.
 *
 * - submitDemoRequest - Creates a new demo request.
 * - getDemoRequests - Retrieves all demo requests.
 * - updateDemoRequestStatus - Updates the status of a specific demo request.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { format } from 'date-fns';
import { 
    DemoRequestInputSchema, 
    DemoRequestSchema, 
    type DemoRequest, 
    type DemoRequestInput,
    type DemoRequestStatus
} from '@/lib/types/demo-request';


// In-memory store for demo requests. NOTE: This will be cleared on server restart.
const demoRequests: DemoRequest[] = [];
let requestCounter = 1;

const submitDemoRequestFlow = ai.defineFlow(
  {
    name: 'submitDemoRequestFlow',
    inputSchema: DemoRequestInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    const newRequest: DemoRequest = {
      ...input,
      id: `DR-${Date.now()}-${requestCounter++}`,
      date: format(new Date(), 'yyyy-MM-dd HH:mm'),
      status: "Pending", // Default status
    };
    demoRequests.push(newRequest);
    console.log('New demo request submitted:', newRequest);
  }
);

const getDemoRequestsFlow = ai.defineFlow(
  {
    name: 'getDemoRequestsFlow',
    inputSchema: z.void(),
    outputSchema: z.array(DemoRequestSchema),
  },
  async () => {
    // Return requests in reverse chronological order
    return [...demoRequests].reverse();
  }
);

const updateDemoRequestStatusFlow = ai.defineFlow(
  {
    name: 'updateDemoRequestStatusFlow',
    inputSchema: z.object({ 
        id: z.string(), 
        status: z.enum(["Pending", "Contacted", "Completed", "Cancelled"]) 
    }),
    outputSchema: z.boolean(),
  },
  async ({ id, status }) => {
    const requestIndex = demoRequests.findIndex(req => req.id === id);
    if (requestIndex === -1) {
      console.error(`Demo request with ID ${id} not found.`);
      return false;
    }
    demoRequests[requestIndex].status = status;
    console.log(`Updated status for demo request ${id} to ${status}`);
    return true;
  }
);


// Exported wrapper functions for client-side usage
export async function submitDemoRequest(input: DemoRequestInput): Promise<void> {
  return submitDemoRequestFlow(input);
}

export async function getDemoRequests(): Promise<DemoRequest[]> {
  return getDemoRequestsFlow();
}

export async function updateDemoRequestStatus(id: string, status: DemoRequestStatus): Promise<boolean> {
    return updateDemoRequestStatusFlow({ id, status });
}
