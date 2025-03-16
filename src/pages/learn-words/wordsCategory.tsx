import Navbar from "@/components/layout/navbar/navbar.tsx";
import Footer from "@/components/layout/footer/footer.tsx";
import {useThemeStore} from "@/store/themeStore.ts";
import {CategoryT, Words} from "@/types/verbs-types.ts";
import LearnWords from "@/components/layout/learn-words/learnWords.tsx";
import {useState} from "react";

import categoryImg from "../../images/book_bookmark.jpg"

const colors: string[] = ["#6E88D4", "#1DAC8B", "#E2BB18", "#F4406B", "#C862D8", "#47B66F", "#FBA04B"]

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
const travelingData: Words[] = [
  { id: 1, word: "airport", questionWords: ["airport", "hotel", "luggage", "passport"], correctWord: "airport", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "hotel", questionWords: ["airport", "hotel", "tourist", "destination"], correctWord: "hotel", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "luggage", questionWords: ["ticket", "passport", "luggage", "tour"], correctWord: "luggage", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "passport", questionWords: ["visa", "customs", "passport", "ticket"], correctWord: "passport", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "tourist", questionWords: ["traveler", "tourist", "visitor", "guide"], correctWord: "tourist", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "destination", questionWords: ["journey", "destination", "trip", "holiday"], correctWord: "destination", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "ticket", questionWords: ["boarding", "ticket", "seat", "schedule"], correctWord: "ticket", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "visa", questionWords: ["passport", "visa", "permit", "document"], correctWord: "visa", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "guide", questionWords: ["leader", "guide", "instructor", "map"], correctWord: "guide", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "customs", questionWords: ["border", "immigration", "customs", "security"], correctWord: "customs", isCorrect: false, selectedAnswer: "" },
];
const foodsAndDrinksData: Words[] = [
  { id: 1, word: "apple", questionWords: ["banana", "grape", "apple", "orange"], correctWord: "apple", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "bread", questionWords: ["rice", "pasta", "bread", "cereal"], correctWord: "bread", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "water", questionWords: ["juice", "soda", "water", "milk"], correctWord: "water", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "coffee", questionWords: ["tea", "coffee", "milk", "chocolate"], correctWord: "coffee", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "cheese", questionWords: ["butter", "cheese", "yogurt", "cream"], correctWord: "cheese", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "soup", questionWords: ["salad", "soup", "sandwich", "pizza"], correctWord: "soup", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "meat", questionWords: ["chicken", "fish", "meat", "vegetable"], correctWord: "meat", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "sugar", questionWords: ["salt", "pepper", "sugar", "spice"], correctWord: "sugar", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "honey", questionWords: ["jam", "honey", "syrup", "butter"], correctWord: "honey", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "vegetable", questionWords: ["fruit", "vegetable", "grain", "dairy"], correctWord: "vegetable", isCorrect: false, selectedAnswer: "" },
];
const homeData: Words[] = [
  { id: 1, word: "sofa", questionWords: ["sofa", "table", "chair", "bed"], correctWord: "sofa", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "kitchen", questionWords: ["bathroom", "kitchen", "bedroom", "living room"], correctWord: "kitchen", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "lamp", questionWords: ["lamp", "mirror", "clock", "cushion"], correctWord: "lamp", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "carpet", questionWords: ["curtain", "carpet", "pillow", "blanket"], correctWord: "carpet", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "window", questionWords: ["door", "window", "wall", "ceiling"], correctWord: "window", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "fridge", questionWords: ["oven", "microwave", "fridge", "dishwasher"], correctWord: "fridge", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "wardrobe", questionWords: ["closet", "drawer", "wardrobe", "shelf"], correctWord: "wardrobe", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "toilet", questionWords: ["sink", "bathtub", "toilet", "shower"], correctWord: "toilet", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "fireplace", questionWords: ["chimney", "fireplace", "heater", "radiator"], correctWord: "fireplace", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "garage", questionWords: ["basement", "attic", "garage", "garden"], correctWord: "garage", isCorrect: false, selectedAnswer: "" },
];
const peopleData: Words[] = [
  { id: 1, word: "teacher", questionWords: ["doctor", "engineer", "teacher", "artist"], correctWord: "teacher", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "doctor", questionWords: ["nurse", "doctor", "scientist", "lawyer"], correctWord: "doctor", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "student", questionWords: ["teacher", "student", "professor", "principal"], correctWord: "student", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "chef", questionWords: ["chef", "baker", "butcher", "farmer"], correctWord: "chef", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "driver", questionWords: ["pilot", "driver", "sailor", "cyclist"], correctWord: "driver", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "actor", questionWords: ["director", "writer", "actor", "dancer"], correctWord: "actor", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "musician", questionWords: ["singer", "musician", "painter", "sculptor"], correctWord: "musician", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "athlete", questionWords: ["runner", "athlete", "swimmer", "cyclist"], correctWord: "athlete", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "writer", questionWords: ["journalist", "writer", "poet", "novelist"], correctWord: "writer", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "scientist", questionWords: ["chemist", "scientist", "biologist", "physicist"], correctWord: "scientist", isCorrect: false, selectedAnswer: "" },
];
const freeTimeActivitiesData: Words[] = [
  { id: 1, word: "reading", questionWords: ["reading", "writing", "drawing", "painting"], correctWord: "reading", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "cycling", questionWords: ["cycling", "swimming", "running", "walking"], correctWord: "cycling", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "gardening", questionWords: ["gardening", "cooking", "baking", "fishing"], correctWord: "gardening", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "playing chess", questionWords: ["playing chess", "watching TV", "surfing the internet", "listening to music"], correctWord: "playing chess", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "dancing", questionWords: ["dancing", "singing", "acting", "playing guitar"], correctWord: "dancing", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "camping", questionWords: ["camping", "hiking", "fishing", "climbing"], correctWord: "camping", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "cooking", questionWords: ["baking", "cooking", "grilling", "roasting"], correctWord: "cooking", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "shopping", questionWords: ["shopping", "watching movies", "playing video games", "reading books"], correctWord: "shopping", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "yoga", questionWords: ["meditation", "yoga", "exercise", "gymnastics"], correctWord: "yoga", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "traveling", questionWords: ["traveling", "photography", "blogging", "exploring"], correctWord: "traveling", isCorrect: false, selectedAnswer: "" },
];
const natureData: Words[] = [
  { id: 1, word: "forest", questionWords: ["forest", "river", "mountain", "ocean"], correctWord: "forest", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "river", questionWords: ["lake", "ocean", "river", "stream"], correctWord: "river", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "mountain", questionWords: ["hill", "valley", "mountain", "cliff"], correctWord: "mountain", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "ocean", questionWords: ["sea", "ocean", "lake", "river"], correctWord: "ocean", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "desert", questionWords: ["desert", "forest", "plain", "swamp"], correctWord: "desert", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "volcano", questionWords: ["earthquake", "volcano", "hurricane", "storm"], correctWord: "volcano", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "waterfall", questionWords: ["fountain", "geyser", "waterfall", "lake"], correctWord: "waterfall", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "cave", questionWords: ["cave", "tunnel", "canyon", "valley"], correctWord: "cave", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "meadow", questionWords: ["meadow", "field", "jungle", "prairie"], correctWord: "meadow", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "island", questionWords: ["peninsula", "island", "archipelago", "coast"], correctWord: "island", isCorrect: false, selectedAnswer: "" },
];
const languageData: Words[] = [
  { id: 1, word: "grammar", questionWords: ["vocabulary", "grammar", "pronunciation", "spelling"], correctWord: "grammar", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "vocabulary", questionWords: ["sentence", "word", "vocabulary", "phrase"], correctWord: "vocabulary", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "translation", questionWords: ["interpretation", "translation", "reading", "writing"], correctWord: "translation", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "pronunciation", questionWords: ["accent", "pronunciation", "dialect", "speech"], correctWord: "pronunciation", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "synonym", questionWords: ["synonym", "antonym", "homonym", "metaphor"], correctWord: "synonym", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "idiom", questionWords: ["phrase", "idiom", "proverb", "expression"], correctWord: "idiom", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "sentence", questionWords: ["clause", "sentence", "paragraph", "essay"], correctWord: "sentence", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "phonetics", questionWords: ["grammar", "phonetics", "semantics", "syntax"], correctWord: "phonetics", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "dialect", questionWords: ["dialect", "accent", "language", "speech"], correctWord: "dialect", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "spelling", questionWords: ["spelling", "pronunciation", "reading", "writing"], correctWord: "spelling", isCorrect: false, selectedAnswer: "" },
];
const technologyData: Words[] = [
  { id: 1, word: "computer", questionWords: ["laptop", "desktop", "computer", "tablet"], correctWord: "computer", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "internet", questionWords: ["wifi", "internet", "network", "router"], correctWord: "internet", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "software", questionWords: ["hardware", "application", "software", "program"], correctWord: "software", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "robot", questionWords: ["AI", "robot", "machine", "automation"], correctWord: "robot", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "cybersecurity", questionWords: ["cybersecurity", "encryption", "hacking", "password"], correctWord: "cybersecurity", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "database", questionWords: ["storage", "database", "server", "cloud"], correctWord: "database", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "artificial intelligence", questionWords: ["AI", "machine learning", "artificial intelligence", "robotics"], correctWord: "artificial intelligence", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "algorithm", questionWords: ["function", "algorithm", "equation", "calculation"], correctWord: "algorithm", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "cloud computing", questionWords: ["hosting", "cloud computing", "networking", "server"], correctWord: "cloud computing", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "virtual reality", questionWords: ["augmented reality", "simulation", "virtual reality", "game"], correctWord: "virtual reality", isCorrect: false, selectedAnswer: "" },
];
const educationData: Words[] = [
  { id: 1, word: "school", questionWords: ["college", "university", "school", "academy"], correctWord: "school", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "teacher", questionWords: ["professor", "instructor", "lecturer", "teacher"], correctWord: "teacher", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "homework", questionWords: ["assignment", "homework", "project", "task"], correctWord: "homework", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "lecture", questionWords: ["lecture", "seminar", "presentation", "workshop"], correctWord: "lecture", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "exam", questionWords: ["test", "exam", "quiz", "assessment"], correctWord: "exam", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "library", questionWords: ["library", "bookstore", "reading room", "archives"], correctWord: "library", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "curriculum", questionWords: ["curriculum", "syllabus", "course", "program"], correctWord: "curriculum", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "degree", questionWords: ["certificate", "degree", "diploma", "qualification"], correctWord: "degree", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "scholarship", questionWords: ["grant", "scholarship", "loan", "funding"], correctWord: "scholarship", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "university", questionWords: ["college", "university", "institute", "academy"], correctWord: "university", isCorrect: false, selectedAnswer: "" },
];
const fashionData: Words[] = [
  { id: 1, word: "dress", questionWords: ["shirt", "pants", "dress", "skirt"], correctWord: "dress", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "sneakers", questionWords: ["boots", "sandals", "sneakers", "heels"], correctWord: "sneakers", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "jewelry", questionWords: ["scarf", "hat", "jewelry", "belt"], correctWord: "jewelry", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "fashion", questionWords: ["style", "trend", "fashion", "design"], correctWord: "fashion", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "model", questionWords: ["designer", "stylist", "model", "tailor"], correctWord: "model", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "runway", questionWords: ["stage", "catwalk", "runway", "hall"], correctWord: "runway", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "boutique", questionWords: ["mall", "shop", "boutique", "market"], correctWord: "boutique", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "tailor", questionWords: ["seamstress", "tailor", "designer", "stylist"], correctWord: "tailor", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "trend", questionWords: ["vogue", "trend", "style", "fashion"], correctWord: "trend", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "accessory", questionWords: ["clothes", "shoes", "accessory", "jewelry"], correctWord: "accessory", isCorrect: false, selectedAnswer: "" },
];
const artEntertainmentData: Words[] = [
  { id: 1, word: "painting", questionWords: ["drawing", "sculpture", "painting", "photography"], correctWord: "painting", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "theater", questionWords: ["cinema", "theater", "concert", "exhibition"], correctWord: "theater", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "artist", questionWords: ["painter", "musician", "artist", "writer"], correctWord: "artist", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "sculpture", questionWords: ["statue", "sculpture", "drawing", "collage"], correctWord: "sculpture", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "cinema", questionWords: ["film", "cinema", "show", "opera"], correctWord: "cinema", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "music", questionWords: ["dance", "song", "music", "instrument"], correctWord: "music", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "director", questionWords: ["actor", "director", "writer", "producer"], correctWord: "director", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "gallery", questionWords: ["museum", "gallery", "library", "studio"], correctWord: "gallery", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "opera", questionWords: ["ballet", "opera", "drama", "musical"], correctWord: "opera", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "festival", questionWords: ["carnival", "festival", "event", "parade"], correctWord: "festival", isCorrect: false, selectedAnswer: "" },
];
const healthData: Words[] = [
  { id: 1, word: "doctor", questionWords: ["doctor", "nurse", "patient", "surgeon"], correctWord: "doctor", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "exercise", questionWords: ["diet", "exercise", "meditation", "yoga"], correctWord: "exercise", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "nutrition", questionWords: ["food", "nutrition", "diet", "calories"], correctWord: "nutrition", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "hospital", questionWords: ["clinic", "hospital", "pharmacy", "emergency"], correctWord: "hospital", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "medicine", questionWords: ["pill", "medicine", "vitamin", "drug"], correctWord: "medicine", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "therapy", questionWords: ["treatment", "therapy", "surgery", "massage"], correctWord: "therapy", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "vaccination", questionWords: ["medication", "vaccination", "prescription", "injection"], correctWord: "vaccination", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "mental health", questionWords: ["physical health", "mental health", "well-being", "fitness"], correctWord: "mental health", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "emergency", questionWords: ["accident", "emergency", "trauma", "first aid"], correctWord: "emergency", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "dentist", questionWords: ["orthodontist", "dentist", "surgeon", "pediatrician"], correctWord: "dentist", isCorrect: false, selectedAnswer: "" },
];
const careerData: Words[] = [
  { id: 1, word: "resume", questionWords: ["application", "resume", "interview", "portfolio"], correctWord: "resume", isCorrect: false, selectedAnswer: "" },
  { id: 2, word: "interview", questionWords: ["meeting", "conference", "interview", "discussion"], correctWord: "interview", isCorrect: false, selectedAnswer: "" },
  { id: 3, word: "promotion", questionWords: ["bonus", "salary", "promotion", "raise"], correctWord: "promotion", isCorrect: false, selectedAnswer: "" },
  { id: 4, word: "manager", questionWords: ["employee", "supervisor", "manager", "boss"], correctWord: "manager", isCorrect: false, selectedAnswer: "" },
  { id: 5, word: "salary", questionWords: ["income", "salary", "wage", "earnings"], correctWord: "salary", isCorrect: false, selectedAnswer: "" },
  { id: 6, word: "internship", questionWords: ["training", "internship", "volunteering", "job"], correctWord: "internship", isCorrect: false, selectedAnswer: "" },
  { id: 7, word: "entrepreneur", questionWords: ["businessman", "entrepreneur", "investor", "executive"], correctWord: "entrepreneur", isCorrect: false, selectedAnswer: "" },
  { id: 8, word: "networking", questionWords: ["socializing", "networking", "collaborating", "partnership"], correctWord: "networking", isCorrect: false, selectedAnswer: "" },
  { id: 9, word: "leadership", questionWords: ["management", "leadership", "authority", "control"], correctWord: "leadership", isCorrect: false, selectedAnswer: "" },
  { id: 10, word: "freelance", questionWords: ["contractor", "freelance", "full-time", "part-time"], correctWord: "freelance", isCorrect: false, selectedAnswer: "" },
];

