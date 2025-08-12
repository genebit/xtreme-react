import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // First, mark loading as done
      setTimeout(() => {
        setIsLoading(false);
        // Remove from DOM after fade-out duration
        setTimeout(() => setIsVisible(false), 500);
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden bg-white transition-opacity duration-500 ${
        !isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="preloader"></span>
    </div>
  );
}
