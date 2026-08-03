"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/faq";

/**
 * Single-open accordion beside the contact form — this replaced the old
 * full-width FAQ section, so it's deliberately narrow and quiet.
 *
 * Hand-rolled rather than reaching for the shadcn Accordion because only one
 * item may be open at a time and clicking the open row closes it, which is a
 * couple of lines of state here versus configuring a Radix collapsible set.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-stone-400">
        Before your first visit
      </p>
      <div className="mt-[18px] border-t border-border">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full min-h-11 items-center justify-between gap-4 px-0.5 py-4 text-left"
              >
                <span className="text-[14.5px] font-medium text-primary-900">{item.question}</span>
                {isOpen ? (
                  <Minus size={15} className="shrink-0 text-primary-600" />
                ) : (
                  <Plus size={15} className="shrink-0 text-primary-600" />
                )}
              </button>
              {isOpen ? (
                <p className="max-w-[34rem] px-0.5 pb-[18px] text-[13.5px] leading-[1.75] text-stone-500">
                  {item.answer}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
