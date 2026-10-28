import Link from "next/link";

export type RelatedLinkItem = {
  href: string;
  title: string;
  summary: string;
};

type Props = {
  title: string;
  items: RelatedLinkItem[];
};

export default function RelatedLinks({ title, items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="ed-section border-t border-ink/8">
      <div className="section-farm max-w-3xl">
        <h2 className="mb-6 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
          {title}
        </h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[16px] font-medium text-accent underline-offset-2 hover:underline"
              >
                {item.title}
              </Link>
              <p className="mt-1 text-[15px] leading-[1.55] text-ink-soft">
                {item.summary}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
