import Link from "next/link";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-base-200 bg-base-100">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-base-content/40 text-sm">
          © {new Date().getFullYear()} Passon Rattanakongton. All rights reserved.
        </p>
        <div className="flex gap-6">
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/40 hover:text-base-content text-sm transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
