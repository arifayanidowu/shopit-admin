import { Avatar, Button, Tooltip } from "@mui/material";
import {
  GridRowModel,
  GridValueFormatterParams,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMemo, useCallback, useRef, useState } from "react";
import { toast, Id } from "react-toastify";
import DropzoneContent from "src/components/shared/DropzoneContent";

import { getActions } from "src/components/shared/getActions";
import PopupModal from "src/components/shared/PopupModal";
import { deleteBrand, getAllBrands, updateBrand } from "src/endpoints/brands";
import useFileHandler from "src/hooks/useFileHandler";
import useTableEdit from "src/hooks/useTableEdit";
import { useStore } from "src/store";
import type { Brand as IBrand } from "src/types";
import { toastOptions } from "src/utils";

const useBrand = () => {
  const queryClient = new QueryClient();
  let toastId = useRef<Id | null>(null);
  const {
    file,
    image,
    setImage,
    setFile,
    getInputProps,
    getRootProps,
    isDragActive,
  } = useFileHandler();
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
  const { adminData } = useStore();
  const { data, isLoading } = useQuery<IBrand[]>(["brands"], getAllBrands);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const { mutateAsync } = useMutation(updateBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      toast.update(toastId.current!, {
        ...toastOptions({
          render: "Brand updated successfully",
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

  const { mutateAsync: deleteMutateAsync } = useMutation(deleteBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      toast.update(toastId.current!, {
        ...toastOptions({
          render: "Brand deleted successfully!",
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
      { field: "id", headerName: "ID", width: 130, hide: true },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        sortable: false,
        editable: true,
      },
      {
        field: "logo",
        headerName: "Image",
        width: 100,
        sortable: false,
        filterable: false,
        editable: true,
        renderCell: (params: GridRenderEditCellParams<IBrand>) => {
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
        renderEditCell: (params: GridRenderEditCellParams<IBrand>) => {
          return (
            <DropzoneContent
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              image={params.row.logo as string}
              src={image ?? (params.row.logo as string)}
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
        field: "products",
        headerName: "Products",
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderEditCellParams<IBrand>) => (
          <Button
            color="inherit"
            variant="outlined"
            disabled={params.row?.products?.length === 0}
          >
            Product {params.row?.products?.length}
          </Button>
        ),
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        width: 200,
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "updatedAt",
        headerName: "UpdatedAt",
        width: 200,
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Action",
        width: 130,
        cellClassName: "actions",
        sortable: false,
        filterable: false,
        getActions: ({ id }: { id: string }) =>
          getActions({
            id,
            handleEditClick,
            handleSaveClick,
            handleCancelClick,
            handleOpenConfirm,
            rowModesModel,
          }),
      },
    ];
  }, [
    anchorEl,
    getRootProps,
    getInputProps,
    isDragActive,
    image,
    currentImage,
    rowModesModel,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    setItemId,
    setOpenConfirm,
  ]);

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel, oldRow: GridRowModel) => {
      try {
        const formData = new FormData();
        const updatedRow = { ...newRow };
        toastId.current = toast.loading("Updating Brand...");
        if (file) {
          formData.append("file", file as Blob);
        }
        Object.keys(updatedRow).forEach((key) => {
          if (key === "products") return;
          formData.append(key, updatedRow[key] as string);
        });

        const data = await mutateAsync(formData);
        if (!data) return oldRow;

        return data;
      } catch (error) {
        return oldRow;
      } finally {
        setImage(null);
        setFile(null);
      }
    },
    [mutateAsync, file, setFile, setImage]
  );

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
    await deleteMutateAsync(itemId!);
    setItemId(null);
  }, [deleteMutateAsync, itemId, setItemId, setOpenConfirm]);

  return {
    columns,
    data,
    handleOpen,
    handleClose,
    handleCloseConfirm,
    handleRowModesModelChange,
    handleRowEditStart,
    handleRowEditStop,
    open,
    openConfirm,
    brandId: itemId,
    processRowUpdate,
    isLoading,
    handleConfirm,
    rowModesModel,
    setRowModesModel,
    adminData,
  };
};

export default useBrand;
