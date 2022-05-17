import Link from "next/link";
import React from "react";
import CreateIcon from "./svg/create-icon";
import HomeIcon from "./svg/home-icon";
import SearchIcon from "./svg/search-icon";

const Navbar = () => {
  return (
    <nav className="bg-white bottom-0 sticky w-full border-t flex h-[40px] justify-around py-2 items-center">
      <Link href="/home">
        <a>
          <HomeIcon width={32} height={32} stroke="#000" />
        </a>
      </Link>
      <Link href="/home">
        <a>
          <SearchIcon width={32} height={32} stroke="#000" />
        </a>
      </Link>
      <Link href="/new">
        <a>
          <CreateIcon width={32} height={32} stroke="#000" />
        </a>
      </Link>
    </nav>
  );
};

export default Navbar;
