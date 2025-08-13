import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ReceiptText,
  Boxes,
  LineChart,
  CalendarClock,
  Store,
  Fingerprint,
} from "lucide-react";
import React from "react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <ReceiptText />,
    title: "POS বিলিং (বাংলা ও ইংরেজি)",
    description: "সহজেই বাংলা ও ইংরেজিতে বিল তৈরি করুন এবং প্রিন্ট করুন।",
  },
  {
    icon: <Boxes />,
    title: "স্টক ও ইনভেন্টরি ম্যানেজমেন্ট",
    description: "আপনার সকল ঔষধের স্টক ট্র্যাক করুন এবং স্বয়ংক্রিয়ভাবে আপডেট করুন।",
  },
  {
    icon: <LineChart />,
    title: "সেলস রিপোর্ট এবং অ্যানালিটিক্স",
    description: "দৈনিক, সাপ্তাহিক, এবং মাসিক বিক্রয়ের বিস্তারিত রিপোর্ট দেখুন।",
  },
  {
    icon: <CalendarClock />,
    title: "মেয়াদোত্তীর্ণ ঔষধের সতর্কতা",
    description: "মেয়াদ শেষ হওয়ার আগেই ঔষধের জন্য অ্যালার্ট পান।",
  },
  {
    icon: <Store />,
    title: "মাল্টি-ব্রাঞ্চ সাপোর্ট",
    description: "একই সফটওয়্যার দিয়ে আপনার একাধিক ফার্মেসী শাখা পরিচালনা করুন।",
  },
  {
    icon: <Fingerprint />,
    title: "ZKTeco ডিভাইস ইন্টিগ্রেশন",
    description: "বায়োমেট্রিক ডিভাইস ইন্টিগ্রেট করে নিরাপত্তা ও উপস্থিতি নিশ্চিত করুন।",
  },
];

export function Features() {
  return (
    <section id="features" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        Key{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Features
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground font-bangla">
        আপনার ফার্মেসী পরিচালনার জন্য প্রয়োজনীয় সকল আধুনিক ফিচার এখানে রয়েছে।
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/40 flex flex-col items-center justify-center text-center p-6">
            <div className="mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                {React.cloneElement(icon, { className: "w-8 h-8" })}
              </div>
            </div>
            <CardHeader className="p-0 mb-2">
              <CardTitle className="font-bangla">{title}</CardTitle>
            </CardHeader>
            <CardDescription className="font-bangla text-muted-foreground">
              {description}
            </CardDescription>
          </Card>
        ))}
      </div>
    </section>
  );
}
