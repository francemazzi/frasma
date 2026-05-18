"use client";

import Link from "next/link";
import { useT } from "../../lib/i18n/context";

export default function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-hairline py-9 pb-20 font-mono text-[11px] text-ink-soft tracking-[0.04em]">
      <div className="section-farm">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <p>{t("footer.info")}</p>
          <div className="flex gap-5 flex-wrap items-center">
            {/* <Link
              href="/programmatore-freelance"
              className="hover:text-accent hover:border-b hover:border-accent transition-colors"
            >
              Programmatore freelance
            </Link> */}
            {/* <span className="text-ink-faint">·</span> */}
            <Link
              href="/blog"
              className="hover:text-accent hover:border-b hover:border-accent transition-colors"
            >
              Blog
            </Link>
            <span className="text-ink-faint">·</span>
            <Link
              href="https://github.com/francemazzi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </Link>
            <span className="text-ink-faint">·</span>
            <Link
              href="https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
