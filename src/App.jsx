import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stayHere = () => {
      window.history.pushState({ quivus: true }, "", window.location.href);
    };

    stayHere();

    const onPopState = () => {
      stayHere();
      window.location.reload();
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <>
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}

      <div
        className={`transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <Home />
      </div>
    </>
  );
}

export default App;
