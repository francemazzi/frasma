import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>Made with 👽 and FraSma - 3317424341 - P.IVA 02750410207</p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/francemazzi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sand-300 transition-colors"
            >
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sand-300 transition-colors"
            >
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
