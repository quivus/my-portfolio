import { useEffect, useState } from "react";

function SplashScreen({ onComplete }) {
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      setIsSliding(true);
    }, 300);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 600);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden font-sans select-none">
      <div
        className={`flex h-full w-1/2 items-center justify-end bg-white pr-6 transition-transform duration-700 ease-in-out ${
          isSliding ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <h1 className="text-4xl font-black tracking-tighter text-red-700 sm:text-5xl md:text-7xl">
          QUIVUS
        </h1>
      </div>

      <div
        className={`flex h-full w-1/2 items-center justify-start bg-black pl-6 transition-transform duration-700 ease-in-out ${
          isSliding ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <h1 className="text-5xl font-black tracking-tighter text-red-700 md:text-7xl">
          PORTFOLIO
        </h1>
      </div>
    </div>
  );
}

export default SplashScreen;
