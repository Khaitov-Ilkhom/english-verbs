import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {verbs} from "@/verbs-data";
import {useTranslation} from "react-i18next";
import {useThemeStore} from "@/store/themeStore.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent} from "@/components/ui/card"
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

const TableVerbs = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();
  const [mounted, setMounted] = useState(false)
  const [searchParams] = useSearchParams();
  const searchValue: string | null = searchParams.get("search") || "";

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredVerbs = verbs.filter((verb) => verb.verb1.toLowerCase().includes(searchValue.toLowerCase()))

  if (!mounted) return null

  return (
      <div className="flex justify-center px-2 md:px-4 py-6">
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="w-full">
            <div className="rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <Table className={`w-full ${isDarkMode ? "bg-[#17181B] text-white" : ""}`}>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-9 text-center">#</TableHead>
                      <TableHead className="max-w-20 text-center font-semibold text-[16px]">Infinitive
                        V<sub>1</sub></TableHead>
                      <TableHead className="max-w-20 text-center font-semibold text-[16px]">Past Simple
                        V<sub>2</sub></TableHead>
                      <TableHead className="max-w-20 text-center font-semibold text-[16px]">Past Participle
                        V<sub>3</sub></TableHead>
                      <TableHead className="max-w-20 text-center font-semibold text-[16px]">{t("O'zbek")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVerbs.length > 0 ? (
                        filteredVerbs.map((verb, index) => (
                            <motion.tr
                                key={index}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.3, delay: index * 0.02}}
                                className="border-b hover:bg-muted/50 duration-400 "
                            >
                              <TableCell className="text-center font-semibold">{index + 1}</TableCell>
                              <TableCell className="font-medium pl-4">{verb.verb1}</TableCell>
                              <TableCell className="pl-4">{verb.verb2}</TableCell>
                              <TableCell className="pl-4">{verb.verb3}</TableCell>
                              <TableCell className="pl-4">
                                {t(`${verb.verb1}`)}
                              </TableCell>
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
                          transition={{duration: 0.3, delay: index * 0.05}}
                      >
                        <Card className={`h-full ${isDarkMode ? "bg-[#17181B] text-white/90" : ""}`}>
                          <CardContent className="py-4 px-2 flex flex-col gap-3">
                            <div className="flex justify-between items-start px-4">
                              <h3 className="text-xl font-bold ">{verb.verb1}</h3>
                              <span className="px-3 border border-dashed rounded-xl border-gray-500">Verb</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="flex flex-col border-r-2 text-center space-y-2">
                                <span className="text-muted-foreground font-semibold">Past Simple</span>
                                <span
                                    className={`font-medium ${isDarkMode ? "text-white/80" : ""} text-gray-600`}>{verb.verb2}</span>
                              </div>
                              <div className="flex flex-col border-r-2 text-center space-y-2">
                                <span className="text-muted-foreground font-semibold">Past Participle</span>
                                <span
                                    className={`font-medium ${isDarkMode ? "text-white/80" : ""} text-gray-600`}>{verb.verb3}</span>
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
        </Tabs>
      </div>
  )
}
export default TableVerbs
