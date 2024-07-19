import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-teal-500 text-transparent bg-clip-text hover:cursor-pointer"
    >
      Formify
    </Link>
  );
}

export default Logo;
