import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex border border-dashed px-8 py-4 justify-between">
      <section>LunarQuake</section>
      <section>
        <nav className="flex">
          <Link href={"/"} className="px-4">
            Home
          </Link>
          <Link href={"/"} className="px-4">
            About
          </Link>
        </nav>
      </section>
    </header>
  );
}
