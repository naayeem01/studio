// src/lib/types/pricing.ts
import { z } from "zod";

export const PriceSchema = z.object({
    monthly: z.string(),
    yearly: z.string(),
});

export const RegularPriceSchema = z.object({
    monthly: z.string(),
    yearly: z.string(),
}).nullable();

export const PricingTierSchema = z.object({
    name: z.string(),
    price: PriceSchema,
    regularPrice: RegularPriceSchema,
    description: z.string(),
    features: z.array(z.string()),
    popular: z.boolean(),
});
export type PricingTier = z.infer<typeof PricingTierSchema>;

export const AddonSchema = z.object({
    id: z.string(),
    title: z.string(),
    price: z.string(),
});
export type Addon = z.infer<typeof AddonSchema>;

export const PricingDataSchema = z.object({
    pricingTiers: z.array(PricingTierSchema),
    addons: z.array(AddonSchema),
});
export type PricingData = z.infer<typeof PricingDataSchema>;
