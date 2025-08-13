
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
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


const checkoutFormSchema = z.object({
  pharmacyName: z.string().min(2, { message: "ফার্মেসীর নাম কমপক্ষে ২টি অক্ষরের হতে হবে।" }),
  ownerName: z.string().min(2, { message: "মালিকের নাম কমপক্ষে ২টি অক্ষরের হতে হবে।" }),
  email: z.string().email({ message: "অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা লিখুন।" }),
  mobile: z.string().min(10, { message: "মোবাইল নম্বর কমপক্ষে ১০ সংখ্যার হতে হবে।" }),
  address: z.string().min(5, { message: "ঠিকানা কমপক্ষে ৫টি অক্ষরের হতে হবে।" }),
  posDeliveryAddress: z.string().optional(),
  plan: z.string(),
  price: z.string(),
  addons: z.array(z.string()),
});

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [showPosAddress, setShowPosAddress] = useState(false);
  const [isOrderConfirmedDialogOpen, setIsOrderConfirmedDialogOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");


  const plan = searchParams.get('plan') || 'N/A';
  const price = searchParams.get('price') || 'N/A';
  const addons = searchParams.getAll('addon');

  useEffect(() => {
    // Show the delivery address field if any hardware addon is selected
    if (addons.includes('pos-printer') || addons.includes('barcode-scanner')) {
      setShowPosAddress(true);
    } else {
      setShowPosAddress(false);
    }
  }, [addons]);

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      pharmacyName: "",
      ownerName: "",
      email: "",
      mobile: "",
      address: "",
      posDeliveryAddress: "",
      plan: plan,
      price: price,
      addons: addons,
    },
  });

  // Add conditional validation for posDeliveryAddress
  useEffect(() => {
    form.trigger('posDeliveryAddress');
  }, [showPosAddress, form]);

  const conditionalSchema = checkoutFormSchema.superRefine((data, ctx) => {
    if (showPosAddress && (!data.posDeliveryAddress || data.posDeliveryAddress.length < 5)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['posDeliveryAddress'],
            message: 'POS ডেলিভারির ঠিকানা কমপক্ষে ৫টি অক্ষরের হতে হবে।',
        });
    }
  });
  
  form.resolver = zodResolver(conditionalSchema);


  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log("Checkout form submitted:", values);
    // Here you would typically handle the order submission to your backend
    
    // Generate a simple random order number for confirmation
    const newOrderNumber = `OC-${Math.floor(Math.random() * 90000) + 10000}`;
    setOrderNumber(newOrderNumber);
    setIsOrderConfirmedDialogOpen(true);
  }

  const handleDialogClose = () => {
    setIsOrderConfirmedDialogOpen(false);
    form.reset({
        // Keep the plan, price, etc.
        plan: form.getValues('plan'),
        price: form.getValues('price'),
        addons: form.getValues('addons'),
        // Reset user-filled fields
        pharmacyName: "",
        ownerName: "",
        email: "",
        mobile: "",
        address: "",
        posDeliveryAddress: "",
    });
  }
  
  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container py-12 md:py-24">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bangla">চেকআউট</CardTitle>
              <CardDescription className="font-bangla">আপনি <span className="font-bold text-primary">{plan}</span> প্ল্যানটি নির্বাচন করেছেন। আপনার অর্ডারটি সম্পূর্ণ করতে অনুগ্রহ করে নিচের ফর্মটি পূরণ করুন।</CardDescription>
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
                          <FormLabel className="font-bangla">ফার্মেসীর নাম</FormLabel>
                          <FormControl>
                            <Input placeholder="আপনার ফার্মেসী এলএলসি" {...field} />
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
                          <FormLabel className="font-bangla">মালিকের নাম</FormLabel>
                          <FormControl>
                            <Input placeholder="মোঃ আব্দুল্লাহ" {...field} />
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
                        <FormLabel className="font-bangla">ইমেইল ঠিকানা</FormLabel>
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
                        <FormLabel className="font-bangla">মোবাইল নম্বর</FormLabel>
                        <FormControl>
                          <Input placeholder="+৮৮০১২৩৪৫৬৭৮৯০" {...field} />
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
                        <FormLabel className="font-bangla">ফার্মেসীর ঠিকানা</FormLabel>
                        <FormControl>
                          <Textarea placeholder="১২৩ মেইন স্ট্রিট, ঢাকা, বাংলাদেশ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {showPosAddress && (
                    <FormField
                      control={form.control}
                      name="posDeliveryAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bangla">POS হার্ডওয়্যার ডেলিভারির ঠিকানা</FormLabel>
                          <FormControl>
                            <Textarea placeholder="যে ঠিকানায় আমরা হার্ডওয়্যার পাঠাব সেটি লিখুন।" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="text-lg font-semibold border-t pt-4 mt-4 font-bangla">
                      <p>প্ল্যান: <span className="text-primary">{plan}</span></p>
                      {addons.length > 0 && (
                         <p>অ্যাড-অন: <span className="text-primary text-sm">{addons.join(', ')}</span></p>
                      )}
                      <p className="text-2xl mt-2">মোট মূল্য: <span className="text-primary font-bold">{price}</span></p>
                  </div>

                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 font-bangla">
                  অর্ডার নিশ্চিত করুন এবং পেমেন্টের জন্য এগিয়ে যান
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>

      <AlertDialog open={isOrderConfirmedDialogOpen} onOpenChange={setIsOrderConfirmedDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bangla">অর্ডার সফলভাবে প্লেস করা হয়েছে!</AlertDialogTitle>
            <AlertDialogDescription className="font-bangla">
            আপনার কেনার জন্য ধন্যবাদ। আপনার অর্ডার নম্বর হলো <span className="font-bold text-primary">{orderNumber}</span>। আমরা শীঘ্রই আপনার সাথে আরও বিস্তারিত তথ্য নিয়ে যোগাযোগ করব।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogClose} className="font-bangla">বন্ধ করুন</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
