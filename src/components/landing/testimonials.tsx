import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "মোঃ রহমান",
    pharmacy: "রহমান ফার্মেসী, ঢাকা",
    review: "OushodCloud ব্যবহার করার পর থেকে আমার দোকানের হিসাব রাখা অনেক সহজ হয়ে গেছে। স্টক ম্যানেজমেন্ট ফিচারটি অসাধারণ।",
    image: "https://placehold.co/40x40.png",
    aiHint: "bangladeshi man portrait"
  },
  {
    name: "ফারিয়া ইসলাম",
    pharmacy: "ইসলাম মেডিকো, চট্টগ্রাম",
    review: "আগে মেয়াদোত্তীর্ণ ঔষধ নিয়ে অনেক লোকসান হতো। এখন অ্যালার্ট সিস্টেমের কারণে আর সেই ভয় নেই। ধন্যবাদ OushodCloud।",
    image: "https://placehold.co/40x40.png",
    aiHint: "bangladeshi woman portrait"
  },
  {
    name: "আব্দুল করিম",
    pharmacy: "করিম ড্রাগ হাউজ, সিলেট",
    review: "আমার একাধিক শাখা পরিচালনা করা এখন অনেক সহজ। এক সফটওয়্যারেই সবকিছুর রিপোর্ট পাচ্ছি। এটা সত্যিই দারুণ!",
    image: "https://placehold.co/40x40.png",
    aiHint: "bangladeshi older man"
  },
    {
    name: "সুমন আহমেদ",
    pharmacy: "আহমেদ ফার্মেসী, খুলনা",
    review: "সফটওয়্যারটি খুবই ব্যবহারকারী-বান্ধব এবং তাদের কাস্টমার সাপোর্টও খুব দ্রুত। আমি সবাইকে এটি ব্যবহারের সুপারিশ করছি।",
    image: "https://placehold.co/40x40.png",
    aiHint: "bangladeshi young man"
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
            Customer{" "}
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Testimonials
            </span>
        </h2>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8 font-bangla">
            আমাদের গ্রাহকরা OushodCloud সম্পর্কে যা বলেন।
        </p>

        <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-4xl mx-auto"
        >
            <CarouselContent>
                {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                        <div className="p-1">
                            <Card className="bg-muted/50">
                                <CardContent className="pt-6">
                                    <blockquote className="font-bangla text-lg">"{testimonial.review}"</blockquote>
                                </CardContent>
                                <CardHeader className="flex flex-row items-center gap-4 pt-2">
                                    <Avatar>
                                        <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                                        <AvatarFallback>{testimonial.name.slice(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{testimonial.pharmacy}</p>
                                    </div>
                                </CardHeader>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </section>
  );
}
