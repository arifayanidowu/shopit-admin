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
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { Id, toast } from "react-toastify";
import DropzoneContent from "src/components/shared/DropzoneContent";
import { createBrand } from "src/endpoints/brands";
import useFileHandler from "src/hooks/useFileHandler";

import type { Brand } from "src/types";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const AddBrandModal = ({ open, handleClose }: IProps) => {
  const queryClient = new QueryClient();
  const { file, image, getInputProps, getRootProps, isDragActive } =
    useFileHandler();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Brand>({
    defaultValues: {
      name: "",
    },
  });
  let toastId: Id;

  const { mutate, isLoading } = useMutation(createBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      toast.update(toastId, {
        render: "Brand created successfully!",
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
      let err = error as Error;
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

  const onSubmit = (data: Brand) => {
    toastId = toast.loading("Creating brand...");
    const formData = new FormData();
    formData.append("name", data.name);
    if (file) {
      formData.append("logo", file as Blob);
    }
    mutate(formData);
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-brand-modal"
      aria-describedby="add-brand-modal"
      fullWidth
      maxWidth="sm"
      role="dialog"
    >
      <DialogTitle
        id="add-brand-modal"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogContentText>Add Brand</DialogContentText>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Paper component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DropzoneContent
            getInputProps={getInputProps}
            getRootProps={getRootProps}
            isDragActive={isDragActive}
            image={image as string}
            src={image as string}
            containerStyle={{ height: 200, mb: 2 }}
          />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                placeholder="Enter Name"
                label="Name"
                fullWidth
                required
                sx={{ mb: 2 }}
                {...field}
                {...register("name", {
                  required: "Name is required",
                })}
                helperText={errors.name?.message}
                error={!!errors.name}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            size="large"
            startIcon={
              isLoading ? <CircularProgress size={14} color="inherit" /> : null
            }
          >
            {isLoading ? "Processing..." : "Submit"}
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default AddBrandModal;
