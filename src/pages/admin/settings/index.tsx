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
import { AnimatePresence } from "framer-motion";
import RoleTable from "./_components/RoleTable";
import Admin from "./_components/admin";
import AnimateContainer from "src/components/shared/AnimateContainer";

const Settings = () => {
  const [showView, setShowView] = useState<"role" | "user">("role");

  return (
    <AnimateContainer>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}>
          <Box>
            <Typography variant="h3">Settings</Typography>
            <Typography>Administrative Panel</Typography>
          </Box>
          <Paper
            square
            sx={{
              height: "fit-content",
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
            {showView === "role" ? <RoleTable /> : <Admin />}
          </AnimatePresence>
        </Grid>
      </Grid>
    </AnimateContainer>
  );
};

export default Settings;
