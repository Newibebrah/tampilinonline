import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { faqItems } from "@/data/faq";

/** FAQ: accordion dari data/faq.ts. */
export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="container py-16 md:py-24">
      <ScrollReveal>
        <SectionHeading
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
