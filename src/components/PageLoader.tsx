import { Box } from "@mui/material";
import CustomCircularProgress from "./shared/CustomCircularProgress";

const PageLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CustomCircularProgress />
    </Box>
  );
};

export default PageLoader;
