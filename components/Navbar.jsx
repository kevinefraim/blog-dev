import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="p-5 mb-3 bg-blue-600 text-white flex justify-start gap-10 text-2xl font-extrabold">
      <Link href="/">
        <a className="hover:text-gray-300">Devter</a>
      </Link>
      <Link href="/notes">
        <a className="hover:text-gray-300">Notes</a>
      </Link>
      <Link href="/new">
        <a className="hover:text-gray-300">Create Note</a>
      </Link>
    </nav>
  );
};

export default Navbar;
