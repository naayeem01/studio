
'use server';
/**
 * @fileOverview Manages demo requests using Firebase Firestore.
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
import { addDocument, getDocuments, updateDocument } from '@/lib/firebase/firestore';

const DEMO_REQUESTS_COLLECTION = 'demoRequests';

const submitDemoRequestFlow = ai.defineFlow(
  {
    name: 'submitDemoRequestFlow',
    inputSchema: DemoRequestInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    const newRequest: Omit<DemoRequest, 'id'> = {
      ...input,
      date: format(new Date(), 'yyyy-MM-dd HH:mm'),
      status: "Pending", // Default status
    };
    await addDocument(DEMO_REQUESTS_COLLECTION, newRequest);
    console.log('New demo request submitted to Firestore:', newRequest);
  }
);

const getDemoRequestsFlow = ai.defineFlow(
  {
    name: 'getDemoRequestsFlow',
    inputSchema: z.void(),
    outputSchema: z.array(DemoRequestSchema),
  },
  async () => {
    return getDocuments<DemoRequest>(DEMO_REQUESTS_COLLECTION, 'date', 'desc');
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
    console.log(`Updating status for demo request ${id} to ${status}`);
    return updateDocument(DEMO_REQUESTS_COLLECTION, id, { status });
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
