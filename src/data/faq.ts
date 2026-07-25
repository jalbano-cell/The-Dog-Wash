export type FaqItem = {
  question: string;
  answer: string;
};

// Answers marked [PLACEHOLDER — CONFIRM WITH CLIENT] contain policy specifics
// (timing windows, vaccination rules, cancellation terms) that must be verified
// with the owner before launch.
export const faqs: FaqItem[] = [
  {
    question: "How long does a grooming appointment take?",
    answer:
      "Most full grooms take about 2 to 3 hours, depending on your dog's size, coat, and how comfortable they are. We never rush a dog through the process, so we'll always give you a realistic pickup time when you book.",
  },
  {
    question: "Do you handle anxious or senior dogs?",
    answer:
      "Absolutely — calm, patient handling is what we do best. For nervous or older dogs we slow the pace, take breaks, and use gentle, low-stress techniques so the visit feels safe. Just let us know your dog's needs when you book and we'll plan around them.",
  },
  {
    question: "What if my dog's coat is matted?",
    answer:
      "We handle matted coats every week and always put your dog's comfort first. Light matting can often be brushed out, but for the safety of your dog, heavy matting may need to be carefully shaved rather than pulled. We'll show you what we're seeing and talk through the best option before we start.",
  },
  {
    question: "Are vaccinations required?",
    answer:
      "For the safety of every pet in the studio, we ask that dogs be up to date on their core vaccinations. [PLACEHOLDER — CONFIRM WITH CLIENT: exact vaccination requirements and whether proof is needed at drop-off.]",
  },
  {
    question: "What is your cancellation or no-show policy?",
    answer:
      "We completely understand that life happens — we just ask that you let us know at least 3 hours before your appointment so we can offer the spot to another dog parent. There's no cancellation fee, we simply appreciate the heads-up.",
  },
  {
    question: "Do you take walk-ins?",
    answer:
      "Appointments are strongly preferred so we can give your dog our full attention, but we'll always do our best to fit in a walk-in when space allows. If you're hoping to drop by, give us a quick call first and we'll let you know what's open.",
  },
  {
    question: "What breeds do you groom?",
    answer:
      "Every breed and every mix is welcome — from tiny Yorkies to fluffy Goldendoodles to big double-coated breeds. Our stylists are trained in breed-standard cuts as well as custom styles, so whatever your dog's coat, we've got them covered.",
  },
  {
    question: "How often should my dog be groomed?",
    answer:
      "It depends on the coat, but most dogs do best with a full groom every 4 to 8 weeks, with brushing in between at home. Longer or curlier coats usually need more frequent visits to stay tangle-free. We're happy to recommend a schedule that fits your dog and your routine.",
  },
];
