import { createTheme, PaletteMode } from "@mui/material";
import React from "react";

const useMode = () => {
  const [mode, setMode] = React.useState<PaletteMode>(
    "light" ?? (localStorage.getItem("app-color-mode") as PaletteMode)
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          const mode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("app-color-mode", mode);
          return mode;
        });
      },
    }),
    []
  );

  const memoizedTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: "#181826",
          },
          secondary: {
            main: "#681e51",
          },
          background: {
            default: mode === "light" ? "#fefefe" : "#181826",
          },
        },
        components: {
          MuiButtonBase: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "0px",
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                fontFamily: "Abel",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "0px",

                "&:hover": {
                  transform: "translateY(-2px)",
                  transition: "transform 0.2s ease-in-out",
                },
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontSize: "1.2rem",
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                "&.MuiOutlinedInput-root": {
                  borderRadius: "0px",
                  "& fieldset": {
                    borderColor: mode === "light" ? "#000" : "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: mode === "light" ? "#000" : "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: mode === "light" ? "#000" : "#fff",
                  },
                },
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === "light" ? "#fff" : "#0e121b",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: "0px",
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                fontFamily: "Abel",
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                fontFamily: "Abel",
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                fontFamily: "Abel",
              },
            },
          },
        },
      }),
    [mode]
  );

  React.useEffect(() => {
    const localMode = localStorage.getItem("app-color-mode");
    if (localMode) {
      setMode(localMode as PaletteMode);
    }
  }, []);

  return {
    colorMode,
    memoizedTheme,
  };
};

export default useMode;
