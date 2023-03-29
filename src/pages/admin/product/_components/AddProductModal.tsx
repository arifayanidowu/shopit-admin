import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import DropzoneContent from "src/components/shared/DropzoneContent";
import EllipsisAnim from "src/components/shared/EllipsisAnim";
import { getAllBrands } from "src/endpoints/brands";
import { createProduct } from "src/endpoints/product";
import useFileHandler from "src/hooks/useFileHandler";
import useFormMutation from "src/hooks/useFormMutation";
import { Brand, Product } from "src/types";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const AddProductModal = ({ open, handleClose }: IProps) => {
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
  } = useFormMutation<Product>({
    mutationFn: createProduct,
    queryKeys: ["products"],
    successMessage: "Product created successfully!",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      brandId: "",
    },
  });

  const { data: brands } = useQuery<Brand[]>(["brands"], getAllBrands);

  const { file, image, getInputProps, getRootProps, isDragActive } =
    useFileHandler();

  const onSubmit = (data: Product) => {
    toastId.current = toast.loading("Creating product...");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price?.toString());
    formData.append("quantity", data.quantity?.toString());
    formData.append("brandId", data.brandId!);
    if (file) {
      formData.append("file", file as Blob);
    }
    mutate(formData as any);
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-product-modal"
      aria-describedby="add-product-modal"
      fullWidth
      maxWidth="sm"
      role="dialog"
      scroll="paper"
    >
      <DialogTitle
        id="add-product-modal"
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
      <DialogContent dividers>
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
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              placeholder="Enter Price"
              label="Price"
              type={"number"}
              fullWidth
              required
              sx={{ mb: 2 }}
              {...field}
              {...register("price", {
                required: "Price is required",
              })}
              helperText={validationErrors.price?.message}
              error={!!validationErrors.price}
            />
          )}
        />
        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              placeholder="Enter Quantity"
              label="Quantity"
              type={"number"}
              fullWidth
              required
              sx={{ mb: 2 }}
              {...field}
              {...register("quantity", {
                required: "Quantity is required",
              })}
              helperText={validationErrors.quantity?.message}
              error={!!validationErrors.quantity}
            />
          )}
        />

        <Controller
          name="brandId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth required>
              <InputLabel id="brand-input-label">Brand</InputLabel>
              <Select
                native
                {...field}
                {...register("brandId", {
                  required: "Brand is required",
                })}
                fullWidth
                required
                sx={{ mb: 2 }}
                label="Brand"
                inputProps={{
                  name: "brandId",
                  id: "brandId",
                }}
              >
                <option aria-label="None" value="" />
                {brands?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              placeholder="Enter Description"
              label="Description"
              fullWidth
              required
              multiline
              rows={4}
              sx={{ mb: 2 }}
              {...field}
              {...register("description", {
                required: "Description is required",
              })}
              helperText={validationErrors.description?.message}
              error={!!validationErrors.description}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            reset();
          }}
          color="error"
        >
          Cancel
        </Button>
        <Button
          type="button"
          color="primary"
          variant="contained"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? <EllipsisAnim /> : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
