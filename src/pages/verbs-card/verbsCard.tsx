import {motion} from "framer-motion";
import {Card, CardContent} from "@/components/ui/card.tsx";
import TextToSpeech from "@/components/shared/textToSpeech.tsx";
import {useTranslation} from "react-i18next";
import {useThemeStore} from "@/store/themeStore.ts";
import {useSearchParams} from "react-router-dom";
import {verbs} from "@/verbs-data";
import {verbsT} from "@/types/verbs-types.ts";
import {Input} from "@/components/ui/input.tsx";
import {CircleX} from "lucide-react";
import {useEffect} from "react";
import Navbar from "@/components/layout/navbar/navbar.tsx";
import Footer from "@/components/layout/footer/footer.tsx";

const VerbsCard = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams)

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

  const handleClear = () => {
    setSearchParams({});
  };

  const searchValue: string | null = searchParams.get("search") || "";

  const filteredVerbs: verbsT[] = verbs.filter((verb) => verb.verb1.toLowerCase().includes(searchValue.toLowerCase()))

  return (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-[#0E1014]" : ""}`}>
        <Navbar search={false}/>

        <div className="flex-grow mt-[80px]">
          <div className="flex justify-center w-full gap-2 px-2 pb-4">
            <div className="relative w-[250px] md:w-[450px]">
              <Input
                  value={searchParams.get("search") || ""}
                  placeholder="Search verbs..."
                  type="text"
                  onChange={(e) => handleSearchVerb(e.target.value)}
                  className={`w-full pr-10 bg-white/10 border-black/20 ${
                      isDarkMode ? "text-gray-300 placeholder:text-gray-300" : "text-black placeholder:text-black/80"
                  }`}
              />
              {searchParams.get("search") && (
                  <button
                      onClick={handleClear}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <CircleX size={24}/>
                  </button>
              )}
            </div>
          </div>

          {
            filteredVerbs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 px-2">
                  {filteredVerbs.map((verb, index) => (
                      <motion.div
                          key={index}
                          initial={{opacity: 0, scale: 0.95}}
                          animate={{opacity: 1, scale: 1}}
                          transition={{duration: 0.3, delay: index * 0.01}}
                      >
                        <Card
                            className={`h-full hover:shadow-lg duration-500 ${isDarkMode ? "bg-[#17181B] text-white/90" : ""}`}>
                          <CardContent className="py-4 px-1 md:px-2 flex flex-col gap-1 md:gap-3">
                            <div className="flex justify-between items-start px-4">
                              <div className="flex justify-start items-center gap-2"><h3
                                  className="text-xl font-bold ">{verb.verb1}</h3> <p
                                  className="text-[14px]">{verb.pronunciation1}</p></div>
                              <TextToSpeech text={verb.verb1}/>
                            </div>
                            <div className="grid grid-cols-3 gap-1 md:gap-2 text-sm">
                              <div className="flex flex-col border-r-2 text-center space-y-2">
                                <p className="text-muted-foreground font-semibold">Past Simple</p>
                                <div
                                    className={`font-medium ${isDarkMode ? "text-white/80" : ""} text-gray-600`}>
                                  <p>{verb.verb2}</p> <p>{verb.pronunciation2}</p></div>
                              </div>
                              <div className="flex flex-col border-r-2 text-center space-y-2">
                                <p className="text-muted-foreground font-semibold">Past Participle</p>
                                <div
                                    className={`font-medium ${isDarkMode ? "text-white/80" : ""} text-gray-600`}>
                                  <p>{verb.verb3}</p> <p>{verb.pronunciation3}</p></div>
                              </div>
                              <div className="flex flex-col text-center space-y-2">
                                <span className="text-muted-foreground text-sm font-semibold">{t("O'zbek")}</span>
                                <p className={`font-medium ${isDarkMode ? "text-white/80" : ""} text-gray-600`}>
                                  {t(`${verb.verb1}`)}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                  ))}
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-muted-foreground">No verbs found matching your search.</p>
                </div>
            )
          }
        </div>

        <Footer/>
      </div>
  )
}
export default VerbsCard
