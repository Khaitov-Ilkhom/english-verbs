import Navbar from "@/components/layout/navbar/navbar.tsx";
import Footer from "@/components/layout/footer/footer.tsx";
import {useThemeStore} from "@/store/themeStore.ts";
import {useNavigate} from "react-router-dom";
import {categories} from "@/verbs-data";

const colors: string[] = ["#6E88D4", "#1DAC8B", "#E2BB18", "#F4406B", "#C862D8", "#47B66F", "#FBA04B"]

const WordsCategory = () => {
  const {isDarkMode} = useThemeStore();
  const navigate = useNavigate();

  return (
      <div className={`w-full ${isDarkMode ? " text-white bg-[#0E1014]" : ""}`}>
        <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto">
          <Navbar search={false}/>

          <div className="flex flex-grow flex-col px-4 pt-[80px]">
            <h2 className="text-2xl font-semibold text-center">Words categories</h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 py-4">
              {
                categories.map((category, index) => (
                    <div key={category.id} onClick={() => navigate(`/learn-words/${category.id}`)}
                         className="border rounded-xl p-3 hover:shadow-xl hover:scale-105 duration-500 flex flex-col md:flex-row justify-between gap-1 "
                         style={{backgroundColor: colors[index % colors.length], borderColor: colors[index % colors.length]}}
                    >
                      <div>
                        <h2 className="font-semibold">{category.title}</h2>
                        <p className="text-[14px] md:text-[12px]">Words count: <span className="font-semibold">{category.words.length}</span></p>
                      </div>
                      <div className="">
                        <img className="max-w-[130px] md:max-w-[100px] rounded-lg" src={category.img} alt={category.title}/>
                      </div>
                    </div>
                ))
              }
            </div>
          </div>

          <Footer/>
        </div>
      </div>
  )
}
export default WordsCategory
