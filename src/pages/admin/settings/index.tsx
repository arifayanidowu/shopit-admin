import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AdminTable from "./_components/AdminTable";
import RoleTable from "./_components/RoleTable";

const Settings = () => {
  const [showView, setShowView] = useState<"role" | "user">("role");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{
          overflow: "hidden",
        }}
      >
        <Grid
          container
          spacing={1}
          // justifyContent="center"
          // alignItems="center"
        >
          <Grid item xs={12} md={2}>
            <motion.div variants={item}>
              <Typography variant="h3">Settings</Typography>
              <Typography>Administrative Panel</Typography>
            </motion.div>
            <Paper
              square
              sx={{
                height: 200,
                maxHeight: 200,
                overflowY: "auto",
              }}
              elevation={0}
            >
              <Box
                sx={{
                  p: 1,
                }}
              >
                <List>
                  <ListItem sx={{ display: "block" }} disablePadding>
                    <ListItemButton
                      sx={(theme) => ({
                        bgcolor:
                          showView === "role"
                            ? theme.palette.mode === "light"
                              ? "rgba(0, 0, 0, 0.04)"
                              : "rgba(225, 225, 225, 0.08)"
                            : "transparent",
                        mb: 1,
                      })}
                      onClick={() => setShowView("role")}
                    >
                      <ListItemText primary="Role" />
                    </ListItemButton>
                    <ListItemButton
                      sx={(theme) => ({
                        bgcolor:
                          showView === "user"
                            ? theme.palette.mode === "light"
                              ? "rgba(0, 0, 0, 0.04)"
                              : "rgba(225, 225, 225, 0.08)"
                            : "transparent",
                      })}
                      onClick={() => setShowView("user")}
                    >
                      <ListItemText primary="Users" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={10} sx={{ width: "100%", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              {showView === "role" ? <RoleTable /> : <AdminTable />}
            </AnimatePresence>
          </Grid>
        </Grid>
      </motion.div>
    </AnimatePresence>
  );
};

export default Settings;
