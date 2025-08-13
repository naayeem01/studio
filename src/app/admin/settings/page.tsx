// src/app/admin/settings/page.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { getPricingData, updatePricingData } from "@/ai/flows/pricing-flow";
import { type PricingTier, PricingTierSchema } from "@/lib/types/pricing";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsFormSchema = z.object({
  pricingTiers: z.array(PricingTierSchema),
});

type SettingsFormValues = z.infer<typeof SettingsFormSchema>;

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      pricingTiers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pricingTiers",
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getPricingData();
        form.reset({ pricingTiers: data.pricingTiers });
      } catch (error) {
        console.error("Failed to load pricing data:", error);
        toast({ title: "Error", description: "Could not load settings.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [form, toast]);

  const onSubmit = (data: SettingsFormValues) => {
    startTransition(async () => {
      try {
        const success = await updatePricingData(data.pricingTiers);
        if (success) {
          toast({ title: "Success", description: "Pricing settings saved successfully." });
        } else {
          toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
        }
      } catch (error) {
        console.error("Failed to save settings:", error);
        toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
      }
    });
  };

  if (loading) {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Settings</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Pricing</CardTitle>
                    <CardDescription>Update the details for your pricing plans.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Manage Pricing</CardTitle>
              <CardDescription>Update the details for your pricing plans. Click save when you're done.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((tier, tierIndex) => (
                <Card key={tier.id} className="p-4 bg-muted/50">
                  <h3 className="text-lg font-semibold mb-2">{tier.name} Plan</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name={`pricingTiers.${tierIndex}.price.monthly`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Monthly Price (e.g., ৳699)</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                        control={form.control}
                        name={`pricingTiers.${tierIndex}.price.yearly`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Yearly Price (e.g., ৳7,999)</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Features</h4>
                    <FeatureList control={form.control} tierIndex={tierIndex} />
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Settings
          </Button>
        </form>
      </Form>
    </div>
  );
}

// Helper component for managing the feature list
function FeatureList({ control, tierIndex }: { control: any; tierIndex: number }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `pricingTiers.${tierIndex}.features`,
  });

  return (
    <div className="space-y-2">
      {fields.map((feature, featureIndex) => (
        <div key={feature.id} className="flex items-center gap-2">
           <Controller
                name={`pricingTiers.${tierIndex}.features.${featureIndex}`}
                control={control}
                render={({ field }) => <Input {...field} placeholder="Feature description" />}
            />
          <Button type="button" variant="ghost" size="icon" onClick={() => remove(featureIndex)}>
            <Trash className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append("")}>
        <Plus className="mr-2 h-4 w-4" />
        Add Feature
      </Button>
    </div>
  );
}
