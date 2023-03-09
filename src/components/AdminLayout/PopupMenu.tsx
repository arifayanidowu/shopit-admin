import { Logout } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { PaperProps } from "./utils";

interface PopupMenuProps {
  anchorEl: any;
  openMenu: boolean;
  handleClose: () => void;
  toggleColorMode: () => void;
  logout: (navigate: any) => void;
  navigate: any;
}

const PopupMenu = ({
  anchorEl,
  openMenu,
  handleClose,
  toggleColorMode,
  logout,
  navigate,
}: PopupMenuProps) => {
  return (
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
      elevation={0}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={toggleColorMode}>Toggle Theme</MenuItem>
      <MenuItem
        onClick={() => logout(navigate)}
        sx={{ justifyContent: "space-between", color: "error.main" }}
      >
        Logout
        <ListItemIcon>
          <Logout color="error" />
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );
};

export default PopupMenu;
