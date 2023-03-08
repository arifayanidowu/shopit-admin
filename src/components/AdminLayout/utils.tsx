import { CSSObject, styled, Theme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

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

export const PaperProps = () => ({
  elevation: 0,
  sx: (theme: Theme) => ({
    overflow: "visible",
    borderRadius: 0,
    px: 0.5,
    filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.32))",
    mt: 1.5,
    minWidth: 150,
    ml: 8,
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
      top: "45%",
      left: -4,
      bottom: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
      [theme.breakpoints.down("sm")]: {
        top: "85%",
      },
    },
  }),
});
