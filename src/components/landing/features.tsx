import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ReceiptText,
  Boxes,
  LineChart,
  CalendarClock,
  Users,
  ShoppingBag,
  Package,
  BookUser,
  History,
  BookCopy,
  FileText,
  Target,
  AlarmClockOff,
  BarChart3,
  Languages,
  BadgeDollarSign
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
    title: "বিক্রয় (Sales)",
    description: "দ্রুত POS, বিলিং ও বিক্রয় রেকর্ড সহজভাবে পরিচালনা করুন।",
  },
  {
    icon: <Users />,
    title: "পার্টি ব্যবস্থাপনা (Parties)",
    description: "সরবরাহকারী, ক্রেতা ও পার্টি কনফিগারেশন।",
  },
  {
    icon: <ShoppingBag />,
    title: "ক্রয় (Purchase)",
    description: "ক্রয় অর্ডার ও ইনভয়েস ম্যানেজ করুন সহজে।",
  },
  {
    icon: <Package />,
    title: "পণ্য তালিকা (Products)",
    description: "মেডিসিন ও পণ্যের ব্যাচ, বারকোড ও বিবরণ রাখুন।",
  },
  {
    icon: <BookUser />,
    title: "বকেয়া তালিকা (Due List)",
    description: "জরুরি বকেয়া ও পরিশোধ অনুস্মারক।",
  },
  {
    icon: <History />,
    title: "ক্রয় তালিকা (Purchase List)",
    description: "সমস্ত ক্রয়ের পূর্ণ ইতিহাস ও ফিল্টার করা রিপোর্ট।",
  },
  {
    icon: <BookCopy />,
    title: "বিক্রয় তালিকা (Sales List)",
    description: "বিক্রয় রেকর্ডসহ গ্রাহক ও সময়ভিত্তিক বিশ্লেষণ।",
  },
  {
    icon: <FileText />,
    title: "লেজার (Ledger)",
    description: "হিসাব, ব্লক ও ট্রানজেকশনের পূর্ণ বিবরণ।",
  },
  {
    icon: <Boxes />,
    title: "স্টক (Stock)",
    description: "রিয়েল-টাইম স্টক ট্র্যাকিং ও ব্যাচ ম্যানেজমেন্ট।",
  },
  {
    icon: <Target />,
    title: "লাভ/লোকসান (Loss/Profit)",
    description: "বিক্রয় ও খরচ বিশ্লেষণ, মুনাফা ও লোকসান রিপোর্ট।",
  },
  {
    icon: <AlarmClockOff />,
    title: "মেয়াদ উত্তীর্ণ (Expiring)",
    description: "এক্সপায়ারি অ্যালার্ম ও ব্যাচ-ভিত্তিক সতর্কতা।",
  },
  {
    icon: <BarChart3 />,
    title: "রিপোর্টস (Reports)",
    description: "বিক্রয়, ক্রয়, স্টক ও আর্থিক রিপোর্ট এক ক্লিকে।",
  },
  {
    icon: <Languages />,
    title: "৪৭+ ভাষা সমর্থন (47+ Languages)",
    description: "স্থানীয় ভাষা সহ বহু ভাষার UI সমর্থন।",
  },
  {
    icon: <BadgeDollarSign />,
    title: "মাল্টি কারেন্সি (Multi Currency)",
    description: "বহু মুদ্রা সমর্থন এবং আন্তর্জাতিক লেনদেন সহজ।",
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
