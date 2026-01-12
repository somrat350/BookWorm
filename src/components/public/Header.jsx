"use client";

import Link from "next/link";
import Logo from "./Logo";
import { HiMenuAlt1, HiSparkles } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import {
  FaCrown,
  FaHeart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavLink from "../NavLink";
import ThemeToggler from "../ThemeToggler";
import Image from "next/image";

export default function Header() {
  const user = {
    displayName: "somrat",
    email: "lksjkf",
    photoURL:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?uid=R205531818&ga=GA1.1.891444340.1764987250&semt=ais_hybrid&w=740&q=80",
  };
  const userLoading = false;
  const logout = () => {};

  const role = "admin";
  const [openMenu, setOpenMenu] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide header
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

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
        logout().then(() => {
          Swal.fire({
            title: "Logged out!",
            text: "Your has been logged out.",
            icon: "success",
          });
        });
      }
    });
  };

  if (userLoading) return;

  const menuLink = (
    <>
      <NavLink className="navLink" href="/">
        Home
      </NavLink>
      <NavLink className="navLink" href="/donationRequests">
        Donation Requests
      </NavLink>
      <Link className="navLink" href="/dashboard/newDonationRequest">
        New Donation Requests
      </Link>
      {user && (
        <>
          <NavLink className="navLink" href="/funding">
            Funding
          </NavLink>
          <NavLink className="navLink" href="/dashboard">
            Dashboard
          </NavLink>
        </>
      )}
    </>
  );

  const getRoleBadge = () => {
    switch (role) {
      case "admin":
        return { icon: <FaCrown />, label: "Admin", color: "badge-warning" };
      case "volunteer":
        return { icon: <FaHeart />, label: "Volunteer", color: "badge-info" };
      default:
        return { icon: <FaHeart />, label: "Hero", color: "badge-secondary" };
    }
  };

  const roleBadge = getRoleBadge();

  const rightLink = (
    <>
      <ThemeToggler />

      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:scale-110 transition-all duration-300 relative"
          >
            <div className="w-10 overflow-hidden rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <Image
                width={40}
                height={40}
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt={user?.displayName || "User"}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-100 animate-pulse"></div>
          </div>

          <div
            tabIndex="-1"
            className="dropdown-content card card-compact bg-base-100 text-base-content shadow-2xl border border-base-300 w-72 sm:w-80  mt-3 z-50"
          >
            <div className="card-body">
              {/* User Info Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-base-300">
                <div className="avatar">
                  <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                    <Image
                      width={64}
                      height={64}
                      src={user?.photoURL || "https://via.placeholder.com/150"}
                      alt={user?.displayName || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-base-content">
                    {user?.displayName || "Blood Hero"}
                  </h3>
                  <p className="text-sm text-base-content/70 mb-2 break-all">
                    {user?.email}
                  </p>
                  <div className={`badge ${roleBadge.color} badge-sm gap-1`}>
                    {roleBadge.icon}
                    {roleBadge.label}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 py-4 border-b border-base-300">
                <div className="text-center p-3 bg-base-200 rounded-lg">
                  <div className="text-lg font-bold text-secondary">Active</div>
                  <div className="text-xs text-base-content/60">Status</div>
                </div>
                <div className="text-center p-3 bg-base-200 rounded-lg">
                  <div className="text-lg font-bold text-secondary">Hero</div>
                  <div className="text-xs text-base-content/60">Level</div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-2 pt-4">
                <Link
                  href="/dashboard/profile"
                  className="btn btn-ghost w-full justify-start gap-3 hover:bg-secondary hover:text-white transition-all duration-300 group"
                  onClick={() => setOpenMenu(false)}
                >
                  <FaUser className="group-hover:animate-bounce" />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="btn btn-ghost w-full justify-start gap-3 hover:bg-secondary hover:text-white transition-all duration-300 group"
                  onClick={() => setOpenMenu(false)}
                >
                  <FaTachometerAlt className="group-hover:animate-spin" />
                  <span>Dashboard</span>
                </Link>

                <div className="divider my-2"></div>

                <button
                  onClick={handleLogout}
                  className="btn btn-error w-full justify-start gap-3 text-white hover:scale-105 transition-all duration-300 group"
                >
                  <FaSignOutAlt className="group-hover:animate-pulse" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-base-300">
                <div className="flex items-center justify-center text-xs text-base-content/60">
                  <HiSparkles className="mr-1" />
                  Thank you for saving lives!
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link
          className="btn btn-secondary hover:scale-105 transition-transform duration-200"
          href="/login"
        >
          Login
        </Link>
      )}
    </>
  );
  return (
    <header
      className={`sticky w-full shadow-lg left-0 top-0 z-20 backdrop-blur-md bg-base-200/70 transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-360 mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <HiMenuAlt1
            onClick={() => setOpenMenu(true)}
            className="lg:hidden cursor-pointer text-2xl font-bold hover:scale-110 transition-transform duration-200 p-1"
          />
          <div className="">
            <Logo />
          </div>
        </div>

        {/* Center Navigation - Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-1">
          {menuLink}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2">{rightLink}</div>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 top-0 shadow-2xl flex lg:hidden flex-col gap-5 p-4 sm:p-8 rounded-b-3xl bg-base-300 w-full max-w-full sm:max-w-xl z-10 duration-300 ${
            openMenu ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex justify-end">
            <HiXMark
              onClick={() => setOpenMenu(false)}
              className="cursor-pointer text-2xl sm:text-3xl font-extrabold hover:scale-110 transition-transform duration-200"
            />
          </div>
          <div className="flex flex-col gap-3 sm:gap-5">{menuLink}</div>
        </div>
      </div>
    </header>
  );
}
