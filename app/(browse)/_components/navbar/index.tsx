import { Actions } from "./actions";
import { Logo } from "./logo";
import { SearchInput } from "./search-input";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-49 bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <SearchInput />
      <Actions />
    </nav>
  );
};
