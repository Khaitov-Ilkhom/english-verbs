import {Button} from "@/components/ui/button";
import {motion, AnimatePresence} from "framer-motion";
import {useLanguageStore} from "@/store/languageStore.ts";
import i18n from "@/i18n";

const Language = () => {
  const {language, setLanguage} = useLanguageStore();

  function toggleLanguage() {
    const newLanguage = language === "uz" ? "ru" : "uz";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  }

  return (
      <Button variant="outline" onClick={toggleLanguage} className="relative w-12 overflow-hidden text-black">
        <AnimatePresence mode="wait">
          <motion.span
              key={language}
              initial={{y: 20, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              exit={{y: -20, opacity: 0}}
              transition={{duration: 0.2}}
              className="block"
          >
            {language === "uz" ? "O'z" : "Ру"}
          </motion.span>
        </AnimatePresence>
      </Button>
  );
}

export default Language;
