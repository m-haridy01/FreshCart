import React, { useState } from "react";
import { createContext } from "react";

export let HandleThemeContext = createContext();

export default function ThemeContextProvider({children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  function toggleTheme() {
    if (theme == "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }

  return <HandleThemeContext.Provider value={{toggleTheme , theme} }>
    {children}
    </HandleThemeContext.Provider>;
}
