import React from "react";
import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import useMode from "./hooks/useMode";
import router from "./routes/router";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const { reset } = useQueryErrorResetBoundary();
  const { colorMode, memoizedTheme } = useMode();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }: { resetErrorBoundary: any }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "80vh",
            justifyContent: "center",
          }}
        >
          <Typography>Oops, There was an error!</Typography>
          <Button
            onClick={() => resetErrorBoundary()}
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "#000",
              color: "#fff",
              borderRadius: 0,
            }}
          >
            Try again
          </Button>
        </Box>
      )}
    >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={memoizedTheme}>
          <RouterProvider router={router} />
          <CssBaseline />
        </ThemeProvider>
      </ColorModeContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;
