"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  href,
  children,
  className = "",
  activeClass = "",
  end = false,
}) => {
  const pathname = usePathname();

  const isActive = end
    ? pathname === href
    : pathname === href || (href !== "/" && pathname.startsWith(href));

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
