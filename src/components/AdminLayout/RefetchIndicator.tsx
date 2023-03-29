import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import EllipsisAnim from "../shared/EllipsisAnim";

const RefetchIndicator = ({ isFetching }: { isFetching: boolean }) => {
  // pulse animation using framer-motion
  const pulse = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isFetching ? (
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            border: "1.5px solid #ccc",
            px: 5,
            p: 0.5,
            borderRadius: 50,
            right: 10,
            bottom: 10,
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              bgcolor: "grey.300",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div variants={pulse} initial="initial" animate="animate">
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "error.main",
                }}
              />
            </motion.div>
          </Box>
          <Typography sx={{ fontSize: "0.8rem" }}>
            Revalidating <EllipsisAnim />
          </Typography>
        </Box>
      ) : null}
    </AnimatePresence>
  );
};

export default RefetchIndicator;
