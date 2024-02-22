import { PropsWithChildren } from "react";

import { Logo } from "./logo";
import { Menu } from "./menu";
import { SearchForm } from "./search-form";

export function SearchLayout({ children }: PropsWithChildren) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-6 p-24 max-lg:px-4 max-lg:py-16">
      <Logo />
      <Menu />
      <SearchForm />
      {children}
    </section>
  );
}
