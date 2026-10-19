import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { faqItems } from "@/data/faq";
import { SectionArt } from "@/components/decorative/SectionArt";
import { TapePair } from "@/components/decorative/TapePair";

/** FAQ: accordion dari data/faq.ts. */
export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="container relative isolate py-16 md:py-24">
      <SectionArt src="/asset_decor/asset_code_window.png" className="bottom-0 right-0 w-28 lg:block lg:w-36" />
      <TapePair className="left-8 top-12" tone="bg-yellow" tone2="bg-lavender" />
      <ScrollReveal>
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Masih ada pertanyaan?"
          description="Yang paling sering ditanyakan. Belum terjawab? Langsung tanya via WhatsApp — gratis."
        />
      </ScrollReveal>

      <ScrollReveal className="mx-auto mt-10 max-w-3xl md:mt-14">
        <Accordion items={faqItems} />
      </ScrollReveal>
    </section>
  );
}
