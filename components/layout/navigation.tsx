import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-b sticky top-0 bg-neutral-100/80 backdrop-blur-xs dark:bg-neutral-800/80">
      <div className="font-bold container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/"></Link>
        <ul className="flex gap-6">
          <li>
            <Link className="hover:text-sky-400 transition-colors" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-sky-400 transition-colors"
              href="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-sky-400 transition-colors"
              href="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
