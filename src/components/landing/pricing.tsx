// components/landing/pricing.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const pricingTiers = [
    {
        name: "Starter",
        price: { monthly: "৳699", yearly: "৳7,999" },
        regularPrice: { monthly: "৳1500", yearly: "৳18,000" },
        description: "ছোট ফার্মেসী এবং স্টার্টআপদের জন্য সেরা।",
        features: ["POS Billing", "Inventory Management", "Sales Reports", "1 User"],
        popular: true,
    },
    {
        name: "Professional",
        price: { monthly: "৳1,999", yearly: "৳19,999" },
        regularPrice: null,
        description: "মাঝারি আকারের ফার্মেসী এবং ক্লিনিকের জন্য।",
        features: ["All Starter features", "Expiry Alerts", "5 Users", "Priority Support", "bKash Payment Gateway"],
        popular: false,
    },
    {
        name: "Enterprise",
        price: { monthly: "Custom", yearly: "Custom" },
        regularPrice: null,
        description: "বড় ফার্মেসী এবং ডিস্ট্রিবিউটরদের জন্য।",
        features: ["All Professional features", "Multi-branch Support", "Advanced Analytics", "Unlimited Users", "Dedicated Support"],
        popular: false,
    }
];

const addons = [
  {
    id: "pos-printer",
    title: "POS Printer",
    price: "৳3,999"
  },
  {
    id: "barcode-scanner",
    title: "Barcode Scanner",
    price: "৳1499"
  }
];

export function Pricing() {
    const [isYearly, setIsYearly] = useState(false);
    const router = useRouter();

    const handleBuyNow = (tierName: string, price: string) => {
        if (tierName === 'Enterprise') {
            // Handle enterprise contact
            console.log('Contacting sales for Enterprise plan');
            return;
        }
        router.push(`/checkout?plan=${encodeURIComponent(tierName)}&price=${encodeURIComponent(price)}`);
    }

    return (
        <section id="pricing" className="container py-24 sm:py-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
                Our{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                Pricing
                </span>
            </h2>
            <p className="text-xl text-muted-foreground text-center mt-4 mb-8 font-bangla">
                আপনার প্রয়োজন অনুযায়ী সেরা প্ল্যানটি বেছে নিন। বার্ষিক প্ল্যানে পান ২০% পর্যন্ত ছাড়!
            </p>

            <Tabs defaultValue="monthly" className="w-48 mx-auto mb-8">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="monthly" className="w-full" onClick={() => setIsYearly(false)}>Monthly</TabsTrigger>
                <TabsTrigger value="yearly" className="w-full" onClick={() => setIsYearly(true)}>Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                {pricingTiers.map((tier) => (
                    <Card key={tier.name} className={cn("flex flex-col transition-transform duration-300 ease-in-out hover:scale-105", tier.popular ? "border-2 border-primary shadow-lg" : "border")}>
                        <CardHeader className="flex-grow-0">
                            <CardTitle>{tier.name}</CardTitle>
                             <div className="flex items-baseline gap-2">
                                <h3 className="text-4xl font-bold">{isYearly ? tier.price.yearly : tier.price.monthly}</h3>
                                {tier.regularPrice && (
                                    <span className="text-lg text-muted-foreground line-through">
                                        {isYearly ? tier.regularPrice.yearly : tier.regularPrice.monthly}
                                    </span>
                                )}
                            </div>
                            <CardDescription className="font-bangla h-12">{tier.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-3">
                                {tier.features.map(feature => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <div className="p-6 pt-0">
                          <Separator className="my-4" />
                          <div className="space-y-4 rounded-lg p-4 bg-primary/5 border border-primary/20 shadow-inner transition-all duration-300 hover:shadow-primary/20 hover:shadow-md">
                            <h4 className="text-sm font-semibold text-center text-primary">Hardware Add-ons</h4>
                            {addons.map(addon => (
                              <Label key={addon.id} htmlFor={`${tier.name}-${addon.id}`} className="flex justify-between items-center cursor-pointer p-2 rounded-md hover:bg-primary/10">
                                <div className="flex items-center gap-3">
                                  <Checkbox id={`${tier.name}-${addon.id}`} />
                                  <span>{addon.title}</span>
                                </div>
                                <span className="font-bold">{addon.price}</span>
                              </Label>
                            ))}
                          </div>
                        </div>

                        <CardFooter>
                            <Button 
                                className={cn("w-full", tier.popular ? "bg-primary hover:bg-primary/90" : "bg-accent text-accent-foreground hover:bg-accent/90")}
                                onClick={() => handleBuyNow(tier.name, isYearly ? tier.price.yearly : tier.price.monthly)}
                            >
                                {tier.name === 'Enterprise' ? "Contact Sales" : "Buy Now"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
