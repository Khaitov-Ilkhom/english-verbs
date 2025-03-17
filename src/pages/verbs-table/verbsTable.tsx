import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {motion} from "framer-motion";
import TextToSpeech from "@/components/shared/textToSpeech.tsx";
import {useTranslation} from "react-i18next";
import {useThemeStore} from "@/store/themeStore.ts";
import {useSearchParams} from "react-router-dom";
import {verbs} from "@/verbs-data";
import {verbsT} from "@/types/verbs-types.ts";
import {Input} from "@/components/ui/input.tsx";
import {useEffect} from "react";
import {CircleX} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import BeginnerVerbs from "@/components/layout/by-level-verbs/beginnerVerbs.tsx";
import ElementaryVerbs from "@/components/layout/by-level-verbs/elementaryVerbs.tsx";
import IntermediateVerbs from "@/components/layout/by-level-verbs/intermediateVerbs.tsx";

const VerbsTable = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();
  const [searchParams, setSearchParams] = useSearchParams();

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
      <>
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

        <Tabs defaultValue="all" className="w-full px-2">
          <TabsList className="flex w-full max-w-lg mx-auto justify-between items-center mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="elementary">Elementary</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="w-full">
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
          </TabsContent>
          <TabsContent value="beginner" className="w-full">
            <BeginnerVerbs verbs={filteredVerbs}/>
          </TabsContent>
          <TabsContent value="elementary" className="w-full">
            <ElementaryVerbs verbs={filteredVerbs}/>
          </TabsContent>
          <TabsContent value="intermediate" className="w-full">
            <IntermediateVerbs verbs={filteredVerbs}/>
          </TabsContent>
        </Tabs>
      </>
  )
}
export default VerbsTable
