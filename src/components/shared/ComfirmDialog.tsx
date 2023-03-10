import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Paper } from "@mui/material";

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
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Action</DialogTitle>
        <Paper>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error" disableElevation>
              No
            </Button>
            <Button
              onClick={onConfirm}
              autoFocus
              variant="contained"
              disableElevation
            >
              Yes
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
}
