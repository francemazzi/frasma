"use client";

import { Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";
import { useT } from "../../lib/i18n/context";

export default function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-farm-border py-8">
      <div className="section-farm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-farm-secondary">
            {t("footer.info")}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/blog"
              className="text-sm font-medium text-farm-secondary hover:text-farm-text transition-colors"
            >
              Blog
            </Link>
            <span className="text-farm-tertiary">·</span>
            <Link
              href="https://github.com/francemazzi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-farm-secondary hover:text-farm-text transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-farm-secondary hover:text-farm-text transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://www.frasma.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-farm-secondary hover:text-farm-text transition-colors"
            >
              <Globe size={20} />
              <span className="sr-only">Website</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
