// src/app/checkout/success/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-24 flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardHeader className="items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-3xl font-bangla">পেমেন্ট সফল হয়েছে!</CardTitle>
            <CardDescription className="font-bangla pt-2">
              আপনার কেনার জন্য ধন্যবাদ। আপনার অর্ডারটি নিশ্চিত করা হয়েছে। আমরা শীঘ্রই আপনার সাথে আরও বিস্তারিত তথ্য নিয়ে যোগাযোগ করব।
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full font-bangla">
              <Link href="/">হোম পেজে ফিরে যান</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
