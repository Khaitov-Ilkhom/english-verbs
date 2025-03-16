import Navbar from "@/components/layout/navbar/navbar.tsx";
import Footer from "@/components/layout/footer/footer.tsx";
import {useThemeStore} from "@/store/themeStore.ts";

const WordsCategory = () => {
  const {isDarkMode} = useThemeStore();

  return (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? " text-white bg-[#0E1014]" : ""}`}>
        <Navbar search={false}/>

        <div className="flex flex-grow">

        </div>

        <Footer />
      </div>
  )
}
export default WordsCategory
