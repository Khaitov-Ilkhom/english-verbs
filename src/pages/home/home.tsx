import Navbar from "@/components/layout/navbar/navbar.tsx";
import ScrollToTop from "@/components/layout/scroll-to-top/scrollToTop.tsx";
import {useThemeStore} from "@/store/themeStore.ts";
import VerbsTable from "@/pages/verbs-table/verbsTable.tsx";
import Footer from "@/components/layout/footer/footer.tsx";

const Home = () => {
  const {isDarkMode} = useThemeStore();

  return (
      <div className={`max-w-[1440px] min-h-screen w-full mx-auto flex flex-col ${isDarkMode ? "bg-[#0E1014]" : "bg-white"}`}>
        <Navbar search={true}/>
        <div className="relative mt-[64px] flex-grow">
          <div
              className="h-[200px] md:h-[350px] w-full bg-[url('https://quotefancy.com/media/wallpaper/1600x900/8153282-DON-T-WASTE-YOUR-TIME-Wallpaper.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/10"/>
          </div>
        </div>

        <div className="py-4 px-2 flex-grow">
          <VerbsTable/>
        </div>

        <Footer/>

        <ScrollToTop/>
      </div>
  )
}
export default Home
