import Image from "next/image";

export function About() {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Pharmacy interior"
            width={600}
            height={400}
            className="w-full md:w-1/2 object-cover rounded-lg"
            data-ai-hint="pharmacy interior"
          />
          <div className="flex flex-col justify-center">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                OushodCloud
              </h2>
              <p className="text-xl text-muted-foreground mt-4 font-bangla">
              OushodCloud হলো একটি আধুনিক, ক্লাউড-ভিত্তিক ফার্মেসী ম্যানেজমেন্ট এবং POS সফটওয়্যার যা বাংলাদেশের ফার্মেসী মালিক, ক্লিনিক এবং ঔষধ ডিস্ট্রিবিউটরদের জন্য বিশেষভাবে তৈরি করা হয়েছে। আমাদের লক্ষ্য হলো আপনার ব্যবসাকে সহজ, দ্রুত এবং আরও লাভজনক করে তোলা।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
