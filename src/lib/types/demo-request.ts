// src/lib/types/demo-request.ts
import { z } from "zod";

export const DemoRequestInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  mobile: z.string(),
  message: z.string(),
});
export type DemoRequestInput = z.infer<typeof DemoRequestInputSchema>;

export const DemoRequestStatusSchema = z.enum(["Pending", "Contacted", "Completed", "Cancelled"]);
export type DemoRequestStatus = z.infer<typeof DemoRequestStatusSchema>;

export const DemoRequestSchema = DemoRequestInputSchema.extend({
  id: z.string(), // Firestore document ID
  date: z.string(),
  status: DemoRequestStatusSchema,
});
export type DemoRequest = z.infer<typeof DemoRequestSchema>;
