import { Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { Id, toast } from "react-toastify";
import { createAdmin } from "src/endpoints/admins";

type IFormValues = {
  name: string;
  email: string;
};

const AddUserModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  let toastId: Id;
  const { control, handleSubmit, reset } = useForm<IFormValues>();
  const { mutate, isLoading } = useMutation(createAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      toast.update(toastId, {
        render: "Admin created successfully!",
        type: "success",
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
      });
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    },
    onError: (error) => {
      const err = error as Error;
      toast.update(toastId, {
        render: err.message,
        type: "error",
        autoClose: 2000,
        isLoading: false,
        closeOnClick: true,
        closeButton: true,
      });
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    },
  });

  const onSubmit = (data: IFormValues) => {
    toastId = toast.loading("Creating Admin...");
    mutate(data);
    handleClose();
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-user-modal"
      aria-describedby="add-user-modal"
      fullWidth
      maxWidth="sm"
      role="dialog"
    >
      <DialogTitle
        id="add-user-modal"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogContentText>Add User</DialogContentText>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Paper component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                placeholder="Enter Name"
                label="Name"
                fullWidth
                sx={{ mb: 2 }}
                {...field}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                placeholder="Enter Email"
                label="Email"
                fullWidth
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            endIcon={isLoading && <CircularProgress />}
          >
            {isLoading ? "Loading..." : "Add New User"}
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default AddUserModal;
