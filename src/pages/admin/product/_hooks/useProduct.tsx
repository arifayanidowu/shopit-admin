import { Avatar, Button, Chip, Tooltip } from "@mui/material";
import {
  GridCellParams,
  GridRenderEditCellParams,
  GridRowModel,
} from "@mui/x-data-grid";
import { GridValueFormatterParams } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast, Id } from "react-toastify";

import DropzoneContent from "src/components/shared/DropzoneContent";
import { getActions } from "src/components/shared/getActions";
import PopupModal from "src/components/shared/PopupModal";
import { getAllBrands } from "src/endpoints/brands";
import { getCategories } from "src/endpoints/category";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "src/endpoints/product";
import useFileHandler from "src/hooks/useFileHandler";
import useTableEdit from "src/hooks/useTableEdit";
import { useStore } from "src/store";
import type { Brand, Category, Product as IProduct } from "src/types";
import { toastOptions, toCapitalize } from "src/utils/";
import SelectEditInputCell from "../_components/SelectEditInputCell";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const switchColorCase = (action: string) => {
  switch (action) {
    case "published":
      return "success";
    case "archived":
      return "info";
    default:
      return "warning";
  }
};

const useProduct = () => {
  const queryClient = useQueryClient();
  const { adminData } = useStore();
  let toastId = useRef<Id | null>(null);
  const {
    rowModesModel,
    setRowModesModel,
    handleRowModesModelChange,
    handleRowEditStart,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    open,
    setOpen,
    openConfirm,
    setOpenConfirm,
    itemId,
    setItemId,
  } = useTableEdit();
  const {
    file,
    image,
    setImage,
    setFile,
    getInputProps,
    getRootProps,
    isDragActive,
  } = useFileHandler();
  const brandQuery = useQuery<Brand[]>(["brands"], getAllBrands);
  const categoryQuery = useQuery<Category[]>(["category"], getCategories);
  const { data, isLoading } = useQuery<IProduct[]>(["products"], getProducts);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [updatedProductId, setUpdatedProductId] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const { mutateAsync, isLoading: loadingProducts } = useMutation(
    updateProduct,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        setImage(null);
        toast.update(toastId.current!, {
          ...toastOptions({
            render: "Product updated successfully!",
            type: "success",
          }),
        });
      },
      onError: (error) => {
        const err = error as Error;
        setImage(null);
        toast.update(toastId.current!, {
          ...toastOptions({
            render: err.message,
            type: "error",
          }),
        });
      },
    }
  );

  const { mutateAsync: deleteProductAsync } = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.update(toastId.current!, {
        ...toastOptions({
          render: "Product deleted successfully!",
          type: "success",
        }),
      });
    },
    onError: (error) => {
      const err = error as Error;
      toast.update(toastId.current!, {
        ...toastOptions({
          render: err.message,
          type: "error",
        }),
      });
    },
  });

  const columns = useMemo(() => {
    const handleOpenConfirm = (id: string) => {
      setOpenConfirm(true);
      setItemId(id);
    };
    const handleClickPopup = (
      event: React.MouseEvent<HTMLButtonElement>,
      image: string
    ) => {
      setAnchorEl(event.currentTarget);
      setCurrentImage(image);
    };

    const handleClosePopup = () => {
      setAnchorEl(null);
      setCurrentImage(null);
    };

    const openPopup = Boolean(anchorEl);
    const id = openPopup ? "image-popover" : undefined;

    return [
      {
        field: "id",
        headerName: "ID",
        hide: true,
      },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        editable: true,
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
        editable: true,
        valueFormatter: (params: GridValueFormatterParams) => {
          if (params.value == null) {
            return "";
          }
          return currencyFormatter.format(params.value as number);
        },
      },
      {
        field: "quantity",
        headerName: "Quantity",
        type: "number",
        editable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 400,
        editable: true,
      },
      {
        field: "brandId",
        headerName: "Brand",
        width: 150,
        editable: true,
        renderEditCell: (params: GridRenderEditCellParams<IProduct>) => {
          const options =
            brandQuery?.data?.map((item) => ({
              value: item.id,
              label: item.name,
            })) || [];
          return <SelectEditInputCell options={options} {...params} />;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          if (params.value == null) {
            return "No brand";
          }
          const brandName =
            brandQuery?.data?.length &&
            brandQuery?.data?.find((item) => item.id === params.value)?.name;
          return brandName;
        },
      },
      {
        field: "categoryId",
        headerName: "Category",
        width: 150,
        editable: true,
        renderEditCell: (params: GridRenderEditCellParams<IProduct>) => {
          const options =
            categoryQuery?.data?.map((item) => ({
              value: item.id,
              label: item.name,
            })) || [];
          return <SelectEditInputCell options={options} {...params} />;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          if (params.value == null) {
            return "No Category";
          }
          const categoryName =
            categoryQuery?.data?.length &&
            categoryQuery?.data?.find((item) => item.id === params.value)?.name;
          return categoryName!;
        },
      },
      {
        field: "image",
        headerName: "Image",
        width: 100,
        editable: true,
        renderCell: (params: GridRenderEditCellParams<IProduct>) => {
          if (params.value == null) {
            return "No image";
          }
          return (
            <>
              <Tooltip title="Click to view image" placement="top" arrow>
                <Button
                  aria-describedby={id}
                  onClick={(e) => handleClickPopup(e, params.value as string)}
                >
                  <Avatar
                    src={params.value as string}
                    alt="product"
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: "white",
                    }}
                    variant="square"
                  />
                </Button>
              </Tooltip>
              <PopupModal
                id={id}
                open={openPopup}
                anchorEl={anchorEl}
                handleClose={handleClosePopup}
                image={currentImage ?? ""}
              />
            </>
          );
        },
        renderEditCell: (params: GridRenderEditCellParams<IProduct>) => {
          return (
            <DropzoneContent
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              image={params.row.image as string}
              src={image ?? (params.row.image as string)}
              containerStyle={{
                width: 50,
                height: 50,
                backgroundColor: "white",
                margin: "0 auto",
              }}
            />
          );
        },
      },
      {
        field: "size",
        headerName: "Size",
        width: 130,
        editable: true,
        renderEditCell: (params: GridRenderEditCellParams<IProduct>) => {
          const options =
            ["S", "M", "L", "XL", "XXL"].map((item) => ({
              value: item,
              label: item,
            })) || [];
          return <SelectEditInputCell multiple options={options} {...params} />;
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          if (params.value == null) {
            return "no size";
          }
          return params.value;
        },
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        width: 200,
        type: "dateTime",
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value as Date).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "updatedAt",
        headerName: "UpdatedAt",
        width: 200,
        type: "dateTime",
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value as Date).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 110,
        editable: true,
        renderEditCell: (params: GridRenderEditCellParams<IProduct>) => {
          const options = [
            {
              value: "draft",
              label: "Draft",
            },
            {
              value: "published",
              label: "Published",
            },
            {
              value: "archived",
              label: "Archived",
            },
          ];
          return <SelectEditInputCell options={options} {...params} />;
        },
        renderCell: (params: GridCellParams) => {
          if (params.value == null) {
            return "No status";
          }
          return (
            <Chip
              variant="outlined"
              color={switchColorCase(params.value as string)}
              label={toCapitalize(params.value as string)}
              size="small"
            />
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Action",
        width: 100,
        cellClassName: "actions",
        sortable: false,
        filterable: false,
        getActions: ({ id }: { id: string }) =>
          getActions({
            id,
            handleEditClick,
            handleSaveClick,
            handleCancelClick: () => handleCancelClick(id),
            rowModesModel,
            handleOpenConfirm,
            reset() {
              setImage(null);
              setFile(null);
            },
            isLoading: id === updatedProductId && loadingProducts,
          }),
      },
    ];
  }, [
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    rowModesModel,
    setOpenConfirm,
    setItemId,
    brandQuery?.data,
    categoryQuery?.data,
    anchorEl,
    currentImage,
    isDragActive,
    getRootProps,
    getInputProps,
    image,
    setImage,
    setFile,
    loadingProducts,
    updatedProductId,
  ]);

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel, oldRow: GridRowModel) => {
      try {
        const formData = new FormData();
        const updatedRow = { ...newRow };
        setUpdatedProductId(updatedRow.id as string);
        toastId.current = toast.loading("Updating Product...");
        if (file) {
          formData.append("file", file as Blob);
        }
        Object.keys(updatedRow).forEach((key) => {
          if (key === "brand") {
            delete updatedRow[key];
          } else if (key === "category") {
            delete updatedRow[key];
          } else {
            formData.append(key, updatedRow[key]);
          }
        });
        const data = await mutateAsync(formData);

        if (!data) {
          return oldRow;
        }
        return data;
      } catch (error) {
        return oldRow;
      } finally {
        setFile(null);
        setImage(null);
      }
    },
    [mutateAsync, file, setFile, setImage]
  );

  const onProcessRowUpdateError = useCallback((error: any) => {
    toast.update(toastId.current!, {
      render: error,
      type: "error",
      ...toastOptions,
    });
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleCloseConfirm = useCallback(() => {
    setOpenConfirm(false);
  }, [setOpenConfirm]);

  const handleConfirm = useCallback(async () => {
    toastId.current = toast.loading("Deleting brand...");
    setOpenConfirm(false);
    await deleteProductAsync(itemId!);
    setItemId(null);
  }, [deleteProductAsync, itemId, setItemId, setOpenConfirm]);

  return {
    data,
    isLoading,
    columns,
    processRowUpdate,
    productId: itemId,
    handleOpen,
    handleClose,
    handleCloseConfirm,
    handleRowModesModelChange,
    handleRowEditStart,
    handleRowEditStop,
    open,
    openConfirm,
    handleConfirm,
    setRowModesModel,
    rowModesModel,
    adminData,
    onProcessRowUpdateError,
  };
};

export default useProduct;
