import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";

type TConfirmDialog = {
  open: boolean;
  handleClose: () => void;
  message: string;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  open,
  handleClose,
  onConfirm,
  message,
}: TConfirmDialog) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Action
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Paper>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "1.6rem" }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
            disableElevation
            size="large"
          >
            No
          </Button>
          <Button
            onClick={onConfirm}
            autoFocus
            variant="contained"
            disableElevation
            size="large"
          >
            Yes
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}
