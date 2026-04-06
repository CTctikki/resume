import type { Locale } from "@/i18n/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getLandingCopy } from "./landingCopy";

interface FAQSectionProps {
  locale?: Locale;
}

export default function FAQSection({ locale = "en" }: FAQSectionProps) {
  const content = getLandingCopy(locale).faq;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[960px] px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {content.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-4">
          {content.items.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`faq-${index}`}
              className="rounded-[18px] border border-border bg-card px-6"
            >
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-7 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