const WordsCategory = () => {
  const {isDarkMode} = useThemeStore();
  const [start, setStart] = useState<null | Words[]>(null);

  const categories: CategoryT[] = [
    {
      id: 1,
      title: "Traveling",
      words: travelingData,
      img: categoryImg,
    },
    {
      id: 2,
      title: "Foods and Drinks",
      words: foodsAndDrinksData,
      img: categoryImg,
    },
    {
      id: 3,
      title: "City",
      words: cityData,
      img: categoryImg,
    },
    {
      id: 4,
      title: "Home",
      words: homeData,
      img: categoryImg,
    },
    {
      id: 5,
      title: "People",
      words: peopleData,
      img: categoryImg,
    },
    {
      id: 6,
      title: "Free time Activities",
      words: freeTimeActivitiesData,
      img: categoryImg,
    },
    {
      id: 7,
      title: "Nature",
      words: natureData,
      img: categoryImg
    },
    {
      id: 8,
      title: "Language",
      words: languageData,
      img: categoryImg,
    },
    {
      id: 9,
      title: "Technology",
      words: technologyData,
      img: categoryImg,
    },
    {
      id: 10,
      title: "Education",
      words: educationData,
      img: categoryImg,
    },
    {
      id: 11,
      title: "Fashion",
      words: fashionData,
      img: categoryImg,
    },
    {
      id: 12,
      title: "Art & Entertainment",
      words: artEntertainmentData,
      img: categoryImg,
    },
    {
      id: 13,
      title: "Health",
      words: healthData,
      img: categoryImg,
    },
    {
      id: 14,
      title: "Career",
      words: careerData,
      img: categoryImg,
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
                    categories.map((category, index) => (
                        <div key={category.id} onClick={() => startLearnWords(category.words)}
                             className={`border  rounded-xl p-3 hover:shadow-xl hover:scale-105 duration-500`}
                             style={{backgroundColor: colors[index % colors.length], borderColor: colors[index % colors.length]}}
                        >
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
