import imeLogo from "../assets/images/ImeLogo.png";

function Navbar() {
  const links = ["Home", "Projects", "Services", "Contact"];

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 md:px-8 pt-5 backdrop-blur-sm bg-white/70 dark:bg-neutral-950/70 transition-colors duration-300">
      <div className="mx-auto flex max-w-5xl items-center justify-between border-b border-slate-100 pb-4 dark:border-neutral-900/60">
        <a
          href="#"
          className="transition-opacity hover:opacity-80 block focus:outline-none"
        >
          <img
            src={imeLogo}
            alt="Ime Logo"
            className="h-8 w-auto object-contain border-none outline-none drop-shadow-md"
          />
        </a>

        <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative block py-1 font-mono text-[11px] sm:text-xs font-semibold tracking-widest uppercase bg-linear-to-r from-red-600 to-red-600 dark:from-red-500 dark:to-red-500 bg-size-[0%_100%] bg-left bg-no-repeat bg-clip-text text-slate-500 transition-all duration-500 hover:bg-size-[100%_100%] hover:text-transparent dark:text-neutral-400 focus:outline-none"
            >
              {item}

              <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 scale-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 text-red-600 dark:text-red-500">
                <svg
                  className="h-5 w-5 stroke-current fill-none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21c0 0-2.5-4.5-2.5-8.5s2.5-6.5 2.5-6.5 2.5 2.5 2.5 6.5-2.5 8.5-2.5 8.5z" />
                  <path d="M12 21c-1.5-1-4.5-4-4.5-7.5s2.5-5.5 2.5-5.5" />
                  <path d="M12 21c-3.5-.5-6.5-3-6.5-6 0-3 3-4 3-4" />
                  <path d="M12 21c1.5-1 4.5-4 4.5-7.5s-2.5-5.5-2.5-5.5" />
                  <path d="M12 21c3.5-.5 6.5-3 6.5-6 0-3-3-4-3-4" />
                </svg>
              </span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
