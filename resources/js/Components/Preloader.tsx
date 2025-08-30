import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [hidePreloader, setHidePreloader] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setHidePreloader(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div
      className={`animate__animated tw-fixed top-0 left-0 tw-w-screen tw-h-screen overflow-hidden tw-bg-white tw-transition-opacity tw-duration-700 tw-flex tw-items-center tw-justify-center ${
        isLoading
          ? "tw-opacity-100 tw-z-50"
          : !isLoading && !hidePreloader
          ? "animate__fadeOut tw-z-40"
          : "tw-z-0 tw-opacity-0"
      }`}
    >
      <span className="preloader"></span>
    </div>
  );
}
