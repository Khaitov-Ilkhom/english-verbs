import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Check, X} from "lucide-react";
import {useThemeStore} from "@/store/themeStore.ts";
import Navbar from "@/components/layout/navbar/navbar.tsx";
import {CategoryT, Words} from "@/types/verbs-types.ts";
import {useParams} from "react-router-dom";
import {categories} from "@/verbs-data";
import Footer from "@/components/layout/footer/footer.tsx";

const LearnWords = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();
  const {id} = useParams()
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const category: CategoryT = categories.find(category => category.id === id)!;
  const [city, setCity] = useState<Words[]>(category?.words);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);

    const updatedCity = [...city];
    updatedCity[currentQuestion].selectedAnswer = answer;
    updatedCity[currentQuestion].isCorrect = answer === updatedCity[currentQuestion].correctWord;
    setCity(updatedCity);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < city.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setCity(category?.words);
    setSelectedAnswer(null);
    setIsQuizFinished(false);
  };

  const correctAnswers = city.filter((word) => word.isCorrect).length;
  const incorrectAnswers = city.length - correctAnswers;

  return (
      <div className={`w-full  ${isDarkMode ? " text-white bg-[#0E1014]" : ""}`}>
        <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto">
          <Navbar search={false}/>

          <div className="flex-grow w-full min-h-[620px] flex justify-center items-center pt-10">
            {isQuizFinished ? (
                <div className="w-full flex flex-col justify-center items-center pt-4">
                  <h2 className="text-3xl font-bold mb-2 text-center">{t("Natijalar")}</h2>
                  <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                    <p className="text-lg">{t("To'g'ri javoblar")}: <span
                        className="text-green-500 font-bold">{correctAnswers}</span></p>
                    <p className="text-lg">{t("Xato javoblar")}: <span
                        className="text-red-500 font-bold">{incorrectAnswers}</span>
                    </p>
                  </div>
                  <div className="w-[350px] md:w-[500px] mt-2">
                    {city.map((word) => (
                        <div key={word.id} className="flex justify-between items-start px-4 py-1 border-b">
                          <span className="text-lg font-semibold capitalize">{word.word}</span>
                          <span className={word.isCorrect ? "text-green-500" : "text-red-500"}>
                  {word.isCorrect ? `${t(`${word.selectedAnswer}`)} ✅` : `${t(`${word.selectedAnswer}`)} ❌`}
                </span>
                        </div>
                    ))}
                  </div>
                  <Button className="mt-4 bg-indigo-500 hover:bg-indigo-600" onClick={handleRestart}>
                    {t("Qaytadan boshlash")}
                  </Button>
                </div>
            ) : (
                <div className={`flex-grow w-full flex justify-center items-center `}>
                  <div className="w-[350px] md:w-[500px] text-center ">
                    <h3 className={`text-3xl font-bold mb-6 capitalize ${isDarkMode ? "text-white" : "text-black"}`}>
                      {city[currentQuestion].word}
                    </h3>
                    <div className="w-full grid grid-cols-2 gap-2 px-2">
                      {city[currentQuestion].questionWords.map((word) => (
                          <Button key={word} onClick={() => handleAnswerClick(word)}
                                  className={`bg-indigo-500 hover:bg-indigo-600 py-6 md:py-8 cursor-pointer text-md md:text-lg
                  ${selectedAnswer === word ? (word === city[currentQuestion].correctWord ? "bg-green-500" : "bg-red-500") : ""}
                  disabled:opacity-100 disabled:pointer-events-none`}
                                  disabled={selectedAnswer !== null}>
                            {t(word)}
                          </Button>
                      ))}
                    </div>

                    <p className={`mt-6 text-xl font-semibold ${isDarkMode ? "text-white" : ""}`}>{currentQuestion + 1} to {city.length}</p>
                  </div>

                  <div
                      className={selectedAnswer ? "fixed bottom-0 w-full flex justify-between items-center gap-2 px-6 py-6 bg-gray-500" : "hidden"}>
                    <div className="flex justify-start items-center gap-3">
                      <div
                          className={`w-10 h-10 flex justify-center items-center rounded-full text-white ${city[currentQuestion].correctWord === selectedAnswer ? "bg-green-500" : "bg-red-500"}`}>
                        {
                          city[currentQuestion].correctWord === selectedAnswer ? <Check size={30} strokeWidth={4}/> :
                              <X size={30} strokeWidth={4}/>
                        }
                      </div>
                      <p className="text-white font-semibold text-lg">{city[currentQuestion].correctWord === selectedAnswer ? "Correct answer" : "Wrong answer"}</p>
                    </div>
                    {selectedAnswer && (
                        <Button
                            className={`font-semibold cursor-pointer ${city[currentQuestion].correctWord === selectedAnswer ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                            onClick={handleNextQuestion}>
                          {city.length === currentQuestion ? t("Tugatish") : t("Keyingi savol")}
                        </Button>
                    )}
                  </div>
                </div>
            )}
          </div>

          <Footer />
        </div>
      </div>
  );
};

export default LearnWords;