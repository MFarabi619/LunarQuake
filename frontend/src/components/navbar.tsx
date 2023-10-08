"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@tremor/react";
import { Badge } from "@tremor/react";
import { StatusOnlineIcon, MenuIcon } from "@heroicons/react/outline";
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

  const NavigationLinks = () => (
    <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <Link href={"/"} onClick={() => menuOpen ? setMenuOpen(!menuOpen):null}>
        <Button
          size="xs"
          variant="secondary"
          className="transition hover:cursor-pointer hover:scale-110 duration-500 ease-in-out"
        >
          Home
        </Button>
      </Link>
      <Link href={"/"} onClick={() => menuOpen ? setMenuOpen(!menuOpen):null}>
        <Button
          size="xs"
          variant="secondary"
          className="transition hover:cursor-pointer hover:scale-110 duration-500 ease-in-out"
        >
          About
        </Button>
      </Link>
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
        <section className="transition hover:cursor-pointer hover:scale-125 duration-500 ease-in-out">
          LunarQuake
        </section>

        <section className="hidden md:block">
          <NavigationLinks />
        </section>
        <section className="md:hidden">
          <MenuIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </section>
      </header>
      <div
        className={`fixed top-[4.25rem] right-0 w-64 h-screen box-border z-10 bg-transparent backdrop-blur-lg rounded-xl border border-slate-300 border-opacity-50 shadow-lg p-4 transform transition-transform ease-in-out duration-700 ${
          menuOpen ? "translate-x-40" : "translate-x-full"
        }`}
      >
        <NavigationLinks />
      </div>
    </>
  );
}
