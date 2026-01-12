"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, className = "", activeClass = "" }) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`${className} ${activeClass} ${isActive ? "active" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
