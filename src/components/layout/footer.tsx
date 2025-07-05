import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-dark/95 border-t border-neutral-light/20 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-neutral-light">
                Attacked<span className="text-gold">.AI</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-light/60">
              Real-time global threat intelligence and news.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-light mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-neutral-light/80 hover:text-gold transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/incidents"
                  className="text-neutral-light/80 hover:text-gold transition-colors"
                >
                  Incidents
                </Link>
              </li>
              <li>
                <Link
                  href="/analysis"
                  className="text-neutral-light/80 hover:text-gold transition-colors"
                >
                  Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-light/80 hover:text-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-light mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-light/80 hover:text-gold transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-light/80 hover:text-gold transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="mailto:contact@attacked.ai"
                className="text-neutral-light/80 hover:text-gold transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-neutral-light/60">
          &copy; {new Date().getFullYear()} Attacked.AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
