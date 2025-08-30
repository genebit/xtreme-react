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
      className={`animate__animated tw-fixed top-0 left-0 tw-w-screen tw-h-screen overflow-hidden tw-bg-white tw-transition-opacity tw-duration-700 tw-flex tw-items-center tw-justify-center ${
        isLoading ? "tw-opacity-100 tw-z-50" : "animate__fadeOut tw-z-40"
      }`}
    >
      <span className="preloader"></span>
    </div>
  );
}
