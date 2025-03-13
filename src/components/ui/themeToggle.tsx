import {Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useThemeStore} from "@/store/themeStore.ts";
import {motion, AnimatePresence} from "framer-motion";

export function ThemeToggle() {
  const {isDarkMode, toggleTheme} = useThemeStore();

  return (
      <Button variant="default" size="icon" onClick={toggleTheme}
              className={`relative overflow-hidden border border-gray-500 ${isDarkMode ? "bg-black" : "border-gray-500 bg-white text-black hover:bg-white"}`}>
        <AnimatePresence mode="wait">
          {isDarkMode ? (
              <motion.div
                  key="moon"
                  initial={{rotate: -90, opacity: 0}}
                  animate={{rotate: 0, opacity: 1}}
                  exit={{rotate: 90, opacity: 0}}
                  transition={{duration: 0.1}}
                  className="absolute"
              >
                <Moon className="h-5 w-5"/>
              </motion.div>
          ) : (
              <motion.div
                  key="sun"
                  initial={{rotate: -90, opacity: 0}}
                  animate={{rotate: 0, opacity: 1}}
                  exit={{rotate: 90, opacity: 0}}
                  transition={{duration: 0.1}}
                  className="absolute"
              >
                <Sun className="h-5 w-5"/>
              </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle theme</span>
      </Button>
  );
}
