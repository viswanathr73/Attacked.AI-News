import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-neutral-light/20 bg-neutral-dark/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-neutral-light">
              Attacked<span className="text-gold">.AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-neutral-light hover:text-gold transition-colors"
            >
              Live Feed
            </Link>
            <Link
              href="/incidents"
              className="text-neutral-light hover:text-gold transition-colors"
            >
              Incidents
            </Link>
            <Link
              href="/analysis"
              className="text-neutral-light hover:text-gold transition-colors"
            >
              Analysis
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
