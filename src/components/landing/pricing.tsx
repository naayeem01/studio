"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const pricingTiers = [
    {
        name: "Starter",
        price: { monthly: "৳999", yearly: "৳9,999" },
        description: "ছোট ফার্মেসী এবং স্টার্টআপদের জন্য সেরা।",
        features: ["POS Billing", "Inventory Management", "Sales Reports", "1 User"],
        popular: false,
    },
    {
        name: "Professional",
        price: { monthly: "৳1,999", yearly: "৳19,999" },
        description: "মাঝারি আকারের ফার্মেসী এবং ক্লিনিকের জন্য।",
        features: ["All Starter features", "Multi-branch Support", "Expiry Alerts", "5 Users", "Priority Support"],
        popular: true,
    },
    {
        name: "Enterprise",
        price: { monthly: "Custom", yearly: "Custom" },
        description: "বড় ফার্মেসী এবং ডিস্ট্রিবিউটরদের জন্য।",
        features: ["All Professional features", "ZKTeco Integration", "Advanced Analytics", "Unlimited Users", "Dedicated Support"],
        popular: false,
    }
];

export function Pricing() {
    const [isYearly, setIsYearly] = useState(false);

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
                    <Card key={tier.name} className={cn("flex flex-col", tier.popular ? "border-2 border-primary shadow-lg" : "border")}>
                        <CardHeader className="flex-grow-0">
                            <CardTitle>{tier.name}</CardTitle>
                            <div className="flex gap-0.5">
                                <h3 className="text-4xl font-bold">{isYearly ? tier.price.yearly : tier.price.monthly}</h3>
                                {tier.name !== 'Enterprise' && (
                                <span className="flex flex-col justify-end text-sm mb-1 text-muted-foreground">
                                    {isYearly ? "/year" : "/month"}
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
                        <CardFooter>
                            <Button className={cn("w-full", tier.popular ? "bg-primary hover:bg-primary/90" : "bg-accent text-accent-foreground hover:bg-accent/90")}>
                                {tier.name === 'Enterprise' ? "Contact Sales" : "Start Free Trial"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
