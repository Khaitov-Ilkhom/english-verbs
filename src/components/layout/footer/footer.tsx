import {useThemeStore} from "@/store/themeStore.ts";

const Footer = () => {
  const {isDarkMode} = useThemeStore();

  return (
      <>
        <p className={`w-full text-center pb-2 md:py-6 px-2 ${isDarkMode ? "text-white" : ""}`}>Copyright © 2025 Irregular-verbs
          Created by
          <b><a className="italic" href="https://t.me/KhaitovIlhom"> Khaitov Ilkhom</a></b>. All rights reserved.
        </p>
      </>
  )
}
export default Footer
