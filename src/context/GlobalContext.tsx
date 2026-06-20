import type { AuthDetails } from "@/features/auth/auth.zod";
import useAuth from "@/features/auth/hooks";
import type { ApiResponse } from "@/types/axis.types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  authDetails?: ApiResponse<AuthDetails>;
  logoutUser: () => void;
};

const GlobalContext = createContext<ThemeContextType | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { authDetails, logoutUser } = useAuth();
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <GlobalContext.Provider
      value={{ theme, toggleTheme, authDetails, logoutUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx)
    throw new Error("useGlobalContext must be used inside GlobalProvider");
  return ctx;
};
