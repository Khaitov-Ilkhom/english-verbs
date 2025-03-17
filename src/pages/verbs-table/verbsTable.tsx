import {useThemeStore} from "@/store/themeStore.ts";
import {useSearchParams} from "react-router-dom";
import {beginner, elementary, intermediate, verbs} from "@/verbs-data";
import {Input} from "@/components/ui/input.tsx";
import {useEffect} from "react";
import {CircleX} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import BeginnerVerbs from "@/components/layout/table-verbs-by-level/beginnerVerbs.tsx";
import ElementaryVerbs from "@/components/layout/table-verbs-by-level/elementaryVerbs.tsx";
import IntermediateVerbs from "@/components/layout/table-verbs-by-level/intermediateVerbs.tsx";
import AllVerbs from "@/components/layout/table-verbs-by-level/allVerbs.tsx";
import useTabStore from "@/store/tabStore.ts";

const VerbsTable = () => {
  const {isDarkMode} = useThemeStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const {activeTab, setActiveTab} = useTabStore();

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

  const searchValue = searchParams.get("search") || "";

  const getFilteredVerbs = () => {
    let verbList = verbs;
    if (activeTab === "beginner") verbList = beginner;
    else if (activeTab === "elementary") verbList = elementary || [];
    else if (activeTab === "intermediate") verbList = intermediate || [];
    return verbList.filter(verb => verb.verb1.toLowerCase().includes(searchValue.toLowerCase()));
  };

  const filteredVerbs = getFilteredVerbs();

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

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full px-2">
          <TabsList className="flex w-full max-w-lg mx-auto justify-between items-center mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="elementary">Elementary</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="w-full">
            <AllVerbs verbs={filteredVerbs}/>
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
