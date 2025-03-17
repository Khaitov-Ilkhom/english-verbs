import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {motion} from "framer-motion";
import TextToSpeech from "@/components/shared/textToSpeech.tsx";
import {useTranslation} from "react-i18next";
import {useThemeStore} from "@/store/themeStore.ts";
import {verbsT} from "@/types/verbs-types.ts";

const BeginnerVerbs = ({verbs}: {verbs: verbsT[]}) => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();

  return (
      <div className="rounded-lg shadow-md overflow-hidden">
        <div className="max-w-[400px] md:max-w-[1440px] w-full overflow-x-auto">
          <Table className={`w-full ${isDarkMode ? "bg-[#17181B] text-white" : ""}`}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead className="w-1/4 text-center font-semibold text-[16px]">Infinitive
                  V<sub>1</sub></TableHead>
                <TableHead className="w-1/4 text-center font-semibold text-[16px]">Past Simple
                  V<sub>2</sub></TableHead>
                <TableHead className="w-1/4 text-center font-semibold text-[16px]">Past Participle
                  V<sub>3</sub></TableHead>
                <TableHead className="w-1/4 text-center font-semibold text-[16px]">{t("O'zbek")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verbs.length > 0 ? (
                  verbs.map((verb, index) => (
                      <motion.tr
                          key={index}
                          initial={{opacity: 0, y: 10}}
                          animate={{opacity: 1, y: 0}}
                          transition={{duration: 0.3, delay: index * 0.01}}
                          className="border-b hover:bg-muted/50 duration-400"
                      >
                        <TableCell className="w-12 text-center font-semibold">{index + 1}</TableCell>
                        <TableCell className="w-1/4 font-medium md:pl-4 pl-2">
                          <div className="w-full flex justify-between items-center gap-2">
                            <div>
                              <p>{verb.verb1}</p> <p>{verb.pronunciation1}</p>
                            </div>
                            <TextToSpeech text={verb.verb1}/>
                          </div>
                        </TableCell>
                        <TableCell className="w-1/4 md:pl-4 pl-2">
                          <div className="w-full flex justify-between items-center gap-2">
                            <div>
                              <p>{verb.verb2}</p> <p>{verb.pronunciation2}</p>
                            </div>
                            <TextToSpeech text={verb.verb2}/>
                          </div>
                        </TableCell>
                        <TableCell className="w-1/4 md:pl-4 pl-2">
                          <div className="w-full flex justify-between items-center gap-2">
                            <div>
                              <p>{verb.verb3}</p> <p>{verb.pronunciation3}</p>
                            </div>
                            <TextToSpeech text={verb.verb3}/>
                          </div>
                        </TableCell>
                        <TableCell className="w-1/4 md:pl-4 pl-2">{t(`${verb.verb1}`)}</TableCell>
                      </motion.tr>
                  ))
              ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      No verbs found matching your search.
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
  )
}
export default BeginnerVerbs
