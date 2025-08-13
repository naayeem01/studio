// src/ai/flows/pricing-flow.ts
'use server';
/**
 * @fileOverview Manages pricing data for the application.
 *
 * - getPricingData - Retrieves the current pricing tiers and addons.
 * - updatePricingData - Updates the pricing tiers.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { pricingTiers as defaultPricingTiers, addons as defaultAddons } from '@/lib/pricing-data';
import { PricingTierSchema, AddonSchema, type PricingData } from '@/lib/types/pricing';

// In-memory store for pricing data. This will be reset on server restart.
// It's initialized with the data from the static file.
let currentPricingData: PricingData = {
    pricingTiers: defaultPricingTiers,
    addons: defaultAddons,
};

const getPricingDataFlow = ai.defineFlow(
  {
    name: 'getPricingDataFlow',
    inputSchema: z.void(),
    outputSchema: z.object({
        pricingTiers: z.array(PricingTierSchema),
        addons: z.array(AddonSchema),
    }),
  },
  async () => {
    return currentPricingData;
  }
);

const updatePricingDataFlow = ai.defineFlow(
  {
    name: 'updatePricingDataFlow',
    inputSchema: z.object({
        pricingTiers: z.array(PricingTierSchema),
    }),
    outputSchema: z.boolean(),
  },
  async ({ pricingTiers }) => {
    // We only allow updating pricing tiers for now. Addons remain static.
    currentPricingData.pricingTiers = pricingTiers;
    console.log('Pricing data updated:', currentPricingData.pricingTiers);
    return true;
  }
);


// Exported wrapper functions
export async function getPricingData(): Promise<PricingData> {
  return getPricingDataFlow();
}

export async function updatePricingData(pricingTiers: z.infer<typeof PricingTierSchema>[]): Promise<boolean> {
  return updatePricingDataFlow({ pricingTiers });
}
