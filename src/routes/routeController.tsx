import {useRoutes} from "react-router-dom";
import {lazy} from "react";
import {SuspenseElement as Suspense} from "../utils/index.tsx";

const Home = lazy(() => import('../pages/home/home.tsx'))
// const LearnWords = lazy(() => import("@/pages/learn-words/learnWords.tsx"))

const RouteController = () => {
  return (
      useRoutes([
        {
          path: "",
          element: <Suspense><Home/></Suspense>
        },
        // {
        //   path: "learn-words",
        //   element: <Suspense><LearnWords/></Suspense>
        // }
      ])
  )
}
export default RouteController
