import {motion} from "framer-motion";
import {Card, CardContent} from "@/components/ui/card.tsx";
import TextToSpeech from "@/components/shared/textToSpeech.tsx";
import {verbsT} from "@/types/verbs-types.ts";
import {useThemeStore} from "@/store/themeStore.ts";
import {useTranslation} from "react-i18next";

const AllCards = ({verbs}: { verbs: verbsT[] }) => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();

  return (
      <>
        {
          verbs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 px-2">
                {verbs.map((verb, index) => (
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
      </>
  )
}
export default AllCards
