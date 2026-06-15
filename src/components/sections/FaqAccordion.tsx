import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long are the tours?",
    answer:
      "Most tours last between 3 and 4 hours depending on the pace of the group and how much time we spend at each stop.",
  },
  {
    question: "How many people can join a tour?",
    answer:
      "Tours are kept small — a maximum of 8 people — to ensure a personal and comfortable experience for everyone.",
  },
  {
    question: "What should I wear and bring?",
    answer:
      "Comfortable walking shoes are a must. Bring water, sunscreen, and dress for the weather. A small bag for any market finds is always a good idea.",
  },
  {
    question: "What happens if it rains?",
    answer:
      "Tours run in light rain — Seoul is very walkable even in drizzle. In case of heavy rain or severe weather we will contact you to reschedule.",
  },
  {
    question: "How do I confirm my booking?",
    answer:
      "After submitting a booking request, Jitse will reply to your email within 48 hours to confirm the details.",
  },
  {
    question: "Can I cancel or reschedule?",
    answer:
      "Yes — just send an email to contact@jitsejager.com at least 48 hours before the tour and we will find a new date that works for you.",
  },
  {
    question: "Are the tours suitable for children?",
    answer:
      "Yes, tours are family friendly. Just mention in your booking request that you are bringing children so the pace can be adjusted accordingly.",
  },
  {
    question: "Do you offer private tours?",
    answer:
      "Yes — if you would like a private experience tailored specifically to your group, get in touch via the Custom Tours page.",
  },
];

export function FaqAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col rounded-md overflow-hidden"
    >
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="px-5">
          <AccordionTrigger className="text-left font-semibold cursor-pointer  text-base">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-black/70  text-base">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
