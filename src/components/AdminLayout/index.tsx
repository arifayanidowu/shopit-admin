import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Fab, Menu, MenuItem, SvgIcon, Tooltip } from "@mui/material";
import {
  dividerStyle,
  Drawer,
  DrawerHeader,
  PaperProps,
  showCollectionIconStyle,
  styledList,
} from "./utils";
import { ReactComponent as CollectionIcon } from "./icons/collection.svg";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../endpoints/getProfile";
import { logout } from "../../endpoints/services/axiosService";
import { Logout } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useStore } from "../../store";
import { ColorModeContext } from "../../App";
import { dashboardLinks, generalLinks } from "./links";

export default function AdminLayout() {
  const theme = useTheme();
  const location = useLocation();
  const { setAdminData, adminData } = useStore();
  const [open, setOpen] = React.useState(false);
  const { toggleColorMode } = React.useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const { data, isLoading, isError, error } = useQuery(["profile"], getProfile);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      setAdminData(data);
    }
  }, [data, setAdminData]);

  React.useEffect(() => {
    if (error) {
      let err = error as any;
      toast.error(err?.message, {
        closeOnClick: true,
        closeButton: true,
        autoClose: 2000,
      });

      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    }
  }, [error]);

  React.useEffect(() => {
    if (!isLoading && isError) logout(navigate);
  }, [isError, navigate, isLoading]);

  const handleDrawerClose = () => {
    setOpen((prev) => !prev);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const splittedName = adminData?.name?.split(" ");

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Fab
            onClick={handleDrawerClose}
            sx={{
              position: "fixed",
              marginRight: -2.8,
              zIndex: 60,
              borderRadius: 0,
              boxShadow: "none",
              width: 30,
              height: 20,
            }}
            color="primary"
            size="small"
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </Fab>
        </DrawerHeader>
        <Divider />
        <Box>
          <List>
            {dashboardLinks().map((item) => (
              <ListItem
                key={item.label}
                disablePadding
                sx={{ display: "block", mt: 1 }}
              >
                <ListItemButton
                  sx={(theme) => ({
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    mx: 1,
                    bgcolor:
                      location.pathname === item.href
                        ? theme.palette.mode === "light"
                          ? "rgba(0, 0, 0, 0.04)"
                          : "rgba(225, 225, 225, 0.08)"
                        : "transparent",
                  })}
                  onClick={() => navigate(item.href)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{ ...styledList(open) }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              mx: 4,
              mt: 1,
              display: "flex",
            }}
          >
            <Box
              sx={{
                ...showCollectionIconStyle(open),
              }}
            >
              <Tooltip title="Collections" arrow placement="right">
                <SvgIcon inheritViewBox component={CollectionIcon} />
              </Tooltip>
              <Divider
                sx={{
                  ...dividerStyle(open),
                }}
              />
            </Box>
            <Box
              sx={{
                // ...styledList(open),
                opacity: open ? 1 : 0,
                transform: open ? "translateX(-20)" : "translateX(20px)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Typography
                sx={(theme) => ({
                  fontWeight: "bold",
                })}
              >
                Collections
              </Typography>
            </Box>
          </Box>
          <List>
            {generalLinks().map((item) => (
              <ListItem
                key={item.label}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    mx: 1,
                    bgcolor:
                      location.pathname === item.href
                        ? theme.palette.mode === "light"
                          ? "rgba(0, 0, 0, 0.04)"
                          : "rgba(225, 225, 225, 0.08)"
                        : "transparent",
                  }}
                  onClick={() => navigate(item.href)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      // mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{ ...styledList(open) }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{ position: "absolute", zIndex: 20, bottom: 50, width: "100%" }}
        >
          <Divider sx={{ mb: 1 }} />
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              ...PaperProps(),
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={toggleColorMode}>Toggle Theme</MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ justifyContent: "space-between", color: "error.main" }}
            >
              Logout
              <ListItemIcon>
                <Logout color="error" />
              </ListItemIcon>
            </MenuItem>
          </Menu>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              mx: 1,
            }}
            onClick={(e) => handleClick(e)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <Avatar
                src={adminData?.avatar}
                sx={{ width: 24, height: 24, p: 2 }}
              >
                <Typography sx={{ fontSize: "0.8rem" }} color="primary">
                  {splittedName?.[0][0]}
                  {splittedName?.[1][0]}
                </Typography>
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                adminData?.username ? adminData?.username : adminData?.name
              }
              sx={{
                ...styledList(open),
              }}
            />
          </ListItemButton>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
