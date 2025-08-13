// components/landing/request-demo-dialog.tsx
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { submitDemoRequest } from "@/ai/flows/demo-request-flow";
import { type DemoRequestInput } from "@/lib/types/demo-request";


const demoRequestSchema = z.object({
  name: z.string().min(2, { message: "নাম কমপক্ষে ২টি অক্ষরের হতে হবে।" }),
  email: z.string().email({ message: "অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা লিখুন।" }),
  mobile: z.string().min(10, { message: "মোবাইল নম্বর কমপক্ষে ১০ সংখ্যার হতে হবে।" }),
  message: z.string().optional(),
});

interface RequestDemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequestDemoDialog({ open, onOpenChange }: RequestDemoDialogProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof demoRequestSchema>>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof demoRequestSchema>) {
    const requestData: DemoRequestInput = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      message: values.message || "",
    }
    
    try {
        await submitDemoRequest(requestData);
        toast({
          title: "আপনার অনুরোধ পাঠানো হয়েছে!",
          description: "ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে একটি ডেমো সময়সূচী করতে যোগাযোগ করব।",
        });
        form.reset();
        onOpenChange(false);
    } catch (error) {
        console.error("Failed to submit demo request:", error);
        toast({
            title: "ত্রুটি",
            description: "দুঃখিত, আপনার অনুরোধ পাঠাতে একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
            variant: "destructive",
        })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bangla">একটি ডেমোর জন্য অনুরোধ করুন</DialogTitle>
          <DialogDescription className="font-bangla">
          নীচের ফর্মটি পূরণ করুন এবং আমরা একটি ব্যক্তিগতকৃত ডেমো সময়সূচী করতে যোগাযোগ করব।
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bangla">পুরো নাম</FormLabel>
                  <FormControl>
                    <Input placeholder="মোঃ আব্দুল্লাহ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bangla">বার্তা (ঐচ্ছিক)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="আপনার ফার্মেসী সম্পর্কে বা আপনার কোন নির্দিষ্ট প্রশ্ন থাকলে আমাদের জানান।" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="font-bangla">
                 বাতিল করুন
                </Button>
              </DialogClose>
              <Button type="submit" className="font-bangla">অনুরোধ জমা দিন</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
