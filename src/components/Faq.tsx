import { faqs } from "@/data/faq";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TornDivider } from "@/components/TornDivider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="faq" data-reveal className="relative bg-white py-24 lg:py-32">
      <TornDivider colorClass="text-stone-800" />
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Questions"
          titleMuted="dog parents ask us"
          description="Everything you need to know before your dog's first visit. Still curious? Give us a call — we're happy to help."
        />

        <Accordion type="single" collapsible defaultValue="item-0" className="mt-16 max-w-3xl">
          {faqs.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
