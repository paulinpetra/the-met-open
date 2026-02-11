import Link from "next/link";

type FilterButtonProps = {
    label: string;
    href: string;
    active: boolean; };

    function FilterButton({ label, href, active }: FilterButtonProps) {
         return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-full border transition ${
        active
          ? "bg-amber-400 text-black border-amber-400"
          : "bg-white text-black border-neutral-300 hover:bg-neutral-100"
      }`}
    >
      {label}
    </Link>
  );
    }

type CultureFilterProps = {
  culture?: string;
};


export default function CultureFilter({ culture }: CultureFilterProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      <FilterButton label="All" href="/" active={!culture} />
      <FilterButton
        label="Japan"
        href="/?culture=Japan"
        active={culture === "Japan"}
      />
      <FilterButton
        label="China"
        href="/?culture=China"
        active={culture === "China"}
      />
      <FilterButton
        label="Korea"
        href="/?culture=Korea"
        active={culture === "Korea"}
      />
    </div>
  );
}