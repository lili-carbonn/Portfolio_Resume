import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          WebBlog
        </Link>
        <div
          className="menu hidden md:block md:w-auto"
          id="navbar"
        >
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            <li key="about">
              <Link href="/about">About</Link>
            </li>
            <li key="projects">
              <Link href="#projects">Projects</Link>
            </li>
            <Link href="/about">Blog</Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
