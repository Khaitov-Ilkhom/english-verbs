import Navbar from "@/components/layout/navbar/navbar.tsx";
import TableVerbs from "@/components/layout/table-verbs/tableVerbs.tsx";
import ScrollToTop from "@/components/layout/scroll-to-top/scrollToTop.tsx";
import {useThemeStore} from "@/store/themeStore.ts";

const Home = () => {
  const {isDarkMode} = useThemeStore();

  return (
      <div className={`max-w-[1440px] min-h-screen w-full mx-auto ${isDarkMode ? "bg-[#0E1014]" : "bg-white"}`}>
        <Navbar search={true}/>
        <div className="relative mt-[64px]">
          <div
              className="h-[200px] md:h-[350px] w-full bg-[url('https://quotefancy.com/media/wallpaper/1600x900/8153282-DON-T-WASTE-YOUR-TIME-Wallpaper.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/10"/>
          </div>
        </div>
        <TableVerbs/>

        <p className={`w-full text-center pb-8 px-2 ${isDarkMode ? "text-white" : ""}`}>Copyright © 2025 Irregular-verbs Created by
          <b><a className="italic" href="https://t.me/KhaitovIlhom"> Khaitov
            Ilkhom</a></b>. All rights reserved.</p>

        <ScrollToTop/>
      </div>
  )
}
export default Home
