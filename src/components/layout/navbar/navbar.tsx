import {ThemeToggle} from "@/components/ui/themeToggle.tsx";
import Language from "@/components/shared/language.tsx";
import {Link, NavLink} from "react-router-dom";
import {useThemeStore} from "@/store/themeStore.ts";
import {
  Sheet,
  SheetContent,
  SheetDescription, SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {BookOpen, Menu} from "lucide-react";
import {useState} from "react";
import Footer from "@/components/layout/footer/footer.tsx";

const Navbar = ({search}: { search: boolean }) => {
  const {isDarkMode} = useThemeStore();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }
  return (
      <nav
          className={`fixed top-0 max-w-[1440px] w-full mx-auto ${isDarkMode ? "bg-[#0E1014]/70 text-white" : "bg-background/95 supports-[backdrop-filter]:bg-background/60"} backdrop-blur shadow-xl z-50`}>
        <div className="w-full px-4 h-16 flex justify-between items-center gap-1 md:gap-3">
          <div className="md:flex gap-6 md:gap-10">
            <Link className="hidden md:flex items-center gap-1 md:gap-2 " to="/">
              <BookOpen className="h-6 w-6"/>
              <span className={search ? "hidden md:block font-bold" : "font-bold"}>Irregular-Verbs</span>
            </Link>
            <Button className="md:hidden border border-gray-500" onClick={() => setOpen(true)}> <Menu/></Button>
          </div>

          <div className="hidden md:flex justify-center items-center gap-2">
            {[
              {to: "/", label: "Verbs-Table"},
              {to: "/verbs-card", label: "Verbs-Card"},
              {to: "/learn-words", label: "Learn-words"},
            ].map(({to, label}) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({isActive}) =>
                        `capitalize text-xl relative group transition-all duration-200 ${
                            isDarkMode
                                ? isActive
                                    ? "text-white border-b border-white"
                                    : "text-white hover:text-gray-300"
                                : isActive
                                    ? "text-[#505F98] border-b border-[#505F98]"
                                    : "text-slate-900 hover:text-[#505F98]"
                        }`
                    }
                >
                  {label}
                  <span
                      className={`absolute bottom-0.1 left-1/2 transform -translate-x-1/2 block h-[1px] w-0 group-hover:w-full transition-all duration-200 ${
                          isDarkMode ? "bg-white" : "bg-[#505F98]"
                      }`}
                  ></span>
                </NavLink>
            ))}
          </div>


          <div className="flex items-center justify-start gap-2">
            <ThemeToggle/>
            <Language/>
          </div>
        </div>

        <Sheet open={open} onOpenChange={handleClose}>
          <SheetContent className={isDarkMode ? "bg-[#0E1014]" : ""}>
            <SheetHeader>
              <SheetTitle>
                <div className={`flex items-center gap-1 md:gap-2 ${isDarkMode ? "text-white" : ""}`}>
                  <BookOpen className="h-6 w-6"/>
                  <span className="font-bold">Irregular-Verbs</span>
                </div>
              </SheetTitle>
              <SheetDescription>
                <div className="w-full mx-auto flex flex-col items-center font-semibold text-lg space-y-2 mt-4">
                  {[
                    {to: "/", label: "Verbs-Table"},
                    {to: "/verbs-card", label: "Verbs-Card"},
                    {to: "/learn-words", label: "Learn-words"},
                  ].map(({to, label}) => (
                      <NavLink
                          key={to}
                          to={to}
                          className={({isActive}) =>
                              `text-xl relative group transition-all duration-200 ${
                                  isDarkMode
                                      ? isActive
                                          ? "text-white border-b border-white"
                                          : "text-white hover:text-gray-300"
                                      : isActive
                                          ? "text-[#505F98] border-b border-[#505F98]"
                                          : "text-slate-900 hover:text-[#505F98]"
                              }`
                          }
                      >
                        {label}
                        <span
                            className={`absolute bottom-0.1 left-1/2 transform -translate-x-1/2 block h-[1px] w-0 group-hover:w-full transition-all duration-200 ${
                                isDarkMode ? "bg-white" : "bg-[#505F98]"
                            }`}
                        ></span>
                      </NavLink>
                  ))}
                </div>

                {/*<div className="w-full mx-auto flex flex-col items-center font-semibold text-lg space-y-2 mt-4">*/}
                {/*  <NavLink className={`text-xl relative group ${isDarkMode ? "text-white" : "text-slate-900 hover:text-[#505F98]"}`} to="/">*/}
                {/*    Verbs-Table*/}
                {/*    <span className={`absolute bottom-0.1 left-1/2 transform -translate-x-1/2 block h-[1px] ${isDarkMode ? "bg-white" : "bg-[#505F98]"} w-0 group-hover:w-full transition-all duration-200`}></span>*/}
                {/*  </NavLink>*/}
                {/*  <NavLink className={`text-xl relative group ${isDarkMode ? "text-white" : "text-slate-900 hover:text-[#505F98]"}`} to="/verbs-card">*/}
                {/*    Verbs-Card*/}
                {/*    <span className={`absolute bottom-0.1 left-1/2 transform -translate-x-1/2 block h-[1px] ${isDarkMode ? "bg-white" : "bg-[#505F98]"} w-0 group-hover:w-full transition-all duration-200`}></span>*/}
                {/*  </NavLink>*/}
                {/*  <NavLink className={`text-xl relative group ${isDarkMode ? "text-white" : "text-slate-900 hover:text-[#505F98]"}`} to="/learn-words">*/}
                {/*    Learn-words*/}
                {/*    <span className={`absolute bottom-0.1 left-1/2 transform -translate-x-1/2 block h-[1px] ${isDarkMode ? "bg-white" : "bg-[#505F98]"} w-0 group-hover:w-full transition-all duration-200`}></span>*/}
                {/*  </NavLink>*/}
                {/*</div>*/}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <Footer/>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
  )
}
export default Navbar;
