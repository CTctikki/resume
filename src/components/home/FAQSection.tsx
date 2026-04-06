import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  locale?: string;
}

const copy = {
  en: {
    title: "Common questions before you start",
    items: [
      {
        question: "Can I reuse content across different templates?",
        answer:
          "Yes. The workspace is designed so your resume content can move between template layouts without starting over from scratch.",
      },
      {
        question: "How should I back up my resume data?",
        answer:
          "Because the product is local-first, you can keep your files in your normal backup flow and duplicate them whenever you want a safe restore point.",
      },
      {
        question: "What export format should I expect?",
        answer:
          "The main delivery path is a polished PDF export, which is the most common format for sharing resumes with recruiters and hiring teams.",
      },
      {
        question: "Does it work for iterative edits before final export?",
        answer:
          "That is the main workflow. You can keep refining content and layout in the workspace until the preview looks ready, then export when needed.",
      },
    ],
  },
  zh: {
    title: "开始之前常见的几个问题",
    items: [
      {
        question: "不同模板之间可以复用同一份内容吗？",
        answer: "可以。工作区的目标之一就是让你在切换版式时继续沿用已有简历内容，而不是重新开始。",
      },
      {
        question: "本地数据应该怎么备份？",
        answer: "因为是本地优先的工作流，你可以把文件放进自己熟悉的备份方案里，也可以在关键节点手动复制一份留档。",
      },
      {
        question: "最终导出的格式是什么？",
        answer: "主要交付格式是 PDF，这也是招聘流程里最稳定、最常见的简历分享方式。",
      },
      {
        question: "适合反复修改后再定稿吗？",
        answer: "这正是它的核心流程。先在工作区里持续调整内容和版式，确认预览满意后再导出。",
      },
    ],
  },
} as const;

export default function FAQSection({ locale = "en" }: FAQSectionProps) {
  const content = locale === "zh" ? copy.zh : copy.en;

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
