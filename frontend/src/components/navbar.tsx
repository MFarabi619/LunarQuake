"use client"

import Link from "next/link";
import { Button } from "@tremor/react";
import { Badge } from "@tremor/react";
import { StatusOnlineIcon } from "@heroicons/react/outline";

export default function Navbar() {
  return (
    <header className="mt-2 mx-2 fixed w-full max-w-screen-2xl box-border z-10 flex px-8 py-4 justify-between bg-transparent bg-opacity-5 backdrop-blur-md rounded-xl border border-slate-300 border-opacity-20 shadow-lg">

      <section className="transition hover:cursor-pointer hover:scale-125 duration-500 ease-in-out">
        LunarQuake
      </section>
      <section className="hidden md:block">
        <nav className="flex">
          <Link href={"/"}>
            <Button
              size="xs"
              className="mr-2 transition hover:cursor-pointer hover:scale-110 duration-500 ease-in-out"
            >
              Home
            </Button>
          </Link>
          <Link href={"/"}>
            <Button
              size="xs"
              className="mr-4 transition hover:cursor-pointer hover:scale-110 duration-500 ease-in-out"
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
      </section>
    </header>
  );
}
