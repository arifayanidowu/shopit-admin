import React, { useEffect } from "react";
import { Box, Button, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import useMode from "./hooks/useMode";
import router from "./routes/router";
import { useStore } from "./store";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const { reset } = useQueryErrorResetBoundary();
  const { colorMode, memoizedTheme } = useMode();
  const { setPageHistory } = useStore();

  useEffect(() => {
    setPageHistory(router.state.location);
  }, [setPageHistory]);

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }: { resetErrorBoundary: any }) => (
        <Box>
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
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
