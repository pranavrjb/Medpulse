import React, { createContext, useContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode ? JSON.parse(savedMode) : "light";
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#fdfdfd", 
                  paper: "#f0f0f0", 
                },
                text: {
                  primary: "#212121",
                  secondary: "#5f6368",
                },
                primary: {
                  main: "#3f51b5", 
                },
                secondary: {
                  main: "#f50057",
                },
                divider: "#e0e0e0", 
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#e0e0e0",
                  secondary: "#a8a8a8",
                },
                primary: {
                  main: "#bb86fc", // Soft purple accent
                },
                secondary: {
                  main: "#03dac6", // Teal accent
                },
                divider: "#373737", // Dark gray divider
              }),
        },
        typography: {
          fontFamily: "Roboto, sans-serif",
          allVariants: {
            color: mode === "light" ? "#212121" : "#e0e0e0",
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow:
                  mode === "light" ? "0 2px 6px rgba(0, 0, 0, 0.1)" : "none", 
                borderRadius: 8, 
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
