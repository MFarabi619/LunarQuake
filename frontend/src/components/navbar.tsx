"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@tremor/react";
import { StatusOnlineIcon } from "@heroicons/react/outline";
import { useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close side menu when the window is resized to a width greater than 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/" },
    { name: "History", path: "/history" },
    { name: "Contact", path: "/" },
  ];

  const NavigationLinks = () => (
    <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          onClick={() => (menuOpen ? setMenuOpen(!menuOpen) : null)}
        >
          <button className="btn btn-sm btn-outline btn-secondary transition hover:cursor-pointer hover:scale-105 duration-500 ease-in-out">
            {link.name}
          </button>
        </Link>
      ))}
      <Badge
        size="lg"
        icon={StatusOnlineIcon}
        tooltip="Server is up with live data"
      >
        live
      </Badge>
    </nav>
  );

  return (
    <>
      <header className="mt-2 mx-2 fixed w-full max-w-screen-2xl box-border z-10 flex px-8 py-4 justify-between bg-transparent bg-opacity-5 backdrop-blur-md rounded-xl border border-slate-300 border-opacity-20 shadow-lg">
        {/* Logo */}
        <section className="transition hover:cursor-pointer hover:scale-125 duration-500 ease-in-out">
          LunarQuake
        </section>

        {/* Nav Links */}
        <section className="hidden md:block">
          <NavigationLinks />
        </section>

        {/* Hamburger Button  */}
        <button
          className="text-white-500 w-10 h-10 relative focus:outline-none scale-150 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                menuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                menuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Side Menu */}
      <div
        className={`fixed top-[5.5rem] right-0 w-fit h-screen box-border z-10 bg-transparent backdrop-blur-lg rounded-xl border border-slate-300 border-opacity-50 shadow-lg p-4 transform transition-transform ease-in-out duration-700 ${
          menuOpen ? "-translate-x-2" : "translate-x-full"
        }`}
      >
        <NavigationLinks />
      </div>
    </>
  );
}
