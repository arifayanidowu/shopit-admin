import { Box, Button, Typography } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

function ErrorBoundary() {
  let error = useRouteError() as any;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        {error.status === 404 ? (
          <img
            src="/404.jpeg"
            alt="404"
            style={{
              borderRadius: "100%",
              margin: "auto",
            }}
          />
        ) : (
          <img
            src="/vector_art.jpeg"
            alt="404"
            style={{
              borderRadius: "100%",
              margin: "auto",
            }}
          />
        )}
        <Typography variant="h4">Oops</Typography>
        <Typography variant="h6">An unexpected error has occurred</Typography>
        <Typography variant="h6" color="error.main">
          {error.status}
        </Typography>

        <Button
          LinkComponent={Link}
          sx={{ mt: 2 }}
          variant="contained"
          disableElevation
          onClick={() => {
            window.history.back();
          }}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
}

export default ErrorBoundary;
