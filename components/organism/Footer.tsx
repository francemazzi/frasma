"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "../../lib/i18n/context";

export default function Footer() {
  const t = useT();

  return (
    <footer className="py-10 pb-20 text-[11px] font-medium text-ink-soft tracking-[0.04em]">
      <div className="section-farm">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-frasma.png"
              alt="Frasma"
              width={36}
              height={36}
              className="h-8 w-8 rounded-full object-cover"
            />
            <p>{t("footer.info")}</p>
          </div>
          <div className="flex gap-5 flex-wrap items-center">
            {/* <Link
              href="/programmatore-freelance"
              className="hover:text-accent hover:border-b hover:border-accent transition-colors"
            >
              Programmatore freelance
            </Link> */}
            {/* <span className="text-ink-faint">·</span> */}
            <Link
              href="/for-agents"
              className="hover:text-accent hover:border-b hover:border-accent transition-colors"
            >
              {t("footer.forAgents")}
            </Link>
            <span className="text-ink-faint">·</span>
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
            <span className="text-ink-faint">·</span>
            <Link
              href="https://www.youtube.com/@frasmatech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
