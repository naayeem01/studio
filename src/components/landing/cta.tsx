import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section id="cta" className="bg-primary/10">
      <div className="container py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-bangla">
          আজই শুরু করুন, আপনার ফার্মেসী সহজ করুন
        </h2>
        <p className="text-xl text-muted-foreground mt-4 mb-8 font-bangla">
          OushodCloud এর সাথে আপনার ব্যবসাকে দিন নতুন গতি। কোন প্রশ্ন আছে? আমাদের সাথে কথা বলুন।
        </p>
        <Button className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg">
            Get Started Now
        </Button>
      </div>
    </section>
  );
}
