import { CSSObject, styled, Theme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import type { Location } from "react-router-dom";

export const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const styledList = (open: boolean = false): CSSObject => ({
  opacity: open ? 1 : 0,
  transform: open ? "translateX(-20)" : "translateX(20px)",
  transition: "all 0.3s ease-in-out",
  marginLeft: open ? 3 : 0,
});

export const showCollectionIconStyle = (open: boolean = false): CSSObject => ({
  opacity: !open ? 1 : 0,
  transform: !open ? "translateX(20)" : "translateX(-20px)",
  transition: "all 0.3s ease-in-out",
  ml: !open ? "-11px" : "-5.2px",
});

export const dividerStyle = (open: boolean = false): CSSObject => ({
  opacity: !open ? 1 : 0,
  transition: "all 0.6s ease-in-out",
  transitionDelay: "0.3s",
});
export const lisItemStyle = (
  theme: Theme,
  open: boolean = false,
  location?: Location,
  item?: any
): CSSObject => ({
  minHeight: 48,
  justifyContent: open ? "initial" : "center",
  px: 2.5,
  mx: 1,
  bgcolor:
    location?.pathname === item.href
      ? theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.04)"
        : "rgba(225, 225, 225, 0.08)"
      : "transparent",
});

export const PaperProps = () => ({
  sx: (theme: Theme) => ({
    overflow: "visible",
    width: drawerWidth / 1.5,
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: theme.palette.mode === "light" ? "background.paper" : "#1f2228",
      borderTop: `1px solid ${
        theme.palette.mode === "light" ? "#e0e0e0" : "#515151"
      }`,
      borderLeft: `1px solid ${
        theme.palette.mode === "light" ? "#e0e0e0" : "#515151"
      }`,
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  }),
});
