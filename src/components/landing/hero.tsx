import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative">
      <div className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div className="text-center lg:text-left space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="font-bangla">
              আপনার ফার্মেসী পরিচালনা
            </h1>
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                এখন আরও সহজ
              </span>
            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0 font-bangla">
            OushodCloud দিয়ে আপনার ব্যবসার স্টক, সেলস, এবং কাস্টমার ম্যানেজ করুন সহজেই। এটি আপনার সময় বাঁচায় এবং ব্যবসাকে নতুন উচ্চতায় নিয়ে যায়।
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-full md:w-1/3 bg-accent text-accent-foreground hover:bg-accent/90">
              Start Free Trial
            </Button>
            <Button variant="outline" className="w-full md:w-1/3">
              Request a Demo
            </Button>
          </div>
        </div>

        <div className="z-10">
          <Image
            src="https://placehold.co/700x500.png"
            alt="Pharmacy Software Illustration"
            width={700}
            height={500}
            className="rounded-lg shadow-lg border"
            data-ai-hint="pharmacy software illustration"
          />
        </div>
      </div>
       <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ADD8E6_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#09090b_40%,#195b6d_100%)]"></div>
    </section>
  );
}
