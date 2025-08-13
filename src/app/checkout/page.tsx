// app/checkout/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { useToast } from "@/hooks/use-toast";
import React from 'react';

const checkoutFormSchema = z.object({
  pharmacyName: z.string().min(2, { message: "Pharmacy name must be at least 2 characters." }),
  ownerName: z.string().min(2, { message: "Owner name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().min(10, { message: "Mobile number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  plan: z.string(),
  price: z.string(),
});

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const plan = searchParams.get('plan') || 'N/A';
  const price = searchParams.get('price') || 'N/A';

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      pharmacyName: "",
      ownerName: "",
      email: "",
      mobile: "",
      address: "",
      plan: plan,
      price: price,
    },
  });

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log("Checkout form submitted:", values);
    // Here you would typically handle the order submission to your backend
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. We will be in touch shortly.",
    });
    form.reset();
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-24">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Checkout</CardTitle>
            <CardDescription>You've selected the <span className="font-bold text-primary">{plan}</span> plan. Please fill out the form below to complete your order.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="pharmacyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pharmacy Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Pharmacy LLC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+8801234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="123 Main Street, Dhaka, Bangladesh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-lg font-semibold">
                    <p>Plan: <span className="text-primary">{plan}</span></p>
                    <p>Price: <span className="text-primary">{price}</span></p>
                </div>

                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6">
                  Confirm Order & Proceed to Payment
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
