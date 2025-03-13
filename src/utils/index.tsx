import {JSX, Suspense} from "react";

const Loading = () => {
  return (
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-slate-300 to-slate-500">
        <p className="italic font-semibold text-4xl">Loading...</p>
      </div>
  )
}

const SuspenseElement = ({children}: { children: JSX.Element }) => {
  return (
      <Suspense fallback={<Loading/>}>
        {children}
      </Suspense>
  )
}

export {Loading, SuspenseElement}