"use client";
import { Section } from "./Section";

const MENU_ITEMS = ["Profile", "Settings", "Billing", "Sign out"];

const VARIANTS = [
  { label: "Default", cls: "" },
  { label: "Top", cls: "dropdown-top" },
  { label: "End", cls: "dropdown-end" },
] as const;

export function DropdownSection() {
  return (
    <Section title="Dropdown">
      <div className="flex flex-wrap gap-6 w-full items-start justify-around pt-2 pb-4">
        {VARIANTS.map(({ label, cls }) => (
          <div key={label} className={`dropdown ${cls}`}>
            <div tabIndex={0} role="button" className="btn btn-outline btn-sm m-1">
              {label} <span className="ml-1">▾</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-40 p-2 shadow-md border border-base-200"
            >
              {MENU_ITEMS.map((item) => (
                <li key={item}>
                  <a>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-primary btn-sm m-1">
            Actions ▾
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-10 w-44 p-2 shadow-md border border-base-200"
          >
            <li><a>Edit</a></li>
            <li><a>Duplicate</a></li>
            <li><hr className="my-1 border-base-200" /></li>
            <li><a className="text-error">Delete</a></li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
