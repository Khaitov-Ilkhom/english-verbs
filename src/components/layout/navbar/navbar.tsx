import {BookOpen} from "lucide-react";
import {ThemeToggle} from "@/components/ui/themeToggle.tsx";
import Language from "@/components/shared/language.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useSearchParams, Link} from "react-router-dom";
import {useThemeStore} from "@/store/themeStore.ts";
import {useEffect} from "react";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {isDarkMode} = useThemeStore();

  useEffect(() => {
    searchParams.delete("search");
    setSearchParams(searchParams, {replace: true});
  }, []);

  const handleSearchVerb = (value: string) => {
    if (value.trim() === "") {
      searchParams.delete("search");
      setSearchParams(searchParams, {replace: true});
    } else {
      setSearchParams({search: value}, {replace: true});
    }
  };

  return (
      <nav
          className={`fixed top-0 w-full ${isDarkMode ? "bg-[#0E1014]/70 text-white" : "bg-background/95 supports-[backdrop-filter]:bg-background/60"} backdrop-blur  z-50`}>
        <div className="w-full px-4 h-16 flex justify-between items-center gap-3">
          <div className="hidden md:flex gap-6 md:gap-10">
            <>
              <Link className="flex items-center space-x-2" to="/">
                <BookOpen className="h-6 w-6"/>
                <span className="font-bold">Irregular-Verbs</span>
              </Link>
            </>
          </div>
          <div className="flex max-w-[180px] md:max-w-[400px] w-full gap-2">
            <Input
                placeholder="Search verbs..."
                type="text"
                onChange={(e) => handleSearchVerb(e.target.value)}
                className={`bg-white/10 border-black/20 ${isDarkMode ? "text-gray-300 placeholder:text-gray-300" : "text-black placeholder:text-black/80"} `}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <ThemeToggle/>
            <Language/>
          </div>
        </div>
      </nav>
  )
}
export default Navbar;
