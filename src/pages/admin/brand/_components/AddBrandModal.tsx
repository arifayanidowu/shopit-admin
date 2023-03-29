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
import { Controller } from "react-hook-form";
import DropzoneContent from "src/components/shared/DropzoneContent";
import EllipsisAnim from "src/components/shared/EllipsisAnim";
import { createBrand } from "src/endpoints/brands";
import useFileHandler from "src/hooks/useFileHandler";
import useFormMutation from "src/hooks/useFormMutation";

import type { Brand } from "src/types";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const AddBrandModal = ({ open, handleClose }: IProps) => {
  const {
    mutate,
    isLoading,
    validationErrors,
    handleSubmit,
    control,
    register,
    reset,
    toastId,
    toast,
  } = useFormMutation<Brand>({
    mutationFn: createBrand,
    queryKeys: ["brands"],
    successMessage: "Brand created successfully!",
    defaultValues: {
      name: "",
    },
  });
  const { file, image, getInputProps, getRootProps, isDragActive } =
    useFileHandler();
  const onSubmit = (data: Brand) => {
    toastId.current = toast.loading("Creating brand...");
    const formData = new FormData();
    formData.append("name", data.name);
    if (file) {
      formData.append("logo", file as Blob);
    }
    mutate(formData as any);
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
                helperText={validationErrors.name?.message}
                error={!!validationErrors.name}
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
            {isLoading ? (
              <>
                Processing
                <EllipsisAnim />
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default AddBrandModal;
