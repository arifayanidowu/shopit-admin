import { Box, Typography } from "@mui/material";
import CustomCircularProgress from "./shared/CustomCircularProgress";
import EllipsisAnim from "./shared/EllipsisAnim";

const PageLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column",
      }}
    >
      <CustomCircularProgress />
      <Typography
        sx={{
          letterSpacing: 2.2,
          textAlign: "center",
          display: "inline-block",
          textTransform: "uppercase",
          fontSize: "0.9rem",
        }}
      >
        Loading
        <EllipsisAnim />
      </Typography>
    </Box>
  );
};

export default PageLoader;
