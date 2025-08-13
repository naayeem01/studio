import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Target, ShieldCheck, CloudUpload, LifeBuoy } from "lucide-react";
import React from "react";

interface BenefitProps {
    icon: JSX.Element;
    title: string;
    description: string;
}

const benefits: BenefitProps[] = [
  {
    icon: <Gauge />,
    title: "গতি এবং নির্ভুলতা",
    description: "দ্রুত বিলিং এবং নির্ভুল হিসাবরক্ষণ আপনার সময় বাঁচায় ও ভুল কমায়।",
  },
  {
    icon: <ShieldCheck />,
    title: "নিরাপত্তা ও নির্ভরযোগ্যতা",
    description: "আপনার সকল তথ্য সুরক্ষিত এবং নিরাপদে আমাদের সার্ভারে সংরক্ষিত থাকে।",
  },
  {
    icon: <CloudUpload />,
    title: "ক্লাউড ব্যাকআপ",
    description: "স্বয়ংক্রিয় ক্লাউড ব্যাকআপের মাধ্যমে আপনার ডেটা হারানোর কোনো ভয় নেই।",
  },
  {
    icon: <LifeBuoy />,
    title: "২৪/৭ সাপোর্ট",
    description: "আমাদের ডেডিকেটেড সাপোর্ট টিম সবসময় আপনার পাশে আছে।",
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-muted/50 py-24 sm:py-32">
        <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground font-bangla">
                OushodCloud আপনার ফার্মেসির জন্য সেরা সমাধান। কারণ আমরা দিচ্ছি সেরা সব সুবিধা।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map(({icon, title, description}) => (
                    <Card key={title} className="p-6 bg-background">
                        <div className="flex justify-center mb-4">
                            {React.cloneElement(icon, {className: "w-10 h-10 text-primary"})}
                        </div>
                        <CardHeader className="p-0">
                            <CardTitle className="font-bangla mb-2">{title}</CardTitle>
                        </CardHeader>
                        <CardDescription className="p-0 font-bangla text-muted-foreground">
                            {description}
                        </CardDescription>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
}
