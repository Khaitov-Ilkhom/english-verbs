import Navbar from "@/components/layout/navbar/navbar.tsx";
import Footer from "@/components/layout/footer/footer.tsx";
import {useThemeStore} from "@/store/themeStore.ts";
import {CategoryT, Words} from "@/types/verbs-types.ts";

import categoryImg from "../../images/book_bookmark.jpg"
import LearnWords from "@/components/layout/learn-words/learnWords.tsx";
import {useState} from "react";

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

const WordsCategory = () => {
  const {isDarkMode} = useThemeStore();
  const [start, setStart] = useState<null | Words[]>(null);

  const categories: CategoryT[] = [
    {
      id: 1,
      title: "Traveling",
      words: cityData,
      img: categoryImg
    },
    {
      id: 2,
      title: "Foods and Drinks",
      words: cityData,
      img: categoryImg
    },
    {
      id: 3,
      title: "City",
      words: cityData,
      img: categoryImg
    },
    {
      id: 4,
      title: "Home",
      words: cityData,
      img: categoryImg
    },
    {
      id: 5,
      title: "People",
      words: cityData,
      img: categoryImg
    },
    {
      id: 6,
      title: "Free time Activities",
      words: cityData,
      img: categoryImg
    },
    {
      id: 7,
      title: "Nature",
      words: cityData,
      img: categoryImg
    },
    {
      id: 8,
      title: "Language",
      words: cityData,
      img: categoryImg
    },
    {
      id: 9,
      title: "Technology",
      words: cityData,
      img: categoryImg
    },
    {
      id: 10,
      title: "Education",
      words: cityData,
      img: categoryImg
    },
    {
      id: 11,
      title: "Fashion",
      words: cityData,
      img: categoryImg
    },
    {
      id: 12,
      title: "Art & Entertainment",
      words: cityData,
      img: categoryImg
    },
    {
      id: 13,
      title: "Health",
      words: cityData,
      img: categoryImg
    },
    {
      id: 14,
      title: "Career",
      words: cityData,
      img: categoryImg
    },
  ]

  const startLearnWords = (words: Words[]) => {
      setStart(words);
  }

  return (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? " text-white bg-[#0E1014]" : ""}`}>
        <Navbar search={false}/>

        {
          start ? <LearnWords words={start}/> :
              <div className="flex flex-grow flex-col px-4 pt-[80px]">
                <h2 className="text-2xl font-semibold text-center pb-4">Words categories</h2>
                <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
                  {
                    categories.map((category) => (
                        <div key={category.id} onClick={() => startLearnWords(category.words)} className="border border-gray-500 rounded-xl p-3 hover:shadow-xl duration-500">
                          <h2 className="font-semibold">{category.title}</h2>
                          <p className="text-[14px]">Words count: <span
                              className="font-semibold">{category.words.length}</span></p>
                          <img className="max-w-[80px]" src={category.img} alt={category.title}/>
                        </div>
                    ))
                  }
                </div>
              </div>
        }

        <Footer/>
      </div>
  )
}
export default WordsCategory
