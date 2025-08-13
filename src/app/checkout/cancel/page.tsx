// src/app/checkout/cancel/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { XCircle } from 'lucide-react';

export default function CheckoutCancelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-24 flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardHeader className="items-center">
            <XCircle className="h-16 w-16 text-destructive mb-4" />
            <CardTitle className="text-3xl font-bangla">পেমেন্ট বাতিল করা হয়েছে</CardTitle>
            <CardDescription className="font-bangla pt-2">
              আপনি পেমেন্ট প্রক্রিয়াটি বাতিল করেছেন। আপনার অর্ডারটি সম্পূর্ণ হয়নি। আপনি আবার চেষ্টা করতে পারেন।
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
             <Button asChild className="w-full font-bangla">
              <Link href="/checkout">আবার চেষ্টা করুন</Link>
            </Button>
            <Button asChild variant="outline" className="w-full font-bangla">
              <Link href="/">হোম পেজে ফিরে যান</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
