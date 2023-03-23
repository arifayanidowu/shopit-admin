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
import useFormMutation from "src/hooks/useFormMutation";
import { createCategory } from "../../../endpoints/category";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

type TCategoryInput = {
  name: string;
};

const CreateCategoryModal = ({ open, handleClose }: IProps) => {
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
  } = useFormMutation<TCategoryInput>({
    mutationFn: createCategory,
    queryKeys: ["category"],
    successMessage: "Category created successfully!",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: TCategoryInput) => {
    toastId.current = toast.loading("Creating category...");
    handleClose();
    mutate(data);
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-category-modal"
      aria-describedby="add-category-modal"
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
        <DialogContentText>Add Category</DialogContentText>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Paper component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                variant="outlined"
                placeholder="Enter category Name"
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
            {isLoading ? "Processing..." : "Submit"}
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default CreateCategoryModal;
