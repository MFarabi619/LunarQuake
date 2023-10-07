'use client'

import Link from "next/link";
import {Badge, BadgeDelta } from "@tremor/react"
import { StatusOnlineIcon } from "@heroicons/react/outline"

export default function Navbar() {
  return (
    <header className="flex border border-dashed px-8 py-4 justify-between">
      <section className="transition hover:cursor-pointer hover:scale-125 duration-500 ease-in-out">LunarQuake</section>
      <section>
        <nav className="flex">
          <Link href={"/"} className="px-4 transition hover:cursor-pointer hover:scale-125 duration-500 ease-in-out">
            Home
          </Link>
          <Link href={"/"} className="px-4 transition hover:cursor-pointer hover:scale-125 duration-500 ease-in-out">
            About
          </Link>
          <Badge size="lg" icon={StatusOnlineIcon} tooltip="Server is up with live data">live</Badge>
        </nav>
      </section>
    </header>
  );
}
