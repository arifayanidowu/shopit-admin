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
import {
  Outlet,
  useLocation,
  useNavigate,
  type Location,
} from "react-router-dom";
import {
  AppBar,
  Avatar,
  Collapse,
  Fab,
  IconButton,
  ListSubheader,
  SvgIcon,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

import { Drawer, DrawerHeader, lisItemStyle, styledList } from "./utils";
import { ReactComponent as CollectionIcon } from "./icons/collection.svg";
import { logout } from "../../endpoints/services/axiosService";
import { useStore } from "../../store";
import { ColorModeContext } from "../../App";
import { dashboardLinks, generalLinks, settingsLinks } from "./links";
import PopupMenu from "./PopupMenu";
import { getProfile } from "src/endpoints/auth";
import RefetchIndicator from "./RefetchIndicator";

const Indicator = ({ variants }: { variants: any }) => (
  <motion.div
    variants={variants}
    initial="hidden"
    animate="visible"
    exit="exit"
    style={{
      position: "absolute",
      top: 0,
      right: -10,
      background: "#9d5e69",
      width: 5,
      height: "100%",
    }}
  />
);

interface NavLinkItemProps {
  open: boolean;
  location: Location;
  item: any;
  navigate: (path: string) => void;
  variants: Record<string, any>;
  extraStyle?: Record<string, any>;
}

const NavLinkItem = ({
  open,
  location,
  item,
  navigate,
  variants,
  extraStyle,
}: NavLinkItemProps) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={(theme) => ({
          ...lisItemStyle(theme, open, location, item),
        })}
        onClick={() => navigate(item.href)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: "center",
            ...extraStyle,
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.label} sx={{ ...styledList(open) }} />
        {location?.pathname === item.href && (
          <AnimatePresence>
            <Indicator variants={variants} />
          </AnimatePresence>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default function AdminLayout() {
  const theme = useTheme();
  const token = localStorage.getItem("auth_token");
  const location = useLocation();
  const matches = useMediaQuery("(min-width:700px)");
  const { setAdminData, adminData, resetState } = useStore();
  const [open, setOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const { toggleColorMode } = React.useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const { data, isFetching } = useQuery(["profile"], getProfile, {
    enabled: !!token,
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (matches) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [matches]);

  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (token) {
      const decoded = jwt_decode(token);
      const { exp } = decoded as any;
      const currentTime = Date.now() / 1000;

      if (currentTime > exp) {
        logout(navigate, resetState);
      } else {
        const timeUntilExpiration = exp - currentTime;
        timeoutId = setTimeout(() => {
          toast.error("Session expired!");
          logout(navigate, resetState);
        }, timeUntilExpiration * 1000);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [token, navigate, resetState]);

  React.useEffect(() => {
    if (data) {
      setAdminData(data);
    }
  }, [data, setAdminData]);

  const handleDrawerClose = () => {
    setOpen((prev) => !prev);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const splittedName = adminData?.name?.split(" ");

  const variants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.5 },
    },
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.5,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { ease: "easeOut", duration: 2 },
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: { ease: "easeOut", duration: 2 },
    },
  };

  const dividerVariant = {
    hidden: { scale: 0, x: 12 },
    visible: { scale: 1, x: 0 },
    exit: { scale: 0, x: -12 },
  };

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
              <ChevronLeftIcon
                sx={{
                  transform: !open ? "rotate(-180deg)" : "rotate(0deg)",
                  transition: "all 0.3s ease-in-out",
                  translateX: !open ? 0 : -0.24,
                }}
              />
            )}
          </Fab>
        </DrawerHeader>
        <Divider />
        <Box>
          <List>
            {dashboardLinks().map((item) => (
              <NavLinkItem
                key={item.label}
                {...{
                  open,
                  location,
                  item,
                  navigate,
                  variants: dividerVariant,
                }}
                extraStyle={{
                  transition: "all 0.5s ease-in-out",
                  ml: open ? 0 : -0.24,
                }}
              />
            ))}
          </List>

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component={Box}
                sx={{ p: 0, background: "transparent" }}
              >
                <ListItemButton
                  onClick={() => setOpenDropdown((prev) => !prev)}
                  sx={{
                    px: 2.5,
                    mx: 1,
                  }}
                >
                  <ListItemIcon
                    sx={(theme) => ({
                      minWidth: 0,
                      justifyContent: "center",
                      ml: open ? 0 : "-9.80px",
                      transition: "all 0.5s ease-in-out",
                      [theme.breakpoints.down("sm")]: {
                        ml: open ? 0 : "-11.99px",
                      },
                    })}
                  >
                    <SvgIcon
                      inheritViewBox
                      component={CollectionIcon}
                      opacity={0.5}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Collections"
                    sx={{
                      ...styledList(open),
                    }}
                  />
                  <ChevronRight
                    sx={{
                      transform: openDropdown
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                      transition: "all 0.3s ease-in-out",
                      opacity: open ? 1 : 0,
                      translateX: open ? 0 : -10,
                      fillOpacity: 0.5,
                    }}
                  />
                </ListItemButton>
              </ListSubheader>
            }
          >
            <motion.div
              initial={false}
              animate={openDropdown ? "open" : "closed"}
            >
              <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                <motion.div variants={variants}>
                  <AnimatePresence mode="sync">
                    <motion.div variants={itemVariants}>
                      {generalLinks().map((item) => (
                        <NavLinkItem
                          key={item.label}
                          {...{
                            open,
                            location,
                            item,
                            navigate,
                            variants: dividerVariant,
                          }}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </Collapse>
              {settingsLinks().map((item) => (
                <NavLinkItem
                  key={item.label}
                  {...{
                    open,
                    location,
                    item,
                    navigate,
                    variants: dividerVariant,
                  }}
                />
              ))}
            </motion.div>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
        <AppBar elevation={0} position="fixed" color="inherit">
          <Toolbar>
            <Toolbar sx={{ mr: "auto" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography noWrap component="p" sx={{ fontSize: "0.9rem" }}>
                {adminData.username ?? adminData?.name}
              </Typography>
              <IconButton
                aria-label="User's Avatar"
                sx={(theme) => ({
                  mr: 2,
                  bgcolor:
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.02)"
                      : "rgba(255,255,255,0.03)",
                })}
                onClick={handleClick}
              >
                {adminData.avatar ? (
                  <Avatar src={adminData?.avatar} alt={adminData?.name} />
                ) : (
                  <Avatar sx={{ p: 2 }}>
                    <Typography sx={{ fontSize: "0.8rem" }} color="primary">
                      {splittedName?.[0][0]}
                      {splittedName?.[1][0]}
                    </Typography>
                  </Avatar>
                )}
              </IconButton>
              <PopupMenu
                {...{
                  anchorEl,
                  openMenu,
                  handleClose,
                  handleClick,
                  toggleColorMode,
                  logout,
                  navigate,
                  resetState,
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Outlet />
        <RefetchIndicator isFetching={isFetching} />
      </Box>
    </Box>
  );
}
