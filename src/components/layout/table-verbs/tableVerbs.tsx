import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {verbs} from "@/verbs-data";
import {useTranslation} from "react-i18next";
import {useThemeStore} from "@/store/themeStore.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent} from "@/components/ui/card"
import {motion} from "framer-motion";
import {useSearchParams} from "react-router-dom";
import LearnWords from "@/pages/learn-words/learnWords.tsx";

const TableVerbs = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();
  const [searchParams] = useSearchParams();
  const searchValue: string | null = searchParams.get("search") || "";

  const filteredVerbs = verbs.filter((verb) => verb.verb1.toLowerCase().includes(searchValue.toLowerCase()))

  return (
      <div className="flex justify-center px-2 md:px-4 py-6">
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
            <TabsTrigger value="words">Learn words</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="w-full">
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
                    {filteredVerbs.length > 0 ? (
                        filteredVerbs.map((verb, index) => (
                            <motion.tr
                                key={index}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.3, delay: index * 0.01}}
                                className="border-b hover:bg-muted/50 duration-400"
                            >
                              <TableCell className="w-12 text-center font-semibold">{index + 1}</TableCell>
                              <TableCell className="w-1/4 font-medium md:pl-4 pl-2"><p>{verb.verb1}</p>
                                <p>{verb.pronunciation1}</p></TableCell>
                              <TableCell className="w-1/4 md:pl-4 pl-2"><p>{verb.verb2}</p> <p>{verb.pronunciation2}</p>
                              </TableCell>
                              <TableCell className="w-1/4 md:pl-4 pl-2"><p>{verb.verb3}</p> <p>{verb.pronunciation3}</p>
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
          </TabsContent>

          <TabsContent value="cards">
            {filteredVerbs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3">
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
                              <div className="flex justify-start items-center gap-2"><h3 className="text-xl font-bold ">{verb.verb1}</h3> <p className="text-[14px]">{verb.pronunciation1}</p></div>
                              <span className="px-3 border border-dashed rounded-xl border-gray-500">Verb</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1 md:gap-2 text-sm">
                              <div className="flex flex-col border-r-2 text-center space-y-2">
                                <p className="text-muted-foreground font-semibold">Past Simple</p>
                                <div
                                    className={`font-medium ${isDarkMode ? "text-white/80" : ""} text-gray-600`}><p>{verb.verb2}</p> <p>{verb.pronunciation2}</p></div>
                              </div>
                              <div className="flex flex-col border-r-2 text-center space-y-2">
                                <p className="text-muted-foreground font-semibold">Past Participle</p>
                                <div
                                    className={`font-medium ${isDarkMode ? "text-white/80" : ""} text-gray-600`}><p>{verb.verb3}</p> <p>{verb.pronunciation3}</p></div>
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
                <div className="text-center py-10 text-muted-foreground">No verbs found matching your search.</div>
            )}
          </TabsContent>

          <TabsContent value="words">
            <LearnWords/>
          </TabsContent>
        </Tabs>
      </div>
  )
}
export default TableVerbs
