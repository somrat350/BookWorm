"use client";
import Swal from "sweetalert2";
import Link from "next/link";
import React from "react";
import NavLink from "../NavLink";
import { BiLogOut } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { BsPeople } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoBookSharp, IoLibraryOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const DashboardSidebar = () => {
  const session = useSession();
  if (session.status === "loading") return;
  const role = session.data.user.role;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to access this page!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut().then(() => {
          Swal.fire({
            title: "Logged out!",
            text: "Your has been logged out.",
            icon: "success",
          });
        });
      }
    });
  };
  const menuItems = (
    <>
      <li>
        <NavLink
          end
          href="/dashboard"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashNavLink"
          dataTip="Dashboard"
        >
          <RxDashboard className="font-bold text-xl" />
          <span className="is-drawer-close:hidden">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          end
          href="/dashboard/profile"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashNavLink"
          dataTip="Profile"
        >
          <CgProfile className="font-bold text-xl" />
          <span className="is-drawer-close:hidden">Profile</span>
        </NavLink>
      </li>
      {role === "admin" && (
        <>
          <li>
            <NavLink
              end
              href="/dashboard/addNewBook"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashNavLink"
              dataTip="Add New Book"
            >
              <IoMdAddCircleOutline className="font-bold text-xl" />
              <span className="is-drawer-close:hidden">Add New Book</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              href="/dashboard/manageBooks"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashNavLink"
              dataTip="Manage Books"
            >
              <IoBookSharp className="font-bold text-xl" />
              <span className="is-drawer-close:hidden">Manage Books</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              href="/dashboard/manageUsers"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashNavLink"
              dataTip="Manage Users"
            >
              <BsPeople className="font-bold text-xl" />
              <span className="is-drawer-close:hidden">Manage Users</span>
            </NavLink>
          </li>
        </>
      )}
      {role === "user" && (
        <>
          <li>
            <NavLink
              end
              href="/dashboard/myLibrary"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashNavLink"
              dataTip="My Library"
            >
              <IoLibraryOutline className="font-bold text-xl" />
              <span className="is-drawer-close:hidden">My Library</span>
            </NavLink>
          </li>
        </>
      )}
      <li>
        <button
          onClick={handleLogout}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-red-500"
          data-tip="Logout"
        >
          <BiLogOut className="font-bold text-xl" />
          <span className="is-drawer-close:hidden">Logout</span>
        </button>
      </li>
    </>
  );
  return (
    <div className="flex min-h-full flex-col items-start is-drawer-close:w-16 is-drawer-open:w-56 transition-all duration-300 z-30">
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src="/bookWorm-logo.png"
            alt="BookWorm Logo"
            className="w-8"
          />
          <h1 className={`text-2xl font-extrabold is-drawer-close:hidden`}>
            BookWorm
          </h1>
        </Link>
      </div>
      <ul className="menu w-full grow gap-2 mt-2">{menuItems}</ul>
    </div>
  );
};

export default DashboardSidebar;
