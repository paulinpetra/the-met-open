import Link from "next/link";
//all caps common for constants
const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Favorites", href: "/favorites" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  return (
    <nav className="sticky top-0 border-b bg-neutral-100/80 backdrop-blur-xs dark:bg-neutral-800/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 font-bold">
        {/* logo */}
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Welcome to
          </span>

          <Link
            href="/"
            className="text-2xl font-serif tracking-wide text-amber-900 dark:text-amber-400"
          >
            MetOpen
          </Link>
          <span className="block w-12 h-0.5 bg-amber-600 mt-0.5 dark:bg-amber-400" />
        </div>

        <ul className="flex gap-6">
          {navigationLinks.map(({ name, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="transition-colors hover:text-teal-400"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
