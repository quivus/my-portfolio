import Navbar from "./Navbar";
import Hero from "./Hero";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100 font-sans">
      <Navbar />
      <main>
        <Hero />
      </main>
      <footer className="py-8 text-center text-xs tracking-wide text-slate-400 dark:text-neutral-500 border-t border-slate-200 dark:border-neutral-900">
        <p>&copy; {new Date().getFullYear()} RAJIEMAE VILLA</p>
      </footer>
    </div>
  );
}

export default Home;
