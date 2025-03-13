import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Check, X} from "lucide-react";
import {useThemeStore} from "@/store/themeStore.ts";

type Words = {
  id: number;
  word: string;
  questionWords: string[];
  correctWord: string;
  isCorrect: boolean;
  selectedAnswer: string;
};

const cityData: Words[] = [
  {
    id: 1,
    word: "map",
    questionWords: ["taxi", "car", "platform", "map"],
    correctWord: "map",
    isCorrect: false,
    selectedAnswer: ""
  },
  {
    id: 2,
    word: "taxi",
    questionWords: ["taxi", "car", "map", "platform"],
    correctWord: "taxi",
    isCorrect: false,
    selectedAnswer: ""
  },
  {
    id: 3,
    word: "car",
    questionWords: ["taxi", "platform", "map", "car",],
    correctWord: "car",
    isCorrect: false,
    selectedAnswer: ""
  },
  {
    id: 4,
    word: "platform",
    questionWords: ["taxi", "car", "map", "platform",],
    correctWord: "platform",
    isCorrect: false,
    selectedAnswer: ""
  },
  {
    id: 5,
    word: "scooter",
    questionWords: ["underground", "passenger", "train", "scooter"],
    correctWord: "scooter",
    isCorrect: false,
    selectedAnswer: ""
  },
  {
    id: 6,
    word: "underground",
    questionWords: ["underground", "train", "scooter", "passenger",],
    correctWord: "underground",
    isCorrect: false,
    selectedAnswer: ""
  },
  {
    id: 7,
    word: "passenger",
    questionWords: ["train", "scooter", "underground", "passenger"],
    correctWord: "passenger",
    isCorrect: false,
    selectedAnswer: ""
  },
  {
    id: 8,
    word: "train",
    questionWords: ["passenger", "train", "underground", "scooter"],
    correctWord: "train",
    isCorrect: false,
    selectedAnswer: ""
  },
  {
    id: 9,
    word: "accident",
    questionWords: ["helicopter", "truck", "high-speed", "accident"],
    correctWord: "accident",
    isCorrect: false,
    selectedAnswer: ""
  },
  {
    id: 10,
    word: "helicopter",
    questionWords: ["helicopter", "accident", "truck", "high-speed",],
    correctWord: "helicopter",
    isCorrect: false,
    selectedAnswer: ""
  }
];

const LearnWords = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [city, setCity] = useState<Words[]>(cityData);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

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
    setCity(cityData);
    setSelectedAnswer(null);
    setIsQuizFinished(false);
  };

  const correctAnswers = city.filter((word) => word.isCorrect).length;
  const incorrectAnswers = city.length - correctAnswers;

  return (
      <>
        <div className={`w-full min-h-[500px] flex justify-center items-center ${isDarkMode ? " text-white" : ""}`}>
          {isQuizFinished ? (
              <div className="w-full flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold mb-2 text-center">Natijalar</h2>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-lg">To‘g‘ri javoblar: <span
                      className="text-green-500 font-bold">{correctAnswers}</span></p>
                  <p className="text-lg">Xato javoblar: <span
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
                  Qaytadan boshlash
                </Button>
              </div>
          ) : (
              <div className={`w-full flex justify-center items-center `}>
                <div className="w-[350px] md:w-[500px] text-center min-h-[300px]">
                  <h2 className={`text-3xl font-bold mb-6 capitalize ${isDarkMode ? "text-white" : "text-black"}`}>
                    {city[currentQuestion].word}
                  </h2>
                  <div className="w-full grid grid-cols-2 gap-2 px-4">
                    {city[currentQuestion].questionWords.map((word) => (
                        <Button key={word} onClick={() => handleAnswerClick(word)}
                                className={`bg-indigo-500 hover:bg-indigo-600 py-6 md:py-8 cursor-pointer text-lg
                  ${selectedAnswer === word ? (word === city[currentQuestion].correctWord ? "bg-green-500" : "bg-red-500") : ""}
                  disabled:opacity-100 disabled:pointer-events-none`}
                                disabled={selectedAnswer !== null}>
                          {t(word)}
                        </Button>
                    ))}
                  </div>
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
                        Keyingi savol
                      </Button>
                  )}
                </div>
              </div>
          )}
        </div>
      </>
  );
};

export default LearnWords;