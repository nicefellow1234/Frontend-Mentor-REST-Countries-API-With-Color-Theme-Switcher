"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

// Type declarations
export type ThemeMode = "light-mode" | "dark-mode";

interface IGlobalContext {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

// Constants
export const LIGHT_MODE: ThemeMode = "light-mode";
export const DARK_MODE: ThemeMode = "dark-mode";
const THEME_MODE = "THEME_MODE";

// Default context value
const defaultContextValue: IGlobalContext = {
  themeMode: LIGHT_MODE, // default mode
  setThemeMode: (mode) => console.warn("No theme provider")
};

// Context creation
export const GlobalContext = createContext<IGlobalContext>(defaultContextValue);

// GlobalProvider component
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(LIGHT_MODE);

  useEffect(() => {
    const value =
      typeof window !== "undefined" ? localStorage.getItem(THEME_MODE) : null;
    if (value) {
      setThemeMode(JSON.parse(value));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem(THEME_MODE, JSON.stringify(themeMode));
    }, 0);
  }, [themeMode]);

  return (
    <GlobalContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </GlobalContext.Provider>
  );
};
