import {useEffect, useState} from "react";
import {ArrowUpCircle} from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
      <div className="fixed bottom-6 right-6">
        <button
            onClick={scrollToTop}
            className={`relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transition-transform duration-600 hover:scale-110 z-10 ${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll to top"
        >
          <ArrowUpCircle size={36} className="relative z-10"/>
          {isVisible && (
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div
                    className="absolute h-8 w-8 rounded-full bg-indigo-500 opacity-30 animate-[scroll-pulse_2s_ease-out_infinite]"></div>
                <div
                    className="absolute h-9 w-9 rounded-full bg-indigo-500 opacity-20 animate-[scroll-pulse_2s_1s_ease-out_infinite]"></div>
              </div>
          )}
        </button>
      </div>
  );
};

export default ScrollToTop;
